import type { Metadata } from "next";
import { LOCALES, SupportedLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import GuidesIndexClient from "@/components/GuidesIndexClient";

const BASE_URL = "https://zerowebtools.com";

export async function generateStaticParams() {
  return LOCALES.filter(lang => lang !== "en").map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: "Web Utility Guides & Resources | ZeroWebTools",
  description: "Learn how to compress PDFs, convert HEIC images, model startup equity, and more with our free 100% private web utilities.",
  alternates: {
    canonical: `${BASE_URL}/how-to`,
  },
};

export const dynamic = "force-static";

export default async function HowToIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") notFound();
  return (
    <div className="min-h-screen">
      <GuidesIndexClient lang={lang} />
    </div>
  );
}
