"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, ALL_TOOLS } from "@/lib/tools";
import ThemeToggle from "./ThemeToggle";
import { getToolIcon } from "@/lib/icons";
import { LOCALES, SupportedLocale, getLocalizedTool, getTranslations } from "@/lib/i18n";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "pdf-tools": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  "text-tools": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  converters: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  "developer-tools": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  ),
  generators: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.098-3.098L2.25 12l2.846-.813a4.5 4.5 0 003.098-3.098L9 5.25l.813 2.846a4.5 4.5 0 003.098 3.098L15.75 12l-2.846.813a4.5 4.5 0 00-3.098 3.098zM19.078 19.078l-.228.798-.228-.798a3.185 3.185 0 00-2.19-2.19l-.798-.228.798-.228a3.185 3.185 0 002.19-2.19l.228-.798.228.798a3.185 3.185 0 002.19 2.19l.798.228-.798.228a3.185 3.185 0 00-2.19 2.19zM19.385 4.615l-.097.338-.097-.338a1.35 1.35 0 00-.927-.927l-.338-.097.338-.097a1.35 1.35 0 00.927-.927l.097-.338.097.338a1.35 1.35 0 00.927.927l.338.097-.338.097a1.35 1.35 0 00-.927.927z" />
    </svg>
  ),
  "image-tools": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  "financial-growth": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.5 4.5 8.25-8.25M21 12v5.25a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 17.25V5.25" />
    </svg>
  ),
};

