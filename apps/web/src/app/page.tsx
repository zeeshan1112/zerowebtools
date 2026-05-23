"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, ALL_TOOLS } from "@/lib/tools";
import AdLayoutSlot from "@/components/AdLayoutSlot";

// Pristine uppercase technical workflow tags replacing all colorful AI slop tags
const TOOL_WORKFLOW_TAGS: Record<string, string> = {
  "mortgage-calculator": "AMORTIZE",
  "loan-calculator": "LOAN",
  "refinance-calculator": "REFI",
  "compound-interest-calculator": "YIELD",
  "auto-loan-calculator": "AUTO",
  "apr-calculator": "RATE",
  "investment-calculator": "ROI",
  "savings-calculator": "SAVINGS",
  "salary-calculator": "SALARY",
  "income-tax-calculator": "TAX",
  "roi-calculator": "RETURN",
  "inflation-calculator": "CPI",
  "bmi-calculator": "BMI",
  "calorie-calculator": "CALORIE",
  "macro-calculator": "MACROS",
  "body-fat-calculator": "FAT %",
  "ideal-weight-calculator": "WEIGHT",
  "tdee-calculator": "TDEE",
  "percentage-calculator": "PERCENT",
  "fraction-calculator": "MATH",
  "age-calculator": "AGE",
  "time-calculator": "TIME",
  "square-footage-calculator": "AREA",
  "pdf-merge": "MERGE",
  "pdf-split": "SPLIT",
  "pdf-compress": "COMPRESS",
  "pdf-rotate": "ROTATE",
  "pdf-to-jpg": "PDF→JPG",
  "jpg-to-pdf": "JPG→PDF",
  "pdf-protect": "SECURE",
  "pdf-watermark": "STAMP",
  "pdf-page-numbers": "NUMBER",
  "pdf-organize": "ORGANIZE",
  "pdf-unlock": "UNLOCK",
  "heic-to-jpg": "HEIC→JPG",
  "bulk-image-resizer": "RESIZE",
  "json-formatter": "FORMAT",
  "case-converter": "CASE",
  "base64-encoder": "CIPHER",
  "celsius-fahrenheit": "SCALE",
  "unit-converter": "UNIT",
  "color-converter": "COLOR",
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
} as const;

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 20 },
  },
} as const;

