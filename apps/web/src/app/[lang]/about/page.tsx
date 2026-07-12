import type { Metadata } from "next";
import { getTranslations, getAlternateLanguages, LOCALES, SupportedLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return LOCALES.filter((lang) => lang !== "en").map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") return {};

  const t = getTranslations(lang);
  
  return {
    title: `${t.aboutTitle} - ZeroWebTools`,
    description: t.aboutMissionP1,
    alternates: {
      canonical: `https://zerowebtools.com/${lang}/about`,
      languages: getAlternateLanguages("/about"),
    },
    openGraph: {
      title: `${t.aboutTitle} - ZeroWebTools`,
      description: t.aboutMissionP1,
      type: "website",
      url: `https://zerowebtools.com/${lang}/about`,
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
      title: `${t.aboutTitle} - ZeroWebTools`,
      description: t.aboutMissionP1,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") notFound();
  
  const t = getTranslations(lang);

  return (
    <div className="min-h-[100dvh]">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        <h1 className="text-3xl md:text-5xl tracking-tighter leading-none font-semibold text-ink">
          {t.aboutTitle}
        </h1>
        <div className="mt-12 space-y-8 text-ink-muted leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.aboutMission}
            </h2>
            <p>{t.aboutMissionP1}</p>
            <p>{t.aboutMissionP2}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.aboutArchitecture}
            </h2>
            <p>{t.aboutArchitectureP1}</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong className="text-ink">{t.aboutArchList1.split(':')[0]}:</strong> {t.aboutArchList1.split(':').slice(1).join(':')}
              </li>
              <li>
                <strong className="text-ink">{t.aboutArchList2.split(':')[0]}:</strong> {t.aboutArchList2.split(':').slice(1).join(':')}
              </li>
              <li>
                <strong className="text-ink">{t.aboutArchList3.split(':')[0]}:</strong> {t.aboutArchList3.split(':').slice(1).join(':')}
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.aboutOpenSource}
            </h2>
            <p>
              {t.aboutOpenSourceP1}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-ink tracking-tight">
              {t.aboutWhoWeAre}
            </h2>
            <p>{t.aboutWhoWeAreP1}</p>
          </section>
        </div>
      </main>
    </div>
  );
}
