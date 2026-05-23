import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
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

function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-surface/70 backdrop-blur-xl border-b border-border/50 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 group active:scale-[0.98] transition-transform duration-200"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-accent to-emerald-400 flex items-center justify-center shadow-md shadow-accent/10 transition-transform group-hover:scale-105">
              <svg
                width="15"
                height="15"
                viewBox="0 0 14 14"
                fill="none"
                className="text-white"
              >
                <path
                  d="M3 2h8v2H3V2zm0 4h5v2H3V6zm0 4h8v2H3v-2z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-semibold tracking-tight text-lg bg-gradient-to-r from-ink via-ink to-ink-secondary bg-clip-text text-transparent">
              ZeelanceBox
            </span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6 text-sm">
            <Link
              href="/#pdf-tools"
              className="text-ink-secondary hover:text-accent font-medium transition-colors duration-200 hidden sm:inline"
            >
              PDF Tools
            </Link>
            <Link
              href="/#converters"
              className="text-ink-secondary hover:text-accent font-medium transition-colors duration-200 hidden sm:inline"
            >
              Converters
            </Link>
            <Link
              href="/privacy"
              className="text-ink-secondary hover:text-accent font-medium transition-colors duration-200"
            >
              Privacy
            </Link>
            <span className="w-px h-4 bg-border/80 hidden sm:inline" />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border-subtle mt-24 bg-surface-elevated/40">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-accent to-emerald-400 flex items-center justify-center">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M3 2h8v2H3V2zm0 4h5v2H3V6zm0 4h8v2H3v-2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="font-bold tracking-tight text-ink">ZeelanceBox</span>
            </Link>
            <p className="text-sm text-ink-secondary leading-relaxed max-w-[32ch]">
              Free professional-grade developer utilities and financial tools running 100% locally. Zero server latency, absolute data privacy.
            </p>
            <div className="flex items-center gap-2.5 text-xs text-ink-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              100% Client-Side Processing
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-ink uppercase tracking-wider">PDF Suite</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Merge PDF", href: "/tools/pdf-merge" },
                { label: "Split PDF", href: "/tools/pdf-split" },
                { label: "Compress PDF", href: "/tools/pdf-compress" },
                { label: "Rotate PDF", href: "/tools/pdf-rotate" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted hover:text-accent transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-ink uppercase tracking-wider">Converters</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "HEIC to JPG", href: "/tools/heic-to-jpg" },
                { label: "JSON Formatter", href: "/tools/json-formatter" },
                { label: "Case Converter", href: "/tools/case-converter" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted hover:text-accent transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-ink uppercase tracking-wider">Calculators</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Mortgage", href: "/#mortgage-loan" },
                { label: "Investment", href: "/#investment-tax" },
                { label: "Health", href: "/#health-fitness" },
                { label: "Percentage", href: "/#math-percentage" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-muted hover:text-accent transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-ink uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-ink-muted hover:text-accent transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-ink-muted hover:text-accent transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-4">
          <p>Designed with absolute privacy in mind. Zero data leaves your device.</p>
          <p>
            &copy; {new Date().getFullYear()} ZeelanceBox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
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
      <body className="bg-surface text-ink font-sans min-h-[100dvh] flex flex-col transition-colors duration-200">
        <Nav />
        <main className="flex-grow">{children}</main>
        <Footer />
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