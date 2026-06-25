"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";
import DOMPurify from "dompurify";
import TurndownService from "turndown";
import { Readability } from "@mozilla/readability";
import { parseMediumPost } from '../lib/mediumParser';

export default function WebScraperWorkspace() {
  const searchParams = useSearchParams();
  const t = useWorkspaceTranslation();
  const urlParam = searchParams.get("url");

  const [url, setUrl] = useState(urlParam || "");
  const [extensionInstalled, setExtensionInstalled] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("/extensions");
  const [isExtracting, setIsExtracting] = useState(false);
  const [contentHtml, setContentHtml] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"reader" | "markdown">("reader");
  const [copySuccess, setCopySuccess] = useState(false);

  // Check if extension is installed on mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const isInstalled = document.documentElement.hasAttribute("data-zerowebtools-companion");
      setExtensionInstalled(isInstalled);
      
      const ua = navigator.userAgent;
      const isChromium = /Chrome|Chromium|CriOS/i.test(ua);
      if (isChromium) {
        setDownloadUrl("https://chromewebstore.google.com/detail/pffdmcdnddpbnlmfdemhkldjloccpcfj?utm_source=item-share-cb");
      }
    }
  }, []);



  const proxyFetchViaExtension = (targetUrl: string, spoof: boolean, customOptions?: { method?: string; headers?: Record<string, string>; body?: string }) => {
    const messageId = Math.random().toString(36).substring(2, 15);
    window.postMessage({
      type: 'ZWT_PROXY_FETCH',
      id: messageId,
      url: targetUrl,
      method: customOptions?.method || "GET",
      headers: customOptions?.headers || {},
      body: customOptions?.body,
      spoofGooglebot: spoof
    }, '*');
    return new Promise((resolve, reject) => {
      const handleResponse = (event: MessageEvent) => {
        if (event.source !== window || !event.data || event.data.type !== 'ZWT_PROXY_FETCH_RESPONSE' || event.data.id !== messageId) {
          return;
        }
        window.removeEventListener('message', handleResponse);
        if (event.data.response.error) {
          reject(new Error(event.data.response.error));
        } else {
          resolve(event.data.response);
        }
      };
      window.addEventListener('message', handleResponse);
    });
  };

  const fetchFromWayback = async (targetUrl: string) => {
    try {
      const response = await fetch(`https://archive.org/wayback/available?url=${encodeURIComponent(targetUrl)}`);
      const data = await response.json();
      if (data && data.archived_snapshots && data.archived_snapshots.closest && data.archived_snapshots.closest.url) {
        let waybackUrl = data.archived_snapshots.closest.url;
        const res: any = await proxyFetchViaExtension(waybackUrl, false);
        processHtml(res.body, null);
      } else {
        throw new Error("Not available in Web Archive");
      }
    } catch (e: any) {
      setError(t("web_scraper.error_extract", "Failed to extract. Website may be blocking access and no public archive was found."));
      setIsExtracting(false);
    }
  };

  const extractContent = () => {
    if (!url) return;
    setIsExtracting(true);
    setError(null);

    let targetUrl = url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }
    const originalUrl = targetUrl;

    try {
      const parsedUrl = new URL(originalUrl);
      const hostname = parsedUrl.hostname.toLowerCase();
      
      // Auto-detect Medium or Medium subdomains or custom domains (based on URL structure)
      let isMedium = hostname === 'medium.com' || hostname.endsWith('.medium.com') || originalUrl.includes('medium.com');
      
      const pathSegments = parsedUrl.pathname.split('/');
      const lastSegment = pathSegments[pathSegments.length - 1];
      
      if (lastSegment && lastSegment.includes('-')) {
        const parts = lastSegment.split('-');
        const possibleId = parts[parts.length - 1];
        if (/^[a-f0-9]{11,13}$/i.test(possibleId)) {
          isMedium = true; // Auto-detected as Medium due to post ID format
        }
      } else if (parsedUrl.pathname.includes('/p/')) {
         isMedium = true;
      }
      
      // Standard Fetch (Readability) via Extension Proxy
      if (!extensionInstalled) {
        setError(t("web_scraper.missing_extension_desc", "Extension required."));
        setIsExtracting(false);
        return;
      }
      
      if (isMedium) {
        // Multi-tier Medium bypass:
        // Tier 1: freedium.cfd
        // Tier 2: freedium-mirror.cfd
        // Tier 3: Wayback Machine
        proxyFetchViaExtension(`https://freedium.cfd/${originalUrl}`, true)
          .then((res: any) => {
            const html = res.body || '';
            if (html.includes('RENDER ERROR') || html.includes('problem preparing this article') || html.includes('Freedium 500')) {
              throw new Error("freedium.cfd failed");
            }
            processHtml(html, 'freedium.cfd');
          })
          .catch(() => {
            // Tier 2 fallback
            return proxyFetchViaExtension(`https://freedium-mirror.cfd/${originalUrl}`, true)
              .then((res: any) => {
                const html = res.body || '';
                if (html.includes('RENDER ERROR') || html.includes('problem preparing this article') || html.includes('Freedium 500')) {
                  throw new Error("freedium-mirror.cfd failed");
                }
                processHtml(html, 'freedium-mirror.cfd');
              })
              .catch(() => {
                // Tier 3 fallback
                fetchFromWayback(originalUrl);
              });
          });
      } else {
        proxyFetchViaExtension(originalUrl, true)
          .then((res: any) => processHtml(res.body, null))
          .catch(e => {
            // If direct fetch fails (firewall or strong block), fallback to Web Archive
            fetchFromWayback(originalUrl);
          });
      }
    } catch (e: any) {
      setError("Invalid URL");
      setIsExtracting(false);
    }
  };

  // Auto-extract if URL parameter is present on load
  useEffect(() => {
    if (urlParam && extensionInstalled && !isExtracting && !contentHtml && !error) {
      extractContent();
    }
  }, [urlParam, extensionInstalled]);

  const processHtml = (html: string, freediumDomain: string | null = null) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      
      let coverImageHtml = '';
      if (freediumDomain) {
        const baseUrl = `https://${freediumDomain}`;
        // Extract cover image manually because Readability often strips images placed before the <h1>
        const coverImg = doc.querySelector('img[alt="Post cover image"]');
        if (coverImg) {
           const realSrc = coverImg.getAttribute('data-zoom-src') || coverImg.getAttribute('src');
           if (realSrc) {
             const absoluteSrc = realSrc.startsWith('/') ? `${baseUrl}${realSrc}` : realSrc;
             const captionNode = coverImg.closest('figure')?.querySelector('figcaption');
             const captionHtml = captionNode ? `<figcaption class="text-center text-sm text-neutral-500 mt-2">${captionNode.innerHTML}</figcaption>` : '';
             coverImageHtml = `<figure class="my-6"><img src="${absoluteSrc}" alt="Cover Image" class="w-full rounded-xl" />${captionHtml}</figure>\n`;
           }
        }

        const imgs = doc.querySelectorAll('img');
        imgs.forEach(img => {
          const src = img.getAttribute('src');
          // Check for actual src or lazy-loaded data-src
          const realSrc = img.getAttribute('data-zoom-src') || src;
          if (realSrc && realSrc.startsWith('/img/')) {
            img.setAttribute('src', `${baseUrl}${realSrc}`);
            // Remove width/height to let our CSS handle the responsive sizing
            img.removeAttribute('width');
            img.removeAttribute('height');
          }
        });
        
        // Also handle Freedium's custom figure/captions that Readability might misinterpret
        const captions = doc.querySelectorAll('[data-caption]');
        captions.forEach(el => {
          const captionText = el.getAttribute('data-caption');
          if (captionText) {
            const figcaption = doc.createElement('figcaption');
            figcaption.innerHTML = captionText;
            el.parentNode?.insertBefore(figcaption, el.nextSibling);
          }
        });
      }

      // 2. Use Mozilla Readability for robust extraction
      const reader = new Readability(doc);
      const article = reader.parse();

      if (!article || !article.content) {
        throw new Error("Could not extract article content");
      }

      const cleanHtml = DOMPurify.sanitize(article.content, {
        ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'pre', 'blockquote', 'img', 'picture', 'source', 'figure', 'figcaption'],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'title']
      });
      
      // Ensure we don't inject a duplicate title if one already exists in the extracted HTML
      const tempDoc = parser.parseFromString(cleanHtml, "text/html");
      const hasH1 = tempDoc.querySelector("h1") !== null;
      let finalHtml = hasH1 ? cleanHtml : `<h1>${article.title}</h1>\n${cleanHtml}`;
      
      // Inject cover image if we extracted it manually
      if (coverImageHtml && !finalHtml.includes('alt="Post cover image"')) {
         finalHtml = finalHtml.replace(/<h1[^>]*>.*?<\/h1>/i, match => `${match}\n${coverImageHtml}`);
         // Fallback if h1 replacement fails
         if (!finalHtml.includes(coverImageHtml)) {
           finalHtml = coverImageHtml + finalHtml;
         }
      }
      
      setContentHtml(finalHtml);

      // 3. Convert to Markdown
      const turndownService = new TurndownService({ headingStyle: 'atx' });
      const markdown = (cleanHtml.trim().startsWith('<h1') ? "" : `# ${article.title}\n\n`) + turndownService.turndown(cleanHtml);
      setContentMarkdown(markdown);

      setIsExtracting(false);
    } catch (err) {
      console.error(err);
      setError(t("web_scraper.error_extract", "Failed to extract."));
      setIsExtracting(false);
    }
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(contentMarkdown);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
      {/* Header Panel */}
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && extractContent()}
                placeholder={t("web_scraper.url_placeholder", "Paste any article URL here (Medium, blogs, news...")}
                className="w-full px-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-ink dark:focus:ring-white transition-shadow"
              />
            </div>
            
            <button
              onClick={extractContent}
              disabled={!url || isExtracting}
              className="px-6 py-3 bg-ink dark:bg-white text-white dark:text-ink font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
            >
              {isExtracting ? (
                <div className="w-5 h-5 border-2 border-white/30 dark:border-ink/30 border-t-white dark:border-t-ink rounded-full animate-spin" />
              ) : (
                t("web_scraper.extract_btn", "Read Article")
              )}
            </button>
          </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative min-h-[500px]">
        
        {/* Missing Extension Warning */}
        {!extensionInstalled && (
          <div className="absolute inset-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm z-10 flex items-center justify-center p-6 text-center">
            <div className="max-w-md bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700">
              <div className="mb-6 flex justify-center opacity-90">
                <img src="/chrome_extension_icon.webp" alt="Chrome Extension" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">
                {t("web_scraper.missing_extension_title", "Extension Required")}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                {t("web_scraper.missing_extension_desc", "Please install the companion extension to securely fetch cross-origin articles.")}
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm py-2.5 px-4 rounded-lg mb-6 font-medium flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg> 100% Private & Secure. We do not track or record your browsing data.
              </div>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-ink dark:bg-white text-surface dark:text-ink hover:opacity-80 font-medium rounded-lg transition-all"
              >
                {t("web_scraper.download_extension", "Download Extension")}
              </a>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 m-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg">
            {error}
          </div>
        )}

        {/* Content View */}
        {contentHtml && !error && (
          <div className="flex-1 overflow-auto bg-neutral-50 dark:bg-neutral-900 p-6 min-h-[500px] flex flex-col relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex bg-neutral-200 dark:bg-neutral-800 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('reader')}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'reader' ? 'bg-white dark:bg-neutral-700 shadow-sm text-ink dark:text-white' : 'text-neutral-500 hover:text-ink dark:hover:text-white'}`}
                >
                  Reader View
                </button>
                <button
                  onClick={() => setViewMode('markdown')}
                  className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-all ${viewMode === 'markdown' ? 'bg-white dark:bg-neutral-700 shadow-sm text-ink dark:text-white' : 'text-neutral-500 hover:text-ink dark:hover:text-white'}`}
                >
                  Markdown
                </button>
              </div>
              
              {viewMode === 'markdown' && (
                <button onClick={copyMarkdown} className="text-sm font-bold text-accent hover:opacity-80 flex items-center gap-1.5 transition-all">
                  {copySuccess ? (
                    <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg> Copied!</>
                  ) : (
                    <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path></svg> Copy Markdown</>
                  )}
                </button>
              )}
            </div>

            {viewMode === 'reader' ? (
              <div className="max-w-prose mx-auto prose prose-lg prose-neutral dark:prose-invert prose-img:rounded-xl prose-headings:font-bold w-full" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            ) : (
              <textarea
                 value={contentMarkdown}
                 readOnly
                 className="flex-1 w-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl p-4 font-mono text-sm focus:outline-none resize-none min-h-[400px]"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
