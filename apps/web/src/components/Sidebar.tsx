"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, ALL_TOOLS } from "@/lib/tools";
import ThemeToggle from "./ThemeToggle";
import { getToolIcon } from "@/lib/icons";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "pdf-tools": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  converters: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="shrink-0">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
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
    const match = pathname?.match(/\/tools\/([a-zA-Z0-9-]+)/);
    if (match && match[1]) {
      const toolId = match[1];
      const liveToolExists = ALL_TOOLS.some((t) => t.id === toolId && t.status === "live");
      if (liveToolExists) {
        setRecents((prev) => {
          const next = [toolId, ...prev.filter((id) => id !== toolId)].slice(0, 3);
          localStorage.setItem("zeelancebox_recents", JSON.stringify(next));
          window.dispatchEvent(new Event("zeelancebox_storage_update"));
          return next;
        });
      }
    }
  }, [pathname]);

  const bookmarkedTools = ALL_TOOLS.filter((t) => bookmarks.includes(t.id));
  const recentTools = ALL_TOOLS.filter((t) => recents.includes(t.id));

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
          href="/"
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
                Saved Workspaces
              </h4>
            ) : (
              <div className="h-4" />
            )}
            <ul>
              {bookmarkedTools.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/tools/${t.id}`}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-all group ${
                      pathname === `/tools/${t.id}`
                        ? "bg-accent-surface text-accent font-bold"
                        : "text-ink-secondary hover:bg-surface hover:text-ink"
                    }`}
                    title={t.title}
                  >
                    {getToolIcon(t.id)}
                    {isExpanded && <span className="truncate text-xs font-bold uppercase tracking-wide">{t.title}</span>}
                  </Link>
                </li>
              ))}
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
              {recentTools.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/tools/${t.id}`}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-all group ${
                      pathname === `/tools/${t.id}`
                        ? "bg-accent-surface text-accent font-bold"
                        : "text-ink-secondary hover:bg-surface hover:text-ink"
                    }`}
                    title={t.title}
                  >
                    {getToolIcon(t.id)}
                    {isExpanded && <span className="truncate text-xs font-bold uppercase tracking-wide">{t.title}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Grouped Category Explorer */}
        <div className="space-y-1.5">
          {isExpanded ? (
            <h4 className="text-[9px] font-bold text-ink-muted uppercase tracking-wider px-3.5 mb-2">
              Categories
            </h4>
          ) : (
            <div className="h-4" />
          )}
          <ul className="space-y-1">
            {CATEGORIES.map((cat) => {
              const isActive = pathname === `/#${cat.slug}` || (pathname === "/" && cat.slug === "mortgage-loan");
              return (
                <li key={cat.slug}>
                  <a
                    href={`/#${cat.slug}`}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                      isActive
                        ? "bg-accent-surface text-accent font-bold"
                        : "text-ink-secondary hover:bg-surface hover:text-ink"
                    }`}
                    title={cat.title}
                  >
                    <span className={`shrink-0 ${isActive ? "text-accent" : "text-ink-muted group-hover:text-accent transition-colors"}`}>
                      {CATEGORY_ICONS[cat.slug] || (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      )}
                    </span>
                    {isExpanded && <span className="truncate text-xs font-bold uppercase tracking-wide">{cat.title}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

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
