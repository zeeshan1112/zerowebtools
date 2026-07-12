import { getTranslations, SupportedLocale } from "@/lib/i18n";
import { Metadata } from "next";

export async function generateStaticParams() {
  const { LOCALES } = await import("@/lib/i18n");
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getTranslations(lang as SupportedLocale);
  return {
    title: `${t.termsTitle || "Terms of Service"} - ZeroWebTools`,
    description: t.termsUseDesc || "Terms of service for ZeroWebTools",
  };
}

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getTranslations(lang as SupportedLocale);

  return (
    <div className="min-h-[100dvh]">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <h1 className="text-3xl md:text-5xl tracking-tighter leading-none font-semibold text-ink">
          {t.termsTitle || "Terms of Service"}
        </h1>
        <div className="mt-12 space-y-8 text-ink-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.termsUseTitle || "Use of Service"}
            </h2>
            <p className="mt-3">
              {t.termsUseDesc}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.termsWarrantiesTitle || "Disclaimer of Warranties"}
            </h2>
            <p className="mt-3">
              {t.termsWarrantiesDesc}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.termsIPTitle || "Intellectual Property"}
            </h2>
            <p className="mt-3">
              {t.termsIPDesc}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.termsAdsTitle || "Advertising"}
            </h2>
            <p className="mt-3">
              {t.termsAdsDesc}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.termsChangesTitle || "Changes to Terms"}
            </h2>
            <p className="mt-3">
              {t.termsChangesDesc}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.termsContactTitle || "Contact"}
            </h2>
            <p className="mt-3">
              {t.termsContactDesc}{" "}
              <a
                href="mailto:support@zerowebtools.com"
                className="text-accent hover:underline"
              >
                support@zerowebtools.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}