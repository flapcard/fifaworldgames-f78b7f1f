import { useState } from "react";
import { Menu, X, Wallet } from "lucide-react";

const links = [
  { label: "Game", href: "#game" },
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Rewards", href: "#rewards" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 pt-4">
        <div className="glass-strong rounded-2xl flex items-center justify-between px-4 md:px-6 py-3">
          <a href="#top" className="flex items-center gap-2 group">
            <div className="relative h-9 w-9 rounded-xl gradient-neon grid place-items-center text-background font-black animate-glow-pulse">
              ⚽
            </div>
            <div className="leading-none">
              <div className="font-display font-black text-sm md:text-base tracking-wider">FIFA WORLD GAMES</div>
              <div className="text-[10px] text-neon tracking-[0.3em] font-display">$FWG · SOLANA</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a key={l.href} href={l.href}
                 className="text-sm font-medium text-muted-foreground hover:text-neon transition relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-neon hover:after:w-full after:transition-all">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a href="#game" className="px-4 py-2 rounded-xl text-sm font-bold gradient-neon text-background hover:scale-105 transition shadow-[var(--shadow-neon)]">
              <span className="inline-flex items-center gap-2"><Wallet className="w-4 h-4"/>Connect Wallet</span>
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg glass">
            {open ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
          </button>
        </div>

        {open && (
          <div className="lg:hidden glass-strong rounded-2xl mt-2 p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="text-sm font-medium text-foreground/90 hover:text-neon transition">{l.label}</a>
            ))}
            <a href="#game" className="px-4 py-2 rounded-xl text-sm font-bold gradient-neon text-background text-center">
              Connect Wallet
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
