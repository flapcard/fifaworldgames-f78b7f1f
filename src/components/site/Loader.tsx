import { useEffect, useState } from "react";

export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`fixed inset-0 z-[100] grid place-items-center bg-background transition-opacity duration-700 ${done ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
      <div className="absolute inset-0 pitch-lines opacity-40"/>
      <div className="absolute h-[400px] w-[400px] rounded-full bg-neon/20 blur-3xl"/>
      <div className="relative flex flex-col items-center gap-6">
        <div className="text-7xl animate-float" style={{ animationDuration: "1.4s" }}>⚽</div>
        <div className="font-display font-black tracking-[0.4em] text-sm text-neon">LOADING THE PITCH</div>
        <div className="w-48 h-1 rounded-full bg-secondary overflow-hidden">
          <div className="h-full gradient-neon" style={{ animation: "scan 1.4s ease-in-out forwards", width: "100%", transform: "translateX(-100%)" }}/>
        </div>
      </div>
      <style>{`@keyframes scan { 0% { transform: translateX(-100%);} 100% { transform: translateX(0);} }`}</style>
    </div>
  );
}
