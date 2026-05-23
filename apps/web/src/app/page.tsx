"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, ALL_TOOLS, type Tool } from "@/lib/tools";
import AdLayoutSlot from "@/components/AdLayoutSlot";

const CATEGORY_TAG_STYLES: Record<string, string> = {
  "mortgage-loan": "bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300 border border-emerald-500/10",
  "investment-tax": "bg-blue-50 text-blue-800 dark:bg-blue-500/10 dark:text-blue-300 border border-blue-500/10",
  "health-fitness": "bg-rose-50 text-rose-800 dark:bg-rose-500/10 dark:text-rose-300 border border-rose-500/10",
  "math-percentage": "bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300 border border-amber-500/10",
  "pdf-tools": "bg-red-50 text-red-800 dark:bg-red-500/10 dark:text-red-300 border border-red-500/10",
  "image-tools": "bg-sky-50 text-sky-800 dark:bg-sky-500/10 dark:text-sky-300 border border-sky-500/10",
  converters: "bg-violet-50 text-violet-800 dark:bg-violet-500/10 dark:text-violet-300 border border-violet-500/10",
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

// Helper to convert simple Markdown text to HTML safely client-side
function parseMarkdown(text: string): string {
  if (!text) return "<p className='text-ink-muted text-xs'>Type markdown on the left to preview...</p>";
  
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Italic
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  // Headers (H1, H2, H3)
  html = html.replace(/^#\s+(.*)/gm, "<h1 class='text-lg font-bold text-ink mt-2 mb-1'>$1</h1>");
  html = html.replace(/^##\s+(.*)/gm, "<h2 class='text-base font-bold text-ink mt-2 mb-1'>$1</h2>");
  html = html.replace(/^###\s+(.*)/gm, "<h3 class='text-sm font-bold text-ink mt-1.5 mb-1'>$1</h3>");
  // Bullet lists
  html = html.replace(/^\-\s+(.*)/gm, "<li class='list-disc list-inside text-xs pl-2 text-ink-secondary'>$1</li>");
  // Inline Code
  html = html.replace(/`(.*?)`/g, "<code class='bg-surface border border-border px-1 py-0.5 rounded text-[11px] font-mono'>$1</code>");
  // Newlines to paragraphs
  html = html.split("\n\n").map(p => p.trim() ? `<p class='text-xs text-ink-secondary leading-relaxed mb-2'>${p}</p>` : "").join("");

  return html;
}

// Interactive Multi-Tab Sandbox Card with 3D Mouse Parallax
function DesktopWorkbench() {
  const [activeTab, setActiveTab] = useState<"markdown" | "case">("markdown");
  const [markdownInput, setMarkdownInput] = useState("# Premium local utility\n\n- Runs **100% locally** in the browser\n- Zero latency\n- Drag-and-drop workspace layout\n\nTry writing some *markdown*!");
  const [caseInput, setCaseInput] = useState("hello world sample");
  
  // 3D coordinate states
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Compute mouse coordinate displacement relative to the card's midpoint
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Scale rotation bounds to a premium max of 8 degrees
    const rY = (mouseX / (width / 2)) * 8;
    const rX = -(mouseY / (height / 2)) * 8;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="glass p-5 rounded-2xl border border-border/80 shadow-xl max-w-lg w-full mx-auto relative overflow-hidden transition-shadow duration-300 hover:shadow-2xl flex flex-col h-[280px]"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl pointer-events-none" />
      
      {/* Workbench Header Tabs */}
      <div className="flex items-center justify-between border-b border-border/40 pb-3 shrink-0 select-none">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("markdown")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "markdown" ? "bg-accent text-white" : "text-ink-secondary hover:bg-surface"
            }`}
          >
            Markdown Live
          </button>
          <button
            onClick={() => setActiveTab("case")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "case" ? "bg-accent text-white" : "text-ink-secondary hover:bg-surface"
            }`}
          >
            Quick Converter
          </button>
        </div>
        <span className="text-[10px] text-accent font-semibold bg-accent-surface border border-accent/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
          Sandbox Node
        </span>
      </div>

      {/* Tabs Content */}
      <div className="flex-1 min-h-0 mt-3.5">
        <AnimatePresence mode="wait">
          {activeTab === "markdown" ? (
            <motion.div
              key="markdown"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="grid grid-cols-2 gap-3 h-full"
            >
              <textarea
                value={markdownInput}
                onChange={(e) => setMarkdownInput(e.target.value)}
                className="w-full h-full p-2.5 rounded-xl border border-border bg-surface-elevated text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent transition-all text-ink resize-none"
                placeholder="Type markdown..."
              />
              <div
                className="w-full h-full p-2.5 rounded-xl border border-border bg-surface-elevated/40 text-xs overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(markdownInput) }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="case"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="space-y-3 h-full flex flex-col justify-between pb-1"
            >
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-ink-muted uppercase tracking-wider">Input Word</label>
                <input
                  type="text"
                  value={caseInput}
                  onChange={(e) => setCaseInput(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface-elevated px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent transition-all text-ink"
                  placeholder="e.g. hello world"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="p-2 rounded-xl bg-surface-elevated/60 border border-border text-center">
                  <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">camelCase</span>
                  <span className="text-xs font-mono text-accent truncate block mt-0.5">
                    {caseInput.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase()).replace(/\s+/g, "")}
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-surface-elevated/60 border border-border text-center">
                  <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider block">kebab-case</span>
                  <span className="text-xs font-mono text-accent truncate block mt-0.5">
                    {caseInput.toLowerCase().replace(/\s+/g, "-")}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
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
      // Dispatch storage update event to instantly sync our persistent Sidebar
      window.dispatchEvent(new Event("zeelancebox_storage_update"));
    } catch (_) {}
  };

  // Scrollspy observer for active categories
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
    <div className="min-h-screen relative pb-20 select-none">
      
      {/* Background Grids & Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl animate-pulse-glow" />
        <div className="absolute top-[40%] -left-40 w-[500px] h-[500px] rounded-full bg-emerald-400/3 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 border-b border-border/30 bg-gradient-to-b from-surface-elevated/40 to-transparent">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 text-xs font-semibold text-accent bg-accent-surface px-3 py-1.5 rounded-full border border-accent/15">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                {totalLive} active browser nodes live
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] font-bold text-ink">
                Professional utilities.
                <br />
                <span className="bg-gradient-to-r from-accent via-emerald-500 to-emerald-400 bg-clip-text text-transparent">
                  Private & Local-First.
                </span>
              </h1>

              <p className="text-base text-ink-secondary leading-relaxed max-w-[50ch]">
                Premium workspace tools, PDF editors, and converters running entirely inside your browser. No cookies, no server uploads, absolute security.
              </p>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-3 pt-2">
                {["Local-only encryption", "Zip bulk compiling", "0ms network delay"].map((label) => (
                  <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-elevated border border-border/60 rounded-xl shadow-sm text-xs text-ink-secondary font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <DesktopWorkbench />
            </div>

          </div>
        </div>
      </section>

      {/* Workspace Dashboard Layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Sticky Top Scrolling Navigation bar */}
        <div className="sticky top-16 z-20 py-4 bg-surface/80 backdrop-blur-md border-b border-border/30 mb-8 select-none overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5 items-center">
          <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider mr-2">Solvers:</span>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className={`inline-block px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-accent border-accent text-white shadow-sm"
                    : "bg-surface-elevated border-border hover:border-zinc-300 text-ink-secondary hover:text-ink"
                }`}
              >
                {cat.title}
              </a>
            );
          })}
        </div>

        {/* Saved Workspaces Dashboard */}
        {bookmarkedTools.length > 0 && (
          <section className="p-6 bg-gradient-to-tr from-accent/5 to-emerald-500/5 rounded-2xl border border-accent/15 mb-12 animate-fade-up">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg text-amber-500 animate-pulse">★</span>
              <h2 className="text-lg font-bold tracking-tight text-ink">
                Your Personal Saved Workspace Dashboard
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      <h3 className="text-xs font-bold tracking-tight text-ink group-hover:text-accent transition-colors">
                        {tool.title}
                      </h3>
                      <p className="mt-1 text-[11px] text-ink-secondary leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Scrollspy Categories Grid list */}
        <div className="space-y-12">
          {CATEGORIES.map((category, index) => {
            const liveCount = category.tools.filter((t) => t.status === "live").length;
            
            return (
              <React.Fragment key={category.slug}>
                {/* Category Workspace grid block */}
                <section id={category.slug} className="scroll-mt-36 space-y-6">
                  
                  {/* Category Title section */}
                  <div className="flex items-center justify-between border-b border-border/30 pb-4">
                    <div className="space-y-1">
                      <h2 className="text-lg font-extrabold tracking-tight text-ink flex items-center gap-2">
                        <span className="text-accent">{category.title}</span>
                      </h2>
                      <p className="text-xs text-ink-muted leading-relaxed max-w-[65ch]">
                        {category.description}
                      </p>
                    </div>

                    <div className="text-[10px] text-ink-muted font-bold bg-surface-elevated px-2.5 py-1 rounded-lg border border-border/40 shadow-sm">
                      {liveCount} of {category.tools.length} active
                    </div>
                  </div>

                  {/* Tool List Stagger */}
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
                      
                      return (
                        <motion.div variants={staggerItem} key={tool.id}>
                          <Link
                            href={isLive ? `/tools/${tool.id}` : "#"}
                            className={`group relative block rounded-2xl border p-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] h-full glow-border ${
                              isLive
                                ? "border-border bg-surface-elevated hover:border-accent hover:shadow-xl shadow-sm cursor-pointer"
                                : "border-border/30 bg-surface pointer-events-none opacity-60"
                            }`}
                          >
                            {/* Star toggle */}
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
                              <h3 className={`text-xs font-bold tracking-tight leading-snug group-hover:text-accent transition-colors duration-200 ${isLive ? "text-ink" : "text-ink-muted"}`}>
                                {tool.title}
                              </h3>
                              <p className={`mt-1.5 text-[11px] leading-relaxed line-clamp-2 ${isLive ? "text-ink-secondary" : "text-ink-muted"}`}>
                                {tool.description}
                              </p>
                            </div>

                            {isLive ? (
                              <div className="mt-4 flex items-center justify-between text-[10px]">
                                <div className="flex items-center gap-1">
                                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider text-[9px]">Local execution</span>
                                </div>
                                <div className="flex items-center text-[9px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200 uppercase tracking-wider">
                                  Launch
                                  <svg className="ml-1 w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              <div className="mt-4 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
                                <span className="text-[9px] font-medium text-ink-muted uppercase tracking-wider">Coming soon</span>
                              </div>
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </section>

                {/* Sponsored grid extensions styled natively inside the listing loop */}
                {index % 2 === 1 && index < CATEGORIES.length - 1 && (
                  <div className="py-6 border-y border-border/20 flex justify-center">
                    <div className="flex flex-col items-center select-none">
                      <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider mb-2">Sponsored Extension</span>
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