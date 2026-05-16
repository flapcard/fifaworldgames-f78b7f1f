import { Zap } from "lucide-react";

const events = [
  "⚽ Player123 scored 250 $FWG",
  "🔥 GoalMaster won 1,200 $FWG",
  "🏆 CR7Degen hit a 8x multiplier",
  "💰 Reward pool +12,400 $FWG",
  "⚡ ShotKing entered top 10",
  "🎯 MessiMoon scored 5 in a row",
  "🚀 PumpStriker withdrew 3,200 $FWG",
  "💎 NeymarSol minted streak badge",
];

export function Ticker() {
  const loop = [...events, ...events];
  return (
    <div className="relative border-y border-neon/20 bg-background/40 backdrop-blur overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-2">
        <div className="flex items-center gap-2 text-neon text-xs font-display font-bold tracking-widest shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-neon opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon"></span>
          </span>
          LIVE
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-10 whitespace-nowrap animate-ticker">
            {loop.map((e, i) => (
              <span key={i} className="text-sm text-muted-foreground inline-flex items-center gap-2">
                <Zap className="w-3 h-3 text-gold"/> {e}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
