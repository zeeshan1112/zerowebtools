"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, ALL_TOOLS } from "@/lib/tools";
import AdLayoutSlot from "@/components/AdLayoutSlot";

import { getToolIcon } from "@/lib/icons";

// Pristine technical workflow tags
const TOOL_WORKFLOW_TAGS: Record<string, string> = {
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
  "saas-mrr": "GROWTH",
  "startup-equity": "VESTING",
};

// Stagger variant variables
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

// Dynamic Code Node Inspector Sandbox Component
interface NodeConfig {
  id: string;
  label: string;
}

function CodeNodeInspector() {
  const [jsonText, setJsonText] = useState<string>(
    JSON.stringify(
      [
        { id: "A", label: "PDF Suite" },
        { id: "B", label: "Merge tool" },
        { id: "C", label: "AES Protect" },
      ],
      null,
      2
    )
  );
  const [nodes, setNodes] = useState<NodeConfig[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonText);
      if (Array.isArray(parsed) && parsed.every(n => typeof n === "object" && n.id && n.label)) {
        setNodes(parsed);
        setError(null);
      } else {
        setError("JSON must be an array of { id, label } objects");
      }
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  }, [jsonText]);

  return (
    <div className="bg-[#0f0f11] dark:bg-[#09090b] p-5 rounded-2xl border border-border/60 shadow-xl w-full select-none font-mono flex flex-col h-[320px]">
      <div className="flex items-center justify-between border-b border-border/30 pb-2.5 shrink-0">
        <span className="text-[10px] font-bold text-violet-500 dark:text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          Code Node Console
        </span>
        <span className="text-[9px] font-bold text-ink-muted bg-[#121214] dark:bg-[#18181b] px-2 py-0.5 rounded border border-border/30">Local-only</span>
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 min-h-0">
        {/* Left: Code Editor Textarea */}
        <div className="flex flex-col h-full min-h-0">
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full flex-grow p-2.5 rounded-xl border border-border bg-[#050507] dark:bg-[#040405] text-[11px] font-mono focus:outline-none focus:ring-2 focus:ring-violet-500/15 focus:border-violet-500 transition-all text-violet-400 dark:text-violet-300 resize-none overflow-y-auto"
            spellCheck={false}
          />
          {error && (
            <span className="text-[9px] text-red-500 mt-1 truncate block font-bold leading-tight uppercase">
              {error.split("\n")[0]}
            </span>
          )}
        </div>

        {/* Right: SVG Node Tree Graph */}
        <div className="border border-border/60 rounded-xl bg-[#050507] dark:bg-[#040405] flex items-center justify-center relative overflow-hidden h-full">
          <svg className="w-full h-full" viewBox="0 0 200 180">
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            
            {/* Draw connections */}
            {nodes.length > 1 && nodes.slice(1).map((node, idx) => {
              const startX = 100;
              const startY = 35;
              const endX = nodes.length === 2 ? 100 : idx === 0 ? 45 : 155;
              const endY = 125;
              
              return (
                <line
                  key={node.id}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="url(#line-gradient)"
                  strokeWidth="2"
                  strokeDasharray="2 3"
                  className="animate-pulse"
                />
              );
            })}

            {/* Render Nodes */}
            {nodes.map((node, idx) => {
              const isRoot = idx === 0;
              const x = isRoot ? 100 : nodes.length === 2 ? 100 : idx === 1 ? 45 : 155;
              const y = isRoot ? 35 : 125;
              
              return (
                <g key={node.id} className="transition-all duration-300">
                  <circle
                    cx={x}
                    cy={y}
                    r={isRoot ? 22 : 18}
                    fill="var(--surface-elevated)"
                    stroke="url(#line-gradient)"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={y + 3}
                    textAnchor="middle"
                    fill="var(--ink)"
                    fontSize={isRoot ? "8" : "7"}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {node.id}
                  </text>
                  <text
                    x={x}
                    y={y + (isRoot ? 32 : 28)}
                    textAnchor="middle"
                    fill="var(--ink-secondary)"
                    fontSize="7"
                    fontFamily="monospace"
                  >
                    {node.label.slice(0, 10)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"pdf" | "dev" | "financial" | "converters">("pdf");

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

  // Map workspace activeTab to specific category slugs
  const getTabCategorySlug = (): string[] => {
    switch (activeTab) {
      case "pdf":
        return ["pdf-tools"];
      case "dev":
        return ["converters"];
      case "financial":
        return ["financial-growth"];
      case "converters":
        return ["image-tools"];
      default:
        return ["pdf-tools"];
    }
  };

  const activeSlugs = getTabCategorySlug();
  const filteredCategories = CATEGORIES.filter((c) => activeSlugs.includes(c.slug));

  // Top 4 Spotlight Live Tools (Merge PDF, HEIC to JPG, JSON Formatter, Case Converter)
  const spotlightTools = ALL_TOOLS.filter((t) =>
    ["pdf-merge", "heic-to-jpg", "json-formatter", "case-converter"].includes(t.id) && t.status === "live"
  );

  const bookmarkedTools = ALL_TOOLS.filter((t) => bookmarks.includes(t.id));
  const totalLive = ALL_TOOLS.filter((t) => t.status === "live").length;

  return (
    <div className="min-h-screen relative pb-28">
       {/* Centered Premium Vercel-style Hero */}
      <section className="relative pt-24 pb-20 border-b border-border/40 select-none overflow-hidden bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.04)_0%,transparent_60%)]">
        
        {/* Soft violet radial light glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-violet-500/8 to-indigo-500/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/20 bg-violet-500/5 text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              Secure local nodes • {totalLive} engines compiled
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-ink text-balance">
              Secure Local Workspaces for <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">Modern Builders.</span>
            </h1>

            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-[62ch] mx-auto text-balance">
              Stark, browser-compiled developer utilities and document processors built for professionals who value absolute privacy. Zero network telemetry.
            </p>

            {/* Quick-Launcher Command Center Centerpiece */}
            <div className="pt-2 flex flex-col items-center justify-center">
              <button
                onClick={() => {
                  const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
                  window.dispatchEvent(event);
                }}
                className="w-full max-w-md px-4 py-3 bg-surface-elevated/70 backdrop-blur border border-border/80 hover:border-violet-500/40 rounded-xl flex items-center justify-between text-xs cursor-pointer shadow-md transition-all duration-300 active:scale-[0.99] group select-none text-left"
              >
                <div className="flex items-center gap-2.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="text-violet-500 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <span className="text-ink-muted font-bold group-hover:text-ink transition-colors duration-150">Search workspaces...</span>
                </div>
                <div className="flex items-center gap-1 opacity-70">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-bold text-ink-muted bg-surface rounded border border-border">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-bold text-ink-muted bg-surface rounded border border-border">K</kbd>
                </div>
              </button>
              
              {/* Micro workspace tags shortcut below search */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[9px] font-bold text-ink-muted tracking-wider uppercase select-none">
                <span>SUITES:</span>
                <a href="#workspace-directory" onClick={() => setActiveTab("pdf")} className="hover:text-violet-500 transition-colors">PDF Pro</a>
                <span>•</span>
                <a href="#workspace-directory" onClick={() => setActiveTab("dev")} className="hover:text-violet-500 transition-colors">Developers</a>
                <span>•</span>
                <a href="#workspace-directory" onClick={() => setActiveTab("financial")} className="hover:text-violet-500 transition-colors">Growth & Finance</a>
                <span>•</span>
                <a href="#workspace-directory" onClick={() => setActiveTab("converters")} className="hover:text-violet-500 transition-colors">Creative</a>
              </div>
            </div>

            {/* Centered Wide Visual Console Preview Box */}
            <div className="pt-8 w-full max-w-4xl mx-auto">
              <div className="border border-border/60 bg-[#09090b]/45 backdrop-blur-md rounded-2xl shadow-2xl p-2 relative overflow-hidden group hover:border-violet-500/25 transition-all duration-300">
                <CodeNodeInspector />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Grid Directory */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 mt-16 space-y-16">
        
        {/* SPOTLIGHT SECTION: Top 4 Highest-Traffic Live Tools */}
        <section className="space-y-6">
          <div className="border-b border-border/40 pb-4 select-none">
            <h2 className="text-xs font-extrabold tracking-wider uppercase text-ink">
              Spotlight Utilities
            </h2>
            <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
              Highly integrated, daily active local workspaces featuring vector rendering and WebAssembly compilation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {spotlightTools.map((tool) => {
              const isBookmarked = bookmarks.includes(tool.id);
              const tagLabel = TOOL_WORKFLOW_TAGS[tool.id] || "ACTIVE";
              
              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.id}`}
                  className="group relative block border p-6 transition-all duration-200 active:scale-[0.98] border-border bg-surface hover:border-ink hover:bg-surface-elevated/20 cursor-pointer shadow-sm"
                >
                  <button
                    onClick={(e) => toggleBookmark(tool.id, e)}
                    className={`absolute top-4 right-4 text-xs select-none transition-all duration-150 cursor-pointer ${
                      isBookmarked ? "text-amber-500 scale-105" : "text-ink-muted/20 hover:text-amber-500 hover:scale-105"
                    }`}
                    aria-label="Toggle Bookmark"
                  >
                    {isBookmarked ? "★" : "☆"}
                  </button>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5">
                      {/* Monochromatic SVG Title Icons */}
                      {getToolIcon(tool.id)}
                      <h3 className="text-xs font-bold tracking-tight leading-snug group-hover:text-ink transition-colors duration-150 text-ink">
                        {tool.title}
                      </h3>
                    </div>
                    <p className="text-[11px] leading-relaxed text-ink-secondary line-clamp-2">
                      {tool.description}
                    </p>
                    
                    <div className="pt-2 flex items-center justify-between text-[9px] select-none border-t border-border/20">
                      <span className="text-ink-muted font-mono font-bold tracking-wider">
                        {tagLabel}
                      </span>
                      <div className="flex items-center text-[9px] font-bold text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-150 uppercase tracking-wider">
                        LAUNCH
                        <svg className="ml-1 w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>



        {/* Saved Workspaces Dashboard */}
        {bookmarkedTools.length > 0 && (
          <section className="p-8 border border-border bg-surface-elevated/40 select-none animate-fade-up">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-amber-500">★</span>
              <h2 className="text-xs font-bold tracking-wider uppercase text-ink">
                Your Saved Workspaces
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

        {/* TABBED DIRECTORY WORKSPACE HUB (Replaces dry infinite scroll) */}
        <section id="workspace-directory" className="space-y-8 scroll-mt-24">
          
          {/* Tab Switcher rail */}
          <div className="flex items-baseline justify-between border-b border-border/40 pb-4 select-none">
            <div className="flex flex-wrap items-center gap-1">
              {[
                { id: "pdf", label: "PDF Suite" },
                { id: "dev", label: "Developers" },
                { id: "financial", label: "Growth & Finance" },
                { id: "converters", label: "Creative Tools" },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 text-[10px] font-bold tracking-wider uppercase border transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-ink border-ink text-surface shadow-sm"
                        : "bg-surface-elevated border-border hover:border-ink text-ink-secondary hover:text-ink"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            
            <div className="text-[9px] text-ink-muted font-bold uppercase tracking-wider hidden sm:block">
              WORKSPACE FILTER
            </div>
          </div>

          {/* Cross-fade Category Grid */}
          <div className="space-y-12">
            {filteredCategories.map((category) => {
              const liveCount = category.tools.filter((t) => t.status === "live").length;
              
              return (
                <div key={category.slug} className="space-y-6">
                  <div className="flex items-baseline justify-between border-b border-border/30 pb-2.5 select-none">
                    <h3 className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                      {category.title}
                    </h3>
                    <span className="text-[9px] text-ink-muted font-bold">
                      {liveCount} OF {category.tools.length} LIVE
                    </span>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10px" }}
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

                            <div className="pr-4 select-none space-y-3">
                              <div className="flex items-start gap-2.5">
                                {/* Title vector glyph */}
                                {getToolIcon(tool.id)}
                                <h4 className={`text-xs font-bold tracking-tight leading-snug group-hover:text-ink transition-colors duration-150 ${isLive ? "text-ink" : "text-ink-muted"}`}>
                                  {tool.title}
                                </h4>
                              </div>
                              <p className={`text-[11px] leading-relaxed ${isLive ? "text-ink-secondary" : "text-ink-muted"}`}>
                                {tool.description}
                              </p>
                            </div>

                            {isLive ? (
                              <div className="mt-4 flex items-center justify-between text-[10px] select-none border-t border-border/20 pt-2">
                                <span className="text-ink-muted font-mono font-bold tracking-wider text-[9px] uppercase">
                                  {tagLabel}
                                </span>
                                <div className="flex items-center text-[9px] font-bold text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-150 uppercase tracking-wider">
                                  LAUNCH
                                  <svg className="ml-1 w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
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
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}