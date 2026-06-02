import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

type WalletName = "metamask" | "trustwallet";

type EthRequestArgs = { method: string; params?: unknown[] };

type EthereumProvider = {
  isMetaMask?: boolean;
  isTrust?: boolean;
  isTrustWallet?: boolean;
  providers?: EthereumProvider[];
  request: (args: EthRequestArgs) => Promise<unknown>;
  on?: (event: string, cb: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, cb: (...args: unknown[]) => void) => void;
};

type WindowWithEthereum = Window & {
  ethereum?: EthereumProvider;
  trustwallet?: EthereumProvider;
};

type Ctx = {
  publicKey: string | null;
  connecting: boolean;
  connected: boolean;
  walletName: WalletName | null;
  balance: number;
  loadingBalance: boolean;
  refreshBalance: () => Promise<void>;
  hasSufficientBalance: (amount: number) => boolean;
  requireBalance: (amount: number) => boolean;
  openModal: () => void;
  closeModal: () => void;
  modalOpen: boolean;
  buyModalOpen: boolean;
  buyShortfall: number;
  openBuyModal: (shortfall?: number) => void;
  closeBuyModal: () => void;
  connect: (name: WalletName) => Promise<void>;
  disconnect: () => Promise<void>;
};

const WalletCtx = createContext<Ctx | null>(null);

// BNB Smart Chain mainnet
const BSC_CHAIN_ID = "0x38"; // 56
const BSC_PARAMS = {
  chainId: BSC_CHAIN_ID,
  chainName: "BNB Smart Chain",
  nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  rpcUrls: ["https://bsc-dataseed.binance.org/"],
  blockExplorerUrls: ["https://bscscan.com"],
};

function getProvider(name: WalletName): EthereumProvider | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as WindowWithEthereum;
  const eth = w.ethereum;
  if (!eth) return undefined;

  // EIP-5749: multiple injected providers
  const candidates: EthereumProvider[] = eth.providers?.length ? eth.providers : [eth];

  if (name === "metamask") {
    return candidates.find((p) => p.isMetaMask && !p.isTrust && !p.isTrustWallet) ?? (eth.isMetaMask ? eth : undefined);
  }
  // trustwallet
  return (
    candidates.find((p) => p.isTrust || p.isTrustWallet) ??
    w.trustwallet ??
    (eth.isTrust || eth.isTrustWallet ? eth : undefined)
  );
}

const INSTALL_URL: Record<WalletName, string> = {
  metamask: "https://metamask.io/download/",
  trustwallet: "https://trustwallet.com/download",
};

const WALLET_LABEL: Record<WalletName, string> = {
  metamask: "MetaMask",
  trustwallet: "Trust Wallet",
};

// Mock $FWG balance lookup. Replace with on-chain BEP-20 token balance read once
// the $FWG contract address is deployed. Persists per-wallet in localStorage.
async function fetchMockBalance(publicKey: string): Promise<number> {
  await new Promise((r) => setTimeout(r, 400));
  const stored = localStorage.getItem(`fwg:balance:${publicKey}`);
  if (stored !== null) return Number(stored);
  localStorage.setItem(`fwg:balance:${publicKey}`, "0");
  return 0;
}

