import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  { q: "What is FIFA WORLD GAMES?", a: "FIFA WORLD GAMES ($FWG) is a BNB Chain memecoin powering a play-to-earn penalty shootout game launching during the FIFA World Cup 2026 hype season." },
  { q: "How do I earn $FWG?", a: "Connect your wallet, pick a striker, place a bet, and score goals. Successful shots return multiplied $FWG rewards. Missed shots feed the community pool." },
  { q: "Is the game on BNB Chain?", a: "Yes — 100% BNB Chain. Instant payouts, sub-cent fees, and supports MetaMask and Trust Wallet wallets." },
  { q: "Where can I buy $FWG?", a: "$FWG launches fair on PancakeSwap. After the bonded curve fills, $FWG moves to Raydium where you can swap from any BNB Chain wallet." },
  { q: "Are developer tokens locked for rewards?", a: "Yes. 100% of developer-allocated tokens are routed into the community reward pool, distributed to active players and top leaderboard finishers." },
  { q: "Is the leaderboard public?", a: "Always. Every score, every payout, every rank — fully public and on-chain." },
  { q: "Will there be tournaments and NFTs?", a: "Phase 3 introduces NFT football skins, PvP tournaments, and seasonal World Cup events with bigger reward pools." },
];

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="text-xs tracking-[0.4em] text-neon font-display mb-3">❓ FAQ</div>
          <h2 className="font-display font-black text-4xl md:text-6xl">
            QUESTIONS, <span className="gradient-text-neon">ANSWERED</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`glass rounded-2xl overflow-hidden transition ${isOpen ? "border-neon/60 shadow-[var(--shadow-neon)]" : ""}`}>
                <button onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left">
                  <span className="font-display font-bold text-lg">{f.q}</span>
                  <Plus className={`w-5 h-5 text-neon shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}/>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
