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
  const [isExtracting, setIsExtracting] = useState(false);
  const [contentHtml, setContentHtml] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Check if extension is installed on mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const isInstalled = document.documentElement.hasAttribute("data-zerowebtools-companion");
      setExtensionInstalled(isInstalled);
    }
  }, []);

  // Set up message listener for extension proxy response
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window || !event.data || event.data.type !== 'ZWT_PROXY_FETCH_RESPONSE') {
        return;
      }
      
      // Found our response
      const response = event.data.response;
      if (response.error) {
        setError(response.error);
        setIsExtracting(false);
      } else {
        processHtml(response.body);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
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

  const extractContent = () => {
    if (!url) return;
    setIsExtracting(true);
    setError(null);

    let targetUrl = url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    try {
      const parsedUrl = new URL(targetUrl);
      const hostname = parsedUrl.hostname.toLowerCase();
      
      // Auto-detect Medium or Medium subdomains or custom domains (based on URL structure)
      let isMedium = hostname === 'medium.com' || hostname.endsWith('.medium.com') || targetUrl.includes('medium.com');
      
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
      
      // Use Freedium mirror to bypass paywalls for Medium articles since we don't have premium cookies
      let fetchedFromFreedium = false;
      if (isMedium) {
          targetUrl = `https://freedium-mirror.cfd/${targetUrl}`;
          fetchedFromFreedium = true;
      }
      
      // Standard Fetch (Readability) via Extension Proxy
      if (!extensionInstalled) {
        setError(t("web_scraper.missing_extension_desc", "Extension required."));
        setIsExtracting(false);
        return;
      }
      
      proxyFetchViaExtension(targetUrl, true)
        .then((res: any) => processHtml(res.body, fetchedFromFreedium))
        .catch(e => {
          setError(e.message || "Failed to extract");
          setIsExtracting(false);
        });
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

  const processHtml = (html: string, isFreedium: boolean = false) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      
      let coverImageHtml = '';
      if (isFreedium) {
        // Extract cover image manually because Readability often strips images placed before the <h1>
        const coverImg = doc.querySelector('img[alt="Post cover image"]');
        if (coverImg) {
           const realSrc = coverImg.getAttribute('data-zoom-src') || coverImg.getAttribute('src');
           if (realSrc) {
             const absoluteSrc = realSrc.startsWith('/') ? `https://freedium-mirror.cfd${realSrc}` : realSrc;
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
            img.setAttribute('src', `https://freedium-mirror.cfd${realSrc}`);
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
              <div className="text-4xl mb-4 flex justify-center text-ink dark:text-white opacity-80">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.047-.899.277-1.045.732a3.003 3.003 0 0 0 .546 3.197 3 3 0 0 1 0 4.242 3 3 0 0 1-4.242 0 3.003 3.003 0 0 0-3.197-.546c-.455.146-.779.575-.732 1.045.04.283-.062.564-.276.837l-1.611 1.611c-.47.47-1.087.706-1.704.706s-1.233-.235-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.878-.289c-.493.074-1.011-.122-1.341-.563a3.001 3.001 0 0 1-.365-3.327 3.001 3.001 0 0 0-.365-3.327 3.001 3.001 0 0 1 0-4.242 3 3 0 0 1 4.242 0c1.077 1.077 2.658 1.157 3.82.261.353-.271.492-.743.342-1.168a3 3 0 0 0-3.037-2.036c-.47.047-.899-.277-1.045-.732a3.003 3.003 0 0 1 .546-3.197 3 3 0 0 0 0-4.242 3 3 0 0 0-4.242 0 3.003 3.003 0 0 1-3.197.546c-.455-.146-.779-.575-.732-1.045.04-.283.062-.564.276-.837l1.611-1.611c.47-.47 1.087-.706 1.704-.706s1.233.235 1.704.706l1.568 1.568c.23.23.556.338.878.289.493-.074 1.011.122 1.341.563a3.001 3.001 0 0 0 .365 3.327 3.001 3.001 0 0 1 .365 3.327 3.001 3.001 0 0 0 0 4.242 3 3 0 0 0 4.242 0c1.077-1.077 2.658-1.157 3.82-.261.353.271.492.743.342 1.168a3 3 0 0 1-3.037 2.036z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-white">
                {t("web_scraper.missing_extension_title", "Extension Required")}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                {t("web_scraper.missing_extension_desc", "Please install the companion extension to bypass paywalls.")}
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm py-2 px-4 rounded-lg mb-6 font-medium flex items-center justify-center gap-2">
                <span>🛡️</span> 100% Private & Secure. We do not track or record your browsing data.
              </div>
              <a
                href="/extensions"
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
          <div className="flex-1 overflow-auto bg-neutral-50 dark:bg-neutral-900 p-6 min-h-[500px]">
            <div className="max-w-prose mx-auto prose prose-lg prose-neutral dark:prose-invert prose-img:rounded-xl prose-headings:font-bold" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
        )}
      </div>
    </div>
  );
}
