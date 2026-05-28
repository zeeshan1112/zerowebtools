import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CONVERSIONS } from "@/lib/conversions";
import ConversionPairingClient from "@/components/ConversionPairingClient";

interface ConversionPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return CONVERSIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: ConversionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pairing = CONVERSIONS.find((c) => c.slug === slug);
  if (!pairing) return { title: "Conversion Not Found" };

  const canonicalUrl = `https://zerowebtools.com/conversions/${slug}`;
  const pageTitle = `${pairing.fromFormat} to ${pairing.toFormat} Converter — Free & Local | ZeroWebTools`;

  return {
    title: pageTitle,
    description: pairing.metaDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pairing.metaDescription,
      type: "article",
      url: canonicalUrl,
      siteName: "ZeroWebTools",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pairing.metaDescription,
    },
  };
}

export default async function ConversionPage({ params }: ConversionPageProps) {
  const { slug } = await params;
  const pairing = CONVERSIONS.find((c) => c.slug === slug);
  if (!pairing) notFound();

  // Generate Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://zerowebtools.com/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `Convert ${pairing.fromFormat} to ${pairing.toFormat}`,
        "item": `https://zerowebtools.com/conversions/${slug}`,
      },
    ],
  };

  const faqSchema = pairing.faqs && pairing.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pairing.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ConversionPairingClient pairing={pairing} />
    </div>
  );
}
