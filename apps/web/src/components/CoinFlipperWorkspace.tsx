"use client";

import React, { useState, useEffect } from "react";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";

const Volume2Icon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
);

const VolumeXIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
);

const CoinsIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>
);

export default function CoinFlipperWorkspace() {
  const t = useWorkspaceTranslation();

  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [currency, setCurrency] = useState<"classic" | "indian">("classic");
  
  useEffect(() => {
    const saved = localStorage.getItem("coinFlipperCurrency");
    if (saved === "classic" || saved === "indian") {
      setCurrency(saved);
    }
  }, []);

  const handleCurrencyChange = (newCurrency: "classic" | "indian") => {
    setCurrency(newCurrency);
    localStorage.setItem("coinFlipperCurrency", newCurrency);
  };

  const [stats, setStats] = useState({ heads: 0, tails: 0 });

  const speakResult = (outcome: "heads" | "tails") => {
    if (!soundEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`It's ${outcome}`);
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    const outcome = Math.random() > 0.5 ? "heads" : "tails";
    // Add spins to X axis for a wobbly 3D effect
    setRotationX((prev) => prev + 1440);
    
    // Calculate new Y rotation
    let targetY = rotationY + 1800; // 5 base spins in Y
    const normalizedY = targetY % 360;
    
    // Ensure we land on the correct side
    if (outcome === "heads") {
      targetY += (360 - normalizedY); // land exactly on 0 mod 360
    } else {
      targetY += (360 - normalizedY) + 180; // land exactly on 180 mod 360
    }

    setRotationY(targetY);

    setTimeout(() => {
      setResult(outcome);
      setStats(prev => ({
        ...prev,
        [outcome]: prev[outcome] + 1
      }));
      setIsFlipping(false);
      speakResult(outcome);
    }, 2000); // 2 second flip animation
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="bg-surface-elevated border border-border/50 rounded-3xl p-8 shadow-sm text-center relative overflow-hidden">
        
        {/* Header Options */}
        <div className="absolute top-6 right-6 z-10 flex gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 text-ink-secondary hover:text-ink hover:bg-surface rounded-xl transition-colors border border-border/30 shadow-sm"
            title={soundEnabled ? "Mute Sound" : "Enable Sound"}
          >
            {soundEnabled ? <Volume2Icon className="w-5 h-5" /> : <VolumeXIcon className="w-5 h-5" />}
          </button>
        </div>

        <h2 className="text-2xl font-extrabold text-ink mb-2 flex items-center justify-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <CoinsIcon className="w-5 h-5" />
          </span>
          Coin Flipper
        </h2>
        <p className="text-ink-muted mb-10 max-w-sm mx-auto">
          Flip a realistic 3D coin instantly. Completely random and mathematically fair.
        </p>

        {/* 3D Coin Scene */}
        <div className="perspective-[1000px] h-64 w-full flex items-center justify-center mb-10 relative">
          
          {/* Vertical Currency Selector */}
          <div className="absolute -left-2 sm:left-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
            <button
              onClick={() => handleCurrencyChange("classic")}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-2 transition-all shadow-md ${currency === 'classic' ? 'bg-[#D4AF37] text-white border-[#B8860B] scale-110' : 'bg-surface border-border/30 text-ink-muted hover:border-[#D4AF37] hover:text-[#D4AF37]'}`}
              title="Classic Dollar Coin"
            >
              $
            </button>
            <button
              onClick={() => handleCurrencyChange("indian")}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-2 transition-all shadow-md ${currency === 'indian' ? 'bg-[#94A3B8] text-white border-[#64748B] scale-110' : 'bg-surface border-border/30 text-ink-muted hover:border-[#94A3B8] hover:text-[#94A3B8]'}`}
              title="Indian Rupee Coin"
            >
              ₹
            </button>
          </div>

          <div 
            className="w-48 h-48 rounded-full relative transition-transform duration-[2000ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] preserve-3d"
            style={{ 
              transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
              transformStyle: "preserve-3d" 
            }}
          >
            {/* Heads (Front) */}
            <img 
              src={currency === "indian" ? "/images/coin/indian_heads.png" : "/images/coin/heads.png"} 
              alt="Heads" 
              className="absolute inset-0 w-full h-full object-cover rounded-full backface-hidden shadow-2xl pointer-events-none" 
            />

            {/* Tails (Back) */}
            <img 
              src={currency === "indian" ? "/images/coin/indian_tails.png" : "/images/coin/tails.png"} 
              alt="Tails" 
              className="absolute inset-0 w-full h-full object-cover rounded-full backface-hidden shadow-2xl pointer-events-none" 
              style={{ transform: "rotateY(180deg)" }}
            />
            
            {/* Coin Edge (Thickness Illusion) */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" style={{ transform: "translateZ(-1px)" }}></div>
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" style={{ transform: "translateZ(-2px)" }}></div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={flipCoin}
          disabled={isFlipping}
          className="w-full sm:w-auto min-w-[240px] flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-accent text-white font-extrabold text-lg uppercase tracking-widest hover:bg-accent/90 active:scale-[0.98] transition-all shadow-xl shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
        >
          {isFlipping ? t("flipping", "Flipping...") : result ? t("flip_again", "Flip Again") : t("flip_coin", "Flip Coin")}
        </button>
        
        {/* Result Text */}
        <div className="mt-8 h-8">
          <div className={`text-2xl font-black text-ink transition-opacity duration-300 ${!isFlipping && result ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {t("its", "It's")} <span className={result === 'heads' ? 'text-amber-500' : 'text-slate-500 uppercase'}>{t(result || "", result?.toUpperCase())}</span>!
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 pt-6 border-t border-border/50 flex justify-center gap-12">
          <div className="text-center">
            <div className="text-sm font-bold text-ink-muted uppercase tracking-wider mb-1">{t("heads", "Heads")}</div>
            <div className="text-2xl font-black text-ink">{stats.heads}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-ink-muted uppercase tracking-wider mb-1">{t("tails", "Tails")}</div>
            <div className="text-2xl font-black text-ink">{stats.tails}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
