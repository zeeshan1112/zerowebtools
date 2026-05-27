import type { Metadata } from "next";
import Link from "next/link";
import { HOW_TO_ARTICLES } from "@/lib/articles";

const BASE_URL = "https://zerowebtools.com";

export const metadata: Metadata = {
  title: "Web Utility Guides & Resources | ZeroWebTools",
  description: "Learn how to compress PDFs, convert HEIC images, model startup equity, and more with our free 100% private web utilities.",
  alternates: {
    canonical: `${BASE_URL}/how-to`,
  },
};

export default function HowToIndexPage() {
  return (
    <div className="min-h-screen pt-12 pb-20">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 border-b border-border/40 pb-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink mb-3">
            Guides & Resources
          </h1>
          <p className="text-lg text-ink-secondary max-w-2xl">
            Detailed tutorials and workflows for our most popular free web utilities.
          </p>
        </div>

        {/* List of Guides */}
        <div className="space-y-4">
          {HOW_TO_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/how-to/${article.slug}`}
              className="group block p-6 rounded-2xl border border-border/40 bg-surface hover:bg-surface-elevated/40 transition-all duration-200"
            >
              <h2 className="text-xl font-bold text-ink group-hover:text-accent transition-colors mb-2">
                {article.title}
              </h2>
              <p className="text-ink-secondary text-sm leading-relaxed">
                {article.metaDescription}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
