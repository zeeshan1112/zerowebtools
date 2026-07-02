"use client";

import React, { useEffect, useRef } from "react";

type AdSlotType = "leaderboard" | "rectangle" | "anchor";

interface AdLayoutSlotProps {
  type: AdSlotType;
  className?: string;
  slotId?: string;
}

const AD_DIMENSIONS: Record<
  AdSlotType,
  { width: string; height: string; label: string; format: string }
> = {
  leaderboard: {
    width: "728px",
    height: "90px",
    label: "Sponsored Extension",
    format: "horizontal",
  },
  rectangle: {
    width: "300px",
    height: "250px",
    label: "Developer Spotlight",
    format: "rectangle",
  },
  anchor: {
    width: "100%",
    height: "90px",
    label: "Sponsored Extension",
    format: "horizontal",
  },
};

/**
 * AdSense Layout Guard — reserves exact pixel dimensions for ad units
 * before the ad network script loads, ensuring CLS stays at 0.
 * In development or when publisher ID is missing, displays a beautiful mock skeleton.
 */
export default function AdLayoutSlot({ type, className = "", slotId }: AdLayoutSlotProps) {
  const dims = AD_DIMENSIONS[type];
  const isLoaded = useRef(false);

  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-4462229908260280";
  const isDemo = adsenseClientId === "ca-pub-XXXXXXXXXXXXXXXX" || process.env.NODE_ENV === "development";

  useEffect(() => {
    if (isDemo || isLoaded.current) return;

    try {
      // Safely initialize the ad unit once mounted on the client
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
      isLoaded.current = true;
    } catch (err) {
      console.error("AdSense slot initialization error:", err);
    }
  }, [isDemo]);

  if (isDemo) {
    return (
      <div
        className={`flex items-center justify-center my-6 transition-all duration-300 ${className}`}
        style={{ width: dims.width, height: dims.height, maxWidth: "100%" }}
      >
        <div
          className="w-full h-full rounded-2xl border border-dashed border-border/80 bg-surface/50 dark:bg-surface-elevated/20 flex flex-col items-center justify-center overflow-hidden hover:border-accent/40 hover:bg-accent-surface/5 relative group"
          aria-label={dims.label}
          role="complementary"
        >
          {/* Shimmer animation layer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--border-subtle) 40%, transparent 80%)",
              animation: "shimmer 2.5s ease-in-out infinite",
            }}
          />

          {/* Skeleton content bar */}
          <div className="absolute inset-0 flex items-center justify-center z-10 select-none">
            <div className="flex items-center gap-2 text-ink-muted group-hover:text-accent transition-colors duration-300 text-xs font-semibold uppercase tracking-wider">
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="opacity-60 text-ink-muted group-hover:text-accent transition-colors"
              >
                <rect
                  x="1"
                  y="1"
                  width="14"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="4"
                  y1="5.5"
                  x2="12"
                  y2="5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="4"
                  y1="8.5"
                  x2="10"
                  y2="8.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <line
                  x1="4"
                  y1="11.5"
                  x2="7"
                  y2="11.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span>{dims.label}</span>
            </div>
          </div>

          {/* CSS Keyframes Shimmer Animation Fallback */}
          <style jsx global>{`
            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center my-6 overflow-hidden ${className}`}
      style={{ width: dims.width, height: dims.height, maxWidth: "100%" }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "100%" }}
        data-ad-client={adsenseClientId}
        data-ad-slot={slotId || "YOUR_DEFAULT_SLOT_ID"}
        data-ad-format={dims.format}
        data-full-width-responsive="true"
      />
    </div>
  );
}