export default function Sidebar() {
  const [pinned, setPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  const pathname = usePathname();

  const segments = pathname ? pathname.split("/") : [];
  const firstSegment = segments[1] as SupportedLocale;
  const currentLocale = LOCALES.includes(firstSegment) && firstSegment !== "en"
    ? firstSegment
    : "";

  const getLocalizedHref = (path: string) => {
    if (!currentLocale) return path;
    return `/${currentLocale}${path === "/" ? "" : path}`;
  };

  const translations = getTranslations(currentLocale || "en");

  const getCategoryTitle = (slug: string, fallback: string) => {
    switch (slug) {
      case "pdf-tools": return translations.pdfTools;
      case "text-tools": return translations.textTools;
      case "developer-tools": return translations.developerTools;
      case "generators": return translations.generators;
      case "image-tools": return translations.imageTools;
      case "financial-growth": return translations.calculators;
      default: return fallback;
    }
  };

  // Load Bookmarks, Recents, and Pinned state
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedBookmarks = localStorage.getItem("zeelancebox_bookmarks");
        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

        const savedRecents = localStorage.getItem("zeelancebox_recents");
        if (savedRecents) setRecents(JSON.parse(savedRecents));

        const savedPinned = localStorage.getItem("zeelancebox_sidebar_pinned");
        if (savedPinned !== null) {
          setPinned(JSON.parse(savedPinned));
        }
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

  // Update Recents
  useEffect(() => {
    const match = pathname?.match(/\/tools\/([a-zA-Z0-9-]+)/) || pathname?.match(/\/[a-z]{2}\/tools\/([a-zA-Z0-9-]+)/);
    if (match && match[1]) {
      const toolId = match[1];
      const liveToolExists = ALL_TOOLS.some((t) => t.id === toolId && t.status === "live");
      if (liveToolExists) {
        try {
          const savedRecents = localStorage.getItem("zeelancebox_recents");
          const prev = savedRecents ? JSON.parse(savedRecents) : [];
          const next = [toolId, ...prev.filter((id: string) => id !== toolId)].slice(0, 3);
          localStorage.setItem("zeelancebox_recents", JSON.stringify(next));
          setRecents(next);
          window.dispatchEvent(new Event("zeelancebox_storage_update"));
        } catch (_) {}
      }
    }
  }, [pathname]);

  const bookmarkedTools = ALL_TOOLS.filter((t) => bookmarks.includes(t.id)).map((t) => getLocalizedTool(t, currentLocale));
  const recentTools = ALL_TOOLS.filter((t) => recents.includes(t.id)).map((t) => getLocalizedTool(t, currentLocale));

  const togglePinned = () => {
    const nextPinned = !pinned;
    setPinned(nextPinned);
    try {
      localStorage.setItem("zeelancebox_sidebar_pinned", JSON.stringify(nextPinned));
      window.dispatchEvent(new Event("zeelancebox_storage_update"));
    } catch (_) {}
  };

  // effective expanded state: pinned or hovered peek
  const isExpanded = pinned || isHovered;

  return (
    <motion.aside
      animate={{ width: isExpanded ? 260 : 68 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute top-0 left-0 h-screen bg-surface-elevated/75 backdrop-blur-xl border-r border-border/40 shadow-xl z-50 select-none overflow-hidden flex flex-col"
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 h-16 px-4 border-b border-border/40 shrink-0">
        <Link
          href={getLocalizedHref("/")}
          className="flex items-center gap-2.5 group active:scale-[0.98] transition-transform duration-200 truncate w-full"
        >
          <img src="/logo.png" alt="ZeroWebTools" className="w-8 h-8 rounded-xl shadow-sm shrink-0 object-contain" />
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                className="font-extrabold tracking-tight text-xs uppercase tracking-wider text-ink whitespace-nowrap"
              >
                ZeroWebTools
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Main directories */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 space-y-6 scrollbar-none">
        
        {/* Starred Bookmarks Section */}
        {bookmarkedTools.length > 0 && (
          <div className="space-y-1.5">
            {isExpanded ? (
              <h4 className="text-[9px] font-bold text-ink-muted uppercase tracking-wider px-3.5 mb-2">
                {translations.savedTools}
              </h4>
            ) : (
              <div className="h-4" />
            )}
            <ul>
              {bookmarkedTools.map((t) => {
                const isToolActive = pathname === `/tools/${t.id}` || pathname === `/${currentLocale}/tools/${t.id}`;
                return (
                  <li key={t.id}>
                    <Link
                      href={getLocalizedHref(`/tools/${t.id}`)}
                      className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-all group ${
                        isToolActive
                          ? "bg-accent-surface text-accent font-bold"
                          : "text-ink-secondary hover:bg-surface hover:text-ink"
                      }`}
                      title={t.title}
                    >
                      {getToolIcon(t.id)}
                      {isExpanded && <span className="truncate text-xs font-bold uppercase tracking-wide">{t.title}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Recently Opened Section */}
        {recentTools.length > 0 && (
          <div className="space-y-1.5">
            {isExpanded ? (
              <h4 className="text-[9px] font-bold text-ink-muted uppercase tracking-wider px-3.5 mb-2">
                Recents
              </h4>
            ) : (
              <div className="h-4" />
            )}
            <ul>
              {recentTools.map((t) => {
                const isToolActive = pathname === `/tools/${t.id}` || pathname === `/${currentLocale}/tools/${t.id}`;
                return (
                  <li key={t.id}>
                    <Link
                      href={getLocalizedHref(`/tools/${t.id}`)}
                      className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-all group ${
                        isToolActive
                          ? "bg-accent-surface text-accent font-bold"
                          : "text-ink-secondary hover:bg-surface hover:text-ink"
                      }`}
                      title={t.title}
                    >
                      {getToolIcon(t.id)}
                      {isExpanded && <span className="truncate text-xs font-bold uppercase tracking-wide">{t.title}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Grouped Category Explorer */}
        <div className="space-y-1.5">
          {isExpanded ? (
            <h4 className="text-[9px] font-bold text-ink-muted uppercase tracking-wider px-3.5 mb-2">
              {translations.exploreAllTools}
            </h4>
          ) : (
            <div className="h-4" />
          )}
          <ul className="space-y-1">
            {CATEGORIES.map((cat) => {
              const isActive = pathname === "/" && false;
              return (
                <li key={cat.slug}>
                  <Link
                    href={getLocalizedHref("/")}
                    onClick={(e) => {
                      e.preventDefault();
                      const isHome = pathname === "/" || pathname === `/${currentLocale}`;
                      if (isHome) {
                        window.dispatchEvent(new CustomEvent("zeelancebox_navigate_tab", { detail: cat.slug }));
                      } else {
                        window.location.href = currentLocale ? `/${currentLocale}/#${cat.slug}` : `/#${cat.slug}`;
                      }
                    }}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                      isActive
                        ? "bg-accent-surface text-accent font-bold"
                        : "text-ink-secondary hover:bg-surface hover:text-ink"
                    }`}
                    title={getCategoryTitle(cat.slug, cat.title)}
                  >
                    <span className={`shrink-0 ${isActive ? "text-accent" : "text-ink-muted group-hover:text-accent transition-colors"}`}>
                      {CATEGORY_ICONS[cat.slug] || (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      )}
                    </span>
                    {isExpanded && <span className="truncate text-xs font-bold uppercase tracking-wide">{getCategoryTitle(cat.slug, cat.title)}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

      </div>

      {/* Chrome Extension CTA */}
      <div className={`shrink-0 px-3 py-3 transition-all duration-300 ${isExpanded ? "" : "opacity-75"}`}>
        <Link
          href="/extensions"
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-accent text-white shadow-md hover:bg-accent/90 hover:shadow-lg active:scale-95 transition-all w-full"
          title="Browser Extensions"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          {isExpanded && <span className="text-[10px] font-extrabold uppercase tracking-widest whitespace-nowrap">Extensions</span>}
        </Link>
      </div>

      {/* Footer collapsing button triggers */}
      <div className="border-t border-border/40 p-3 shrink-0 flex flex-col gap-2 bg-surface-elevated/40">
        <div className={`flex items-center px-1 transition-all duration-300 ${isExpanded ? "justify-between gap-2 w-full" : "justify-center w-full"}`}>
          <ThemeToggle />
          
          {isExpanded && (
            <button
              onClick={togglePinned}
              className={`p-2 rounded-xl border hover:bg-surface hover:text-accent shadow-sm active:scale-95 transition-all duration-200 cursor-pointer w-9 h-9 flex items-center justify-center ${
                pinned ? "border-accent text-accent bg-accent-surface" : "border-border text-ink"
              }`}
              title={pinned ? "Unpin Sidebar (Float on hover)" : "Pin Sidebar (Keep open)"}
            >
              {pinned ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-accent shrink-0">
                  <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-ink shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 4V12L6 14v2h12v-2l-2-2V4M12 16v6M7 4h10" />
                </svg>
              )}
            </button>
          )}
        </div>
        
        {isExpanded && (
          <div className="text-[9px] text-ink-muted text-center py-1.5 border-t border-border/20 mt-1 font-bold tracking-wider uppercase">
            ZeroWebTools v1.0 • Client-side
          </div>
        )}
      </div>

    </motion.aside>
  );
}
