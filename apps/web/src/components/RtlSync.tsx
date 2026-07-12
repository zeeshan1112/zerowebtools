"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RtlSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Determine current route's locale
    const segments = pathname.split("/");
    const firstSegment = segments[1];
    const isLocalePrefix = ["es", "de", "fr", "pt", "ja", "zh", "hi", "it", "ar"].includes(firstSegment);
    const routeLocale = isLocalePrefix ? firstSegment : "en";

    // RTL and Lang attributes
    const isAr = routeLocale === "ar";
    if (isAr) {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.documentElement.removeAttribute("dir");
      document.documentElement.setAttribute("lang", routeLocale);
    }

    // Locale Caching and Redirection
    try {
      const preferred = localStorage.getItem("preferred_locale");
      
      // If user landed directly on a localized page, save it as preferred
      if (routeLocale !== "en" && preferred !== routeLocale) {
        localStorage.setItem("preferred_locale", routeLocale);
      } 
      // If they are on an English page but prefer another language
      else if (routeLocale === "en" && preferred && preferred !== "en") {
        // Only redirect if they are on a translatable page
        const englishOnlyPaths = ["/compare", "/recipes", "/conversions", "/privacy", "/terms", "/extensions"];
        const isEnglishOnly = englishOnlyPaths.some(p => pathname.startsWith(p));
        
        if (!isEnglishOnly) {
          // They clicked a link like `/tools/pdf-merge` or `/` but prefer `es`
          const newPath = `/${preferred}${pathname === "/" ? "" : pathname}`;
          window.location.replace(newPath);
        }
      }
    } catch (e) {}

  }, [pathname]);

  return null;
}
