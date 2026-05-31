"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CommandCenter from "./CommandCenter";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileDrawer from "./MobileDrawer";
import { LOCALES, SupportedLocale } from "@/lib/i18n";

export default function Header() {
  const pathname = usePathname();

  const segments = pathname ? pathname.split("/") : [];
  const firstSegment = segments[1] as SupportedLocale;
  const currentLocale = LOCALES.includes(firstSegment) && firstSegment !== "en"
    ? firstSegment
    : "";

  const getLocalizedHref = (path: string) => {
    if (!currentLocale) return path;
    return `/${currentLocale}${path === "/" ? "" : path}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-lg border-b border-border/40 shrink-0 select-none">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Left side: hamburger + logo on mobile */}
          <div className="flex items-center gap-1">
            <MobileDrawer />
            <Link
              href={getLocalizedHref("/")}
              className="flex md:hidden items-center gap-2 group active:scale-[0.98] transition-transform duration-200"
            >
              <img src="/logo.png" alt="ZeroWebTools" className="w-7 h-7 rounded-lg shadow-sm object-contain" />
              <span className="font-bold tracking-tight text-sm text-ink">ZeroWebTools</span>
            </Link>
          </div>
          
          <div className="hidden md:block" />

          <div className="flex items-center gap-2 sm:gap-4">
            <CommandCenter />
            <LanguageSwitcher />
            <Link
              href="/privacy"
              className="hidden sm:flex items-center text-xs text-ink-secondary hover:text-accent font-semibold transition-colors duration-200 py-2 px-1 min-h-[44px]"
            >
              Privacy
            </Link>
            <span className="hidden sm:block w-px h-3 bg-border/80" />
            <Link
              href="/terms"
              className="hidden sm:flex items-center text-xs text-ink-secondary hover:text-accent font-semibold transition-colors duration-200 py-2 px-1 min-h-[44px]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
