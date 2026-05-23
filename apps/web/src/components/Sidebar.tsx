"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, ALL_TOOLS, type Tool } from "@/lib/tools";
import ThemeToggle from "./ThemeToggle";

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

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  const pathname = usePathname();

  // Load Bookmarks and Recents
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
    // Setup local event listener to react to bookmarks immediately on the same page
    window.addEventListener("zeelancebox_storage_update", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("zeelancebox_storage_update", handleStorageChange);
    };
  }, []);

  // Update Recents when Path changes (if visiting a tool page)
  useEffect(() => {
    const match = pathname?.match(/\/tools\/([a-zA-Z0-9-]+)/);
    if (match && match[1]) {
      const toolId = match[1];
      const liveToolExists = ALL_TOOLS.some((t) => t.id === toolId && t.status === "live");
      if (liveToolExists) {
        setRecents((prev) => {
          const next = [toolId, ...prev.filter((id) => id !== toolId)].slice(0, 3);
          localStorage.setItem("zeelancebox_recents", JSON.stringify(next));
          // Notify other components (like sidebar)
          window.dispatchEvent(new Event("zeelancebox_storage_update"));
          return next;
        });
      }
    }
  }, [pathname]);

  const bookmarkedTools = ALL_TOOLS.filter((t) => bookmarks.includes(t.id));
  const recentTools = ALL_TOOLS.filter((t) => recents.includes(t.id));

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 260 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="hidden md:flex flex-col h-screen sticky top-0 left-0 bg-surface-elevated border-r border-border/60 shadow-sm z-30 select-none overflow-hidden"
    >
      {/* Sidebar Header Brand */}
      <div className="flex items-center gap-3 h-16 px-4 border-b border-border/40 shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2.5 group active:scale-[0.98] transition-transform duration-200 truncate w-full"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-accent to-emerald-400 flex items-center justify-center shadow-sm shrink-0">
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none" className="text-white">
              <path d="M3 2h8v2H3V2zm0 4h5v2H3V6zm0 4h8v2H3v-2z" fill="currentColor" />
            </svg>
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold tracking-tight text-base text-ink"
              >
                ZeelanceBox
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Main Workspace Directories */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 space-y-6">
        
        {/* Starred Bookmarks Section */}
        {bookmarkedTools.length > 0 && (
          <div className="space-y-1.5">
            {!collapsed && (
              <h4 className="text-[10px] font-bold text-ink-muted uppercase tracking-wider px-3.5 mb-2">
                Saved Workspaces
              </h4>
            )}
            <ul>
              {bookmarkedTools.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/tools/${t.id}`}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-all group ${
                      pathname === `/tools/${t.id}`
                        ? "bg-accent-surface text-accent"
                        : "text-ink-secondary hover:bg-surface hover:text-ink"
                    }`}
                    title={t.title}
                  >
                    <span className="text-amber-500 shrink-0">★</span>
                    {!collapsed && <span className="truncate">{t.title}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recently Opened Section */}
        {recentTools.length > 0 && (
          <div className="space-y-1.5">
            {!collapsed && (
              <h4 className="text-[10px] font-bold text-ink-muted uppercase tracking-wider px-3.5 mb-2">
                Recents
              </h4>
            )}
            <ul>
              {recentTools.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/tools/${t.id}`}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium transition-all group ${
                      pathname === `/tools/${t.id}`
                        ? "bg-accent-surface text-accent font-semibold"
                        : "text-ink-secondary hover:bg-surface hover:text-ink"
                    }`}
                    title={t.title}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor" className="text-ink-muted group-hover:text-accent transition-colors shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {!collapsed && <span className="truncate">{t.title}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Grouped Category Explorer */}
        <div className="space-y-1.5">
          {!collapsed && (
            <h4 className="text-[10px] font-bold text-ink-muted uppercase tracking-wider px-3.5 mb-2">
              Categories
            </h4>
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
                        ? "bg-accent-surface text-accent"
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
                    {!collapsed && <span className="truncate">{cat.title}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

      </div>

      {/* Footer Controls: Collapse Button & Theme toggle */}
      <div className="border-t border-border/40 p-3 shrink-0 flex flex-col gap-2 bg-surface-elevated/80">
        <div className="flex items-center justify-between gap-2 px-1">
          <ThemeToggle />
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-xl border border-border hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-surface text-ink hover:text-accent shadow-sm active:scale-95 transition-all duration-200 cursor-pointer w-9 h-9 flex items-center justify-center"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.5"
              stroke="currentColor"
              className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>
        
        {!collapsed && (
          <div className="text-[10px] text-ink-muted text-center py-1.5 border-t border-border/20 mt-1 font-medium tracking-wide">
            ZeelanceBox v1.0 • Client-side
          </div>
        )}
      </div>

    </motion.aside>
  );
}
