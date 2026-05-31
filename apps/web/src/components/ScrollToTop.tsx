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
    
    const forceScrollTop = () => {
      if (scrollContainer) scrollContainer.scrollTo({ top: 0, left: 0, behavior: "instant" });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    // Fire immediately
    forceScrollTop();
    
    // Fire sequentially to catch Next.js DOM paints and lazy image loads
    const t1 = setTimeout(forceScrollTop, 50);
    const t2 = setTimeout(forceScrollTop, 150);
    const t3 = setTimeout(forceScrollTop, 350);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  return null;
}