// Braun ET66 physical-calculator sandbox
function BraunCalculator() {
  const [display, setDisplay] = useState<string>("0");
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetOnNext, setResetOnNext] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (display === "0" || resetOnNext) {
      setDisplay(digit);
      setResetOnNext(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const inputDecimal = () => {
    if (resetOnNext) {
      setDisplay("0.");
      setResetOnNext(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPrevVal(null);
    setOperation(null);
    setResetOnNext(false);
  };

  const performOperation = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (prevVal === null) {
      setPrevVal(inputValue);
    } else if (operation) {
      const currentVal = prevVal || 0;
      let result = currentVal;

      switch (operation) {
        case "+":
          result = currentVal + inputValue;
          break;
        case "-":
          result = currentVal - inputValue;
          break;
        case "×":
          result = currentVal * inputValue;
          break;
        case "÷":
          result = currentVal / inputValue;
          break;
      }

      setPrevVal(result);
      setDisplay(String(parseFloat(result.toFixed(6))));
    }

    setResetOnNext(true);
    setOperation(nextOp === "=" ? null : nextOp);
  };

  return (
    <div className="bg-[#121214] dark:bg-[#18181b] p-6 rounded-3xl border border-[#27272a]/60 shadow-xl max-w-[240px] w-full mx-auto select-none font-mono">
      {/* Braun Display Panel */}
      <div className="bg-[#2a2d28] border border-[#1b1c19] rounded-lg p-3 text-right mb-5 h-12 flex items-center justify-end overflow-hidden shadow-inner">
        <span className="text-xl font-bold text-[#b4c8a8] tracking-wider truncate font-mono">
          {display}
        </span>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-2.5">
        {/* Row 1 */}
        <button onClick={clear} className="w-10 h-10 rounded-full bg-[#3c3c3e] hover:bg-[#4c4c4e] text-[#f4f4f5] text-xs font-bold transition-colors cursor-pointer flex items-center justify-center">
          C
        </button>
        <button onClick={() => setDisplay(String(-parseFloat(display)))} className="w-10 h-10 rounded-full bg-[#3c3c3e] hover:bg-[#4c4c4e] text-[#f4f4f5] text-xs font-bold transition-colors cursor-pointer flex items-center justify-center">
          +/-
        </button>
        <button onClick={() => setDisplay(String(parseFloat(display) / 100))} className="w-10 h-10 rounded-full bg-[#3c3c3e] hover:bg-[#4c4c4e] text-[#f4f4f5] text-xs font-bold transition-colors cursor-pointer flex items-center justify-center">
          %
        </button>
        <button onClick={() => performOperation("÷")} className="w-10 h-10 rounded-full bg-[#d97706] hover:bg-[#f59e0b] text-white text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          ÷
        </button>

        {/* Row 2 */}
        <button onClick={() => inputDigit("7")} className="w-10 h-10 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#f4f4f5] text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          7
        </button>
        <button onClick={() => inputDigit("8")} className="w-10 h-10 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#f4f4f5] text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          8
        </button>
        <button onClick={() => inputDigit("9")} className="w-10 h-10 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#f4f4f5] text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          9
        </button>
        <button onClick={() => performOperation("×")} className="w-10 h-10 rounded-full bg-[#d97706] hover:bg-[#f59e0b] text-white text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          ×
        </button>

        {/* Row 3 */}
        <button onClick={() => inputDigit("4")} className="w-10 h-10 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#f4f4f5] text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          4
        </button>
        <button onClick={() => inputDigit("5")} className="w-10 h-10 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#f4f4f5] text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          5
        </button>
        <button onClick={() => inputDigit("6")} className="w-10 h-10 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#f4f4f5] text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          6
        </button>
        <button onClick={() => performOperation("-")} className="w-10 h-10 rounded-full bg-[#d97706] hover:bg-[#f59e0b] text-white text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          -
        </button>

        {/* Row 4 */}
        <button onClick={() => inputDigit("1")} className="w-10 h-10 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#f4f4f5] text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          1
        </button>
        <button onClick={() => inputDigit("2")} className="w-10 h-10 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#f4f4f5] text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          2
        </button>
        <button onClick={() => inputDigit("3")} className="w-10 h-10 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#f4f4f5] text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          3
        </button>
        <button onClick={() => performOperation("+")} className="w-10 h-10 rounded-full bg-[#d97706] hover:bg-[#f59e0b] text-white text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          +
        </button>

        {/* Row 5 */}
        <button onClick={() => inputDigit("0")} className="col-span-2 h-10 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#f4f4f5] text-sm font-bold transition-colors cursor-pointer flex items-center justify-start pl-4">
          0
        </button>
        <button onClick={inputDecimal} className="w-10 h-10 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-[#f4f4f5] text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          .
        </button>
        <button onClick={() => performOperation("=")} className="w-10 h-10 rounded-full bg-[#059669] hover:bg-[#10b981] text-white text-sm font-bold transition-colors cursor-pointer flex items-center justify-center">
          =
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("mortgage-loan");

  // Load Starred Bookmarks
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem("zeelancebox_bookmarks");
        if (saved) setBookmarks(JSON.parse(saved));
      } catch (_) {}
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("zeelancebox_storage_update", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("zeelancebox_storage_update", handleStorageChange);
    };
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    let next;
    if (bookmarks.includes(id)) {
      next = bookmarks.filter((b) => b !== id);
    } else {
      next = [...bookmarks, id];
    }
    setBookmarks(next);
    
    try {
      localStorage.setItem("zeelancebox_bookmarks", JSON.stringify(next));
      window.dispatchEvent(new Event("zeelancebox_storage_update"));
    } catch (_) {}
  };

  // Scrollspy active categories
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -55% 0px" }
    );

    CATEGORIES.forEach((cat) => {
      const el = document.getElementById(cat.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const bookmarkedTools = ALL_TOOLS.filter((t) => bookmarks.includes(t.id));
  const totalLive = ALL_TOOLS.filter((t) => t.status === "live").length;

  return (
    <div className="min-h-screen relative pb-28">
      
      {/* Pristine Swiss Hero (Generous whitespace, absolute zero slop) */}
      <section className="relative pt-20 pb-20 border-b border-border/40 select-none">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Pristine Copy */}
            <div className="lg:col-span-8 space-y-8">
              <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider select-none">
                Local-First Browser Engine • {totalLive} Active Nodes
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-ink text-balance">
                Utilities, refined.
              </h1>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-[52ch]">
                Stark, browser-compiled developer utilities and calculators built for professionals who value speed and absolute data containment. No telemetry, no backend processing.
              </p>

              {/* Monochromatic Sharp Action CTAs */}
              <div className="flex flex-wrap gap-4 select-none pt-2">
                <a
                  href="#pdf-tools"
                  className="px-6 py-3 bg-ink hover:bg-zinc-800 dark:hover:bg-zinc-200 dark:bg-f4f4f5 text-surface text-xs font-bold tracking-wider uppercase border border-ink transition-all active:scale-[0.98] cursor-pointer"
                >
                  Merge / Compress PDF
                </a>
                <a
                  href="#converters"
                  className="px-6 py-3 bg-transparent hover:bg-surface-elevated text-ink-secondary hover:text-ink text-xs font-bold tracking-wider uppercase border border-border transition-all active:scale-[0.98] cursor-pointer"
                >
                  Formatters & Encoders
                </a>
              </div>
            </div>

            {/* Right Braun Tactile Interface */}
            <div className="lg:col-span-4 flex justify-center">
              <BraunCalculator />
            </div>

          </div>
        </div>
      </section>

      {/* Main Workspace grid */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 mt-16">
        
        {/* Sticky Horizontal navigation list */}
        <div className="sticky top-16 z-20 py-4 bg-surface/90 backdrop-blur-md border-b border-border/40 mb-12 select-none overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5 items-center">
          <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider mr-3">SOLVERS:</span>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className={`inline-block px-4 py-2 text-[10px] font-bold tracking-wider uppercase border transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-ink border-ink text-surface shadow-sm"
                    : "bg-surface-elevated border-border hover:border-ink text-ink-secondary hover:text-ink"
                }`}
              >
                {cat.title}
              </a>
            );
          })}
        </div>

        {/* Saved Workspaces Dashboard */}
        {bookmarkedTools.length > 0 && (
          <section className="p-8 border border-border bg-surface-elevated/40 mb-16 animate-fade-up">
            <div className="flex items-center gap-2 mb-8 select-none">
              <span className="text-amber-500">★</span>
              <h2 className="text-xs font-bold tracking-wider uppercase text-ink">
                YOUR SAVED WORKSPACES
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bookmarkedTools.map((tool) => {
                return (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="group relative block border border-border hover:border-ink bg-surface p-6 shadow-sm transition-all duration-200 active:scale-[0.98]"
                  >
                    <button
                      onClick={(e) => toggleBookmark(tool.id, e)}
                      className="absolute top-4 right-4 text-amber-500 hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                      aria-label="Remove Bookmark"
                    >
                      ★
                    </button>
                    <div>
                      <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-ink-muted border border-border/80 px-2 py-0.5 mb-3 bg-surface-elevated">
                        SAVED
                      </span>
                      <h3 className="text-xs font-bold tracking-tight text-ink group-hover:text-accent transition-colors">
                        {tool.title}
                      </h3>
                      <p className="mt-1.5 text-[11px] text-ink-muted leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Grouped directory lists */}
        <div className="space-y-16">
          {CATEGORIES.map((category, index) => {
            const liveCount = category.tools.filter((t) => t.status === "live").length;
            
            return (
              <React.Fragment key={category.slug}>
                {/* Category block */}
                <section id={category.slug} className="scroll-mt-36 space-y-8">
                  
                  {/* Category Title segment */}
                  <div className="flex items-baseline justify-between border-b border-border/40 pb-4">
                    <div className="space-y-1">
                      <h2 className="text-xs font-extrabold tracking-wider uppercase text-ink">
                        {category.title}
                      </h2>
                      <p className="text-xs text-ink-muted max-w-[65ch]">
                        {category.description}
                      </p>
                    </div>

                    <div className="text-[9px] text-ink-muted font-bold uppercase tracking-wider">
                      {liveCount} OF {category.tools.length} LIVE
                    </div>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-20px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                  >
                    {category.tools.map((tool) => {
                      const isLive = tool.status === "live";
                      const isBookmarked = bookmarks.includes(tool.id);
                      const tagLabel = TOOL_WORKFLOW_TAGS[tool.id] || "ACTIVE";
                      
                      return (
                        <motion.div variants={staggerItem} key={tool.id}>
                          <Link
                            href={isLive ? `/tools/${tool.id}` : "#"}
                            className={`group relative block border p-6 transition-all duration-200 active:scale-[0.98] h-full ${
                              isLive
                                ? "border-border bg-surface hover:border-ink hover:bg-surface-elevated/20 cursor-pointer shadow-sm"
                                : "border-border/20 bg-surface-elevated/40 pointer-events-none opacity-50"
                            }`}
                          >
                            {/* Star trigger */}
                            {isLive && (
                              <button
                                onClick={(e) => toggleBookmark(tool.id, e)}
                                className={`absolute top-4 right-4 text-xs select-none transition-all duration-150 cursor-pointer ${
                                  isBookmarked ? "text-amber-500 scale-105" : "text-ink-muted/20 hover:text-amber-500 hover:scale-105"
                                }`}
                                aria-label="Toggle Bookmark"
                              >
                                {isBookmarked ? "★" : "☆"}
                              </button>
                            )}

                            <div className="pr-4 select-none">
                              <h3 className={`text-xs font-bold tracking-tight leading-snug group-hover:text-ink transition-colors duration-150 ${isLive ? "text-ink" : "text-ink-muted"}`}>
                                {tool.title}
                              </h3>
                              <p className={`mt-1.5 text-[11px] leading-relaxed line-clamp-2 ${isLive ? "text-ink-secondary" : "text-ink-muted"}`}>
                                {tool.description}
                              </p>
                            </div>

                            {isLive ? (
                              <div className="mt-4 flex items-center justify-between text-[10px] select-none">
                                <span className="text-ink-muted font-mono font-bold tracking-wider text-[9px] uppercase">
                                  {tagLabel}
                                </span>
                                <div className="flex items-center text-[9px] font-bold text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-150 uppercase tracking-wider">
                                  LAUNCH
                                  <svg className="ml-1 w-2 h-2 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              <div className="mt-4 flex items-center gap-1 select-none">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                                <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider">COMING</span>
                              </div>
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </section>

                {/* Monochromatic integrated ad slot grids inside lists */}
                {index % 2 === 1 && index < CATEGORIES.length - 1 && (
                  <div className="py-6 border-y border-border/40 flex justify-center select-none">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider mb-2">SPONSORED PLATFORM EXTENSION</span>
                      <AdLayoutSlot type="leaderboard" className="my-0" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </div>
  );
}