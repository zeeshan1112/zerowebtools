"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, ALL_TOOLS, type ToolCategory, type Tool } from "@/lib/tools";
import AdLayoutSlot from "@/components/AdLayoutSlot";

const CATEGORY_TAG_STYLES: Record<string, string> = {
  "mortgage-loan": "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300",
  "investment-tax": "bg-blue-50 text-blue-800 dark:bg-blue-500/10 dark:text-blue-300",
  "health-fitness": "bg-rose-50 text-rose-800 dark:bg-rose-500/10 dark:text-rose-300",
  "math-percentage": "bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300",
  "pdf-tools": "bg-red-50 text-red-800 dark:bg-red-500/10 dark:text-red-300",
  "image-tools": "bg-sky-50 text-sky-800 dark:bg-sky-500/10 dark:text-sky-300",
  converters: "bg-violet-50 text-violet-800 dark:bg-violet-500/10 dark:text-violet-300",
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "mortgage-loan": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  "investment-tax": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "health-fitness": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  "math-percentage": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 3.75l3 3M4.5 8.25l3-3m9-1.5l3 3m0-3l-3 3M3.75 19.5h16.5m-16.5 0v-4.5m16.5 4.5v-4.5m-16.5 0h16.5" />
    </svg>
  ),
  converters: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
    </svg>
  ),
  "pdf-tools": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  "image-tools": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
};

const HERO_STATS = [
  { value: "30+", label: "Instant Tools" },
  { value: "100%", label: "Private & Local" },
  { value: "0 ms", label: "Server Latency" },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
} as const;

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
} as const;

