"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";

const Volume2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
);

const VolumeX = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" x2="17" y1="9" y2="15"/><line x1="17" x2="23" y1="9" y2="15"/></svg>
);

const Dices = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/></svg>
);

const RotateCcw = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
);

const faceRotations = {
  1: { x: 0, y: 0 },
  2: { x: 90, y: 0 },
  3: { x: 0, y: -90 },
  4: { x: 0, y: 90 },
  5: { x: -90, y: 0 },
  6: { x: 180, y: 0 },
};

const faceTransforms = {
  1: "translateZ(48px)",
  2: "rotateX(-90deg) translateZ(48px)",
  3: "rotateY(90deg) translateZ(48px)",
  4: "rotateY(-90deg) translateZ(48px)",
  5: "rotateX(90deg) translateZ(48px)",
  6: "rotateY(180deg) translateZ(48px)",
};

function Dice3D({ value, sides, rolling, index }: { value: number; sides: number; rolling: boolean; index: number }) {
  const [spins, setSpins] = useState({ x: 0, y: 0 });
  const [faces, setFaces] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [targetFace, setTargetFace] = useState<number>(1);

  // When dice first mounts, set its face so it's not always 1
  useEffect(() => {
    if (resultsInitial) {
      if (sides === 6) {
        setTargetFace(value);
      } else {
        setTargetFace(1);
        setFaces((prev) => prev.map((_, i) => (i === 0 ? value : prev[i])));
      }
    }
  }, []);

  const [resultsInitial, setResultsInitial] = useState(true);

  useEffect(() => {
    if (rolling) {
      setResultsInitial(false);
      // Generate multiple rapid full rotations + some randomized offset
      setSpins((prev) => ({
        x: prev.x + 720 + Math.floor(Math.random() * 4) * 360,
        y: prev.y + 720 + Math.floor(Math.random() * 4) * 360,
      }));

      let newTargetFace = 1;
      if (sides === 6) {
        setFaces([1, 2, 3, 4, 5, 6]);
        newTargetFace = value;
      } else {
        newTargetFace = Math.floor(Math.random() * 6) + 1;
        const newFaces = Array.from({ length: 6 }, (_, i) => {
          if (i + 1 === newTargetFace) return value;
          return Math.floor(Math.random() * sides) + 1;
        });
        setFaces(newFaces);
      }
      setTargetFace(newTargetFace);
    }
  }, [rolling, value, sides]);

  const targetRot = faceRotations[targetFace as keyof typeof faceRotations] || { x: 0, y: 0 };
  const currentX = targetRot.x + spins.x;
  const currentY = targetRot.y + spins.y;

  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0" style={{ perspective: "1000px" }}>
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ 
          rotateX: currentX, 
          rotateY: currentY,
          scale: rolling ? [1, 1.2, 0.9, 1] : 1 
        }}
        transition={{ 
          duration: 1.2, 
          ease: "easeOut", 
          delay: index * 0.05 
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((faceNum) => (
          <div
            key={faceNum}
            className="absolute inset-0 bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl flex items-center justify-center shadow-inner"
            style={{
              transform: faceTransforms[faceNum as keyof typeof faceTransforms],
              backfaceVisibility: "hidden", // Helps performance and hides inside overlapping bugs
            }}
          >
            {sides === 6 ? (
              <DiceFace6 value={faceNum} />
            ) : (
              <span className="text-4xl font-black text-ink">{faces[faceNum - 1]}</span>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Helper to render traditional Pips for 6-sided dice
function DiceFace6({ value }: { value: number }) {
  const pips = Array.from({ length: 9 });
  
  // Grid positions for pips:
  // 0 1 2
  // 3 4 5
  // 6 7 8
  const activePips: Record<number, number[]> = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 2, 3, 5, 6, 8]
  };

  const currentPips = activePips[value] || [];

  return (
    <div className="grid grid-cols-3 grid-rows-3 w-3/4 h-3/4 gap-1 p-1">
      {pips.map((_, i) => (
        <div key={i} className="flex items-center justify-center">
          {currentPips.includes(i) && (
            <div className="w-full h-full max-w-[14px] max-h-[14px] bg-ink rounded-full shadow-inner" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function DiceRollerWorkspace() {
  const t = useWorkspaceTranslation();
  
  const [diceCount, setDiceCount] = useState<number>(2);
  const [sides, setSides] = useState<number>(6);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  const [rolling, setRolling] = useState<boolean>(false);
  const [results, setResults] = useState<number[]>([]);

  // Initialize display
  useEffect(() => {
    if (results.length === 0) {
      setResults(Array(diceCount).fill(1));
    }
  }, [diceCount, results.length]);

  const speakResult = (total: number) => {
    if (!soundEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`You rolled a total of ${total}`);
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const handleRoll = () => {
    if (rolling) return;
    
    // Prime speech synthesis for mobile browsers
    if (soundEnabled && typeof window !== "undefined" && window.speechSynthesis) {
      const primeUtterance = new SpeechSynthesisUtterance("");
      primeUtterance.volume = 0;
      window.speechSynthesis.speak(primeUtterance);
    }
    
    // Set rolling state and calculate new results immediately so the Dice3D component
    // can calculate the target rotations before starting the animation.
    setRolling(true);
    const newResults = Array.from({ length: diceCount }, () => Math.floor(Math.random() * sides) + 1);
    setResults(newResults);
    
    const total = newResults.reduce((sum, val) => sum + val, 0);

    // After animation duration, unlock rolling and speak
    setTimeout(() => {
      setRolling(false);
      speakResult(total);
    }, 1500 + diceCount * 50);
  };

  const handleDiceCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= 12) {
      setDiceCount(val);
      setResults(Array(val).fill(1));
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:block gap-6 md:space-y-6">
      {/* Header */}
      <div className="order-3 md:order-none bg-white dark:bg-zinc-900 border border-border/50 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink mb-1 flex items-center gap-2">
            <Dices className="w-5 h-5 text-accent" />
            3D Dice Roller
          </h2>
          <p className="text-sm text-ink-muted">Configure your dice and roll with physics and sound.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-xl border border-border/50">
            <label className="text-xs font-semibold text-ink-secondary ml-1">Sides:</label>
            <select 
              value={sides} 
              onChange={(e) => setSides(Number(e.target.value))}
              className="bg-transparent border-none text-sm font-bold text-ink focus:ring-0 cursor-pointer outline-none"
            >
              {[4, 6, 8, 10, 12, 20, 100].map(s => (
                <option key={s} value={s}>D{s}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 p-2 px-3 rounded-xl border border-border/50">
            <label className="text-xs font-semibold text-ink-secondary">Count:</label>
            <input 
              type="range" 
              min="1" 
              max="12" 
              value={diceCount} 
              onChange={handleDiceCountChange}
              className="w-24 accent-accent"
            />
            <span className="text-sm font-bold text-ink min-w-[1.5rem] text-center">{diceCount}</span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-colors ${soundEnabled ? 'bg-accent/10 border-accent/20 text-accent' : 'bg-zinc-50 dark:bg-zinc-800/50 border-border/50 text-ink-muted'}`}
            title={soundEnabled ? "Mute Sound" : "Enable Sound"}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Play Area */}
      <div className="order-1 md:order-none relative bg-zinc-50 dark:bg-zinc-900/40 border border-border/50 rounded-2xl p-8 md:p-12 min-h-[300px] md:min-h-[400px] flex flex-col items-center justify-center overflow-hidden">
        
        <div className="flex flex-row flex-wrap justify-center items-center gap-4 md:gap-10 max-w-4xl z-10 w-full px-2">
          <AnimatePresence>
            {results.map((val, idx) => (
              <Dice3D 
                key={`dice-${idx}`} 
                value={val} 
                sides={sides} 
                rolling={rolling} 
                index={idx} 
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Sum Badge */}
        {!rolling && results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center z-10"
          >
            <div className="inline-flex flex-col items-center justify-center bg-white dark:bg-zinc-800 px-8 py-4 rounded-3xl shadow-xl border border-border/50">
              <span className="text-sm font-bold text-ink-muted uppercase tracking-widest mb-1">Total Sum</span>
              <span className="text-5xl font-black text-accent bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-hover">
                {results.reduce((a, b) => a + b, 0)}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Bar */}
      <div className="order-2 md:order-none flex justify-center w-full px-4 md:px-0">
        <button
          onClick={handleRoll}
          disabled={rolling}
          className="w-full md:w-auto relative group bg-accent hover:bg-accent-hover text-white font-bold text-xl py-5 px-16 rounded-2xl shadow-[0_8px_30px_rgba(var(--accent-rgb),0.3)] transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none overflow-hidden"
        >
          <span className="flex items-center gap-3">
            <RotateCcw className={`w-6 h-6 ${rolling ? 'animate-spin' : ''}`} />
            {rolling ? "Rolling..." : "Roll Dice"}
          </span>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </button>
      </div>
    </div>
  );
}
