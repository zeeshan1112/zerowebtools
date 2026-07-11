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
  const firefoxUrl = "https://addons.mozilla.org/en-US/firefox/addon/zerowebtools-dev/";

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
            {/* Chrome Store Link */}
            <a
              href={chromeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ink text-surface font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all duration-150 shadow-md active:scale-[0.99] w-full sm:w-auto"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M12 0c-3.15 0-6.02 1.21-8.17 3.19l4.7 8.13c.27-.82.9-1.49 1.7-1.9L4.47 3.52C6.44 1.94 8.94 1 11.64 1H21.5C20.08.38 16.94 0 12 0z" fill="#EA4335" />
                <path d="M2.29 14.39A9.97 9.97 0 0012 22c2.06 0 3.97-.52 5.64-1.43L14 12.5c-.8.43-1.74.58-2.64.4L6.34 17a6.002 6.002 0 01-4-5c0-.9.16-1.76.44-2.58L2.29 14.39z" fill="#34A853" />
                <path d="M18.64 20.57A9.94 9.94 0 0022 14c0-4.54-3.03-8.38-7.17-9.52l-4.7 8.13c.53.64 1.34.88 2.06.77L15.34 17c.52.9 1.39 1.55 2.42 1.77L18.64 20.57z" fill="#FBBC05" />
                <circle cx="12" cy="12" r="4" fill="#4285F4" />
                <circle cx="12" cy="12" r="5.5" stroke="#FFFFFF" strokeWidth="1.5" />
              </svg>
              Add to Chrome
            </a>

            {/* Firefox Add-on Link */}
            <a
              href={firefoxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF7139]/10 hover:bg-[#FF7139]/20 border border-[#FF7139]/30 text-[#FF7139] font-bold text-xs uppercase tracking-wider transition-all duration-150 active:scale-[0.99] w-full sm:w-auto"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#00539F" />
                <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 1.63 0 3.16-.39 4.52-1.07-.63-.44-1.18-1-1.63-1.65-.89-.09-1.75-.41-2.48-.95a5.163 5.163 0 01-1.455-2.4c-.23-1.03-.095-2.106.386-3.065.736-1.47 1.977-2.585 3.498-3.14a7.99 7.99 0 013.11-.32c-.17-.23-.33-.45-.472-.618-.808-.66-1.815-1.085-2.883-1.218a9.423 9.423 0 00-4.636.78A9.728 9.728 0 003.69 11.176c-.955 1.826-1.48 3.878-1.516 5.96a12.023 12.023 0 001.996 6.551 12.008 12.008 0 009.646 5.86c6.417.153 11.838-4.757 12.083-11.168.036-1.413-.087-2.825-.333-4.213A10.02 10.02 0 0012 2z" fill="#E66000" />
                <path d="M16 10c1.5 0 3-1 3-3s-1.5-3-3-3c-.8 0-1.5.3-2 .8a4.238 4.238 0 01.76 1.764c.1.7.1 1.4 0 2.1-.5.7-1 1.4-1.76 1.83.6.3 1.3.5 2 .5z" fill="#FFCB00" />
              </svg>
              Add to Firefox
            </a>
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
