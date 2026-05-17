import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const X = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2H21l-6.51 7.44L22 22h-6.797l-4.77-6.243L4.8 22H2l6.97-7.96L2 2h6.914l4.32 5.71L18.244 2Zm-2.38 18h1.872L8.227 4H6.24l9.624 16Z" />
  </svg>
);
const Tg = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
  </svg>
);
const Dc = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.07.07 0 0 0-.07.035c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.07-.035A19.74 19.74 0 0 0 3.68 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z" />
  </svg>
);

export function Footer() {
  const [sound, setSound] = useState(false);
  return (
    <footer className="relative pt-24">
      {/* CTA */}
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="glass-strong rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 pitch-lines opacity-30" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-[600px] bg-neon/20 blur-3xl" />
          <div className="relative">
            <div className="text-5xl mb-4">⚽</div>
            <h3 className="font-display font-black text-4xl md:text-6xl">
              READY TO <span className="gradient-text-neon">SCORE?</span>
            </h3>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Join thousands of degens already farming $FWG. The pitch is live.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#game"
                className="px-8 py-4 rounded-2xl gradient-neon text-background font-black tracking-wide shadow-[var(--shadow-neon)] hover:scale-105 transition"
              >
                PLAY NOW
              </a>
              <a
                href="#"
                className="px-8 py-4 rounded-2xl glass-strong font-black tracking-wide gradient-text-gold hover:border-gold/50 transition"
              >
                BUY $FWG
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-neon/15 pt-8">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl gradient-neon grid place-items-center text-background">⚽</div>
            <div>
              <div className="font-display font-black text-sm">FIFA WORLD GAMES</div>
              <div className="text-xs text-muted-foreground">Built for football fans and degens on Solana.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {[X, Tg, Dc].map((Icon, i) => (
              <a
                key={i}
                href="https://x.com/fifaworldgames"
                className="h-10 w-10 rounded-xl glass grid place-items-center text-foreground/70 hover:text-neon hover:border-neon/60 transition"
              >
                {" "}
                <Icon />{" "}
              </a>
            ))}
            <button
              onClick={() => setSound(!sound)}
              className="h-10 w-10 rounded-xl glass grid place-items-center text-foreground/70 hover:text-neon transition"
              aria-label="Toggle sound"
            >
              {sound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          <div className="text-xs text-muted-foreground font-display tracking-widest">
            © 2026 FIFA WORLD GAMES · $FWG
          </div>
        </div>
      </div>
    </footer>
  );
}
