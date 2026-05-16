import { useState } from "react";
import { Trophy, Medal, Target, Crown } from "lucide-react";

const tabs = ["Daily", "Weekly", "All-Time"] as const;

const data: Record<(typeof tabs)[number], { rank: number; name: string; goals: number; earnings: number; acc: number }[]> = {
  Daily: [
    { rank: 1, name: "ELFENOMENO.sol", goals: 142, earnings: 18420, acc: 94 },
    { rank: 2, name: "GoalMaster", goals: 128, earnings: 15300, acc: 91 },
    { rank: 3, name: "PumpStriker", goals: 119, earnings: 14110, acc: 88 },
    { rank: 4, name: "NeymarMoon", goals: 102, earnings: 12080, acc: 85 },
    { rank: 5, name: "CR7Degen", goals: 98, earnings: 11440, acc: 87 },
    { rank: 6, name: "SolMessi", goals: 91, earnings: 10220, acc: 83 },
    { rank: 7, name: "ShotKing", goals: 84, earnings: 9540, acc: 82 },
    { rank: 8, name: "MbappePump", goals: 79, earnings: 8910, acc: 80 },
  ],
  Weekly: [
    { rank: 1, name: "PumpStriker", goals: 892, earnings: 124800, acc: 92 },
    { rank: 2, name: "ELFENOMENO.sol", goals: 841, earnings: 118200, acc: 90 },
    { rank: 3, name: "GoalMaster", goals: 803, earnings: 110450, acc: 89 },
    { rank: 4, name: "CR7Degen", goals: 752, earnings: 98300, acc: 88 },
    { rank: 5, name: "NeymarMoon", goals: 698, earnings: 90120, acc: 86 },
    { rank: 6, name: "SolMessi", goals: 645, earnings: 84200, acc: 84 },
    { rank: 7, name: "ShotKing", goals: 612, earnings: 78400, acc: 83 },
    { rank: 8, name: "MbappePump", goals: 590, earnings: 72100, acc: 81 },
  ],
  "All-Time": [
    { rank: 1, name: "ELFENOMENO.sol", goals: 14820, earnings: 1842000, acc: 93 },
    { rank: 2, name: "PumpStriker", goals: 13941, earnings: 1620400, acc: 91 },
    { rank: 3, name: "GoalMaster", goals: 12480, earnings: 1410800, acc: 90 },
    { rank: 4, name: "CR7Degen", goals: 11290, earnings: 1280300, acc: 89 },
    { rank: 5, name: "NeymarMoon", goals: 10820, earnings: 1190200, acc: 87 },
    { rank: 6, name: "SolMessi", goals: 9840, earnings: 1080500, acc: 86 },
    { rank: 7, name: "ShotKing", goals: 9120, earnings: 990400, acc: 85 },
    { rank: 8, name: "MbappePump", goals: 8810, earnings: 921100, acc: 83 },
  ],
};

const podiumIcon = (r: number) => {
  if (r === 1) return <Crown className="w-5 h-5 text-gold"/>;
  if (r === 2) return <Trophy className="w-5 h-5 text-foreground/70"/>;
  if (r === 3) return <Medal className="w-5 h-5 text-amber-700"/>;
  return <span className="text-muted-foreground font-display font-bold">#{r}</span>;
};

export function Leaderboard() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Daily");
  const rows = data[tab];
  const top3 = rows.slice(0, 3);

  return (
    <section id="leaderboard" className="relative py-24 md:py-32">
      <div className="absolute inset-0 scanlines opacity-30"/>
      <div className="mx-auto max-w-7xl px-4 md:px-6 relative">
        <div className="text-center mb-12">
          <div className="text-xs tracking-[0.4em] text-gold font-display mb-3">🏆 LIVE STANDINGS</div>
          <h2 className="font-display font-black text-4xl md:text-6xl">
            GLOBAL <span className="gradient-text-gold">LEADERBOARD</span>
          </h2>
          <p className="mt-4 text-muted-foreground">Public, on-chain, and updated every block.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass rounded-2xl p-1.5 inline-flex gap-1">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-xl text-sm font-display font-bold tracking-wider transition ${
                  tab === t ? "gradient-neon text-background shadow-[var(--shadow-neon)]" : "text-muted-foreground hover:text-foreground"
                }`}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Podium */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[top3[1], top3[0], top3[2]].map((p, i) => {
            if (!p) return null;
            const podiumClass = p.rank === 1
              ? "md:-translate-y-4 border-gold/60 shadow-[var(--shadow-gold)]"
              : "border-neon/30";
            return (
              <div key={p.name} className={`glass-strong rounded-3xl p-6 border-2 ${podiumClass} relative overflow-hidden`}>
                {p.rank === 1 && <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gold/30 blur-3xl"/>}
                <div className="relative flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {podiumIcon(p.rank)}
                    <span className="text-xs tracking-widest text-muted-foreground font-display">RANK {p.rank}</span>
                  </div>
                  <span className="text-3xl">{p.rank === 1 ? "👑" : p.rank === 2 ? "🥈" : "🥉"}</span>
                </div>
                <div className="font-display font-black text-xl mb-4">{p.name}</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-[10px] tracking-widest text-muted-foreground">GOALS</div>
                    <div className="font-display font-black text-neon">{p.goals}</div>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-widest text-muted-foreground">$FWG</div>
                    <div className="font-display font-black text-gold">{(p.earnings / 1000).toFixed(1)}K</div>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-widest text-muted-foreground">ACC</div>
                    <div className="font-display font-black">{p.acc}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table */}
        <div className="glass-strong rounded-3xl overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-3 border-b border-neon/15 text-[11px] tracking-widest text-muted-foreground font-display">
            <div className="col-span-1">RANK</div>
            <div className="col-span-5 md:col-span-6">PLAYER</div>
            <div className="col-span-2 text-right">GOALS</div>
            <div className="col-span-2 md:col-span-2 text-right">$FWG</div>
            <div className="col-span-2 md:col-span-1 text-right">ACC</div>
          </div>
          {rows.slice(3).map((p) => (
            <div key={p.name} className="grid grid-cols-12 px-6 py-4 items-center hover:bg-neon/5 transition border-b border-border/40 last:border-0">
              <div className="col-span-1 font-display font-bold text-muted-foreground">#{p.rank}</div>
              <div className="col-span-5 md:col-span-6 flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl glass grid place-items-center text-sm">⚽</div>
                <div className="font-medium truncate">{p.name}</div>
              </div>
              <div className="col-span-2 text-right font-display font-bold text-neon">{p.goals.toLocaleString()}</div>
              <div className="col-span-2 md:col-span-2 text-right font-display font-bold text-gold">{p.earnings.toLocaleString()}</div>
              <div className="col-span-2 md:col-span-1 text-right text-muted-foreground"><Target className="w-3 h-3 inline mr-1 text-neon"/>{p.acc}%</div>
            </div>
          ))}
        </div>

        {/* Global goals tracker */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {[
            { l: "Total Goals Scored Globally", v: "1,284,920", c: "gradient-text-neon" },
            { l: "Total Rewards Distributed", v: "487,200 $FWG", c: "gradient-text-gold" },
            { l: "Reward Pool Balance", v: "2,140,000 $FWG", c: "gradient-text-neon" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-5">
              <div className="text-[10px] tracking-widest text-muted-foreground font-display">{s.l.toUpperCase()}</div>
              <div className={`font-display font-black text-3xl mt-2 ${s.c}`}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
