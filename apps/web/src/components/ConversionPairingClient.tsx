import Link from "next/link";
import { ConversionPairing } from "@/lib/conversions";
import { getToolById } from "@/lib/tools";

interface ConversionPairingClientProps {
  pairing: ConversionPairing;
  lang?: string;
}

export default function ConversionPairingClient({ pairing, lang }: ConversionPairingClientProps) {
  const langPrefix = lang && lang !== "en" ? `/${lang}` : "";
  const targetTool = getToolById(pairing.toolId);
  const toolTitle = targetTool?.title || "Tool";

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-ink-muted select-none">
        <Link href={`${langPrefix}/`} className="hover:text-accent font-medium transition-colors">
          Home
        </Link>
        <span>&gt;</span>
        <span className="font-medium truncate">Conversions</span>
        <span>&gt;</span>
        <span className="text-ink font-semibold truncate">{pairing.fromFormat} to {pairing.toFormat}</span>
      </div>

      {/* Hero Header */}
      <div className="space-y-6 text-center pt-8 border-b border-border/40 pb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-2">
          File Format Converter
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight text-balance">
          {pairing.title}
        </h1>
        <p className="text-lg sm:text-xl text-ink-secondary max-w-2xl mx-auto leading-relaxed text-balance">
          {pairing.description}
        </p>

        {/* Main CTA */}
        <div className="pt-6">
          <Link
            href={`${langPrefix}/tools/${pairing.toolId}`}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-white dark:text-black font-bold rounded-2xl shadow-lg hover:bg-accent/90 transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            <span className="text-lg">Launch {toolTitle} Workspace</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <p className="text-xs text-ink-muted mt-4 font-medium uppercase tracking-widest">
            100% Free • Private • Offline Support
          </p>
        </div>
      </div>

      {/* How to Guide Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          How to Convert {pairing.fromFormat} to {pairing.toFormat} locally:
        </h2>
        <ol className="relative border-l border-border/40 ml-4 space-y-6 py-1">
          <li className="relative pl-8">
            <span className="absolute -left-[13px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-surface border border-border/60 text-xs font-bold text-ink shadow-sm">
              1
            </span>
            <h3 className="text-base font-bold text-ink">Upload Your Files</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mt-1">
              Click the workspace upload zone or drag and drop your {pairing.fromFormat} documents/photos directly into your browser window.
            </p>
          </li>
          <li className="relative pl-8">
            <span className="absolute -left-[13px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-surface border border-border/60 text-xs font-bold text-ink shadow-sm">
              2
            </span>
            <h3 className="text-base font-bold text-ink">Configure Processing Options</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mt-1">
              Select your desired output parameters, adjust quality values, or scale dimensions visually inside the client dashboard.
            </p>
          </li>
          <li className="relative pl-8">
            <span className="absolute -left-[13px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full bg-surface border border-border/60 text-xs font-bold text-ink shadow-sm">
              3
            </span>
            <h3 className="text-base font-bold text-ink">Save the Converted {pairing.toFormat}</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mt-1">
              Click convert. The rendering runs instantly in your local browser sandbox. Download the output file directly to your drive.
            </p>
          </li>
        </ol>
      </section>

      {/* Why Client-side Section */}
      <section className="space-y-4 pt-6 border-t border-border/40">
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          Why Client-Side Conversion Matters
        </h2>
        <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
          Standard web converters process files on their cloud backends, meaning your personal photographs, invoices, screenshots, and private files travel across the web and reside on external storage clusters. This poses significant data leakage risks.
        </p>
        <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
          ZeroWebTools runs all conversion models client-side in browser memory. Using modern WebAssembly and Canvas APIs, files are decoded and rendered locally on your device. Your data never leaves your computer, offering absolute data privacy compliance.
        </p>
      </section>

      {/* FAQs Section */}
      {pairing.faqs && pairing.faqs.length > 0 && (
        <div className="space-y-6 pt-10 border-t border-border/40">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {pairing.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-border/40 rounded-xl bg-surface p-4 [&_summary::-webkit-details-marker]:hidden cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-1.5 focus:outline-none">
                  <h3 className="text-sm sm:text-base font-semibold text-ink group-hover:text-accent transition-colors duration-200">
                    {faq.question}
                  </h3>
                  <span className="transition duration-300 group-open:-rotate-180">
                    <svg className="w-5 h-5 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-ink-secondary leading-relaxed pr-6 select-text">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
