import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import SidebarSpaceReserver from "@/components/SidebarSpaceReserver";
import Analytics from "@/components/Analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RtlSync from "@/components/RtlSync";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "ZeroWebTools - Free Online Professional Web Tools & Utilities",
  description:
    "Free, instant, and 100% private web tools — PDF editor, HEIC converter, JSON formatter, SaaS growth modeler, and more. No signup, no server uploads. Everything runs in your browser.",
  metadataBase: new URL("https://zerowebtools.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <head>
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
                  
                  // Dynamic RTL & Lang adjustment for Arabic
                  var p = window.location.pathname;
                  if (p.indexOf('/ar') === 0 || p.indexOf('/ar/') === 0) {
                    document.documentElement.setAttribute('dir', 'rtl');
                    document.documentElement.setAttribute('lang', 'ar');
                  } else {
                    document.documentElement.removeAttribute('dir');
                    document.documentElement.setAttribute('lang', 'en');
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
        <RtlSync />
        
        {/* Main Application Container */}
        <div className="flex-1 flex flex-col min-h-[100dvh] md:min-h-screen">
          <Header />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
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