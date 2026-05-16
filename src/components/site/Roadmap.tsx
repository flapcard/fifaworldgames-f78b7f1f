const phases = [
  {
    p: "PHASE 1", t: "Kickoff", color: "var(--neon)",
    items: ["Launch on Pump.fun", "Website release", "Community building", "Wallet integration"],
  },
  {
    p: "PHASE 2", t: "Game On", color: "var(--gold)",
    items: ["Penalty shootout game live", "Public leaderboard", "Reward system live", "Viral social campaigns"],
  },
  {
    p: "PHASE 3", t: "World Stage", color: "var(--electric)",
    items: ["NFT football skins", "PvP tournaments", "Seasonal World Cup events", "Solana ecosystem partnerships"],
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[0.4em] text-neon font-display mb-3">🗺️ ROADMAP</div>
          <h2 className="font-display font-black text-4xl md:text-6xl">
            ROAD TO THE <span className="gradient-text-gold">FINAL</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-neon via-gold to-electric"/>
          {phases.map((ph, i) => (
            <div key={ph.p} className="glass-strong rounded-3xl p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full grid place-items-center font-display font-black text-background relative z-10"
                     style={{ background: ph.color, boxShadow: `0 0 20px ${ph.color}` }}>
                  {i + 1}
                </div>
                <div>
                  <div className="text-[10px] tracking-widest text-muted-foreground font-display">{ph.p}</div>
                  <div className="font-display font-black text-xl">{ph.t}</div>
                </div>
              </div>
              <ul className="space-y-3">
                {ph.items.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 h-2 w-2 rounded-full shrink-0" style={{ background: ph.color, boxShadow: `0 0 8px ${ph.color}` }}/>
                    <span className="text-foreground/90">{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
