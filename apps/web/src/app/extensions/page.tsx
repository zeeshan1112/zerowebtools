import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browser Extensions - ZeroWebTools",
  description:
    "Supercharge your browser workflow with our offline-first developer, PDF, and image extensions. 100% local, private, and secure.",
  alternates: {
    canonical: "https://zerowebtools.com/extensions",
  },
  openGraph: {
    title: "Browser Extensions - ZeroWebTools",
    description:
      "Run essential utilities offline directly in your Chrome or Firefox toolbar. No data uploads, no tracking.",
    type: "website",
    url: "https://zerowebtools.com/extensions",
    siteName: "ZeroWebTools",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ZeroWebTools — Free Browser-Based Professional Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browser Extensions - ZeroWebTools",
    description:
      "Run essential utilities offline directly in your toolbar. Chrome & Firefox support.",
    images: ["/logo.png"],
  },
};

interface ExtensionCard {
  title: string;
  subtitle: string;
  description: string;
  status: "live" | "coming-soon";
  features: string[];
  chromeUrl?: string;
  firefoxUrl?: string;
}

const EXTENSIONS: ExtensionCard[] = [
  {
    title: "Developer Utilities Companion",
    subtitle: "6 Essential Developer Tools Offline",
    description:
      "The flagship ZeroWebTools companion. Packs a JSON formatter & tree explorer, side-by-side diff checker, JWT debugger, case converter, Base64 encoder, and URL percent encoder right in your browser pop-up. Runs 100% offline, securely sandboxed, with zero server transmissions.",
    status: "live",
    features: [
      "JSON Formatter & visual tree node walker",
      "Side-by-side inline text diff checker",
      "JWT decoder with payload header/claims inspector",
      "Format conversion (camelCase, snake_case, PascalCase, etc.)",
      "Instant offline Base64 and URL encoding/decoding"
    ],
    chromeUrl: "https://chromewebstore.google.com/", // Swap with live URL once approved
    firefoxUrl: "#", // Add Firefox Add-ons URL once uploaded
  },
  {
    title: "PDF Workspace Pro",
    subtitle: "Visual PDF Editor & Compiler",
    description:
      "A complete local PDF workspace. Crop and resize pages, visually stamp watermarks or page numbers, draw/upload signatures to sign forms, and merge or split documents client-side. Built on local WASM and pdf-lib processing.",
    status: "coming-soon",
    features: [
      "Visual PDF signer (draw/type/upload signatures)",
      "Resize pages to standard A4, Letter, and Legal formats",
      "Compress PDF files client-side up to 90%",
      "Add page numbers or watermark text with custom opacity"
    ],
  },
  {
    title: "Image Optimizer Companion",
    subtitle: "HEIC Converter & Vector Minifier",
    description:
      "Batch convert Apple HEIC photos, resize bulk image formats to PNG/WebP, visually crop graphics, and minify vector SVGs. Keep all personal photo data and file metadata local in your browser sandbox.",
    status: "coming-soon",
    features: [
      "Batch convert HEIC photos to high-quality JPG/PNG",
      "Bulk image resizing and quality compression with ZIP download",
      "Clean metadata and minify SVGs",
      "Visual image cropper with custom aspect ratios"
    ],
  }
];

export default function ExtensionsPage() {
  return (
    <div className="min-h-screen bg-surface-elevated/20 py-16 lg:py-24">
      <main className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl tracking-tighter leading-none font-semibold text-ink">
            Browser Extensions
          </h1>
          <p className="mt-4 text-ink-muted text-base sm:text-lg">
            Bring ZeroWebTools utility suites directly into your browser toolbar. 
            All extensions run 100% locally in sandboxed browser memory with zero server uploads.
          </p>
        </div>

        {/* Extensions Grid */}
        <div className="space-y-12">
          {EXTENSIONS.map((ext, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-2xl border bg-surface-elevated transition-all duration-300 ${
                ext.status === "live"
                  ? "border-border shadow-sm hover:shadow-md hover:border-border/80"
                  : "border-border/40 opacity-80"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                
                {/* Info Section */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-ink tracking-tight">
                      {ext.title}
                    </h2>
                    {ext.status === "live" ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                        Live
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-neutral-500/10 text-neutral-500">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm font-semibold text-accent uppercase tracking-wider">
                    {ext.subtitle}
                  </p>
                  
                  <p className="text-ink-muted text-sm leading-relaxed max-w-3xl">
                    {ext.description}
                  </p>

                  {/* Feature Bullets */}
                  <div className="pt-2">
                    <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-2">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-ink-muted">
                      {ext.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-border shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Buttons/Links Section */}
                <div className="shrink-0 w-full lg:w-64 flex flex-col gap-3 justify-center lg:pt-4">
                  {ext.status === "live" ? (
                    <>
                      {/* Chrome Store Link */}
                      <a
                        href={ext.chromeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent/90 active:scale-[0.98] transition-all shadow-sm w-full"
                      >
                        {/* Chrome Icon SVG */}
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C8.21 0 4.89 2.05 3.07 5.16l4.63 8.01C8.29 10.23 9.99 8.24 12 8.24h9.87C21.05 3.51 16.94 0 12 0zm0 15.76a3.76 3.76 0 110-7.52 3.76 3.76 0 010 7.52zm7.74-4.88c-.61 2.37-2.31 4.36-4.63 5.37l-4.62-8.01h9.25zm-8.8 6.07c-2.33 0-4.33-1.42-5.18-3.48L1.13 5.46C.4 7.42 0 9.56 0 12c0 5.48 3.96 10.04 9.17 11.75l2.77-5.68z" />
                        </svg>
                        Install on Chrome
                      </a>

                      {/* Firefox Link */}
                      {ext.firefoxUrl === "#" ? (
                        <button
                          disabled
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-surface text-ink-muted font-medium text-sm opacity-60 w-full cursor-not-allowed"
                          title="Firefox support coming soon"
                        >
                          {/* Firefox Icon SVG */}
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.422 7.026c-.352 1.348-.99 2.025-2.025 2.025-1.035 0-1.688.678-2.025 2.026s.99 2.025 2.025 2.025c1.036 0 1.688-.677 2.025-2.025.337-1.348-.99-2.026-2.025-2.026s-1.688-.677-2.025-2.025zm-14.844 4.974c0-3.313 2.687-6 6-6s6 2.687 6 6-2.687 6-6 6-6-2.687-6-6z"/>
                          </svg>
                          Firefox Version (Soon)
                        </button>
                      ) : (
                        <a
                          href={ext.firefoxUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-surface text-ink hover:bg-surface-elevated active:scale-[0.98] transition-all font-medium text-sm w-full"
                        >
                          {/* Firefox Icon SVG */}
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.422 7.026c-.352 1.348-.99 2.025-2.025 2.025-1.035 0-1.688.678-2.025 2.026s.99 2.025 2.025 2.025c1.036 0 1.688-.677 2.025-2.025.337-1.348-.99-2.026-2.025-2.026s-1.688-.677-2.025-2.025zm-14.844 4.974c0-3.313 2.687-6 6-6s6 2.687 6 6-2.687 6-6 6-6-2.687-6-6z"/>
                          </svg>
                          Install on Firefox
                        </a>
                      )}
                    </>
                  ) : (
                    <span className="text-center text-xs text-ink-muted font-medium py-3 border border-dashed border-border rounded-xl bg-surface">
                      In Active Development
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
