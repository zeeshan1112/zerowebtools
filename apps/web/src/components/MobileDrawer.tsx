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
  fun: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm3.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75z" />
    </svg>
  ),
};

export default function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);
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
      case "fun": return (translations as any).fun || "Fun";
      default: return fallback;
    }
  };

  // Load Bookmarks & Recents
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedBookmarks = localStorage.getItem("zeelancebox_bookmarks");
        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));

        const savedRecents = localStorage.getItem("zeelancebox_recents");
        if (savedRecents) setRecents(JSON.parse(savedRecents));
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

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  const bookmarkedTools = ALL_TOOLS.filter((t) => bookmarks.includes(t.id)).map((t) => getLocalizedTool(t, currentLocale));
  const recentTools = ALL_TOOLS.filter((t) => recents.includes(t.id)).map((t) => getLocalizedTool(t, currentLocale));
  const liveTools = ALL_TOOLS.filter((t) => t.status === "live").map((t) => getLocalizedTool(t, currentLocale));

  return (
    <>
      {/* Hamburger trigger — only visible on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-ink hover:bg-surface-elevated active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Drawer overlay + panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[4px] md:hidden"
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.nav
              id="mobile-nav-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 z-[95] w-[min(20rem,80vw)] bg-surface-elevated/95 backdrop-blur-xl border-r border-border/40 shadow-2xl flex flex-col md:hidden overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Header */}
              <div className="flex items-center justify-between h-16 px-5 border-b border-border/40 shrink-0">
                <Link
                  href={getLocalizedHref("/")}
                  className="flex items-center gap-2.5 group active:scale-[0.98] transition-transform duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <img src="/logo.png" alt="ZeroWebTools" className="w-8 h-8 rounded-xl shadow-sm object-contain" />
                  <span className="font-extrabold tracking-tight text-xs uppercase text-ink">ZeroWebTools</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-9 h-9 rounded-xl border border-border hover:bg-surface text-ink-secondary hover:text-ink active:scale-95 transition-all cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden py-5 px-4 space-y-6">

                {/* Bookmarks */}
                {bookmarkedTools.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-bold text-ink-muted uppercase tracking-wider px-1 mb-1.5">
                      {translations.savedTools}
                    </h4>
                    <ul className="space-y-0.5">
                      {bookmarkedTools.map((t) => {
                        const isToolActive = pathname === `/tools/${t.id}` || pathname === `/${currentLocale}/tools/${t.id}`;
                        return (
                          <li key={t.id}>
                            <Link
                              href={getLocalizedHref(`/tools/${t.id}`)}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px] ${
                                isToolActive
                                  ? "bg-accent-surface text-accent font-bold"
                                  : "text-ink-secondary hover:bg-surface hover:text-ink active:bg-surface"
                              }`}
                            >
                              {getToolIcon(t.id)}
                              <span className="truncate text-xs font-bold uppercase tracking-wide">{t.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Recents */}
                {recentTools.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-bold text-ink-muted uppercase tracking-wider px-1 mb-1.5">
                      Recents
                    </h4>
                    <ul className="space-y-0.5">
                      {recentTools.map((t) => {
                        const isToolActive = pathname === `/tools/${t.id}` || pathname === `/${currentLocale}/tools/${t.id}`;
                        return (
                          <li key={t.id}>
                            <Link
                              href={getLocalizedHref(`/tools/${t.id}`)}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px] ${
                                isToolActive
                                  ? "bg-accent-surface text-accent font-bold"
                                  : "text-ink-secondary hover:bg-surface hover:text-ink active:bg-surface"
                              }`}
                            >
                              {getToolIcon(t.id)}
                              <span className="truncate text-xs font-bold uppercase tracking-wide">{t.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Categories */}
                <div className="space-y-2">
                  <h4 className="text-[9px] font-bold text-ink-muted uppercase tracking-wider px-1 mb-1.5">
                    Categories
                  </h4>
                  <ul className="space-y-0.5">
                    {CATEGORIES.map((cat) => (
                      <li key={cat.slug}>
                        <a
                          href={getLocalizedHref(`/#${cat.slug}`)}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all text-ink-secondary hover:bg-surface hover:text-ink active:bg-surface min-h-[44px]"
                        >
                          <span className="shrink-0 text-ink-muted">
                            {CATEGORY_ICONS[cat.slug] || (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" />
                              </svg>
                            )}
                          </span>
                          <span className="truncate text-xs font-bold uppercase tracking-wide">{getCategoryTitle(cat.slug, cat.title)}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* All Live Tools quick list */}
                <div className="space-y-2">
                  <h4 className="text-[9px] font-bold text-ink-muted uppercase tracking-wider px-1 mb-1.5">
                    {translations.allTools}
                  </h4>
                  <ul className="space-y-0.5">
                    {liveTools.map((t) => {
                      const isToolActive = pathname === `/tools/${t.id}` || pathname === `/${currentLocale}/tools/${t.id}`;
                      return (
                        <li key={t.id}>
                          <Link
                            href={getLocalizedHref(`/tools/${t.id}`)}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all min-h-[44px] ${
                              isToolActive
                                ? "bg-accent-surface text-accent font-bold"
                                : "text-ink-secondary hover:bg-surface hover:text-ink active:bg-surface"
                            }`}
                          >
                            {getToolIcon(t.id)}
                            <span className="truncate text-xs font-bold uppercase tracking-wide">{t.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                
                {/* Chrome Extension CTA */}
                <div className="pt-2">
                  <Link
                    href="/extensions"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-accent text-white shadow-md hover:bg-accent/90 active:scale-95 transition-all w-full"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    <span className="text-xs font-extrabold uppercase tracking-widest">Extensions</span>
                  </Link>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-border/40 p-4 shrink-0 bg-surface-elevated/40 space-y-3">
                <div className="flex items-center justify-between">
                  <ThemeToggle />
                  <div className="flex items-center gap-3">
                    <Link
                      href="/privacy"
                      onClick={() => setIsOpen(false)}
                      className="text-xs text-ink-secondary hover:text-accent font-semibold transition-colors py-2 px-1 min-h-[44px] flex items-center"
                    >
                      {translations.privacy}
                    </Link>
                    <Link
                      href="/terms"
                      onClick={() => setIsOpen(false)}
                      className="text-xs text-ink-secondary hover:text-accent font-semibold transition-colors py-2 px-1 min-h-[44px] flex items-center"
                    >
                      {translations.terms}
                    </Link>
                  </div>
                </div>
                <div className="text-[9px] text-ink-muted text-center py-1 border-t border-border/20 font-bold tracking-wider uppercase">
                  ZeroWebTools v1.0 • Client-side
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