// Interactive mini-calculator in the hero section
function MiniCalculator() {
  const [pct, setPct] = useState<string>("15");
  const [num, setNum] = useState<string>("200");
  const [result, setResult] = useState<number>(30);

  useEffect(() => {
    const p = parseFloat(pct);
    const n = parseFloat(num);
    if (!isNaN(p) && !isNaN(n)) {
      setResult(parseFloat(((p / 100) * n).toFixed(2)));
    } else {
      setResult(0);
    }
  }, [pct, num]);

  return (
    <div className="glass p-5 rounded-2xl border border-border/50 shadow-xl max-w-sm w-full mx-auto relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] glow-border">
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl pointer-events-none" />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">Live Mini-Widget</span>
        </div>
        <span className="text-[10px] text-ink-muted bg-surface-elevated px-2 py-0.5 rounded-full border border-border/30">100% Client-side</span>
      </div>

      <h3 className="text-sm font-semibold text-ink tracking-tight mb-3">Quick Percentage Solver</h3>

      <div className="space-y-3">
        <div>
          <label className="block text-[11px] font-medium text-ink-secondary mb-1">What is (%)</label>
          <input
            type="number"
            value={pct}
            onChange={(e) => setPct(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface-elevated px-3.5 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-ink"
            placeholder="e.g. 15"
          />
        </div>
        <div>
          <label className="block text-[11px] font-medium text-ink-secondary mb-1">Of number</label>
          <input
            type="number"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface-elevated px-3.5 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-ink"
            placeholder="e.g. 200"
          />
        </div>

        <div className="pt-3 border-t border-border/40 mt-1 flex items-center justify-between">
          <span className="text-xs font-semibold text-ink-secondary">Result:</span>
          <motion.div
            key={result}
            initial={{ scale: 0.95, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-lg font-bold text-accent font-mono"
          >
            {result}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Tool[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zeelancebox_bookmarks");
      if (saved) setBookmarks(JSON.parse(saved));
    } catch (_) {}

    // Hotkey for focus: '/' or 'Cmd+K'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter tools based on search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const filtered = ALL_TOOLS.filter(
      (tool) =>
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.metaDescription.toLowerCase().includes(q)
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  // Handle Bookmarks Toggle
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
    } catch (_) {}
  };

  // Scrollspy observer to highlight active category
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
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
    <div className="min-h-screen relative pb-16">
      {/* Visual Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl animate-pulse-glow" />
        <div className="absolute top-[30%] -left-32 w-[500px] h-[500px] rounded-full bg-emerald-400/3 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 sm:py-20 lg:py-24 border-b border-border/30 bg-gradient-to-b from-surface-elevated/40 to-transparent">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent bg-accent-surface px-3 py-1.5 rounded-full border border-accent/15">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                {totalLive} premium tools live
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] font-bold text-ink">
                Calculate anything.
                <br />
                <span className="bg-gradient-to-r from-accent to-emerald-400 bg-clip-text text-transparent">
                  100% Client-Side.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-[50ch]">
                Fast, secure, and private calculators and unit converters for calculations, developers, and finances. Zero data ever leaves your device.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 max-w-md pt-4">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="p-3 bg-surface-elevated rounded-xl border border-border/50 shadow-sm text-center">
                    <div className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-ink-muted font-medium mt-0.5 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <MiniCalculator />
            </div>

          </div>
        </div>
      </section>

      {/* Main Hub: Search, Filter Rail & Lists */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Sticky Search Command Bar */}
        <div className="sticky top-16 z-30 py-4 bg-surface/80 backdrop-blur-md border-b border-border/30 mb-8">
          <div className="max-w-2xl mx-auto relative">
            <div className="relative shadow-md rounded-2xl group border border-border hover:border-zinc-300 dark:hover:border-zinc-700 bg-surface-elevated transition-all duration-300 overflow-hidden">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted group-focus-within:text-accent transition-colors"
                fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search tools instantly... (Press '/' or 'Cmd+K' to focus)"
                className="w-full pl-12 pr-16 py-3.5 bg-transparent text-sm text-ink focus:outline-none placeholder:text-ink-muted/80 font-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted bg-surface rounded-md border border-border">⌘</kbd>
                <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted bg-surface rounded-md border border-border">K</kbd>
              </div>
            </div>

            {/* Instant Floating Search Autocomplete Drawer */}
            <AnimatePresence>
              {isSearchFocused && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 right-0 mt-2 bg-surface-elevated border border-border rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto p-2"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted px-3 py-1.5 border-b border-border/40 mb-1.5">
                    Found {searchResults.length} matching tools
                  </div>
                  {searchResults.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.status === "live" ? `/tools/${tool.id}` : "#"}
                      className={`flex items-center justify-between p-2.5 rounded-xl hover:bg-surface transition-all duration-200 group ${
                        tool.status === "live" ? "" : "pointer-events-none opacity-50"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-ink group-hover:text-accent transition-colors">
                          {tool.title}
                        </div>
                        <div className="text-[11px] text-ink-muted mt-0.5 line-clamp-1">
                          {tool.description}
                        </div>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-border/40 text-ink-secondary">
                        {tool.status === "live" ? "Open" : "Soon"}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dashboard Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* LEFT COLUMN: Sticky Categories Rail (Scrollspy) */}
          <aside className="lg:col-span-1 sticky top-36 z-20 hidden lg:block bg-surface-elevated/40 p-4 rounded-2xl border border-border/30">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-4 px-2">Navigation</h3>
            <ul className="space-y-1">
              {bookmarkedTools.length > 0 && (
                <li>
                  <a
                    href="#saved-dashboard"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all hover:bg-surface text-ink-secondary"
                  >
                    <span className="text-amber-500">★</span>
                    <span>Saved Dashboard</span>
                  </a>
                </li>
              )}
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                  <li key={cat.slug}>
                    <a
                      href={`#${cat.slug}`}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-accent-surface text-accent font-semibold border-l-2 border-accent"
                          : "text-ink-secondary hover:bg-surface hover:text-ink"
                      }`}
                    >
                      <span className={`${isActive ? "text-accent" : "text-ink-muted"}`}>
                        {CATEGORY_ICONS[cat.slug] || (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        )}
                      </span>
                      <span className="truncate">{cat.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* RIGHT COLUMN: Saved Tools & Categories lists */}
          <main className="lg:col-span-3 space-y-12">
            
            {/* BOOKMARKS DASHBOARD */}
            {bookmarkedTools.length > 0 && (
              <section id="saved-dashboard" className="scroll-mt-36 p-6 bg-gradient-to-tr from-accent/5 to-emerald-500/5 rounded-2xl border border-accent/15">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-lg text-amber-500 animate-pulse">★</span>
                  <h2 className="text-xl font-semibold tracking-tight text-ink">
                    Your Saved Dashboard
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bookmarkedTools.map((tool) => {
                    const catSlug = CATEGORIES.find((c) => c.tools.some((t) => t.id === tool.id))?.slug || "";
                    const tagStyle = CATEGORY_TAG_STYLES[catSlug] ?? "bg-zinc-100 text-zinc-600";
                    return (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.id}`}
                        className="group relative block rounded-2xl border border-accent/20 bg-surface-elevated p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-accent active:scale-[0.98]"
                      >
                        <button
                          onClick={(e) => toggleBookmark(tool.id, e)}
                          className="absolute top-4 right-4 text-amber-500 hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                          aria-label="Remove Bookmark"
                        >
                          ★
                        </button>
                        <div>
                          <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 ${tagStyle}`}>
                            Saved
                          </span>
                          <h3 className="text-sm font-semibold tracking-tight text-ink group-hover:text-accent transition-colors">
                            {tool.title}
                          </h3>
                          <p className="mt-1 text-xs text-ink-secondary leading-relaxed line-clamp-2">
                            {tool.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* CATEGORIES SECTIONS */}
            {CATEGORIES.map((category, index) => {
              const liveCount = category.tools.filter((t) => t.status === "live").length;
              
              return (
                <React.Fragment key={category.slug}>
                  {/* Category Section */}
                  <section id={category.slug} className="scroll-mt-36 space-y-6">
                    <div className="flex items-start justify-between border-b border-border/30 pb-4">
                      <div className="flex items-start gap-3">
                        <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${CATEGORY_TAG_STYLES[category.slug] ?? "bg-zinc-100 text-zinc-600"}`}>
                          {CATEGORY_ICONS[category.slug]}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold tracking-tight text-ink">
                            {category.title}
                          </h2>
                          <p className="mt-0.5 text-xs text-ink-muted leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right text-[10px] text-ink-muted font-medium bg-surface-elevated px-2.5 py-1 rounded-lg border border-border/40 shadow-sm hidden sm:block">
                        {liveCount} of {category.tools.length} live
                      </div>
                    </div>

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-20px" }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {category.tools.map((tool) => {
                        const isLive = tool.status === "live";
                        const isBookmarked = bookmarks.includes(tool.id);
                        
                        return (
                          <motion.div variants={staggerItem} key={tool.id}>
                            <Link
                              href={isLive ? `/tools/${tool.id}` : "#"}
                              className={`group relative block rounded-2xl border p-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] h-full ${
                                isLive
                                  ? "border-border bg-surface-elevated hover:border-accent hover:shadow-xl shadow-sm cursor-pointer"
                                  : "border-border/30 bg-surface pointer-events-none opacity-60"
                              }`}
                            >
                              {/* Star Bookmark button */}
                              {isLive && (
                                <button
                                  onClick={(e) => toggleBookmark(tool.id, e)}
                                  className={`absolute top-4 right-4 text-xs select-none transition-all duration-200 cursor-pointer ${
                                    isBookmarked ? "text-amber-500 scale-105" : "text-ink-muted/30 hover:text-amber-500 hover:scale-105"
                                  }`}
                                  aria-label="Toggle Bookmark"
                                >
                                  {isBookmarked ? "★" : "☆"}
                                </button>
                              )}

                              <div className="pr-4">
                                <h3 className={`text-sm font-semibold tracking-tight leading-snug group-hover:text-accent transition-colors duration-200 ${isLive ? "text-ink" : "text-ink-muted"}`}>
                                  {tool.title}
                                </h3>
                                <p className={`mt-1.5 text-xs leading-relaxed line-clamp-2 ${isLive ? "text-ink-secondary" : "text-ink-muted"}`}>
                                  {tool.description}
                                </p>
                              </div>

                              {isLive ? (
                                <div className="mt-4 flex items-center justify-between text-[10px]">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-wide uppercase">Client-Side</span>
                                  </div>
                                  <div className="flex items-center text-[10px] font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    Launch
                                    <svg className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                  </div>
                                </div>
                              ) : (
                                <div className="mt-4 flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
                                  <span className="text-[10px] font-medium text-ink-muted uppercase tracking-wider">In Progress</span>
                                </div>
                              )}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </section>

                  {/* High-CTR AdSense leaderboard layout between categories */}
                  {index % 2 === 1 && index < CATEGORIES.length - 1 && (
                    <div className="py-4 flex justify-center">
                      <AdLayoutSlot type="leaderboard" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}

          </main>
        </div>
      </div>
    </div>
  );
}