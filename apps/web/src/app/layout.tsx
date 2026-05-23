import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import SidebarSpaceReserver from "@/components/SidebarSpaceReserver";
import CommandCenter from "@/components/CommandCenter";
import "./globals.css";


export const metadata: Metadata = {
  title: "ZeelanceBox - Free Online Calculators & Professional Web Tools",
  description:
    "ZeelanceBox provides free online calculators and developer tools running 100% client-side. Mortgage, Loan, HEIC converter, JSON Formatter, and PDF editors that run securely in your browser.",
  metadataBase: new URL("https://zeelancebox.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ZeelanceBox",
    title: "ZeelanceBox - Free Online Calculators & Web Tools",
    description: "Free, premium online tools and calculators that run 100% client-side for absolute privacy.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ADSENSE_CLIENT_ID = "ca-pub-XXXXXXXXXXXXXXXX";

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface/70 backdrop-blur-md border-b border-border/40 shrink-0 select-none transition-all duration-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo only visible on mobile (since sidebar is hidden on mobile) */}
          <Link
            href="/"
            className="flex md:hidden items-center gap-2 group active:scale-[0.98] transition-transform duration-200"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-sm">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="text-white">
                <path d="M3 2h8v2H3V2zm0 4h5v2H3V6zm0 4h8v2H3v-2z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-bold tracking-tight text-sm text-ink">ZeelanceBox</span>
          </Link>
          
          <div className="hidden md:block" />

          <div className="flex items-center gap-4">
            <CommandCenter />
            <Link
              href="/privacy"
              className="text-xs text-ink-secondary hover:text-accent font-semibold transition-colors duration-200"
            >
              Privacy
            </Link>
            <span className="w-px h-3 bg-border/80" />
            <Link
              href="/terms"
              className="text-xs text-ink-secondary hover:text-accent font-semibold transition-colors duration-200"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  var s = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (t === 'dark' || (!t && s)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-surface text-ink font-sans min-h-screen flex transition-colors duration-200">
        {/* outer wrapper to reserve space on desktop and prevent layout jumping */}
        <SidebarSpaceReserver />
        
        {/* Main Application Container */}
        <div className="flex-1 flex flex-col h-screen overflow-y-auto">
          <Header />
          <main className="flex-grow">{children}</main>
        </div>

        <Script
          id="adsense-script"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}