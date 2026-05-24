import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Privacy Policy - ZeroWebTools",
  description:
    "Privacy policy for ZeroWebTools — learn how we protect your data with 100% client-side processing. No server uploads, no tracking, no data collection.",
  alternates: {
    canonical: "https://zerowebtools.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy - ZeroWebTools",
    description:
      "ZeroWebTools processes all tools entirely in your browser. Your files and data never leave your device.",
    type: "website",
    url: "https://zerowebtools.com/privacy",
    siteName: "ZeroWebTools",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy - ZeroWebTools",
    description:
      "100% client-side processing. Your files and data never leave your device.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-[100dvh]">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <h1 className="text-3xl md:text-5xl tracking-tighter leading-none font-semibold text-ink">
          Privacy Policy
        </h1>
        <div className="mt-12 space-y-8 text-ink-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              Data Collection
            </h2>
            <p className="mt-3">
              ZeroWebTools operates entirely within your browser. No personal
              data, tool inputs, or processing results are transmitted to any
              server. All computations execute client-side using JavaScript.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              Cookies and Analytics
            </h2>
            <p className="mt-3">
              We may use essential cookies for site functionality and third-party
              analytics cookies to understand usage patterns. Google AdSense may
              serve advertisements using cookies as described in Google&apos;s
              advertising policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              Third-Party Services
            </h2>
            <p className="mt-3">
              Google AdSense may use cookies and web beacons to serve
              advertisements based on prior visits. Users may opt out of
              personalized advertising through Google Ads Settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              Contact
            </h2>
            <p className="mt-3">
              For privacy-related inquiries, contact us through the information
              provided on our website.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}