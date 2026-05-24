"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProcessingOverlayProps {
  isOpen: boolean;
  loadingText?: string;
  steps: string[];
  duration?: number; // Total simulated duration in ms
  onFinished: () => void;
}

export default function ProcessingOverlay({
  isOpen,
  loadingText = "Processing your files...",
  steps,
  duration = 3500,
  onFinished,
}: ProcessingOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  // Reset states when opened
  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setCurrentStepIndex(0);
      startTimeRef.current = performance.now();

      const animate = (time: number) => {
        if (startTimeRef.current === null) return;
        const elapsed = time - startTimeRef.current;
        const currentProgress = Math.min((elapsed / duration) * 100, 100);
        
        setProgress(currentProgress);

        // Determine step index based on progress segment
        const stepSegment = 100 / steps.length;
        const nextStepIndex = Math.min(
          Math.floor(currentProgress / stepSegment),
          steps.length - 1
        );
        setCurrentStepIndex(nextStepIndex);

        if (currentProgress < 100) {
          requestRef.current = requestAnimationFrame(animate);
        } else {
          // Allow a brief pause at 100% for user satisfaction before triggering finalization
          setTimeout(() => {
            onFinished();
          }, 300);
        }
      };

      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isOpen, steps.length, duration, onFinished]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-zinc-950/40 dark:bg-black/60 backdrop-blur-md"
        />

        {/* Processing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-ink">{loadingText}</h3>
            <p className="text-xs text-ink-muted">Please keep this tab open</p>
          </div>

          {/* Progress Circular/Linear indicator */}
          <div className="my-6 space-y-2">
            <div className="flex justify-between items-center text-xs text-ink-muted font-mono font-medium">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              {/* Glow background bar */}
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-accent/70 to-accent"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
              <motion.div
                className="absolute top-0 bottom-0 left-0 w-8 bg-white/20 blur-sm animate-pulse"
                style={{ left: `${progress - 5}%` }}
              />
            </div>
          </div>

          {/* Step checklist */}
          <div className="space-y-3 bg-zinc-50/50 dark:bg-zinc-900/30 border border-border/60 rounded-xl p-4">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isActive = idx === currentStepIndex;
              const isUpcoming = idx > currentStepIndex;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 text-xs transition-opacity duration-200 ${
                    isUpcoming ? "opacity-40" : "opacity-100"
                  }`}
                >
                  {/* Status Indicator Icon */}
                  <div className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full">
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center"
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" strokeWidth={3.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                        </svg>
                      </motion.div>
                    ) : isActive ? (
                      <div className="relative w-4 h-4">
                        <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                      </div>
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-zinc-300 dark:border-zinc-700 bg-transparent" />
                    )}
                  </div>

                  {/* Step Label */}
                  <span
                    className={`font-medium ${
                      isActive
                        ? "text-accent font-bold"
                        : isCompleted
                        ? "text-ink-muted line-through decoration-zinc-300 dark:decoration-zinc-700"
                        : "text-ink-secondary"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
