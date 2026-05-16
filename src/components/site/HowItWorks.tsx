import { Wallet, Users, Target, Trophy, Coins, Zap, Flame } from "lucide-react";
import { useState } from "react";
import { useWallet } from "./wallet/WalletContext";
import { toast } from "sonner";

const BET_AMOUNT = 500;

const steps = [
  { n: "01", icon: Wallet, title: "Connect Wallet", body: "Link your Phantom or Solflare wallet in one click and enter the pitch." },
  { n: "02", icon: Users, title: "Choose Your Player", body: "Pick a striker — each with unique power, accuracy, and curve stats." },
  { n: "03", icon: Target, title: "Shoot & Score to Earn", body: "Time your shot, beat the keeper, and earn $FWG with multiplier rewards." },
];

type Phase = "idle" | "shooting" | "goal";

export function HowItWorks() {
  const { connected, balance, loadingBalance, requireBalance, openModal } = useWallet();
  const [phase, setPhase] = useState<Phase>("idle");

  const handleBet = () => {
    if (!connected) {
      toast("Connect a wallet to bet", { description: "Phantom or Solflare required." });
      openModal();
      return;
    }
    if (!requireBalance(BET_AMOUNT)) return;
    setPhase("shooting");
    toast.success(`Bet placed: ${BET_AMOUNT} $FWG`, { description: "Taking your shot…" });
    setTimeout(() => {
      setPhase("goal");
      toast.success("GOOOAL! +1,700 $FWG", { description: "3.4x multiplier hit 🔥" });
    }, 1400);
    setTimeout(() => setPhase("idle"), 3200);
  };

  const shooting = phase === "shooting";
  const goal = phase === "goal";

  return (
    <section id="game" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.4em] text-neon font-display mb-3">⚡ GAMEPLAY</div>
          <h2 className="font-display font-black text-4xl md:text-6xl">
            HOW THE <span className="gradient-text-neon">GAME</span> WORKS
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Three simple steps. Infinite degen energy. Built on Solana for instant, on-chain rewards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="group relative glass rounded-3xl p-8 hover:border-neon/60 transition overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-neon/10 blur-3xl group-hover:bg-neon/30 transition"/>
              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="h-14 w-14 rounded-2xl gradient-neon grid place-items-center text-background">
                    <s.icon className="w-6 h-6"/>
                  </div>
                  <span className="font-display font-black text-5xl text-neon/20 group-hover:text-neon/40 transition">{s.n}</span>
                </div>
                <h3 className="font-display font-black text-2xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive mockup */}
        <div className="mt-16 grid lg:grid-cols-5 gap-6">
          {/* Player cards */}
          <div className="lg:col-span-2 glass-strong rounded-3xl p-6">
            <div className="text-xs tracking-widest text-neon font-display mb-4">SELECT STRIKER</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: "EL FENÓMENO", r: "98", c: "from-yellow-400/30" },
                { n: "BLITZ NINE", r: "94", c: "from-green-400/30" },
                { n: "SOL STRIKER", r: "91", c: "from-blue-400/30" },
                { n: "PUMP KING", r: "89", c: "from-pink-400/30" },
              ].map((p, i) => (
                <div key={p.n} className={`relative rounded-2xl p-4 border border-neon/20 bg-gradient-to-br ${p.c} to-transparent hover:border-neon transition cursor-pointer ${i === 0 ? "ring-2 ring-neon shadow-[var(--shadow-neon)]" : ""}`}>
                  <div className="text-3xl mb-2">⚽</div>
                  <div className="font-display font-black text-sm leading-tight">{p.n}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] tracking-widest text-muted-foreground">RATING</span>
                    <span className="font-display font-black text-gold">{p.r}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goal scene */}
          <div className="lg:col-span-3 relative glass-strong rounded-3xl p-6 overflow-hidden">
            <div className="absolute inset-0 pitch-lines opacity-30"/>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-pitch/40"/>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs tracking-widest text-neon font-display">PENALTY SHOOTOUT</div>
                  <div className="font-display font-black text-2xl mt-1">SHOOT THE GOAL</div>
                </div>
                <div className="glass rounded-xl px-3 py-2 text-right">
                  <div className="text-[10px] tracking-widest text-muted-foreground">BET</div>
                  <div className="font-display font-black text-gold">{BET_AMOUNT} $FWG</div>
                  <div className="text-[10px] tracking-widest text-muted-foreground mt-1">
                    BAL: <span className={connected && balance >= BET_AMOUNT ? "text-neon" : "text-destructive"}>
                      {connected ? (loadingBalance ? "…" : balance.toLocaleString()) : "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Goal */}
              <div className="relative h-44 md:h-52 rounded-2xl bg-gradient-to-b from-background/60 to-pitch/60 border border-neon/30 overflow-hidden">
                {/* Net */}
                <div className="absolute inset-0 opacity-30"
                     style={{ backgroundImage: "linear-gradient(90deg, var(--neon) 1px, transparent 1px), linear-gradient(0deg, var(--neon) 1px, transparent 1px)", backgroundSize: "16px 16px" }}/>
                {/* Goalkeeper */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl animate-bob">🧤</div>
                {/* Ball */}
                <div
                  className={`absolute text-3xl transition-all ease-out ${
                    shooting
                      ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 duration-[1300ms]"
                      : goal
                        ? "left-[20%] top-[30%] scale-125 duration-300"
                        : "right-6 bottom-4 animate-float duration-500"
                  }`}
                >
                  ⚽
                </div>
                {goal && (
                  <div className="absolute inset-0 grid place-items-center font-display font-black text-5xl md:text-6xl gradient-text-gold animate-glow-pulse">
                    GOAL!
                  </div>
                )}
                {/* Scan */}
                <div className="absolute inset-x-0 top-0 h-px bg-neon shadow-[0_0_20px_var(--neon)] animate-scan"/>
              </div>

              {/* Shot meter */}
              <div className="mt-6">
                <div className="flex justify-between text-[10px] tracking-widest text-muted-foreground mb-2">
                  <span>POWER</span><span className="text-neon">87%</span>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full w-[87%] gradient-neon shadow-[var(--shadow-neon)]"/>
                </div>
              </div>

              {/* Bet button */}
              <button
                onClick={handleBet}
                disabled={shooting || goal}
                className="mt-6 w-full px-5 py-4 rounded-2xl gradient-neon text-background font-display font-black tracking-widest inline-flex items-center justify-center gap-2 shadow-[var(--shadow-neon)] hover:scale-[1.01] transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Flame className="w-5 h-5" />
                {shooting ? "TAKING SHOT…" : goal ? "GOAL! +1,700 $FWG" : `PLACE BET · ${BET_AMOUNT} $FWG`}
              </button>

              {/* Reward popup */}
              <div className="mt-4 glass rounded-2xl p-4 flex items-center justify-between animate-glow-pulse">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-gold"/>
                  <div>
                    <div className="font-display font-black">LAST GOAL!</div>
                    <div className="text-xs text-muted-foreground">3.4x multiplier hit</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display font-black text-2xl gradient-text-gold">+1,700</div>
                  <div className="text-[10px] tracking-widest text-muted-foreground">$FWG</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
