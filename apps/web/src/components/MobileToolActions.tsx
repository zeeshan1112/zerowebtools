"use client";

import React, { useState, useEffect } from "react";

interface MobileToolActionsProps {
  toolId: string;
}

export default function MobileToolActions({ toolId }: MobileToolActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("zeelancebox_bookmarks");
      if (saved) {
        const bookmarks = JSON.parse(saved);
        setIsBookmarked(bookmarks.includes(toolId));
      }
    } catch (_) {}
  }, [toolId]);

  const handleBookmark = () => {
    try {
      const saved = localStorage.getItem("zeelancebox_bookmarks");
      let bookmarks = saved ? JSON.parse(saved) : [];
      if (bookmarks.includes(toolId)) {
        bookmarks = bookmarks.filter((b: string) => b !== toolId);
        setIsBookmarked(false);
      } else {
        bookmarks.push(toolId);
        setIsBookmarked(true);
      }
      localStorage.setItem("zeelancebox_bookmarks", JSON.stringify(bookmarks));
      window.dispatchEvent(new Event("zeelancebox_storage_update"));
    } catch (_) {}
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="lg:hidden flex gap-2.5 mb-4">
      <button
        onClick={handleBookmark}
        className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-medium border transition-all duration-200 cursor-pointer min-h-[44px] ${
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
        className="flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-medium border border-border hover:bg-surface text-ink-secondary transition-all duration-200 cursor-pointer min-h-[44px]"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l.09.034m-.09-.034a2.25 2.25 0 002.247-2.177m-2.247 2.177L15.75 6.75m0 0a2.25 2.25 0 112.248 2.22m-2.248-2.22L7.33 11.23m8.42 2.646a2.25 2.25 0 102.248 2.203" />
        </svg>
        <span>{copied ? "Copied!" : "Share"}</span>
      </button>
    </div>
  );
}
