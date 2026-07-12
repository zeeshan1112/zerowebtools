import { getTranslations, SupportedLocale } from "@/lib/i18n";
import { Metadata } from "next";

export async function generateStaticParams() {
  const { LOCALES } = await import("@/lib/i18n");
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getTranslations(lang as SupportedLocale);
  return {
    title: `${t.extTitle || "ZeroWebTools Companion"}`,
    description: t.extDesc,
  };
}

export default async function ExtensionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getTranslations(lang as SupportedLocale);

  const chromeUrl = "https://chromewebstore.google.com/detail/pffdmcdnddpbnlmfdemhkldjloccpcfj?utm_source=item-share-cb";
  const firefoxUrl = "https://addons.mozilla.org/en-US/firefox/addon/zerowebtools-dev/";

  return (
    <div className="min-h-screen bg-surface-elevated/20 py-16 lg:py-24 select-none">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Immersive Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-extrabold uppercase tracking-widest rounded-full border border-accent/20">
            {t.extTag}
          </span>
          <h1 className="text-4xl md:text-5xl tracking-tight font-extrabold text-ink leading-tight">
            {t.extTitle}
          </h1>
          <p className="text-ink-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t.extDesc}
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Chrome Store Link */}
            <a
              href={chromeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ink text-surface font-bold text-xs uppercase tracking-wider hover:bg-zinc-800 transition-all duration-150 shadow-md active:scale-[0.99] w-full sm:w-auto"
            >
              <img className="w-5 h-5 shrink-0" src="/images/chrome-brand.svg" alt="Chrome Logo" />
              {t.extChrome}
            </a>

            {/* Firefox Add-on Link */}
            <a
              href={firefoxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF7139]/10 hover:bg-[#FF7139]/20 border border-[#FF7139]/30 text-[#FF7139] font-bold text-xs uppercase tracking-wider transition-all duration-150 active:scale-[0.99] w-full sm:w-auto"
            >
              <img className="w-5 h-5 shrink-0" src="/images/firefox-brand.svg" alt="Firefox Logo" />
              {t.extFirefox}
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
                {t.extCard1Title}
              </h2>
              <p className="text-ink-muted text-xs leading-relaxed">
                {t.extCard1Desc}
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
              {t.extCard1ClientSide}
            </div>
          </div>

          {/* Card 2: Platform Integration Bridge */}
          <div className="p-8 rounded-3xl border border-border/80 bg-surface shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold text-lg">
                🔗
              </div>
              <h2 className="text-xl font-bold text-ink tracking-tight">
                {t.extCard2Title}
              </h2>
              <p className="text-ink-muted text-xs leading-relaxed">
                {t.extCard2Desc}
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
              {t.extCard2Privacy}
            </div>
          </div>

        </div>

        {/* How It Works Flow */}
        <section className="p-8 rounded-3xl border border-dashed border-border/80 bg-surface-elevated/40 space-y-8">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-ink text-center">
            {t.extHowTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: "01",
                title: t.extStep1Title,
                desc: t.extStep1Desc
              },
              {
                step: "02",
                title: t.extStep2Title,
                desc: t.extStep2Desc
              },
              {
                step: "03",
                title: t.extStep3Title,
                desc: t.extStep3Desc
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
            {t.extSecurityTitle}
          </h3>
          <p className="text-[11px] text-ink-muted max-w-2xl mx-auto leading-relaxed">
            {t.extSecurityDesc}
          </p>
        </div>

      </main>
    </div>
  );
}
