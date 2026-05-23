import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

type WalletName = "phantom" | "solflare";

type SolanaProvider = {
  publicKey?: { toString(): string };
  isPhantom?: boolean;
  isSolflare?: boolean;
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString(): string } }>;
  disconnect: () => Promise<void>;
  on?: (event: string, cb: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, cb: (...args: unknown[]) => void) => void;
};

type WindowWithWallets = Window & {
  solana?: SolanaProvider;
  phantom?: { solana?: SolanaProvider };
  solflare?: SolanaProvider;
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

function getProvider(name: WalletName): SolanaProvider | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as WindowWithWallets;
  if (name === "phantom") {
    const p = w.phantom?.solana ?? w.solana;
    return p?.isPhantom ? p : undefined;
  }
  return w.solflare?.isSolflare ? w.solflare : undefined;
}

const INSTALL_URL: Record<WalletName, string> = {
  phantom: "https://phantom.app/",
  solflare: "https://solflare.com/",
};

// Mock $FWG balance lookup. Replace with on-chain SPL token balance read once
// the $FWG mint address is finalized. Persists per-wallet in localStorage.
async function fetchMockBalance(publicKey: string): Promise<number> {
  await new Promise((r) => setTimeout(r, 400));
  const stored = localStorage.getItem(`fwg:balance:${publicKey}`);
  if (stored !== null) return Number(stored);
  // New wallets start empty so the buy flow is exercised on first play
  localStorage.setItem(`fwg:balance:${publicKey}`, "0");
  return 0;
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
      .connect({ onlyIfTrusted: true })
      .then((res) => {
        const key = res.publicKey.toString();
        setPublicKey(key);
        setWalletName(stored);
        loadBalance(key);
      })
      .catch(() => {});
  }, [loadBalance]);

  const disconnect = useCallback(async () => {
    if (walletName) {
      const provider = getProvider(walletName);
      try {
        await provider?.disconnect();
      } catch {}
    }
    localStorage.removeItem("fwg:wallet");
    setPublicKey(null);
    setWalletName(null);
    setBalance(0);
    toast("Wallet disconnected");
  }, [walletName]);

  const connect = useCallback(
    async (name: WalletName) => {
      const provider = getProvider(name);
      if (!provider) {
        toast.error(`${name === "phantom" ? "Phantom" : "Solflare"} not detected`, {
          description: "Install the wallet extension to continue.",
          action: { label: "Install", onClick: () => window.open(INSTALL_URL[name], "_blank") },
        });
        return;
      }
      try {
        setConnecting(true);
        const res = await provider.connect();
        const key = res.publicKey.toString();
        setPublicKey(key);
        setWalletName(name);
        localStorage.setItem("fwg:wallet", name);
        setModalOpen(false);
        toast.success("Wallet connected", { description: `${key.slice(0, 4)}…${key.slice(-4)}` });
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
        toast("Connect a wallet to play", { description: "Phantom or Solflare required." });
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

// Dev helper: simulate acquiring tokens after the user "buys" on Pump.fun.
export function creditMockBalance(publicKey: string, amount: number) {
  const cur = Number(localStorage.getItem(`fwg:balance:${publicKey}`) ?? 0);
  const next = cur + amount;
  localStorage.setItem(`fwg:balance:${publicKey}`, String(next));
  return next;
}

export const PUMP_FUN_URL = "https://pump.fun/coin/9XafPZZcXwy1Ya3wor9xuqajENAjUHAbEasCSUrKpump";
