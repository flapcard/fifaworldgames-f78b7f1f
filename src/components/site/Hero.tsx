import { Play, Rocket, Sparkles } from "lucide-react";
import { Countdown } from "./Countdown";
import { useWallet, PUMP_FUN_URL } from "./wallet/WalletContext";
import { toast } from "sonner";

export function Hero() {
  const { connected, openModal, publicKey } = useWallet();

  const handlePlay = () => {
    if (!connected) {
      toast("Connect a wallet to play", { description: "Phantom or Solflare required." });
      openModal();
      return;
    }
    const short = publicKey ? `${publicKey.slice(0, 4)}…${publicKey.slice(-4)}` : "";
    toast.success("Entering the pitch ⚽", { description: `Playing as ${short}` });
    document.getElementById("game")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
      {/* Stadium lights */}
      <div className="absolute inset-0 pitch-lines opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"/>
      <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-neon/20 blur-3xl"/>
      <div className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-electric/20 blur-3xl"/>
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl"/>

      {/* Floating footballs */}
      {[
        "left-[8%] top-[30%]",
        "right-[10%] top-[20%]",
        "left-[20%] bottom-[18%]",
        "right-[25%] bottom-[25%]",
        "left-[45%] top-[10%]",
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} text-4xl md:text-5xl opacity-70 animate-float`}
             style={{ animationDelay: `${i * 0.8}s`, animationDuration: `${6 + i}s` }}>
          ⚽
        </div>
      ))}

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="glass rounded-full px-4 py-1.5 inline-flex items-center gap-2 text-xs font-display tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold"/>
            <span className="text-gold">FAIR LAUNCH</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-neon">LIVE ON PUMP.FUN</span>
          </div>

          <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
            <span className="gradient-text-neon text-glow">PLAY.</span>{" "}
            <span className="gradient-text-gold text-glow-gold">SCORE.</span>{" "}
            <span className="text-foreground">EARN.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground">
            Predict your shot, score goals, and earn <span className="text-neon font-bold">$FWG</span> rewards on Solana during the biggest football hype season in the world.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handlePlay}
              className="group relative px-8 py-4 rounded-2xl gradient-neon text-background font-black tracking-wide inline-flex items-center justify-center gap-2 shadow-[var(--shadow-neon)] hover:scale-105 transition"
            >
              <Play className="w-5 h-5 fill-background"/> PLAY GAME
            </button>
            <a
              href={PUMP_FUN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl glass-strong font-black tracking-wide inline-flex items-center justify-center gap-2 hover:border-gold/50 transition"
            >
              <Rocket className="w-5 h-5 text-gold"/> <span className="gradient-text-gold">BUY ON PUMP.FUN</span>
            </a>
          </div>

          {/* Stat bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-4xl">
            {[
              { v: "1.2M+", l: "Goals Scored" },
              { v: "$487K", l: "Rewards Paid" },
              { v: "24,892", l: "Players" },
              { v: "8.4x", l: "Max Multiplier" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-4 text-center">
                <div className="font-display font-black text-2xl md:text-3xl gradient-text-neon">{s.v}</div>
                <div className="text-[11px] md:text-xs tracking-widest text-muted-foreground mt-1 uppercase">{s.l}</div>
              </div>
            ))}
          </div>

          <Countdown/>
        </div>
      </div>
    </section>
  );
}