async function ensureBscNetwork(provider: EthereumProvider) {
  try {
    await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: BSC_CHAIN_ID }] });
  } catch (err) {
    const code = (err as { code?: number })?.code;
    if (code === 4902) {
      await provider.request({ method: "wallet_addEthereumChain", params: [BSC_PARAMS] });
    }
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<WalletName | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [buyShortfall, setBuyShortfall] = useState(0);

  const loadBalance = useCallback(async (key: string) => {
    setLoadingBalance(true);
    try {
      const b = await fetchMockBalance(key);
      setBalance(b);
    } finally {
      setLoadingBalance(false);
    }
  }, []);

  // Eager reconnect if previously connected & trusted
  useEffect(() => {
    const stored = localStorage.getItem("fwg:wallet") as WalletName | null;
    if (!stored) return;
    const provider = getProvider(stored);
    if (!provider) return;
    provider
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        const list = accounts as string[];
        if (list && list[0]) {
          setPublicKey(list[0]);
          setWalletName(stored);
          loadBalance(list[0]);
        }
      })
      .catch(() => {});
  }, [loadBalance]);

  const disconnect = useCallback(async () => {
    localStorage.removeItem("fwg:wallet");
    setPublicKey(null);
    setWalletName(null);
    setBalance(0);
    toast("Wallet disconnected");
  }, []);

  const connect = useCallback(
    async (name: WalletName) => {
      const provider = getProvider(name);
      if (!provider) {
        toast.error(`${WALLET_LABEL[name]} not detected`, {
          description: "Install the wallet extension to continue.",
          action: { label: "Install", onClick: () => window.open(INSTALL_URL[name], "_blank") },
        });
        return;
      }
      try {
        setConnecting(true);
        const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[];
        const key = accounts?.[0];
        if (!key) throw new Error("No account returned");
        await ensureBscNetwork(provider);
        setPublicKey(key);
        setWalletName(name);
        localStorage.setItem("fwg:wallet", name);
        setModalOpen(false);
        toast.success("Wallet connected", { description: `${key.slice(0, 6)}…${key.slice(-4)}` });
        await loadBalance(key);
      } catch (e) {
        toast.error("Connection rejected", { description: e instanceof Error ? e.message : "Try again" });
      } finally {
        setConnecting(false);
      }
    },
    [loadBalance],
  );

  const refreshBalance = useCallback(async () => {
    if (publicKey) await loadBalance(publicKey);
  }, [publicKey, loadBalance]);

  const hasSufficientBalance = useCallback((amount: number) => balance >= amount, [balance]);

  const openBuyModal = useCallback((shortfall = 0) => {
    setBuyShortfall(shortfall);
    setBuyModalOpen(true);
  }, []);
  const closeBuyModal = useCallback(() => setBuyModalOpen(false), []);

  const requireBalance = useCallback(
    (amount: number) => {
      if (!publicKey) {
        toast("Connect a wallet to play", { description: "MetaMask or Trust Wallet required." });
        setModalOpen(true);
        return false;
      }
      if (balance < amount) {
        const short = amount - balance;
        openBuyModal(short);
        return false;
      }
      return true;
    },
    [publicKey, balance, openBuyModal],
  );

  const value = useMemo<Ctx>(
    () => ({
      publicKey,
      connecting,
      connected: !!publicKey,
      walletName,
      balance,
      loadingBalance,
      refreshBalance,
      hasSufficientBalance,
      requireBalance,
      modalOpen,
      openModal: () => setModalOpen(true),
      closeModal: () => setModalOpen(false),
      buyModalOpen,
      buyShortfall,
      openBuyModal,
      closeBuyModal,
      connect,
      disconnect,
    }),
    [
      publicKey,
      connecting,
      walletName,
      balance,
      loadingBalance,
      refreshBalance,
      hasSufficientBalance,
      requireBalance,
      modalOpen,
      buyModalOpen,
      buyShortfall,
      openBuyModal,
      closeBuyModal,
      connect,
      disconnect,
    ],
  );

  return <WalletCtx.Provider value={value}>{children}</WalletCtx.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletCtx);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}

// Dev helper: simulate acquiring tokens after the user "buys" on PancakeSwap.
export function creditMockBalance(publicKey: string, amount: number) {
  const cur = Number(localStorage.getItem(`fwg:balance:${publicKey}`) ?? 0);
  const next = cur + amount;
  localStorage.setItem(`fwg:balance:${publicKey}`, String(next));
  return next;
}

// $FWG BEP-20 token contract on BNB Smart Chain.
// TODO: replace with the deployed mainnet address at launch.
export const FWG_CONTRACT_ADDRESS = "4444";

export const PANCAKESWAP_URL = `https://pancakeswap.finance/swap?outputCurrency=${FWG_CONTRACT_ADDRESS}&chain=bsc`;
export const BSCSCAN_URL = `https://bscscan.com/token/${FWG_CONTRACT_ADDRESS}`;
