import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-11T16:00:00Z").getTime();

function diff() {
  const t = Math.max(0, TARGET - Date.now());
  return {
    d: Math.floor(t / 86400000),
    h: Math.floor((t / 3600000) % 24),
    m: Math.floor((t / 60000) % 60),
    s: Math.floor((t / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    setT(diff());
    const i = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(i);
  }, []);

  const units = [
    { v: t.d, l: "Days" },
    { v: t.h, l: "Hours" },
    { v: t.m, l: "Minutes" },
    { v: t.s, l: "Seconds" },
  ];

  return (
    <div className="mt-12 glass-strong rounded-2xl px-6 py-5 inline-flex flex-col items-center">
      <div className="text-[10px] md:text-xs tracking-[0.4em] text-gold font-display mb-3">⚽ FIFA WORLD CUP 2026 KICKOFF</div>
      <div className="flex items-center gap-2 md:gap-4">
        {units.map((u, i) => (
          <div key={u.l} className="flex items-center gap-2 md:gap-4">
            <div className="text-center">
              <div className="font-display font-black text-2xl md:text-4xl gradient-text-neon tabular-nums w-14 md:w-20">
                {String(u.v).padStart(2, "0")}
              </div>
              <div className="text-[9px] md:text-[10px] tracking-widest text-muted-foreground uppercase">{u.l}</div>
            </div>
            {i < units.length - 1 && <div className="text-neon font-bold text-xl">:</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
