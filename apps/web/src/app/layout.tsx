import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import SidebarSpaceReserver from "@/components/SidebarSpaceReserver";
import CommandCenter from "@/components/CommandCenter";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";


export const metadata: Metadata = {
  title: "ZeroWebTools - Free Online Professional Web Tools & Utilities",
  description:
    "ZeroWebTools provides free professional utility and developer tools running 100% client-side. Mortgage, Loan, HEIC converter, JSON Formatter, and PDF editors that run securely in your browser.",
  metadataBase: new URL("https://zerowebtools.com"),
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ZeroWebTools",
    title: "ZeroWebTools - Free Online Professional Web Tools",
    description: "Free, premium online tools and developer utilities that run 100% client-side for absolute privacy.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZeroWebTools - Free Browser-Based Professional Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroWebTools - Free Online Professional Web Tools",
    description: "Free, premium online tools and developer utilities that run 100% client-side for absolute privacy.",
    images: ["/og-image.png"],
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
        <div className="flex items-center justify-between h-16">
          {/* Logo only visible on mobile (since sidebar is hidden on mobile) */}
          <Link
            href="/"
            className="flex md:hidden items-center gap-2 group active:scale-[0.98] transition-transform duration-200"
          >
            <img src="/logo.png" alt="ZeroWebTools" className="w-7 h-7 rounded-lg shadow-sm object-contain" />
            <span className="font-bold tracking-tight text-sm text-ink">ZeroWebTools</span>
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
        <ScrollToTop />
        
        {/* Main Application Container */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <Header />
          <div className="flex-1 overflow-y-auto page-scroll-container">
            <main className="flex-grow">{children}</main>
          </div>
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