import { useState } from "react";
import { Menu, X, Wallet, LogOut, ExternalLink } from "lucide-react";
import { useWallet, PANCAKESWAP_URL, BSCSCAN_URL } from "./wallet/WalletContext";

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
  const { connected, publicKey, openModal, disconnect, balance, loadingBalance } = useWallet();

  const short = publicKey ? `${publicKey.slice(0, 4)}…${publicKey.slice(-4)}` : "";
  const fmtBal = loadingBalance ? "…" : balance.toLocaleString();

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
              <div className="text-[10px] text-neon tracking-[0.3em] font-display">$FWG · BNB CHAIN</div>
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
            {connected ? (
              <>
                <span className="hidden xl:inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-display tracking-widest glass border border-gold/40">
                  <span className="text-gold">{fmtBal}</span>
                  <span className="text-muted-foreground">$FWG</span>
                </span>
                <span className="px-3 py-2 rounded-xl text-xs font-display tracking-widest glass border border-neon/40 text-neon">
                  {short}
                </span>
                <button
                  onClick={() => disconnect()}
                  className="p-2 rounded-xl glass hover:border-destructive/60 transition"
                  aria-label="Disconnect wallet"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={openModal}
                className="px-4 py-2 rounded-xl text-sm font-bold gradient-neon text-background hover:scale-105 transition shadow-[var(--shadow-neon)]"
              >
                <span className="inline-flex items-center gap-2"><Wallet className="w-4 h-4"/>Connect Wallet</span>
              </button>
            )}
            <a
              href={PANCAKESWAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-sm font-bold glass-strong border border-gold/40 hover:border-gold transition inline-flex items-center gap-2"
            >
              <span className="gradient-text-gold">Buy $FWG on PancakeSwap</span>
            </a>
            <a
              href={BSCSCAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="View contract on BscScan"
              className="p-2 rounded-xl glass-strong border border-neon/20 hover:border-neon transition text-muted-foreground hover:text-neon"
            >
              <ExternalLink className="w-4 h-4" />
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
            {connected ? (
              <button
                onClick={() => { disconnect(); setOpen(false); }}
                className="px-4 py-2 rounded-xl text-sm font-bold glass-strong text-center"
              >
                Disconnect {short}
              </button>
            ) : (
              <button
                onClick={() => { openModal(); setOpen(false); }}
                className="px-4 py-2 rounded-xl text-sm font-bold gradient-neon text-background text-center"
              >
                Connect Wallet
              </button>
            )}
            <a
              href={PANCAKESWAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-sm font-bold glass-strong text-center"
            >
              <span className="gradient-text-gold">Buy $FWG on PancakeSwap</span>
            </a>
            <a
              href={BSCSCAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-display tracking-widest glass text-center text-muted-foreground hover:text-neon transition inline-flex items-center justify-center gap-1.5"
            >
              VIEW CONTRACT ON BSCSCAN <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
