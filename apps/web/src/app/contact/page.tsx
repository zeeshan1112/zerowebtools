import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - ZeroWebTools",
  description:
    "Get in touch with the ZeroWebTools support team. Report bugs, suggest new client-side tools, or send feedback.",
  alternates: {
    canonical: "https://zerowebtools.com/contact",
  },
  openGraph: {
    title: "Contact Us - ZeroWebTools",
    description:
      "Have a tool suggestion or found a bug? Reach out to the ZeroWebTools developer team directly.",
    type: "website",
    url: "https://zerowebtools.com/contact",
    siteName: "ZeroWebTools",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 675,
        alt: "Contact ZeroWebTools — Local Browser-Based Professional Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - ZeroWebTools",
    description:
      "Get in touch with the ZeroWebTools support team. Report bugs or suggest new client-side tools.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-[100dvh]">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <h1 className="text-3xl md:text-5xl tracking-tighter leading-none font-semibold text-ink">
          Contact Support
        </h1>
        <p className="mt-4 text-ink-secondary text-sm">
          Have a question, feedback, tool request, or bug report? Get in touch with us directly. We respond to all technical inquiries within 24–48 hours.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Direct Channels */}
          <div className="space-y-6">
            <div className="p-6 bg-surface-elevated rounded-2xl border border-border/50">
              <h2 className="text-base font-bold text-ink uppercase tracking-wider mb-3">
                Email Address
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                For general support, API queries, or corporate licensing requests, email us directly:
              </p>
              <div className="mt-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:support@zerowebtools.com"
                  className="font-mono text-xs font-bold text-ink hover:text-accent transition-colors"
                >
                  support@zerowebtools.com
                </a>
              </div>
            </div>

            <div className="p-6 bg-surface-elevated rounded-2xl border border-border/50">
              <h2 className="text-base font-bold text-ink uppercase tracking-wider mb-3">
                Request a Tool
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                ZeroWebTools is constantly expanding. If there is a client-side calculation or conversion utility you need that is not in our current 57+ catalog, submit a feature request!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </main>
    </div>
  );
}
