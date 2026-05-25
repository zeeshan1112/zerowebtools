"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdLayoutSlot from "./AdLayoutSlot";

interface ArticleBlockProps {
  title: string;
  sections: {
    heading: string;
    level?: "h2" | "h3";
    paragraphs?: string[];
    listItems?: string[];
  }[];
}

export default function ArticleBlock({ title, sections }: ArticleBlockProps) {
  const [feedback, setFeedback] = useState<"none" | "yes" | "no">("none");

  // Helper to slugify heading text for jump links
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  return (
    <article className="bg-surface-elevated rounded-2xl border border-border/50 p-6 sm:p-8 shadow-sm space-y-8 max-w-4xl mx-auto">
      
      {/* Article Title */}
      <div className="space-y-4 border-b border-border/40 pb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink leading-snug text-balance">
          {title}
        </h2>
        
        {/* Estimated Reading Time & Meta info */}
        <div className="flex items-center gap-4 text-xs text-ink-muted font-medium">
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{Math.max(2, Math.ceil(sections.length * 1.2))} min read</span>
          </div>
          <span>&bull;</span>
          <span>Verified Educational Resource</span>
        </div>
      </div>

      {/* Dynamic Table of Contents (TOC) */}
      <div className="p-4 rounded-xl bg-surface border border-border/60 max-w-md">
        <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor" className="text-accent">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12M8.25 17.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          In this guide:
        </h3>
        <ul className="space-y-1.5 text-xs">
          {sections.map((section, idx) => (
            <li key={idx} style={{ paddingLeft: section.level === "h3" ? "12px" : "0px" }}>
              <a
                href={`#${slugify(section.heading)}`}
                className="text-ink-secondary hover:text-accent font-medium transition-colors line-clamp-1 flex items-center gap-1"
              >
                <span className="text-[9px] text-ink-muted/50">&bull;</span>
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Educational Copy */}
      <div className="space-y-8">
        {sections.map((section, index) => {
          const HeadingTag = section.level ?? "h2";
          const headingSlug = slugify(section.heading);
          
          return (
            <React.Fragment key={index}>
              <section id={headingSlug} className="scroll-mt-28 space-y-4">
                <HeadingTag className={`font-bold tracking-tight text-ink ${
                  HeadingTag === "h2" ? "text-lg sm:text-xl border-l-2 border-accent pl-3 mt-8" : "text-base sm:text-lg pl-1"
                }`}>
                  {section.heading}
                </HeadingTag>

                {section.paragraphs && section.paragraphs.length > 0 && (
                  <div className="space-y-3.5">
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-[70ch]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {section.listItems && section.listItems.length > 0 && (
                  <ul className="space-y-2.5 list-none pl-1">
                    {section.listItems.map((item, liIndex) => {
                      // Support text formatting tags split on double dashes
                      const parts = item.split(" -- ");
                      const hasBoldPrefix = parts.length > 1;

                      return (
                        <li
                          key={liIndex}
                          className="flex items-start gap-3 text-sm sm:text-base text-ink-secondary leading-relaxed"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0 shadow-sm" />
                          <span>
                            {hasBoldPrefix ? (
                              <>
                                <strong className="font-semibold text-ink">{parts[0]}</strong>
                                <span className="text-ink-muted mx-1">&mdash;</span>
                                <span className="text-ink-secondary">{parts[1]}</span>
                              </>
                            ) : (
                              item
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>

              {/* Native In-Feed ad slot right in the middle of sections */}
              {index === 1 && index < sections.length - 1 && (
                <div className="py-4 border-y border-border/20 flex justify-center">
                  <AdLayoutSlot type="leaderboard" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Dwell-Time-Optimized BrainRank Feedback Widget */}
      <div className="mt-12 pt-8 border-t border-border/40 flex flex-col items-center text-center space-y-4">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-ink">Was this utility tool helpful?</h4>
          <p className="text-xs text-ink-muted">Your anonymous feedback helps us refine our tools and resources.</p>
        </div>

        <AnimatePresence mode="wait">
          {feedback === "none" ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => setFeedback("yes")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-border hover:border-accent hover:bg-accent-surface hover:text-accent transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Yes, helpful
              </button>
              
              <button
                onClick={() => setFeedback("no")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-border hover:border-red-500 hover:bg-red-500/5 hover:text-red-500 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                No, could improve
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="thankyou"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 px-4 py-2.5 rounded-xl shadow-sm"
            >
              {feedback === "yes"
                ? "Awesome! Thank you for the positive feedback. It fuels our development!"
                : "Thank you for letting us know! We will evaluate updates for this tool."}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </article>
  );
}