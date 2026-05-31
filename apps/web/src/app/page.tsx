import HomePageClient from "@/components/HomePageClient";
import { ALL_TOOLS } from "@/lib/tools";
import { Metadata } from "next";
import { getTranslations, getAlternateLanguages } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "ZeroWebTools - Free & Private Online Professional Web Tools & Utilities",
  description: "Free, fast, and completely secure client-side web utilities to edit PDFs, convert formats, check SaaS growth, and resize images. 100% private.",
  alternates: {
    canonical: "https://zerowebtools.com",
    languages: getAlternateLanguages(""),
  },
};

export default function Page() {
  const lang = "en";
  const t = getTranslations(lang);
  const baseUrl = "https://zerowebtools.com";
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is it completely free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, ZeroWebTools is 100% free. No subscriptions, no hidden fees, and no sign-up required."
        }
      },
      {
        "@type": "Question",
        "name": "Are my files uploaded to a server?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. All tools execute entirely client-side using WebAssembly in your browser. Your files never leave your device."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to download anything?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you do not need to install any apps or software. Everything works securely inside your web browser."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePageClient lang={lang} />
    </>
  );
}