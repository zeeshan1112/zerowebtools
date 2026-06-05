"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";
import { trackToolEvent } from "@/lib/telemetry";

interface Tile {
  id: string;
  value: number;
  row: number;
  col: number;
  merged?: boolean;
}

const TILE_CLASSES: Record<number, string> = {
  2: "bg-zinc-800/80 text-zinc-100 border border-zinc-700/50 shadow-sm",
  4: "bg-zinc-700/80 text-zinc-100 border border-zinc-600/50 shadow-sm",
  8: "bg-orange-600/25 text-orange-200 border border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.15)]",
  16: "bg-amber-600/25 text-amber-200 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
  32: "bg-yellow-500/25 text-yellow-100 border border-yellow-400/40 shadow-[0_0_20px_rgba(234,179,8,0.2)]",
  64: "bg-rose-500/25 text-rose-200 border border-rose-400/40 shadow-[0_0_20px_rgba(244,63,94,0.2)]",
  128: "bg-emerald-500/25 text-emerald-100 border border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.25)]",
  256: "bg-teal-500/25 text-teal-100 border border-teal-400/40 shadow-[0_0_25px_rgba(20,184,166,0.25)]",
  512: "bg-sky-500/35 text-sky-100 border border-sky-400/45 shadow-[0_0_30px_rgba(14,165,233,0.3)]",
  1024: "bg-indigo-500/35 text-indigo-100 border border-indigo-400/45 shadow-[0_0_35px_rgba(99,102,241,0.35)]",
  2048: "bg-purple-600/45 text-purple-100 border border-purple-500/50 shadow-[0_0_45px_rgba(168,85,247,0.55)] animate-pulse",
};

function getTileClass(value: number): string {
  return TILE_CLASSES[value] ?? "bg-fuchsia-600/50 text-fuchsia-100 border border-fuchsia-400/60 shadow-[0_0_50px_rgba(217,70,239,0.6)]";
}

function getTileFontSizeClass(value: number): string {
  if (value >= 10000) return "text-sm sm:text-base";
  if (value >= 1024) return "text-base sm:text-lg";
  if (value >= 128) return "text-lg sm:text-xl";
  return "text-xl sm:text-2xl";
}

const GameIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
  </svg>
);

let idCounter = 0;
function createUniqueId(): string {
  return `tile-${Date.now()}-${++idCounter}-${Math.random().toString(36).slice(2, 6)}`;
}

