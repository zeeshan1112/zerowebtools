import type { Metadata } from "next";
import { getAlternateLanguages } from "@/lib/i18n";
import GuidesIndexClient from "@/components/GuidesIndexClient";

const BASE_URL = "https://zerowebtools.com";

export const metadata: Metadata = {
  title: "Web Utility Guides & Resources | ZeroWebTools",
  description: "Learn how to compress PDFs, convert HEIC images, model startup equity, and more with our free 100% private web utilities.",
  alternates: {
    canonical: `${BASE_URL}/how-to`,
    languages: getAlternateLanguages("/how-to"),
  },
};

export const dynamic = "force-static";

export default function HowToIndexPage() {
  return (
    <div className="min-h-screen">
      <GuidesIndexClient />
    </div>
  );
}
