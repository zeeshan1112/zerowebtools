import type { Metadata } from "next";
import { getTranslations, getAlternateLanguages, LOCALES, SupportedLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import ContactForm from "./ContactForm";

export async function generateStaticParams() {
  return LOCALES.filter((lang) => lang !== "en").map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") return {};

  const t = getTranslations(lang);

  return {
    title: `${t.contactTitle} - ZeroWebTools`,
    description: t.contactSubtitle,
    alternates: {
      canonical: `https://zerowebtools.com/${lang}/contact`,
      languages: getAlternateLanguages("/contact"),
    },
    openGraph: {
      title: `${t.contactTitle} - ZeroWebTools`,
      description: t.contactSubtitle,
      type: "website",
      url: `https://zerowebtools.com/${lang}/contact`,
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
      title: `${t.contactTitle} - ZeroWebTools`,
      description: t.contactSubtitle,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") notFound();

  const t = getTranslations(lang);

  return (
    <div className="min-h-[100dvh]">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <h1 className="text-3xl md:text-5xl tracking-tighter leading-none font-semibold text-ink">
          {t.contactTitle}
        </h1>
        <p className="mt-4 text-ink-secondary text-sm">
          {t.contactSubtitle}
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Direct Channels */}
          <div className="space-y-6">
            <div className="p-6 bg-surface-elevated rounded-2xl border border-border/50">
              <h2 className="text-base font-bold text-ink uppercase tracking-wider mb-3">
                {t.contactEmailLabel}
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {t.contactEmailDesc}
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
                {t.contactRequestLabel}
              </h2>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {t.contactRequestDesc}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm lang={lang} />
        </div>
      </main>
    </div>
  );
}
