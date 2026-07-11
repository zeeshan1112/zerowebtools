import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browser Extension - ZeroWebTools",
  description:
    "Supercharge your browser workflow with the ZeroWebTools Companion. Unlocks offline developer tools, secure CORS bypass, and webpage content scraping.",
  alternates: {
    canonical: "https://zerowebtools.com/extensions",
  },
  openGraph: {
    title: "Browser Extension - ZeroWebTools",
    description:
      "Install the ZeroWebTools Companion. Run developer utilities offline in your toolbar, bypass CORS locks, and scrape content locally.",
    type: "website",
    url: "https://zerowebtools.com/extensions",
    siteName: "ZeroWebTools",
  },
};

export default function ExtensionsPage() {
  const chromeUrl = "https://chromewebstore.google.com/detail/pffdmcdnddpbnlmfdemhkldjloccpcfj?utm_source=item-share-cb";

  return (
    <div className="min-h-screen bg-surface-elevated/20 py-16 lg:py-24 select-none">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Immersive Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-extrabold uppercase tracking-widest rounded-full border border-accent/20">
            OFFICIAL COMPANION EXTENSION
          </span>
          <h1 className="text-4xl md:text-5xl tracking-tight font-extrabold text-ink leading-tight">
            ZeroWebTools Companion
          </h1>
          <p className="text-ink-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A secure browser extension designed to extend the web platform's capabilities. Unlocks offline developer utilities and bridges browser permissions for advanced online tools.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={chromeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ink text-surface font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all duration-150 shadow-md active:scale-[0.99] w-full sm:w-auto"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C8.21 0 4.89 2.05 3.07 5.16l4.63 8.01C8.29 10.23 9.99 8.24 12 8.24h9.87C21.05 3.51 16.94 0 12 0zm0 15.76a3.76 3.76 0 110-7.52 3.76 3.76 0 010 7.52zm7.74-4.88c-.61 2.37-2.31 4.36-4.63 5.37l-4.62-8.01h9.25zm-8.8 6.07c-2.33 0-4.33-1.42-5.18-3.48L1.13 5.46C.4 7.42 0 9.56 0 12c0 5.48 3.96 10.04 9.17 11.75l2.77-5.68z" />
              </svg>
              Add to Chrome
            </a>
            <button
              disabled
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border/80 bg-surface/50 text-ink-muted font-bold text-xs uppercase tracking-wider opacity-50 w-full sm:w-auto cursor-not-allowed"
              title="Firefox version currently in store review"
            >
              Firefox Add-on (Reviewing)
            </button>
          </div>
        </div>

        {/* Feature Split Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Offline Toolkit */}
          <div className="p-8 rounded-3xl border border-border/80 bg-surface shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-lg">
                📦
              </div>
              <h2 className="text-xl font-bold text-ink tracking-tight">
                Offline Utility Toolbar
              </h2>
              <p className="text-ink-muted text-xs leading-relaxed">
                Access critical utility editors directly in your browser's menu bar at any time—no internet connection required. Runs in a fully private local sandbox.
              </p>
              
              <ul className="space-y-3 pt-2">
                {[
                  { name: "JSON Formatter", desc: "Tree node walker and minifier" },
                  { name: "Text Diff Checker", desc: "Line-by-line comparative visual diff" },
                  { name: "JWT Debugger", desc: "Claims inspector and header decoder" },
                  { name: "Case Converter", desc: "Instantly switch camel, snake, and PascalCase" },
                  { name: "Base64 Cipher & URL Encoder", desc: "Percent-encoding and hashing ciphers" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                    <div className="text-[11px]">
                      <span className="font-bold text-ink">{item.name}</span>
                      <span className="text-ink-muted"> — {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4 text-[10px] text-orange-500/80 font-bold uppercase tracking-wider">
              ⚡ 100% Client-Side Processing
            </div>
          </div>

          {/* Card 2: Platform Integration Bridge */}
          <div className="p-8 rounded-3xl border border-border/80 bg-surface shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold text-lg">
                🔗
              </div>
              <h2 className="text-xl font-bold text-ink tracking-tight">
                Platform API Bridge
              </h2>
              <p className="text-ink-muted text-xs leading-relaxed">
                Unlock advanced tools on zerowebtools.com that require elevated browser scopes or CORS permissions. The extension safely executes them on your behalf.
              </p>
              
              <ul className="space-y-3 pt-2">
                {[
                  { name: "Secure CORS Bypasses", desc: "API Client queries work directly from your local browser" },
                  { name: "Local HTML Web Scraping", desc: "Extract webpage nodes client-side inside the Smart Reader" },
                  { name: "Direct DOM Access", desc: "No proxy servers or intermediate logging databases needed" },
                  { name: "Zero Trust Pipeline", desc: "Zero keys, tokens, or scraped data ever leaves your device" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                    <div className="text-[11px]">
                      <span className="font-bold text-ink">{item.name}</span>
                      <span className="text-ink-muted"> — {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4 text-[10px] text-accent font-bold uppercase tracking-wider">
              🛡️ End-to-End Privacy Guarded
            </div>
          </div>

        </div>

        {/* How It Works Flow */}
        <section className="p-8 rounded-3xl border border-dashed border-border/80 bg-surface-elevated/40 space-y-8">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-ink text-center">
            How The Companion Integrates
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: "Install the Extension",
                desc: "Download from the Chrome Web Store. It sits silently in your extension toolbar waiting for command triggers."
              },
              {
                step: "02",
                title: "Bridge Detection",
                desc: "When you visit toolpages like the REST API Client, the page detects the companion secure bridge automatically."
              },
              {
                step: "03",
                title: "Execute Locally",
                desc: "Queries and scrapes run directly from your browser engine, bypassing CORS limits without third-party servers."
              }
            ].map((step, idx) => (
              <div key={idx} className="space-y-3 relative">
                <span className="text-3xl font-extrabold text-border/60 font-mono block">
                  {step.step}
                </span>
                <h3 className="text-xs font-bold text-ink uppercase tracking-wider">
                  {step.title}
                </h3>
                <p className="text-ink-muted text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Security & Privacy Commitment Banner */}
        <div className="p-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02] text-center space-y-2">
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            100% Open & Auditable
          </h3>
          <p className="text-[11px] text-ink-muted max-w-2xl mx-auto leading-relaxed">
            The ZeroWebTools Companion contains **zero tracking pixels, diagnostic pings, or analytics databases**. It acts solely as an offline processing container and a local proxy bridge on your hardware.
          </p>
        </div>

      </main>
    </div>
  );
}
