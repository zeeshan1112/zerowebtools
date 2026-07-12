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
    title: `${t.privacyTitle || "Privacy Policy"} - ZeroWebTools`,
    description: t.privacyDataColDesc || "Privacy policy for ZeroWebTools",
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getTranslations(lang as SupportedLocale);

  return (
    <div className="min-h-[100dvh]">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <h1 className="text-3xl md:text-5xl tracking-tighter leading-none font-semibold text-ink">
          {t.privacyTitle || "Privacy Policy"}
        </h1>
        <div className="mt-12 space-y-8 text-ink-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.privacyDataColTitle || "Data Collection"}
            </h2>
            <p className="mt-3">
              {t.privacyDataColDesc || "ZeroWebTools operates entirely within your browser..."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.privacyCookiesTitle || "Cookies and Analytics"}
            </h2>
            <p className="mt-3">
              {t.privacyCookiesDesc || "We may use essential cookies..."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.privacyThirdPartyTitle || "Third-Party Services"}
            </h2>
            <p className="mt-3">
              {t.privacyThirdPartyDesc || "Google AdSense may use cookies..."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.privacyContactTitle || "Contact"}
            </h2>
            <p className="mt-3">
              {t.privacyContactDesc || "For privacy-related inquiries, contact us directly at "}{" "}
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
