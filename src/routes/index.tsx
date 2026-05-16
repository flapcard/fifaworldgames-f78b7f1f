import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Ticker } from "@/components/site/Ticker";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Leaderboard } from "@/components/site/Leaderboard";
import { Rewards } from "@/components/site/Rewards";
import { Tokenomics } from "@/components/site/Tokenomics";
import { Roadmap } from "@/components/site/Roadmap";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { Loader } from "@/components/site/Loader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FIFA WORLD GAMES ($FWG) — Play. Score. Earn. on Solana" },
      { name: "description", content: "Predict your shot, score goals, and earn $FWG rewards on Solana during the FIFA World Cup 2026 season. Fair launch on Pump.fun." },
      { property: "og:title", content: "FIFA WORLD GAMES ($FWG) — Solana Penalty Shootout" },
      { property: "og:description", content: "Play-to-earn penalty shootout on Solana. Fair launch on Pump.fun. 100% community rewards." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Loader/>
      <Nav/>
      <main>
        <Hero/>
        <Ticker/>
        <HowItWorks/>
        <Leaderboard/>
        <Rewards/>
        <Tokenomics/>
        <Roadmap/>
        <Faq/>
      </main>
      <Footer/>
    </div>
  );
}
