import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useWallet } from "./WalletContext";
import { Loader2 } from "lucide-react";

const WALLETS = [
  { id: "phantom" as const, name: "Phantom", emoji: "👻", tag: "Most popular" },
  { id: "solflare" as const, name: "Solflare", emoji: "🔥", tag: "Solana native" },
];

export function WalletModal() {
  const { modalOpen, closeModal, connect, connecting, walletName } = useWallet();
  return (
    <Dialog open={modalOpen} onOpenChange={(o) => !o && closeModal()}>
      <DialogContent className="glass-strong border-neon/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display tracking-wider text-2xl">
            <span className="gradient-text-neon">CONNECT</span> WALLET
          </DialogTitle>
          <DialogDescription>Choose a Solana wallet to enter the pitch.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 mt-2">
          {WALLETS.map((w) => {
            const isLoading = connecting && walletName === w.id;
            return (
              <button
                key={w.id}
                onClick={() => connect(w.id)}
                disabled={connecting}
                className="group flex items-center justify-between rounded-2xl border border-neon/20 bg-secondary/40 hover:bg-secondary/70 hover:border-neon transition px-4 py-4 disabled:opacity-60"
              >
                <span className="flex items-center gap-3">
                  <span className="text-3xl">{w.emoji}</span>
                  <span className="text-left">
                    <span className="block font-display font-black tracking-wide">{w.name}</span>
                    <span className="block text-[10px] tracking-widest text-muted-foreground uppercase">{w.tag}</span>
                  </span>
                </span>
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-neon" />
                ) : (
                  <span className="text-xs font-display tracking-widest text-neon group-hover:translate-x-1 transition">
                    CONNECT →
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-muted-foreground text-center mt-2">
          By connecting, you agree to play responsibly. No funds are spent to connect.
        </p>
      </DialogContent>
    </Dialog>
  );
}
