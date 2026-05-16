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
  openModal: () => void;
  closeModal: () => void;
  modalOpen: boolean;
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

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<WalletName | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Eager reconnect if previously connected & trusted
  useEffect(() => {
    const stored = localStorage.getItem("fwg:wallet") as WalletName | null;
    if (!stored) return;
    const provider = getProvider(stored);
    if (!provider) return;
    provider
      .connect({ onlyIfTrusted: true })
      .then((res) => {
        setPublicKey(res.publicKey.toString());
        setWalletName(stored);
      })
      .catch(() => {});
  }, []);

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
    toast("Wallet disconnected");
  }, [walletName]);

  const connect = useCallback(async (name: WalletName) => {
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
    } catch (e) {
      toast.error("Connection rejected", { description: e instanceof Error ? e.message : "Try again" });
    } finally {
      setConnecting(false);
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      publicKey,
      connecting,
      connected: !!publicKey,
      walletName,
      modalOpen,
      openModal: () => setModalOpen(true),
      closeModal: () => setModalOpen(false),
      connect,
      disconnect,
    }),
    [publicKey, connecting, walletName, modalOpen, connect, disconnect],
  );

  return <WalletCtx.Provider value={value}>{children}</WalletCtx.Provider>;
}

export function useWallet() {
  const ctx = useContext(WalletCtx);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}

export const PUMP_FUN_URL =
  "https://pump.fun/board";
