import { Users, Lock, Sparkles, Heart, Shield, Zap } from "lucide-react";

const points = [
  { icon: Users, t: "100% Community Allocation", b: "All developer tokens go directly to the community reward pool." },
  { icon: Lock, t: "No Private Sale", b: "No insiders, no VCs, no shady allocations. Fair from day one." },
  { icon: Sparkles, t: "Fair Launch on PancakeSwap", b: "Bonded curve launch — everyone gets the same shot." },
  { icon: Heart, t: "Community-First", b: "Top players earn from a transparent on-chain pool." },
  { icon: Shield, t: "No Team Dump", b: "Liquidity locked. Team wallet renounced. Built to last." },
  { icon: Zap, t: "Instant BNB Chain Payouts", b: "Sub-second rewards, paid straight to your wallet." },
];

export function Rewards() {
  return (
    <section id="rewards" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="text-xs tracking-[0.4em] text-neon font-display mb-3">💚 REWARD POOL</div>
            <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.95]">
              <span className="gradient-text-neon">100%</span><br/>
              COMMUNITY<br/>
              REWARDS
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md">
              The entire developer allocation flows into a player-driven reward pool. Score, win, climb. No catches.
            </p>

            <div className="mt-8 glass-strong rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-neon/20 blur-3xl"/>
              <div className="relative">
                <div className="text-xs tracking-widest text-muted-foreground font-display">CURRENT POOL</div>
                <div className="font-display font-black text-5xl gradient-text-neon mt-2 tabular-nums">2,140,000</div>
                <div className="text-sm text-gold font-display">$FWG · ~$184,200</div>

                <div className="mt-5">
                  <div className="flex justify-between text-[10px] tracking-widest text-muted-foreground mb-2">
                    <span>SEASON 1 DISTRIBUTED</span><span className="text-neon">63%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-[63%] gradient-neon"/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {points.map((p) => (
              <div key={p.t} className="glass rounded-2xl p-6 hover:border-neon/50 transition">
                <div className="h-11 w-11 rounded-xl glass grid place-items-center mb-4 text-neon">
                  <p.icon className="w-5 h-5"/>
                </div>
                <h3 className="font-display font-black text-lg mb-1">{p.t}</h3>
                <p className="text-sm text-muted-foreground">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
