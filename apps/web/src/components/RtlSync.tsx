"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RtlSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const isAr = pathname.startsWith("/ar") && (pathname.length === 3 || pathname[3] === "/");
    if (isAr) {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.setAttribute("lang", "ar");
    } else {
      document.documentElement.removeAttribute("dir");
      document.documentElement.setAttribute("lang", "en");
    }
  }, [pathname]);

  return null;
}
