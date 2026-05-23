"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  // Disable native browser scroll restoration to prevent erratic scrolling on route change
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector(".page-scroll-container");
    if (scrollContainer) {
      // Immediate scroll to top
      scrollContainer.scrollTo({ top: 0, behavior: "instant" });
      
      // Safeguard: Scroll again after layout settles to prevent Next.js race conditions
      const handle = setTimeout(() => {
        scrollContainer.scrollTo({ top: 0, behavior: "instant" });
      }, 50);
      
      return () => clearTimeout(handle);
    }
  }, [pathname]);

  return null;
}
