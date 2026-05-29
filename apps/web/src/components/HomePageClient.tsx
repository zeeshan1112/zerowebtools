"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, ALL_TOOLS } from "@/lib/tools";
import AdLayoutSlot from "@/components/AdLayoutSlot";
import { GridPattern, genRandomPattern } from "@/components/ui/grid-feature-cards";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { getToolIcon } from "@/lib/icons";
import { getTranslations, getLocalizedTool } from "@/lib/i18n";

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



const SLUG_TO_TAB: Record<string, "all" | "pdf" | "image" | "developer" | "generators" | "text" | "calculators"> = {
  "all-tools": "all",
  "pdf-tools": "pdf",
  "text-tools": "text",
  "developer-tools": "developer",
  "generators": "generators",
  "image-tools": "image",
  "financial-growth": "calculators",
};

const TAB_TO_SLUG: Record<string, string> = {
  all: "all-tools",
  pdf: "pdf-tools",
  text: "text-tools",
  developer: "developer-tools",
  generators: "generators",
  image: "image-tools",
  calculators: "financial-growth",
};

export default function HomePageClient({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "pdf" | "image" | "developer" | "generators" | "text" | "calculators">("all");

  const getLocalizedHref = (path: string) => {
    if (!lang || lang === "en") return path;
    return `/${lang}${path === "/" ? "" : path}`;
  };

  const getCategoryTitle = (slug: string, fallback: string) => {
    switch (slug) {
      case "pdf-tools": return t.pdfTools;
      case "text-tools": return t.textTools;
      case "developer-tools": return t.developerTools;
      case "generators": return t.generators;
      case "image-tools": return t.imageTools;
      case "financial-growth": return t.calculators;
      default: return fallback;
    }
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const tabId = SLUG_TO_TAB[hash];
      if (tabId) {
        setActiveTab(tabId);
        document.getElementById("tools-directory")?.scrollIntoView({ behavior: "smooth" });
      }
    };

    const handleTabNav = (e: Event) => {
      const slug = (e as CustomEvent).detail;
      const tabId = SLUG_TO_TAB[slug];
      if (tabId) {
        setActiveTab(tabId);
        document.getElementById("tools-directory")?.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (window.location.hash) {
      handleHash();
    }

    window.addEventListener("hashchange", handleHash);
    window.addEventListener("zeelancebox_navigate_tab", handleTabNav);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("zeelancebox_navigate_tab", handleTabNav);
    };
  }, []);

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
  const getTabCategorySlug = () => {
    switch (activeTab) {
      case "all":
        return ["pdf-tools", "image-tools", "developer-tools", "generators", "text-tools", "financial-growth"];
      case "pdf":
        return ["pdf-tools"];
      case "text":
        return ["text-tools"];
      case "developer":
        return ["developer-tools"];
      case "generators":
        return ["generators"];
      case "image":
        return ["image-tools"];
      case "calculators":
        return ["financial-growth"];
      default:
        return ["pdf-tools", "image-tools", "developer-tools", "generators", "text-tools", "financial-growth"];
    }
  };

  const activeSlugs = getTabCategorySlug();
  const filteredCategories = CATEGORIES.filter((c) => activeSlugs.includes(c.slug));

  // Top 4 Spotlight Live Tools (Merge PDF, HEIC to JPG, JSON Formatter, Case Converter)
  const spotlightTools = ALL_TOOLS.filter((t) =>
    ["pdf-merge", "heic-to-jpg", "json-formatter", "case-converter"].includes(t.id) && t.status === "live"
  ).map(t => getLocalizedTool(t, lang));

  const bookmarkedTools = ALL_TOOLS.filter((t) => bookmarks.includes(t.id)).map(t => getLocalizedTool(t, lang));
  const totalLive = ALL_TOOLS.filter((t) => t.status === "live").length;
  const liveTools = ALL_TOOLS.filter((t) => t.status === "live");
  const baseUrl = "https://zerowebtools.com";

  // WebSite Schema definition
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": `${baseUrl}/`,
    "name": "ZeroWebTools",
    "description": "Free, fast, and completely secure client-side web utilities to edit PDFs, convert formats, check SaaS growth, and resize images. 100% private.",
    "publisher": {
      "@type": "Organization",
      "name": "ZeroWebTools",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon-192x192.png`
      }
    }
  };

  // ItemList Schema (Catalog of tools)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${baseUrl}/#itemlist`,
    "name": "ZeroWebTools Directory",
    "description": "A collection of 100% private browser-based tools.",
    "numberOfItems": liveTools.length,
    "itemListElement": liveTools.map((tool, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `${baseUrl}/tools/${tool.id}`,
      "name": tool.title
    }))
  };

  // SiteNavigationElement Schema
  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${baseUrl}/#navigation`,
    "name": liveTools.map(t => t.title),
    "url": liveTools.map(t => `${baseUrl}/tools/${t.id}`)
  };

  return (
    <div className="min-h-screen relative pb-28">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
      />

       {/* Immersive Full-Screen Premium Hero with Covered Background Image Glow */}
      <section className="relative min-h-[60vh] md:min-h-[calc(100vh-4rem)] flex flex-col justify-center pt-12 md:pt-16 pb-14 md:pb-20 border-b border-border/40 select-none overflow-hidden bg-surface transition-all duration-300">
        
        {/* Clean, High-End Pure-CSS Monochromatic Dot Grid */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.08] pointer-events-none" 
          style={{ 
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)", 
            backgroundSize: "24px 24px" 
          }} 
        />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 w-full">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-accent/25 bg-accent/5 text-[10px] font-bold text-accent uppercase tracking-wider select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {t.privateBadge.replace("{count}", String(totalLive))}
            </div>

            {/* Screen reader only H1 for SEO compliance */}
            <h1 className="sr-only">{t.homeTitle}</h1>
            <div className="flex justify-center select-none">
              <TypewriterEffectSmooth
                words={t.homeTitle.split(" ").map((w, i, arr) => ({ text: w, className: i === arr.length - 1 ? "text-accent" : "" }))}
                className="my-0 pt-2"
                cursorClassName="h-6 sm:h-10 lg:h-14 bg-accent"
              />
            </div>

            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-[62ch] mx-auto text-balance font-medium">
              {t.homeDesc}
            </p>

            {/* Quick-Launcher Command Center Centerpiece */}
            <div className="pt-2 flex flex-col items-center justify-center gap-6">
              <button
                onClick={() => {
                  const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
                  window.dispatchEvent(event);
                }}
                className="w-full max-w-md px-4 py-3.5 bg-surface-elevated/85 backdrop-blur border border-border/80 hover:border-accent/40 rounded-xl flex items-center justify-between text-xs cursor-pointer shadow-md transition-all duration-300 active:scale-[0.99] group select-none text-left"
              >
                <div className="flex items-center gap-2.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="text-accent shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <span className="text-ink-muted font-bold group-hover:text-ink transition-colors duration-150">{t.searchPlaceholder}</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 opacity-70">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-bold text-ink-muted bg-surface rounded border border-border">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-bold text-ink-muted bg-surface rounded border border-border">K</kbd>
                </div>
              </button>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => {
                    document.getElementById("tools-directory")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3.5 rounded-xl border border-border/80 bg-surface-elevated/40 backdrop-blur-md hover:bg-surface-elevated/80 text-ink hover:text-accent font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl hover:border-accent/30 transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-2 group"
                >
                  {t.exploreAllTools}
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    className="text-ink-muted group-hover:text-accent group-hover:translate-y-0.5 transition-all duration-300"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>

              {/* Micro tool tags shortcut below search */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-2 text-[10px] sm:text-[9px] font-bold text-ink-muted tracking-wider uppercase select-none">
                <span>SUITES:</span>
                <a href="#tools-directory" onClick={() => setActiveTab("pdf")} className="hover:text-accent transition-colors py-1 px-0.5 min-h-[44px] flex items-center">PDF Tools</a>
                <span>•</span>
                <a href="#tools-directory" onClick={() => setActiveTab("image")} className="hover:text-accent transition-colors py-1 px-0.5 min-h-[44px] flex items-center">Image Tools</a>
                <span>•</span>
                <a href="#tools-directory" onClick={() => setActiveTab("developer")} className="hover:text-accent transition-colors py-1 px-0.5 min-h-[44px] flex items-center">Developer Tools</a>
                <span>•</span>
                <a href="#tools-directory" onClick={() => setActiveTab("generators")} className="hover:text-accent transition-colors py-1 px-0.5 min-h-[44px] flex items-center">Generators</a>
                <span>•</span>
                <a href="#tools-directory" onClick={() => setActiveTab("text")} className="hover:text-accent transition-colors py-1 px-0.5 min-h-[44px] flex items-center">Text Tools</a>
                <span>•</span>
                <a href="#tools-directory" onClick={() => setActiveTab("calculators")} className="hover:text-accent transition-colors py-1 px-0.5 min-h-[44px] flex items-center">Calculators</a>
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
              {t.spotlightUtilities}
            </h2>
            <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
              Highly integrated, daily active local tools featuring vector rendering and WebAssembly compilation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {spotlightTools.map((tool) => {
              const isBookmarked = bookmarks.includes(tool.id);
              const tagLabel = TOOL_WORKFLOW_TAGS[tool.id] || "ACTIVE";
              
              return (
                <Link
                  key={tool.id}
                  href={getLocalizedHref(`/tools/${tool.id}`)}
                  className="group relative block p-6 rounded-2xl border border-dashed border-border/70 dark:border-border/40 transition-all duration-200 active:scale-[0.99] bg-surface hover:bg-surface-elevated/40 cursor-pointer overflow-hidden shadow-sm"
                >
                  {/* Hydration-safe grid background */}
                  <GridOverlay isLive={true} />

                  <button
                    onClick={(e) => toggleBookmark(tool.id, e)}
                    className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg select-none transition-all duration-150 cursor-pointer z-20 ${
                      isBookmarked ? "text-amber-500 scale-105" : "text-ink-muted/20 hover:text-amber-500 hover:scale-105"
                    }`}
                    aria-label="Toggle Bookmark"
                  >
                    {isBookmarked ? "★" : "☆"}
                  </button>

                  <div className="space-y-4 relative z-10">
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



        {/* Saved Tools Dashboard */}
        {bookmarkedTools.length > 0 && (
          <section className="p-8 border border-border bg-surface-elevated/40 select-none animate-fade-up">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-amber-500">★</span>
              <h2 className="text-xs font-bold tracking-wider uppercase text-ink">
                {t.savedTools}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bookmarkedTools.map((tool) => {
                const tagLabel = TOOL_WORKFLOW_TAGS[tool.id] || "SAVED";
                return (
                  <Link
                    key={tool.id}
                    href={getLocalizedHref(`/tools/${tool.id}`)}
                    className="group relative block p-6 rounded-2xl border border-dashed border-border/70 dark:border-border/40 transition-all duration-200 active:scale-[0.99] bg-surface hover:bg-surface-elevated/40 cursor-pointer overflow-hidden shadow-sm"
                  >
                    {/* Hydration-safe grid background */}
                    <GridOverlay isLive={true} />

                    <button
                      onClick={(e) => toggleBookmark(tool.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg select-none transition-all duration-150 cursor-pointer z-20 text-amber-500 scale-105"
                      aria-label="Remove Bookmark"
                    >
                      ★
                    </button>

                    <div className="space-y-4 relative z-10">
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
        )}

        {/* TABBED DIRECTORY TOOLS HUB (Replaces dry infinite scroll) */}
        <section id="tools-directory" className="space-y-8 scroll-mt-24">
          
          {/* Tab Switcher rail */}
          <div className="flex items-baseline justify-between border-b border-border/40 pb-4 select-none">
            <div className="flex flex-wrap items-center gap-1">
              {[
                { id: "all", label: t.allTools },
                { id: "pdf", label: t.pdfTools },
                { id: "image", label: t.imageTools },
                { id: "developer", label: t.developerTools },
                { id: "generators", label: t.generators },
                { id: "text", label: t.textTools },
                { id: "calculators", label: t.calculators },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      history.replaceState(null, "", `#${TAB_TO_SLUG[tab.id]}`);
                    }}
                    className={`px-4 py-2.5 text-[10px] font-bold tracking-wider uppercase border transition-all duration-150 cursor-pointer min-h-[44px] ${
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
              {t.toolFilter}
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
                      {getCategoryTitle(category.slug, category.title)}
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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {category.tools.map((rawTool) => {
const tool = getLocalizedTool(rawTool, lang);
                      const isLive = tool.status === "live";
                      const isBookmarked = bookmarks.includes(tool.id);
                      const tagLabel = TOOL_WORKFLOW_TAGS[tool.id] || "ACTIVE";
                      
                      return (
                        <motion.div variants={staggerItem} key={tool.id} className="h-full">
                          <Link
                            href={isLive ? getLocalizedHref(`/tools/${tool.id}`) : "#"}
                            className={`group relative block p-6 h-full rounded-2xl border border-dashed overflow-hidden shadow-sm ${
                              isLive
                                ? "border-border/70 dark:border-border/40 transition-all duration-200 active:scale-[0.99] bg-surface hover:bg-surface-elevated/40 cursor-pointer"
                                : "border-border/20 bg-surface-elevated/25 pointer-events-none opacity-50"
                            }`}
                          >
                            {/* Hydration-safe grid background */}
                            <GridOverlay isLive={isLive} />

                            {/* Star trigger */}
                            {isLive && (
                              <button
                                onClick={(e) => toggleBookmark(tool.id, e)}
                                className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg select-none transition-all duration-150 cursor-pointer z-20 ${
                                  isBookmarked ? "text-amber-500 scale-105" : "text-ink-muted/20 hover:text-amber-500 hover:scale-105"
                                }`}
                                aria-label="Toggle Bookmark"
                              >
                                {isBookmarked ? "★" : "☆"}
                              </button>
                            )}

                            <div className="relative z-10 select-none space-y-4">
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
                              <div className="mt-4 flex items-center justify-between text-[10px] select-none border-t border-border/20 pt-2 relative z-10">
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
                              <div className="mt-4 flex items-center gap-1 select-none relative z-10">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-800 animate-pulse" />
                                <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wider">{t.comingSoon}</span>
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

        {/* Global FAQ Section */}
        <section className="space-y-6 pt-16">
          <div className="border-b border-border/40 pb-4 select-none">
            <h2 className="text-xs font-extrabold tracking-wider uppercase text-ink">
              {t.faqTitle}
            </h2>
            <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
              {t.faqSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-dashed border-border/70 bg-surface">
              <h3 className="text-xs font-bold text-ink mb-2">Is it completely free?</h3>
              <p className="text-[11px] text-ink-secondary">Yes, ZeroWebTools is 100% free. No subscriptions, no hidden fees, and no sign-up required.</p>
            </div>
            <div className="p-6 rounded-2xl border border-dashed border-border/70 bg-surface">
              <h3 className="text-xs font-bold text-ink mb-2">Are my files uploaded to a server?</h3>
              <p className="text-[11px] text-ink-secondary">No. All tools execute entirely client-side using WebAssembly in your browser. Your files never leave your device.</p>
            </div>
            <div className="p-6 rounded-2xl border border-dashed border-border/70 bg-surface">
              <h3 className="text-xs font-bold text-ink mb-2">Do I need to download anything?</h3>
              <p className="text-[11px] text-ink-secondary">No, you do not need to install any apps or software. Everything works securely inside your web browser.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

function GridOverlay({ isLive }: { isLive: boolean }) {
  const [squares, setSquares] = useState<number[][]>([]);
  useEffect(() => {
    if (isLive) {
      setSquares(genRandomPattern(4));
    }
  }, [isLive]);

  return (
    <div className={`pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)] z-0 ${!isLive && "opacity-40"}`}>
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
        <GridPattern
          width={20}
          height={20}
          x="-12"
          y="4"
          squares={squares.length > 0 ? squares : undefined}
          className="fill-ink/5 stroke-border/40 absolute inset-0 h-full w-full mix-blend-overlay"
        />
      </div>
    </div>
  );
}