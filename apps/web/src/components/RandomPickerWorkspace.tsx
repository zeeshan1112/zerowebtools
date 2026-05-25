"use client";

import React, { useState } from "react";
import { shuffleList, pickWinners } from "@hub/tools-core";
import ProcessingOverlay from "./ProcessingOverlay";

const SHUFFLE_STEPS = [
  "Scrambling indices...",
  "Applying cryptographic seed entropy...",
  "Re-ordering list records...",
];

export default function RandomPickerWorkspace() {
  const [listInput, setListInput] = useState("Alice\nBob\nCharlie\nDavid\nEmma\nFrank\nGrace\nHenry\nIsabella\nJack");
  const [winnerCount, setWinnerCount] = useState(1);
  const [excludeWinners, setExcludeWinners] = useState(false);
  
  const [showProcessing, setShowProcessing] = useState(false);
  const [processingMode, setProcessingMode] = useState<"shuffle" | "pick">("shuffle");
  const [winners, setWinners] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Computed active items
  const activeItems = React.useMemo(() => {
    return listInput
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }, [listInput]);

  const handleShuffle = () => {
    if (activeItems.length === 0) return;
    setProcessingMode("shuffle");
    setShowProcessing(true);
  };

  const handlePickWinners = () => {
    if (activeItems.length === 0) return;
    setProcessingMode("pick");
    setShowProcessing(true);
  };

  const handleFinishedProcessing = () => {
    if (processingMode === "shuffle") {
      const shuffled = shuffleList(activeItems);
      setListInput(shuffled.join("\n"));
      setShowProcessing(false);
    } else {
      const picked = pickWinners(activeItems, winnerCount);
      setWinners(picked);
      
      // If exclude winners is checked, remove them from the input list
      if (excludeWinners) {
        const remaining = activeItems.filter((item) => !picked.includes(item));
        setListInput(remaining.join("\n"));
      }
      
      setShowProcessing(false);
    }
  };

  const handleLoadExample = () => {
    setListInput("Alice\nBob\nCharlie\nDavid\nEmma\nFrank\nGrace\nHenry\nIsabella\nJack");
    setWinners([]);
  };

  const handleCopyWinners = () => {
    if (winners.length === 0) return;
    navigator.clipboard.writeText(winners.join(", ")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4 select-none">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Picker Settings</h3>

            {/* Winner Count */}
            <div className="space-y-1.5">
              <label htmlFor="winner-count-input" className="text-[10px] font-bold text-ink-muted uppercase block">
                Number of Winners to Pick
              </label>
              <input
                id="winner-count-input"
                type="number"
                min="1"
                max={Math.max(1, activeItems.length)}
                value={winnerCount}
                onChange={(e) => setWinnerCount(Math.max(1, Number(e.target.value)))}
                className="w-full bg-zinc-50 dark:bg-zinc-950/20 border border-border/70 rounded-xl px-3 py-2 text-xs font-semibold text-ink focus:outline-none"
              />
            </div>

            {/* Exclude Winners */}
            <label className="flex items-center gap-2.5 text-xs font-semibold text-ink-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={excludeWinners}
                onChange={(e) => setExcludeWinners(e.target.checked)}
                className="w-4 h-4 rounded border-border text-accent focus:ring-0 cursor-pointer accent-accent"
              />
              <span>Remove winners from list after drawing</span>
            </label>

            {/* Actions */}
            <div className="flex gap-2.5 pt-2 border-t border-border/40">
              <button
                onClick={handleShuffle}
                disabled={activeItems.length === 0}
                className="flex-1 py-2.5 border border-border hover:border-accent text-ink hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold rounded-xl hover:bg-accent/5 transition-colors cursor-pointer text-center"
              >
                Shuffle List
              </button>
              <button
                onClick={handlePickWinners}
                disabled={activeItems.length === 0}
                className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm shadow-accent/10 text-center"
              >
                Draw Winners
              </button>
            </div>

            <button
              onClick={handleLoadExample}
              className="w-full py-2 border border-border hover:border-accent text-ink hover:text-accent text-xs font-semibold rounded-xl hover:bg-accent/5 transition-colors cursor-pointer text-center"
            >
              Load Example List
            </button>
          </div>
        </div>

        {/* Inputs & Winners Output Area */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* Input list textarea */}
            <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col h-[280px]">
              <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary flex justify-between items-center select-none">
                <span>Items List (one per line)</span>
                <span className="text-[10px] text-ink-muted">{activeItems.length} lines</span>
              </div>
              <textarea
                value={listInput}
                onChange={(e) => setListInput(e.target.value)}
                placeholder="Enter names, emails, or raffle options, one per line..."
                className="w-full flex-1 p-4 bg-zinc-950/20 border-none outline-none font-mono text-xs text-ink resize-none focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Winners display card */}
            {winners.length > 0 && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex justify-between items-center select-none">
                  <h3 className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-bounce" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                    Drawn Winner{winners.length > 1 ? "s" : ""}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyWinners}
                      className="text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200 text-[10px] font-bold cursor-pointer"
                    >
                      {copied ? "Copied!" : "Copy Output"}
                    </button>
                    <button
                      onClick={() => setWinners([])}
                      className="text-ink-muted hover:text-ink text-[10px] font-bold cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 select-text">
                  {winners.map((winner, idx) => (
                    <div
                      key={idx}
                      className="bg-emerald-500/10 border border-emerald-500/25 px-4 py-2.5 rounded-2xl font-bold text-sm text-emerald-800 dark:text-emerald-200 shadow-sm flex items-center gap-1.5"
                    >
                      <span className="text-[10px] font-mono opacity-50">#{idx + 1}</span>
                      {winner}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProcessingOverlay
        isOpen={showProcessing}
        steps={SHUFFLE_STEPS}
        loadingText={processingMode === "shuffle" ? "Shuffling list entries..." : "Drawing random selections..."}
        duration={1200}
        onFinished={handleFinishedProcessing}
      />
    </div>
  );
}
