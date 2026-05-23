"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, ALL_TOOLS } from "@/lib/tools";
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

// Specialized metadata labels to replace generic local execution tags
const TOOL_METADATA_TAGS: Record<string, string> = {
  "mortgage-calculator": "Amortization",
  "loan-calculator": "Vesting",
  "refinance-calculator": "Analytics",
  "compound-interest-calculator": "Yield Projections",
  "auto-loan-calculator": "Interest",
  "apr-calculator": "Effective Rate",
  "investment-calculator": "ROI Growth",
  "savings-calculator": "Compounding",
  "salary-calculator": "Earnings Converter",
  "income-tax-calculator": "Federal Bracket",
  "roi-calculator": "Asset Return",
  "inflation-calculator": "CPI Model",
  "bmi-calculator": "WHO Scale",
  "calorie-calculator": "TDEE Goal",
  "macro-calculator": "Nutrient Split",
  "body-fat-calculator": "Navy Method",
  "ideal-weight-calculator": "Hamwi Formula",
  "tdee-calculator": "Energy Output",
  "percentage-calculator": "Delta Solver",
  "fraction-calculator": "Steps Solver",
  "age-calculator": "Countdown",
  "time-calculator": "Durations",
  "square-footage-calculator": "Area Model",
  "pdf-merge": "Multi-Join",
  "pdf-split": "Page Extract",
  "pdf-compress": "Optimized",
  "pdf-rotate": "Angle Shift",
  "pdf-to-jpg": "High-Res Render",
  "jpg-to-pdf": "Canvas Embed",
  "pdf-protect": "AES Encryption",
  "pdf-watermark": "Vector Stamp",
  "pdf-page-numbers": "Auto-Stamp",
  "pdf-organize": "Drag Reorder",
  "pdf-unlock": "Cipher Strip",
  "heic-to-jpg": "Batch WebAssembly",
  "bulk-image-resizer": "ZIP Compiling",
  "json-formatter": "Format tree",
  "case-converter": "Naming Shift",
  "base64-encoder": "Data Cipher",
  "celsius-fahrenheit": "Convert scale",
  "unit-converter": "Multi-Metric",
  "color-converter": "HEX Swatches",
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

// 3D Parallax Image Wrapper mock-up of the saas dashboard
function ImageMockup() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Smooth 3D tilt coordinates up to 7 degrees
    const rY = (mouseX / (width / 2)) * 7;
    const rX = -(mouseY / (height / 2)) * 7;
    
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
      className="relative rounded-2xl overflow-hidden border border-border/80 shadow-2xl transition-shadow duration-300 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] w-full max-w-lg aspect-square select-none cursor-pointer bg-[#0c121e]"
    >
      <img
        src="/images/saas_workbench_hero.png"
        alt="SaaS Workspace Mockup Preview"
        className="w-full h-full object-cover scale-[1.01] pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#090d16]/30 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}

// Inline Interactive Percentage Solver Widget
function LiveQuickSolver() {
  const [pct, setPct] = useState<string>("12.5");
  const [num, setNum] = useState<string>("800");
  const [result, setResult] = useState<number>(100);

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
    <div className="glass p-5 rounded-2xl border border-border/60 shadow-lg max-w-sm w-full mx-auto glow-border relative overflow-hidden h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-accent uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Live Utility Widget
          </div>
          <span className="text-[9px] font-bold text-ink-muted bg-surface px-2 py-0.5 rounded-full border border-border/40">Instant</span>
        </div>
        
        <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-3">Quick Delta Solver</h3>
        
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[10px] font-medium text-ink-muted uppercase tracking-wider mb-1">What is (%)</label>
            <input
              type="number"
              value={pct}
              onChange={(e) => setPct(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface-elevated px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent transition-all text-ink text-center"
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium text-ink-muted uppercase tracking-wider mb-1">Of number</label>
            <input
              type="number"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface-elevated px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-accent/15 focus:border-accent transition-all text-ink text-center"
            />
          </div>
        </div>
      </div>

      <div className="pt-3.5 mt-4 border-t border-border/40 flex items-center justify-between">
        <span className="text-xs font-bold text-ink-secondary">Output Result:</span>
        <motion.div
          key={result}
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-lg font-extrabold text-accent font-mono"
        >
          {result}
        </motion.div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("mortgage-loan");

  // Sync Bookmarks
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

  // Scrollspy observer
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
      
      {/* Decorative Canvas Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl animate-pulse-glow" />
        <div className="absolute top-[35%] -left-40 w-[550px] h-[550px] rounded-full bg-emerald-400/3 blur-3xl" />
      </div>

      {/* Re-imagined Hero Section */}
      <section className="relative pt-12 pb-16 border-b border-border/30 bg-gradient-to-b from-surface-elevated/30 to-transparent">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Strategic Copy Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent bg-accent-surface px-3 py-1.5 rounded-full border border-accent/15">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                {totalLive} active workspace engines ready
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] font-bold text-ink">
                Professional utilities.
                <br />
                <span className="bg-gradient-to-r from-accent via-emerald-500 to-emerald-400 bg-clip-text text-transparent">
                  Local. Private. Fast.
                </span>
              </h1>

              <p className="text-base text-ink-secondary leading-relaxed max-w-[48ch]">
                Premium developer tools, file compressors, and options calculators built locally for absolute privacy. No cookies, no server uploads, fully secure.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#pdf-tools"
                  className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-xl shadow-md shadow-accent/10 active:scale-[0.98] transition-all cursor-pointer"
                >
                  Explore PDF Suite
                </a>
                <a
                  href="#converters"
                  className="px-5 py-2.5 bg-surface-elevated border border-border hover:border-zinc-300 text-ink-secondary hover:text-ink text-xs font-bold rounded-xl shadow-sm active:scale-[0.98] transition-all cursor-pointer"
                >
                  Launch Converters
                </a>
              </div>
            </div>

            {/* Right Desktop Dashboard mockup Column */}
            <div className="lg:col-span-6 flex justify-center">
              <ImageMockup />
            </div>

          </div>
        </div>
      </section>

      {/* Main Tools Showcase */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Interactive Developer Sandbox Showcase section */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch border-b border-border/30 pb-16">
          <div className="md:col-span-4 flex flex-col justify-center space-y-4">
            <h2 className="text-lg font-extrabold tracking-tight text-ink">
              Try a Live Sandbox Utility
            </h2>
            <p className="text-xs text-ink-secondary leading-relaxed max-w-[34ch]">
              Execute math conversions and formula evaluations directly inside our interactive live delta widget, debounced local-first.
            </p>
            <div className="flex items-center gap-2.5 text-[10px] text-ink-muted font-bold bg-surface-elevated px-3 py-1.5 rounded-xl border border-border/40 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Debounced Local Inputs</span>
            </div>
          </div>
          <div className="md:col-span-8 flex justify-center">
            <LiveQuickSolver />
          </div>
        </section>

        {/* Sticky Horizontal navigation list */}
        <div className="sticky top-16 z-20 py-4 bg-surface/80 backdrop-blur-md border-b border-border/30 mb-8 select-none overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5 items-center">
          <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider mr-2">Workspaces:</span>
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

        {/* Starred Bookmarks dashboard */}
        {bookmarkedTools.length > 0 && (
          <section className="p-6 bg-gradient-to-tr from-accent/5 to-emerald-500/5 rounded-2xl border border-accent/15 mb-12 animate-fade-up">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg text-amber-500 animate-pulse">★</span>
              <h2 className="text-lg font-bold tracking-tight text-ink">
                Your Personal Saved Workspaces
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

        {/* Scrollspy grids list */}
        <div className="space-y-12">
          {CATEGORIES.map((category, index) => {
            const liveCount = category.tools.filter((t) => t.status === "live").length;
            
            return (
              <React.Fragment key={category.slug}>
                {/* Category block */}
                <section id={category.slug} className="scroll-mt-36 space-y-6">
                  
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
                                <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                                  </span>
                                  {/* Custom performance tag label replacing generic 'local execution' string */}
                                  <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[9px]">
                                    {TOOL_METADATA_TAGS[tool.id] || "Active"}
                                  </span>
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

                {/* Sponsored native-plugin extensions */}
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