export default function TwoZeroFourEightWorkspace() {
  const t = useWorkspaceTranslation();

  const [tiles, setTiles] = useState<Tile[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize and Sync Score from LocalStorage Cache
  useEffect(() => {
    try {
      const savedBest = localStorage.getItem("zeelancebox_2048_best");
      if (savedBest) setBestScore(Number(savedBest));

      const savedState = localStorage.getItem("zeelancebox_2048_state");
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setTiles(parsed.tiles);
        setScore(parsed.score);
        setGameOver(parsed.gameOver);
        setGameWon(parsed.gameWon);
        setKeepPlaying(parsed.keepPlaying || false);
      } else {
        initGame();
      }
    } catch (_) {
      initGame();
    }
  }, []);

  // Save State to Cache
  const saveStateToCache = (currentTiles: Tile[], currentScore: number, isOver: boolean, isWon: boolean, isKeep: boolean) => {
    try {
      localStorage.setItem(
        "zeelancebox_2048_state",
        JSON.stringify({
          tiles: currentTiles,
          score: currentScore,
          gameOver: isOver,
          gameWon: isWon,
          keepPlaying: isKeep,
        })
      );
    } catch (_) {}
  };

  const updateBestScore = useCallback((newScore: number) => {
    setBestScore((currentBest) => {
      if (newScore > currentBest) {
        try {
          localStorage.setItem("zeelancebox_2048_best", String(newScore));
        } catch (_) {}
        return newScore;
      }
      return currentBest;
    });
  }, []);

  // Spawns a new random tile (2 or 4) on an empty grid position
  const spawnTile = useCallback((board: Tile[]) => {
    const occupied = new Set(board.map(t => `${t.row}-${t.col}`));
    const emptyCells: { row: number; col: number }[] = [];

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (!occupied.has(`${r}-${c}`)) {
          emptyCells.push({ row: r, col: c });
        }
      }
    }

    if (emptyCells.length === 0) return board;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const val = Math.random() < 0.9 ? 2 : 4;
    const newTile: Tile = {
      id: createUniqueId(),
      value: val,
      row: randomCell.row,
      col: randomCell.col,
    };

    return [...board, newTile];
  }, []);

  const initGame = () => {
    trackToolEvent("2048-game", "start");
    let board: Tile[] = [];
    board = spawnTile(board);
    board = spawnTile(board);
    setTiles(board);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
    setKeepPlaying(false);
    saveStateToCache(board, 0, false, false, false);
  };

  // Helper to check if any moves are possible
  const checkGameOver = (board: Tile[]): boolean => {
    if (board.length < 16) return false;

    // Check adjacent cells for matching values
    const grid: number[][] = Array(4).fill(null).map(() => Array(4).fill(0));
    board.forEach(t => {
      grid[t.row][t.col] = t.value;
    });

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const val = grid[r][c];
        if (r < 3 && grid[r + 1][c] === val) return false;
        if (c < 3 && grid[r][c + 1] === val) return false;
      }
    }

    return true;
  };

  const move = useCallback((direction: "up" | "down" | "left" | "right") => {
    if (gameOver) return;

    setTiles((prevTiles) => {
      let moved = false;
      let newScore = score;
      let nextTiles: Tile[] = [];

      // Create a 4x4 lookup grid
      const grid: (Tile | null)[][] = Array(4)
        .fill(null)
        .map(() => Array(4).fill(null));
      
      prevTiles.forEach((tile) => {
        grid[tile.row][tile.col] = { ...tile, merged: false };
      });

      const isVertical = direction === "up" || direction === "down";
      const isForward = direction === "down" || direction === "right";

      // Sliding & merging rows/columns
      for (let i = 0; i < 4; i++) {
        const line: Tile[] = [];
        for (let j = 0; j < 4; j++) {
          const r = isVertical ? (isForward ? 3 - j : j) : i;
          const c = isVertical ? i : (isForward ? 3 - j : j);
          const tNode = grid[r][c];
          if (tNode) line.push(tNode);
        }

        const newLine: Tile[] = [];
        for (let k = 0; k < line.length; k++) {
          const current = line[k];
          const next = line[k + 1];

          if (next && current.value === next.value) {
            const mergedValue = current.value * 2;
            newLine.push({
              ...current,
              value: mergedValue,
              merged: true,
            });
            newScore += mergedValue;
            k++; // Skip next element
            moved = true;
          } else {
            newLine.push({ ...current, merged: false });
          }
        }

        // Place elements back on grid coordinates
        for (let j = 0; j < 4; j++) {
          const r = isVertical ? (isForward ? 3 - j : j) : i;
          const c = isVertical ? i : (isForward ? 3 - j : j);
          const tile = newLine[j];

          if (tile) {
            if (tile.row !== r || tile.col !== c) moved = true;
            nextTiles.push({
              ...tile,
              row: r,
              col: c,
            });
          }
        }
      }

      if (moved) {
        const withSpawn = spawnTile(nextTiles);
        const over = checkGameOver(withSpawn);
        const won = !keepPlaying && withSpawn.some(t => t.value === 2048);

        if (won) {
          setGameWon(true);
          trackToolEvent("2048-game", "success");
        }
        if (over) {
          setGameOver(true);
        }

        setScore(newScore);
        updateBestScore(newScore);
        saveStateToCache(withSpawn, newScore, over, won || gameWon, keepPlaying);
        return withSpawn;
      }

      return prevTiles;
    });
  }, [gameOver, score, keepPlaying, gameWon, spawnTile, updateBestScore]);

  // Keyboard Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "KeyW"].includes(e.code)) {
        e.preventDefault();
        move("up");
      } else if (["ArrowDown", "KeyS"].includes(e.code)) {
        e.preventDefault();
        move("down");
      } else if (["ArrowLeft", "KeyA"].includes(e.code)) {
        e.preventDefault();
        move("left");
      } else if (["ArrowRight", "KeyD"].includes(e.code)) {
        e.preventDefault();
        move("right");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  // Mobile Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 35) {
      e.preventDefault();
      if (absDx > absDy) {
        move(dx > 0 ? "right" : "left");
      } else {
        move(dy > 0 ? "down" : "up");
      }
    }
    touchStartRef.current = null;
  };

  const handleKeepPlaying = () => {
    setKeepPlaying(true);
    setGameWon(false);
    saveStateToCache(tiles, score, gameOver, false, true);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Score Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="text-2xl font-extrabold text-ink tracking-tight flex items-center gap-2.5">
            <GameIcon className="w-6 h-6 text-accent" />
            2048 Game
          </h2>
          <p className="text-xs text-ink-muted mt-1">
            {t("instructions", "Use arrow keys, WASD, or swipe to slide.")}
          </p>
        </div>

        <div className="flex gap-2">
          <div className="bg-surface border border-border/60 rounded-xl px-3 py-1.5 min-w-[70px] text-center shadow-sm">
            <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">{t("score", "Score")}</div>
            <div className="text-base font-extrabold text-ink font-mono mt-0.5">{score}</div>
          </div>
          <div className="bg-surface border border-border/60 rounded-xl px-3 py-1.5 min-w-[70px] text-center shadow-sm">
            <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">{t("best", "Best")}</div>
            <div className="text-base font-extrabold text-accent font-mono mt-0.5">{bestScore}</div>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={(e) => {
          if (e.cancelable) e.preventDefault();
        }}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-square w-full rounded-2xl bg-zinc-900/60 dark:bg-black/40 border border-border/40 p-3 select-none touch-none shadow-xl overflow-hidden"
      >
        {/* Background Grid Cells */}
        <div className="grid grid-cols-4 grid-rows-4 gap-3 w-full h-full">
          {Array(16)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="w-full h-full rounded-xl bg-zinc-800/20 dark:bg-zinc-900/20 border border-zinc-700/10 dark:border-zinc-800/10"
              />
            ))}
        </div>

        {/* Foreground Animated Tiles */}
        <div className="absolute inset-3 pointer-events-none">
          <AnimatePresence>
            {tiles.map((tile) => {
              const xPercent = tile.col * 25;
              const yPercent = tile.row * 25;

              return (
                <motion.div
                  key={tile.id}
                  layout
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 28,
                  }}
                  className={`absolute rounded-xl flex flex-col items-center justify-center font-extrabold shadow-md ${getTileFontSizeClass(
                    tile.value
                  )} ${getTileClass(tile.value)}`}
                  style={{
                    width: "calc(25% - 9px)",
                    height: "calc(25% - 9px)",
                    left: `calc(${xPercent}% + ${tile.col * 3}px)`,
                    top: `calc(${yPercent}% + ${tile.row * 3}px)`,
                  }}
                >
                  <span className="font-sans leading-none">{tile.value}</span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Game Over Screen Overlay */}
        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20"
            >
              <motion.h3
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                className="text-2xl font-black text-rose-500 uppercase tracking-widest mb-4"
              >
                {t("game_over", "Game Over!")}
              </motion.h3>
              <button
                onClick={initGame}
                className="px-6 py-3 rounded-xl bg-accent text-white dark:text-black font-extrabold text-sm uppercase tracking-wider hover:bg-accent/90 active:scale-[0.97] transition-all shadow-lg shadow-accent/20 cursor-pointer"
              >
                {t("try_again", "Try Again")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Won Screen Overlay */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20"
            >
              <motion.h3
                initial={{ scale: 0.9, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                className="text-2xl font-black text-purple-400 uppercase tracking-widest mb-2"
              >
                {t("win_title", "You Win!")}
              </motion.h3>
              <p className="text-zinc-400 text-xs mb-6 max-w-[200px] mx-auto">
                You reached the 2048 tile! Keep going to get an even higher score.
              </p>
              <div className="flex flex-col gap-3 w-full max-w-[180px]">
                <button
                  onClick={handleKeepPlaying}
                  className="px-5 py-2.5 rounded-xl border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/30 text-zinc-100 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  {t("keep_going", "Keep Going")}
                </button>
                <button
                  onClick={initGame}
                  className="px-5 py-2.5 rounded-xl bg-accent text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-all cursor-pointer shadow-md"
                >
                  {t("try_again", "Restart")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Game Utilities Action Bar */}
      <div className="flex justify-center">
        <button
          onClick={initGame}
          className="px-5 py-2.5 rounded-xl border border-border hover:bg-surface text-ink-secondary hover:text-ink text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
        >
          {t("try_again", "Restart Game")}
        </button>
      </div>
    </div>
  );
}
