import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Terms of Service - ZeroWebTools",
  description:
    "Terms of service for ZeroWebTools — free browser-based PDF tools, image converters, and developer utilities with 100% client-side processing.",
  alternates: {
    canonical: "https://zerowebtools.com/terms",
  },
  openGraph: {
    title: "Terms of Service - ZeroWebTools",
    description:
      "Terms governing the use of ZeroWebTools free browser-based utility tools.",
    type: "website",
    url: "https://zerowebtools.com/terms",
    siteName: "ZeroWebTools",
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
    title: "Terms of Service - ZeroWebTools",
    description:
      "Terms governing the use of ZeroWebTools free browser-based utility tools.",
    images: ["/logo.png"],
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-[100dvh]">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <h1 className="text-3xl md:text-5xl tracking-tighter leading-none font-semibold text-ink">
          Terms of Service
        </h1>
        <div className="mt-12 space-y-8 text-ink-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              Use of Service
            </h2>
            <p className="mt-3">
              ZeroWebTools provides free, browser-based developer utility tools.
              By using these tools, you agree to these terms. All tools process
              data locally in your browser; no data is sent to external servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              Disclaimer of Warranties
            </h2>
            <p className="mt-3">
              The tools are provided &quot;as is&quot; without warranty of any kind.
              We make no guarantees about accuracy, reliability, or fitness for
              a particular purpose. Use results at your own discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              Intellectual Property
            </h2>
            <p className="mt-3">
              The ZeroWebTools website design, code, and branding are protected
              by intellectual property laws. You may not reproduce, modify, or
              distribute the site&apos;s source code without explicit permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              Advertising
            </h2>
            <p className="mt-3">
              ZeroWebTools displays third-party advertisements through Google
              AdSense. These ads are subject to Google&apos;s own terms and
              privacy policies. We are not responsible for third-party ad
              content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              Changes to Terms
            </h2>
            <p className="mt-3">
              We reserve the right to update these terms at any time. Continued
              use of the site after changes constitutes acceptance of the
              updated terms.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}