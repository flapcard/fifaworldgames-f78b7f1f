const slices = [
  { label: "Community & Player Rewards", pct: 70, color: "var(--neon)" },
  { label: "Liquidity Pool", pct: 15, color: "var(--gold)" },
  { label: "Marketing & Partnerships", pct: 10, color: "var(--electric)" },
  { label: "Ecosystem Development", pct: 5, color: "oklch(0.78 0.18 320)" },
];

const details = [
  ["Token Name", "FIFA WORLD GAMES"],
  ["Symbol", "$FWG"],
  ["Blockchain", "BNB Chain"],
  ["Total Supply", "1,000,000,000"],
  ["Launch Platform", "PancakeSwap"],
];

function Donut() {
  const R = 80;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[280px] mx-auto -rotate-90">
      <circle cx="100" cy="100" r={R} fill="none" stroke="var(--color-secondary)" strokeWidth="28"/>
      {slices.map((s) => {
        const len = (s.pct / 100) * C;
        const el = (
          <circle key={s.label} cx="100" cy="100" r={R} fill="none"
            stroke={s.color} strokeWidth="28"
            strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset}
            style={{ filter: `drop-shadow(0 0 8px ${s.color})` }}/>
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

export function Tokenomics() {
  return (
    <section id="tokenomics" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[0.4em] text-gold font-display mb-3">💎 TOKENOMICS</div>
          <h2 className="font-display font-black text-4xl md:text-6xl">
            <span className="gradient-text-gold">$FWG</span> TOKENOMICS
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Chart */}
          <div className="lg:col-span-5 glass-strong rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 pitch-lines opacity-20"/>
            <div className="relative w-full">
              <Donut/>
              <div className="text-center mt-4">
                <div className="text-[10px] tracking-widest text-muted-foreground font-display">TOTAL SUPPLY</div>
                <div className="font-display font-black text-3xl gradient-text-neon">1,000,000,000</div>
              </div>
            </div>
          </div>

          {/* Allocation */}
          <div className="lg:col-span-7 space-y-3">
            {slices.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full" style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }}/>
                    <span className="font-display font-bold tracking-wide">{s.label}</span>
                  </div>
                  <span className="font-display font-black text-2xl" style={{ color: s.color }}>{s.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full" style={{ width: `${s.pct}%`, background: s.color, boxShadow: `0 0 12px ${s.color}` }}/>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-3 gap-3 pt-2">
              {["Fair Launch", "No Team Dump", "Community Driven"].map((b) => (
                <div key={b} className="glass rounded-xl p-3 text-center text-xs font-display font-bold tracking-wide text-neon">
                  ✓ {b.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Token details strip */}
        <div className="mt-6 glass-strong rounded-3xl grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-neon/15">
          {details.map(([k, v]) => (
            <div key={k} className="p-5">
              <div className="text-[10px] tracking-widest text-muted-foreground font-display">{k.toUpperCase()}</div>
              <div className="font-display font-black mt-1 truncate">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
