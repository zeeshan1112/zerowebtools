import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import SidebarSpaceReserver from "@/components/SidebarSpaceReserver";
import CommandCenter from "@/components/CommandCenter";
import ScrollToTop from "@/components/ScrollToTop";
import MobileDrawer from "@/components/MobileDrawer";
import Analytics from "@/components/Analytics";
import "./globals.css";


export const metadata: Metadata = {
  title: "ZeroWebTools - Free Online Professional Web Tools & Utilities",
  description:
    "Free, instant, and 100% private web tools — PDF editor, HEIC converter, JSON formatter, SaaS growth modeler, and more. No signup, no server uploads. Everything runs in your browser.",
  metadataBase: new URL("https://zerowebtools.com"),
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ZeroWebTools",
    title: "ZeroWebTools — Free Web Tools That Never Upload Your Data",
    description: "Merge PDFs, convert HEIC, format JSON, model MRR growth, and more — all 100% private and instant. No signup, no servers, no tracking.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ZeroWebTools — Free Browser-Based Professional Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroWebTools — Free Web Tools That Never Upload Your Data",
    description: "Merge PDFs, convert HEIC, format JSON, model MRR growth, and more — all 100% private and instant. No signup, no servers.",
    images: ["/logo.png"],
  },
  verification: {
    other: {
      "msvalidate.01": "CDF578F6D13EC54F2BF44888BF0B7E5D",
    },
  },
  alternates: {
    canonical: "https://zerowebtools.com",
    languages: {
      "en": "https://zerowebtools.com",
      "x-default": "https://zerowebtools.com",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ADSENSE_CLIENT_ID = "ca-pub-XXXXXXXXXXXXXXXX";

function Header() {
  return (
    <header className="relative z-40 bg-surface border-b border-border/40 shrink-0 select-none">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Left side: hamburger + logo on mobile */}
          <div className="flex items-center gap-1">
            <MobileDrawer />
            <Link
              href="/"
              className="flex md:hidden items-center gap-2 group active:scale-[0.98] transition-transform duration-200"
            >
              <img src="/logo.png" alt="ZeroWebTools" className="w-7 h-7 rounded-lg shadow-sm object-contain" />
              <span className="font-bold tracking-tight text-sm text-ink">ZeroWebTools</span>
            </Link>
          </div>
          
          <div className="hidden md:block" />

          <div className="flex items-center gap-2 sm:gap-4">
            <CommandCenter />
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
        <ScrollToTop />
        
        {/* Main Application Container */}
        <div className="flex-1 flex flex-col h-[100dvh] md:h-screen overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto page-scroll-container">
            <main className="flex-grow">{children}</main>
            
            {/* Global Footer */}
            <footer className="mt-auto border-t border-border/40 py-8 px-6 text-center select-none bg-surface">
              <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-ink-secondary">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 uppercase tracking-wider font-bold">
                  <Link href="/how-to" className="hover:text-accent transition-colors duration-200">
                    Guides & Resources
                  </Link>
                  <Link href="/privacy" className="hover:text-accent transition-colors duration-200">
                    Privacy
                  </Link>
                  <Link href="/terms" className="hover:text-accent transition-colors duration-200">
                    Terms
                  </Link>
                </div>
                <div className="flex items-center gap-2 group">
                  <svg className="w-4 h-4 text-ink-muted group-hover:text-accent transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:support@zerowebtools.com" className="font-mono hover:text-ink transition-colors duration-200">
                    support@zerowebtools.com
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>

        <Script
          id="adsense-script"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Analytics />
      </body>
    </html>
  );
}