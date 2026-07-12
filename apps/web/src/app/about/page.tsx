import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - ZeroWebTools",
  description:
    "Learn about ZeroWebTools — a collection of 100% client-side, privacy-first developer utilities and converter tools designed to keep your data secure.",
  alternates: {
    canonical: "https://zerowebtools.com/about",
  },
  openGraph: {
    title: "About Us - ZeroWebTools",
    description:
      "ZeroWebTools is an independent directory of professional developer utilities that process data entirely inside your browser's local sandbox.",
    type: "website",
    url: "https://zerowebtools.com/about",
    siteName: "ZeroWebTools",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 675,
        alt: "About ZeroWebTools — Local Browser-Based Professional Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - ZeroWebTools",
    description:
      "100% client-side, privacy-first developer utilities. Your data never leaves your device.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh]">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <h1 className="text-3xl md:text-5xl tracking-tighter leading-none font-semibold text-ink">
          About ZeroWebTools
        </h1>
        <div className="mt-12 space-y-8 text-ink-muted leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              Our Mission
            </h2>
            <p>
              ZeroWebTools was founded with a simple but critical mission: to provide developers, system administrators, and content creators with a premium, lightning-fast suite of utility tools that respects their data privacy.
            </p>
            <p>
              Standard online tools—such as PDF compilers, JSON formatters, or base64 decoders—frequently upload your files, tokens, and sensitive logs to remote servers for processing. This exposes proprietary code, customer records, and secure tokens to potential interception or data leaks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              100% Client-Side Architecture
            </h2>
            <p>
              To solve this vulnerability, we built ZeroWebTools with a **privacy-first local architecture**. Every tool in our catalog of 57+ resources runs entirely within your browser context:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong className="text-ink">Zero Server Uploads:</strong> Your documents, code blocks, and parameters never leave your local computer.
              </li>
              <li>
                <strong className="text-ink">WebAssembly Power:</strong> Heavy operations like image conversions and PDF rendering are compiled directly into WebAssembly (Wasm) and executed client-side at native speed.
              </li>
              <li>
                <strong className="text-ink">Offline Support:</strong> Because no server-side computing is required, our tools can be accessed and operated entirely offline.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              Open Companion Extensions
            </h2>
            <p>
              For advanced features like local CORS requests and webpage content scraping, we maintain the open-source **ZeroWebTools Companion** extension. Like our web platform, the companion runs fully client-side and performs zero remote logging or analytics.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              Who We Are
            </h2>
            <p>
              We are an independent, developer-driven team dedicated to building a cleaner, safer web platform. ZeroWebTools is free to use, and we support our development and hosting costs entirely through clean, non-intrusive ad networks.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
