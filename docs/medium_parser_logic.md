# Medium Parser Architecture

## The Challenge

Extracting full articles from Medium natively presents several technical challenges:
1.  **Hard Paywalls**: Medium aggressively locks premium articles behind a paywall. Previously, exploiting the `User-Agent` to mimic search engine crawlers (like `YandexMobileBot/3.0`) via GraphQL bypassed this. However, Medium has recently locked down their GraphQL API, meaning full access now strictly requires a valid Premium Medium authentication cookie.
2.  **CORS & Cloudflare**: Direct fetches to Medium from a browser face CORS restrictions, and backend Node.js fetches are flagged by Cloudflare's Bot Fight Mode.
3.  **Image Formatting**: Proxies that bypass the paywall often use modern JS frameworks (like SvelteKit) which lazy-load images using relative paths, causing standard extraction libraries like Mozilla Readability to strip them out.

## The Solution

Our Web Scraper Tool implements a hybrid architecture to deliver flawless, full-length Medium articles with high-resolution images.

### 1. The Proxy Backend (`freedium-mirror.cfd`)
Since a true native bypass is impossible without a paid user account, we automatically intercept Medium URLs and route them through `https://freedium-mirror.cfd`. 
- **Why**: Freedium maintains an active premium Medium subscription on their backend servers. When we request an article through their proxy, they fetch the unlocked GraphQL data using their premium cookies and render it into HTML.
- **How**: We use the ZeroWebTools Companion Extension to tunnel the fetch request. This bypasses any CORS restrictions and fetches the raw SvelteKit HTML from the mirror.

### 2. Custom DOM Pre-Processing (`WebScraperWorkspace.tsx`)
The raw HTML from the proxy isn't immediately usable because SvelteKit formats images in a way that breaks standard readers:
- Images use relative paths (`/img/700/...`).
- High-res sources are hidden in `data-zoom-src`.
- The main hero image ("Post cover image") is placed in a generic `<figure>` outside the main text block, which causes Mozilla Readability to prune it as a "banner ad".

To fix this, we implemented a custom DOM manipulation pipeline *before* handing the HTML to Readability:
1.  **Hero Image Rescue**: We use `doc.querySelector('img[alt="Post cover image"]')` to manually extract the main cover image and its caption before it gets pruned.
2.  **Path Rewriting**: We iterate through every `<img />` tag and rewrite relative paths to absolute URLs targeting the mirror (`https://freedium-mirror.cfd/img/...`), prioritizing the high-res `data-zoom-src` when available.
3.  **Caption Reconstruction**: We manually build `<figcaption>` elements from Freedium's custom `[data-caption]` attributes to ensure Readability recognizes them as proper HTML5 figures.

### 3. Readability & Injection
Once the DOM is prepared and absolute paths are restored:
1.  Mozilla Readability parses the document, successfully extracting the text density and the inline images.
2.  We take the cleaned HTML output and programmatically inject our rescued Hero Image right underneath the `<h1>` title.
3.  The final result is a beautiful, full-length article with every high-resolution image and caption perfectly placed, ready for reading or markdown conversion.
