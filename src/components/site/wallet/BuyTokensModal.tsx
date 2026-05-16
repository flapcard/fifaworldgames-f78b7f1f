import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useWallet, PUMP_FUN_URL, creditMockBalance } from "./WalletContext";
import { AlertTriangle, ExternalLink, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function BuyTokensModal() {
  const { buyModalOpen, closeBuyModal, buyShortfall, balance, publicKey, refreshBalance } = useWallet();

  const handleSimulate = async () => {
    if (!publicKey) return;
    const credited = Math.max(buyShortfall, 1000);
    creditMockBalance(publicKey, credited);
    await refreshBalance();
    toast.success(`+${credited.toLocaleString()} $FWG credited`, {
      description: "Demo top-up complete. You're ready to play.",
    });
    closeBuyModal();
  };

  return (
    <Dialog open={buyModalOpen} onOpenChange={(o) => !o && closeBuyModal()}>
      <DialogContent className="glass-strong border-gold/40 max-w-md">
        <DialogHeader>
          <div className="mx-auto h-12 w-12 rounded-2xl grid place-items-center bg-gold/20 border border-gold/40 mb-2">
            <AlertTriangle className="w-6 h-6 text-gold" />
          </div>
          <DialogTitle className="font-display tracking-wider text-2xl text-center">
            INSUFFICIENT <span className="gradient-text-gold">$FWG</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            You need more $FWG to place this bet. Pick up tokens on Pump.fun and jump back in.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="glass rounded-2xl p-4 text-center">
            <div className="text-[10px] tracking-widest text-muted-foreground uppercase">Balance</div>
            <div className="font-display font-black text-xl mt-1 gradient-text-neon">
              {balance.toLocaleString()}
            </div>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <div className="text-[10px] tracking-widest text-muted-foreground uppercase">Short By</div>
            <div className="font-display font-black text-xl mt-1 gradient-text-gold">
              {buyShortfall.toLocaleString()}
            </div>
          </div>
        </div>

        <a
          href={PUMP_FUN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 px-5 py-3 rounded-2xl gradient-neon text-background font-black tracking-wide inline-flex items-center justify-center gap-2 shadow-[var(--shadow-neon)] hover:scale-[1.02] transition"
        >
          BUY $FWG ON PUMP.FUN <ExternalLink className="w-4 h-4" />
        </a>

        <button
          onClick={handleSimulate}
          className="mt-2 px-5 py-3 rounded-2xl glass-strong border border-gold/30 hover:border-gold/70 font-display tracking-widest text-xs inline-flex items-center justify-center gap-2 transition"
        >
          <Sparkles className="w-4 h-4 text-gold" /> SIMULATE TOP-UP (DEMO)
        </button>

        <p className="text-[11px] text-muted-foreground text-center mt-1">
          Demo top-up is for previewing gameplay. Real balances will be read from your $FWG SPL token account on Solana mainnet.
        </p>
      </DialogContent>
    </Dialog>
  );
}
