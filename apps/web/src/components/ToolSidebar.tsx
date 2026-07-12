"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { type Tool, type ToolCategory, getToolById } from "@/lib/tools";
import AdLayoutSlot from "@/components/AdLayoutSlot";

interface ToolSidebarProps {
  tool: Tool;
  category: ToolCategory | undefined;
  relatedTools: Tool[];
}

export default function ToolSidebar({ tool, category, relatedTools }: ToolSidebarProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [recentTools, setRecentTools] = useState<Tool[]>([]);
  const [isFirefox, setIsFirefox] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.userAgent.toLowerCase().includes("firefox")) {
      setIsFirefox(true);
    }
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("zeelancebox_bookmarks");
      if (saved) {
        const bookmarks = JSON.parse(saved);
        setIsBookmarked(bookmarks.includes(tool.id));
      }
    } catch (_) {}
  }, [tool.id]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("zerowebtools_recent");
      let list: string[] = saved ? JSON.parse(saved) : [];
      list = [tool.id, ...list.filter(id => id !== tool.id)].slice(0, 4);
      localStorage.setItem("zerowebtools_recent", JSON.stringify(list));

      const resolved = list
        .filter(id => id !== tool.id)
        .map(id => getToolById(id))
        .filter((t): t is Tool => !!t);

      setRecentTools(resolved);
    } catch (_) {}
  }, [tool.id]);

  const handleBookmark = () => {
    try {
      const saved = localStorage.getItem("zeelancebox_bookmarks");
      let bookmarks = saved ? JSON.parse(saved) : [];
      if (bookmarks.includes(tool.id)) {
        bookmarks = bookmarks.filter((b: string) => b !== tool.id);
        setIsBookmarked(false);
      } else {
        bookmarks.push(tool.id);
        setIsBookmarked(true);
      }
      localStorage.setItem("zeelancebox_bookmarks", JSON.stringify(bookmarks));
    } catch (_) {}
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="w-full space-y-6">
      {/* 300x250 Medium Rectangle High-CTR Ad Slot */}
      <div className="bg-surface-elevated rounded-2xl border border-border/50 p-4 shadow-sm flex flex-col items-center">
        <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider mb-2 self-start">Sponsored Slot</span>
        <AdLayoutSlot type="rectangle" className="my-0" />
      </div>

      {/* Tool Utility Controls (Save / Share) */}
      <div className="bg-surface-elevated rounded-2xl border border-border/50 p-5 shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Tool Utilities</h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleBookmark}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 cursor-pointer ${
              isBookmarked
                ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                : "border-border hover:bg-surface text-ink-secondary"
            }`}
          >
            <span className="text-sm leading-none">{isBookmarked ? "★" : "☆"}</span>
            <span>{isBookmarked ? "Saved" : "Save Tool"}</span>
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border border-border hover:bg-surface text-ink-secondary transition-all duration-200 cursor-pointer"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l.09.034m-.09-.034a2.25 2.25 0 002.247-2.177m-2.247 2.177L15.75 6.75m0 0a2.25 2.25 0 112.248 2.22m-2.248-2.22L7.33 11.23m8.42 2.646a2.25 2.25 0 102.248 2.203" />
            </svg>
            <span>{copied ? "Copied!" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Related Tools Drawer */}
      {relatedTools.length > 0 && (
        <div className="bg-surface-elevated rounded-2xl border border-border/50 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Related Tools</h3>
            <span className="text-[10px] font-semibold text-accent">{category?.title}</span>
          </div>

          <ul className="space-y-2">
            {relatedTools.slice(0, 5).map((t) => (
              <li key={t.id}>
                <Link
                  href={`/tools/${t.id}`}
                  className="flex items-start justify-between p-2.5 rounded-xl hover:bg-surface transition-all duration-200 group border border-transparent hover:border-border/30"
                >
                  <div className="truncate pr-2">
                    <div className="text-xs font-semibold text-ink group-hover:text-accent transition-colors truncate">
                      {t.title}
                    </div>
                    <div className="text-[10px] text-ink-muted mt-0.5 truncate">
                      {t.description}
                    </div>
                  </div>
                  <svg className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all self-center shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chrome Extension Spotlight Promo */}
      {(category?.slug === "developer-tools" || tool.id === "api-client" || tool.id === "web-scraper" || tool.id === "youtube-transcript") && (
        <div className="bg-surface-elevated rounded-2xl border border-accent/20 p-5 shadow-sm space-y-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[3px] h-full bg-accent" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Companion Extension</span>
          </div>
          <h4 className="text-xs font-bold text-ink">
            {tool.id === "youtube-transcript" ? "Unlock YouTube Transcripts" :
             tool.id === "web-scraper" ? "Read Clean Web Articles" :
             tool.id === "api-client" ? "Bypass CORS & Test Localhost" :
             "Offline Developer Toolbelt"}
          </h4>
          <p className="text-[10px] text-ink-secondary leading-relaxed">
            {tool.id === "youtube-transcript" ? "Install the free ZeroWebTools companion extension to securely extract video subtitles and transcripts directly in your browser." :
             tool.id === "web-scraper" ? "Install the free ZeroWebTools companion extension to bypass layout clutter and load clean article reader views." :
             tool.id === "api-client" ? "Install the free ZeroWebTools companion extension to enable secure localhost API testing and client-side CORS request bypass." :
             "Install the free ZeroWebTools companion extension to access JSON Formatter, Diff Checker, and JWT Debugger directly from your browser toolbar."}
          </p>
          <a
            href={isFirefox ? "https://addons.mozilla.org/en-US/firefox/addon/zerowebtools-dev/" : "https://chromewebstore.google.com/detail/pffdmcdnddpbnlmfdemhkldjloccpcfj?utm_source=item-share-cb"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 bg-accent hover:opacity-90 text-white dark:text-black text-xs font-semibold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <span>{isFirefox ? "Add to Firefox" : "Add to Chrome"}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
          <div className="text-center pt-1.5">
            <Link
              href="/extensions"
              className="text-[9px] font-bold text-ink-muted hover:text-accent transition-colors uppercase tracking-wider"
            >
              View other platforms
            </Link>
          </div>
        </div>
      )}

      {/* Recently Visited Tools */}
      {recentTools.length > 0 && (
        <div className="bg-surface-elevated rounded-2xl border border-border/50 p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-ink uppercase tracking-wider pb-2 border-b border-border/40">Recently Used</h3>
          <ul className="space-y-2">
            {recentTools.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/tools/${t.id}`}
                  className="flex items-start justify-between p-2.5 rounded-xl hover:bg-surface transition-all duration-200 group border border-transparent hover:border-border/30"
                >
                  <div className="truncate pr-2">
                    <div className="text-xs font-semibold text-ink group-hover:text-accent transition-colors truncate">
                      {t.title}
                    </div>
                  </div>
                  <svg className="w-3.5 h-3.5 text-ink-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all self-center shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Safety Badge */}
      <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 dark:border-emerald-500/20 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
          <span>Guaranteed Private</span>
        </div>
        <p className="text-[10px] text-ink-secondary mt-1.5 leading-relaxed">
          No files or calculation inputs are sent to any server. Everything is executed on your own computer.
        </p>
      </div>
    </aside>
  );
}
