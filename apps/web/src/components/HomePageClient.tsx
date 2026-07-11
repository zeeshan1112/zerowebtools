"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, ALL_TOOLS, getToolsForCategory } from "@/lib/tools";
import { GridPattern, genRandomPattern } from "@/components/ui/grid-feature-cards";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { getToolIcon } from "@/lib/icons";
import { getTranslations, getLocalizedTool } from "@/lib/i18n";
import { useRouter, usePathname } from "next/navigation";
import Hero from "@/components/ui/animated-shader-hero";

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
  "resume-builder": "RESUME",
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



const SLUG_TO_TAB: Record<string, "all" | "dev" | "doc" | "media" | "finance" | "fun" | "ext"> = {
  "all-tools": "all",
  "ai-tools": "dev",
  "pdf-tools": "doc",
  "text-tools": "doc",
  "developer-tools": "dev",
  "generators": "dev",
  "image-tools": "media",
  "financial-growth": "finance",
  "fun": "fun",
  "extension-tools": "ext",
};

const TAB_TO_SLUG: Record<string, string> = {
  all: "all-tools",
  dev: "developer-tools",
  doc: "pdf-tools",
  media: "image-tools",
  finance: "financial-growth",
  fun: "fun",
  ext: "extension-tools",
};

const ENABLE_CATEGORY_COLORS = true;

