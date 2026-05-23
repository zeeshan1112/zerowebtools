"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_TOOLS, type Tool } from "@/lib/tools";

export default function CommandCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tool[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter tools
  useEffect(() => {
    if (!query.trim()) {
      setResults(ALL_TOOLS.filter((t) => t.status === "live").slice(0, 5));
      setSelectedIndex(0);
      return;
    }
    const q = query.toLowerCase().trim();
    const filtered = ALL_TOOLS.filter(
      (t) =>
        t.status === "live" &&
        (t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.metaDescription.toLowerCase().includes(q))
    );
    setResults(filtered);
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
    }
  }, [isOpen]);

  // Handle arrow key navigation in results list
  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      launchTool(results[selectedIndex]);
    }
  };

  const launchTool = (tool: Tool) => {
    setIsOpen(false);
    router.push(`/tools/${tool.id}`);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15dvh] px-4">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-zinc-950/40 dark:bg-black/60 backdrop-blur-[6px]"
          />

          {/* CommandCenter Card Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative w-full max-w-xl bg-surface-elevated border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[420px]"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/40 shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="text-accent shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleListKeyDown}
                placeholder="Type a tool name or action..."
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted/80 focus:outline-none font-medium"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="text-[10px] font-semibold text-ink-muted hover:text-ink bg-surface border border-border px-2 py-1 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                ESC
              </button>
            </div>

            {/* Autocomplete Results list */}
            <div className="flex-1 overflow-y-auto p-2 min-h-[120px]">
              {results.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="text-ink-muted opacity-40">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <p className="text-xs text-ink-muted mt-2 font-medium">No tools found matching your query.</p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  <div className="text-[9px] font-bold text-ink-muted uppercase tracking-wider px-3.5 py-1 select-none">
                    {query.trim() ? "Search results" : "Popular quick tools"}
                  </div>
                  {results.map((tool, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={tool.id}
                        onClick={() => launchTool(tool)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 select-none ${
                          isSelected ? "bg-accent-surface text-accent" : "text-ink-secondary hover:bg-surface/50"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className={`text-xs font-bold ${isSelected ? "text-accent" : "text-ink"}`}>
                            {tool.title}
                          </div>
                          <div className="text-[11px] text-ink-muted/90 truncate mt-0.5 pr-4">
                            {tool.description}
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1.5">
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-border/40 text-ink-muted">
                            Client-side
                          </span>
                          {isSelected && (
                            <kbd className="hidden sm:inline px-1 py-0.5 text-[9px] font-mono text-accent bg-accent/5 rounded-md border border-accent/20">
                              ↵
                            </kbd>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Instructions bar */}
            <div className="px-4 py-2 border-t border-border/40 bg-surface shrink-0 flex justify-between items-center text-[10px] text-ink-muted select-none">
              <div className="flex items-center gap-3">
                <span><kbd className="font-mono bg-surface-elevated border border-border px-1 rounded-sm">↑↓</kbd> Navigate</span>
                <span><kbd className="font-mono bg-surface-elevated border border-border px-1 rounded-sm">↵</kbd> Select</span>
              </div>
              <span>ZeelanceBox CommandCenter</span>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Global Quick Search Header Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-border hover:border-zinc-300 dark:hover:border-zinc-700 bg-surface-elevated hover:bg-surface text-ink-secondary hover:text-ink text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer w-48 text-left select-none outline-none"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="text-ink-muted shrink-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <span className="flex-1 text-ink-muted font-medium">Quick search...</span>
        <div className="flex items-center gap-0.5 shrink-0 opacity-70">
          <kbd className="px-1 py-0.5 text-[9px] font-sans text-ink-muted bg-surface rounded-md border border-border">⌘</kbd>
          <kbd className="px-1 py-0.5 text-[9px] font-sans text-ink-muted bg-surface rounded-md border border-border">K</kbd>
        </div>
      </button>

      {mounted ? createPortal(modalContent, document.body) : null}
    </>
  );
}