export default function HomePageClient({ lang = "en" }: { lang?: string }) {
  const t = getTranslations(lang);
  const router = useRouter();
  const pathname = usePathname();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "dev" | "doc" | "media" | "finance" | "fun" | "ext">("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      case "fun": return (t as any).fun || "Fun";
      default: return fallback;
    }
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      const tabId = SLUG_TO_TAB[hash];
      if (tabId) {
        setActiveTab(tabId);
        setTimeout(() => {
          const categoryElement = document.getElementById(hash);
          if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: "smooth" });
          } else {
            document.getElementById("tools-directory")?.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };

    const handleTabNav = (e: Event) => {
      const slug = (e as CustomEvent).detail;
      const tabId = SLUG_TO_TAB[slug];
      if (tabId) {
        setActiveTab(tabId);
        router.replace(`${window.location.pathname}#${TAB_TO_SLUG[tabId]}`, { scroll: false });
        setTimeout(() => {
          const categoryElement = document.getElementById(slug);
          if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: "smooth" });
          } else {
            document.getElementById("tools-directory")?.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };

    const checkHash = () => {
      if (window.location.hash) {
        handleHash();
      }
    };

    // Run immediately and also after a slight delay to handle Next.js route transitions
    checkHash();
    setTimeout(checkHash, 100);

    window.addEventListener("hashchange", handleHash);
    window.addEventListener("popstate", checkHash);
    window.addEventListener("zeelancebox_navigate_tab", handleTabNav);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.removeEventListener("popstate", checkHash);
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
        return ["ai-tools", "pdf-tools", "image-tools", "developer-tools", "generators", "text-tools", "financial-growth", "fun"];
      case "dev":
        return ["ai-tools", "developer-tools", "generators"];
      case "doc":
        return ["pdf-tools", "text-tools"];
      case "media":
        return ["image-tools"];
      case "finance":
        return ["financial-growth"];
      case "fun":
        return ["fun"];
      case "ext":
        return ["ai-tools", "pdf-tools", "image-tools", "developer-tools", "generators", "text-tools", "financial-growth", "fun"];
      default:
        return ["ai-tools", "pdf-tools", "image-tools", "developer-tools", "generators", "text-tools", "financial-growth", "fun"];
    }
  };

  const activeSlugs = getTabCategorySlug();
  const filteredCategories = CATEGORIES.filter((c) => activeSlugs.includes(c.slug));


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

       {/* Immersive Full-Screen Premium Hero with WebGL Shader Background */}
      <Hero
        trustBadge={{
          text: t.privateBadge.replace("{count}", String(totalLive)),
          icons: ["✨"]
        }}
        headline={{
          line1: t.homeTitle.split(" ").slice(0, 2).join(" "),
          line2: t.homeTitle.split(" ").slice(2).join(" ")
        }}
        subtitle={t.homeDesc}
        buttons={{
          primary: {
            text: t.exploreAllTools,
            onClick: () => {
              document.getElementById("tools-directory")?.scrollIntoView({ behavior: "smooth" });
            }
          },
          secondary: {
            text: "Search Tools (⌘K)",
            onClick: () => {
              const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
              window.dispatchEvent(event);
            }
          }
        }}
      />

      {/* Main Grid Directory */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 mt-16 space-y-16">
        



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
                const requiresExtension = ["web-scraper", "youtube-transcript", "api-client"].includes(tool.id);
                return (
                  <Link
                    key={tool.id}
                    href={getLocalizedHref(`/tools/${tool.id}`)}
                    className={`group relative block p-6 rounded-2xl border border-dashed transition-all duration-200 active:scale-[0.99] bg-surface cursor-pointer overflow-hidden shadow-sm ${
                      requiresExtension 
                        ? "border-accent/40 dark:border-accent/30 hover:bg-accent/[0.03] max-sm:pointer-events-none hover:border-accent/60 hover:shadow-[0_0_20px_rgba(var(--accent-rgb, 59,130,246),0.15)]" 
                        : "border-border/70 dark:border-border/40 hover:bg-surface-elevated/40"
                    }`}
                  >
                    {/* Mobile Overlay for Extension Tools */}
                    {requiresExtension && (
                      <div className="absolute inset-0 z-30 bg-surface/70 dark:bg-neutral-900/70 backdrop-blur-sm flex items-center justify-center sm:hidden transition-all duration-300">
                        <div className="px-4 py-2 bg-ink text-surface dark:bg-white dark:text-ink text-[10px] font-extrabold rounded-2xl uppercase tracking-widest flex flex-col items-center gap-1.5 shadow-2xl border border-border/20 scale-95">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                          <span>Desktop Only</span>
                        </div>
                      </div>
                    )}

                    {/* Hydration-safe grid background */}
                    <GridOverlay isLive={true} />

                    <button
                      onClick={(e) => toggleBookmark(tool.id, e)}
                      className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm transition-all duration-300 z-20 text-amber-500 select-none cursor-pointer"
                      aria-label="Remove Bookmark"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </button>

                    <div className="space-y-4 relative z-10">
                      <div className="flex items-start gap-2.5">
                        {/* Monochromatic SVG Title Icons */}
                        <div className="p-1.5 rounded-lg bg-zinc-900/60 text-ink shrink-0">
                          {getToolIcon(tool.id)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-xs font-bold tracking-tight leading-snug group-hover:text-ink transition-colors duration-150 text-ink mt-1">
                              {tool.title}
                            </h3>
                            {requiresExtension && (
                              <span className="shrink-0 mt-1.5 px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20" title="Requires Chrome Extension">
                                Ext
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] leading-relaxed text-ink-secondary line-clamp-2">
                        {tool.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-[9px] select-none border-t border-border/20">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center text-ink-muted font-mono font-bold tracking-wider">
                            {tagLabel}
                          </span>
                          
                        </div>
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
          <div className="relative border-b border-border/40 pb-4 select-none flex items-center justify-between">
            {/* Desktop View: Clean Rectangular Buttons */}
            <div className="hidden sm:flex flex-wrap items-center gap-1">
              {[
                { id: "all", label: t.allTools },
                { id: "dev", label: "Dev Workbench" },
                { id: "doc", label: "Document Studio" },
                { id: "media", label: "Media & Creator" },
                { id: "finance", label: "Financial Modeler" },
                { id: "fun", label: "Playground" },
                { id: "ext", label: "Extension Dependent" },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      router.replace(`${pathname}#${TAB_TO_SLUG[tab.id]}`, { scroll: false });
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

            {/* Mobile View: Premium Dropdown Selector */}
            <div className="sm:hidden relative w-full">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full bg-surface-elevated border border-border px-4 py-3 rounded-2xl flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-ink cursor-pointer hover:border-ink select-none min-h-[44px]"
              >
                <div className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  <span>Filter: {[
                    { id: "all", label: t.allTools },
                    { id: "dev", label: "Dev Workbench" },
                    { id: "doc", label: "Document Studio" },
                    { id: "media", label: "Media & Creator" },
                    { id: "finance", label: "Financial Modeler" },
                    { id: "fun", label: "Playground" },
                    { id: "ext", label: "Extension Dependent" },
                  ].find(t => t.id === activeTab)?.label}</span>
                </div>
                <svg className={`w-3 h-3 transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isFilterOpen && (
                <>
                  {/* Backdrop overlay to close when clicking outside */}
                  <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsFilterOpen(false)} />
                  
                  <div className="absolute left-0 right-0 mt-2 z-50 bg-surface-elevated border border-border/85 rounded-2xl shadow-xl overflow-hidden py-1">
                    {[
                      { id: "all", label: t.allTools },
                      { id: "dev", label: "Dev Workbench" },
                      { id: "doc", label: "Document Studio" },
                      { id: "media", label: "Media & Creator" },
                      { id: "finance", label: "Financial Modeler" },
                      { id: "fun", label: "Playground" },
                      { id: "ext", label: "Extension Dependent" },
                    ].map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id as any);
                            setIsFilterOpen(false);
                            router.replace(`${pathname}#${TAB_TO_SLUG[tab.id]}`, { scroll: false });
                          }}
                          className={`w-full text-left px-5 py-3.5 text-[9px] font-bold uppercase tracking-wider border-b border-border/20 last:border-0 cursor-pointer transition-colors duration-150 flex items-center justify-between ${
                            isActive
                              ? "bg-accent/[0.05] text-accent font-extrabold"
                              : "text-ink-secondary hover:text-ink hover:bg-surface/50"
                          }`}
                        >
                          <span>{tab.label}</span>
                          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            
            <div className="text-[9px] text-ink-muted font-bold uppercase tracking-wider hidden sm:block">
              {t.toolFilter}
            </div>
          </div>
 
          {/* Cross-fade Category Grid */}
          <div className="space-y-12">
            {(() => {
              const renderedToolIds = new Set<string>();
              return filteredCategories.map((category) => {
                let categoryTools = getToolsForCategory(category.slug);
                
                if (activeTab === "ext") {
                  categoryTools = categoryTools.filter(t => 
                    ["web-scraper", "youtube-transcript", "api-client"].includes(t.id)
                  );
                }

                // Filter out duplicate tools already rendered on the page
                categoryTools = categoryTools.filter(t => {
                  if (renderedToolIds.has(t.id)) return false;
                  renderedToolIds.add(t.id);
                  return true;
                });
                
                if (categoryTools.length === 0) return null;
                
                const liveCount = categoryTools.filter((t) => t.status === "live").length;
              
              return (
                <div key={category.slug} id={category.slug} className="space-y-6 scroll-mt-24">
                  <div className="flex items-baseline justify-between border-b border-border/30 pb-2.5 select-none">
                    <h3 className="text-[10px] font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1.5">
                      {ENABLE_CATEGORY_COLORS && category.colorClass && (
                        <span className={`w-1.5 h-1.5 rounded-full ${category.colorClass.replace('text-', 'bg-')}`} />
                      )}
                      {getCategoryTitle(category.slug, category.title)}
                    </h3>
                    <span className="text-[9px] text-ink-muted font-bold">
                      {liveCount} OF {categoryTools.length} LIVE
                    </span>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-10px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {categoryTools.map((rawTool) => {
                      const tool = getLocalizedTool(rawTool, lang);
                      const isLive = tool.status === "live";
                      const isBookmarked = bookmarks.includes(tool.id);
                      const tagLabel = TOOL_WORKFLOW_TAGS[tool.id] || "ACTIVE";
                      
                      const requiresExtension = ["web-scraper", "youtube-transcript", "api-client"].includes(tool.id);
                      
                      const borderHoverClass = ENABLE_CATEGORY_COLORS && isLive && category.borderClass ? category.borderClass : "hover:border-zinc-700";
                      const glowHoverClass = ENABLE_CATEGORY_COLORS && isLive && category.glowClass ? category.glowClass : "";
                      const bgHoverClass = "hover:bg-surface-elevated/40";
                      
                      return (
                        <motion.div variants={staggerItem} key={tool.id} className="h-full">
                          <Link
                            href={isLive ? getLocalizedHref(`/tools/${tool.id}`) : "#"}
                            className={`group relative block p-6 h-full rounded-2xl border border-dashed overflow-hidden shadow-sm transition-all duration-300 ${
                              isLive
                                ? requiresExtension
                                  ? "border-accent/40 dark:border-accent/30 hover:bg-accent/[0.03] hover:border-accent/60 hover:shadow-[0_0_20px_rgba(var(--accent-rgb, 59,130,246),0.15)] active:scale-[0.99] bg-surface cursor-pointer"
                                  : `border-border/70 dark:border-border/40 ${borderHoverClass} ${glowHoverClass} ${bgHoverClass} active:scale-[0.99] bg-surface cursor-pointer`
                                : "border-border/20 bg-surface-elevated/25 pointer-events-none opacity-50"
                            } ${requiresExtension ? "max-sm:pointer-events-none" : ""}`}
                          >
                            {/* Mobile Overlay for Extension Tools */}
                            {isLive && requiresExtension && (
                              <div className="absolute inset-0 z-30 flex items-center justify-center sm:hidden pointer-events-none">
                                <div className="px-3 py-1.5 bg-ink text-surface dark:bg-white dark:text-ink text-[9px] font-extrabold rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-lg border border-border/10 scale-90 opacity-95">
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                                  <span>Desktop Only</span>
                                </div>
                              </div>
                            )}

                            {/* Hydration-safe grid background */}
                            <GridOverlay isLive={isLive} />

                            {/* Star trigger */}
                            {isLive && (
                              <button
                                onClick={(e) => toggleBookmark(tool.id, e)}
                                className={`absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg border transition-all duration-300 z-20 select-none cursor-pointer ${
                                  isBookmarked
                                    ? "opacity-100 border-zinc-800 bg-zinc-900/60 backdrop-blur-sm text-amber-500"
                                    : "opacity-0 group-hover:opacity-100 border-transparent hover:border-zinc-800 bg-transparent hover:bg-zinc-900/60 hover:backdrop-blur-sm text-zinc-500 hover:text-amber-500"
                                }`}
                                aria-label="Toggle Bookmark"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                              </button>
                            )}

                            <div className={`relative z-10 select-none space-y-4 ${requiresExtension ? "max-sm:opacity-30" : ""}`}>
                              <div className="flex items-start gap-2.5">
                                {/* Title vector glyph wrapped in category color badge */}
                                <div className={`p-1.5 rounded-lg shrink-0 transition-colors duration-300 ${ENABLE_CATEGORY_COLORS && category.bgClass && category.colorClass ? `${category.bgClass} ${category.colorClass}` : "bg-zinc-900/60 text-ink"}`}>
                                  {getToolIcon(tool.id)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <h4 className={`text-xs font-bold tracking-tight leading-snug group-hover:text-ink transition-colors duration-150 mt-1 ${isLive ? "text-ink" : "text-ink-muted"}`}>
                                      {tool.title}
                                    </h4>
                                    {requiresExtension && (
                                      <span className="shrink-0 mt-1 px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20" title="Requires Chrome Extension">
                                        Ext
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <p className={`text-[11px] leading-relaxed ${isLive ? "text-ink-secondary" : "text-ink-muted"}`}>
                                {tool.description}
                              </p>
                            </div>

                            {isLive ? (
                              <div className="mt-4 flex items-center justify-between text-[10px] select-none border-t border-border/20 pt-2 relative z-10">
                                <div className="flex items-center gap-2">
                                  <span className="flex items-center text-ink-muted font-mono font-bold tracking-wider text-[9px] uppercase">
                                    {tagLabel}
                                  </span>
                                  
                                </div>
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
            });
          })()}
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
              <h3 className="text-xs font-bold text-ink mb-2">{t.faqQ1}</h3>
              <p className="text-[11px] text-ink-secondary">{t.faqA1}</p>
            </div>
            <div className="p-6 rounded-2xl border border-dashed border-border/70 bg-surface">
              <h3 className="text-xs font-bold text-ink mb-2">{t.faqQ2}</h3>
              <p className="text-[11px] text-ink-secondary">{t.faqA2}</p>
            </div>
            <div className="p-6 rounded-2xl border border-dashed border-border/70 bg-surface">
              <h3 className="text-xs font-bold text-ink mb-2">{t.faqQ3}</h3>
              <p className="text-[11px] text-ink-secondary">{t.faqA3}</p>
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