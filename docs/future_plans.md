# ZeroWebTools: Future Execution Roadmap

This document serves as the roadmap for the launch, analytical telemetry, programmatic content scaling, monetization, and offline support of the ZeroWebTools platform.

---

## 📅 Phase 1: Store Approvals & Directory Launches (Target: June 5)

### 1. Monitor Store Reviews
*   **Chrome Web Store:** Monitor the developer console for approval of **ZeroWebTools - Developer Utilities**. Retrieve your extension URL.
*   **Firefox AMO:** Upload `developertools-extension.zip` and `source-code.zip`. Monitor for approval.

### 2. AlternativeTo Submission (Post June 4)
*   **Timing:** Submit after June 4 at 9:37 PM Stockholm time (to clear the 7-day account restriction).
*   **Action:** Submit the site, associate the extensions, and target the **10 competitors** with custom differentiators (refer to `launch_assets.md`).

### 3. Product Hunt & Hacker News
*   **HN (Show HN):** Submit a technical text post explaining how you built 43+ WASM and client-side utilities with pipeline microchaining.
*   **Product Hunt:** Schedule a Tuesday or Wednesday morning launch. Focus the tagline around offline-first privacy and chaining.

---

## 📊 Phase 2: Analytics & Telemetry (1-2 Weeks Post-Launch)

To monitor tool success rates, error counts (like encrypted PDFs), and processing times without storing user files or injecting heavy libraries.

### 1. Supabase Event Log Table Schema
Run the following SQL in your Supabase SQL Editor to support public anonymous metric writes:
```sql
create table public.tool_metrics (
  id uuid default gen_random_uuid() primary key,
  tool_id text not null,
  event_type text not null, -- 'load', 'start', 'success', 'error'
  file_size_bytes bigint,
  processing_time_ms int,
  error_message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.tool_metrics enable row level security;
create policy "Allow anonymous inserts" on public.tool_metrics for insert with check (true);
create policy "Restrict reading to admins" on public.tool_metrics for select using (auth.role() = 'authenticated');
```

### 2. Telemetry Engine Implementation (`apps/web/src/lib/telemetry.ts`)
Create this file to log event tracks to GA4 and Supabase:
```typescript
export type TelemetryEventType = "load" | "start" | "success" | "error";

export interface TelemetryDetails {
  fileSizeBytes?: number;
  processingTimeMs?: number;
  errorMessage?: string;
}

export function trackToolEvent(toolId: string, eventType: TelemetryEventType, details?: TelemetryDetails) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[TELEMETRY] [${toolId}] [${eventType}]`, details || "");
  }

  // Google Analytics Event
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", `tool_${eventType}`, {
      tool_id: toolId,
      file_size_bytes: details?.fileSizeBytes,
      processing_time_ms: details?.processingTimeMs,
      error_message: details?.errorMessage,
    });
  }

  // Supabase Rest API Logging
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/tool_metrics`;
    fetch(endpoint, {
      method: "POST",
      headers: {
        "apikey": supabaseAnonKey,
        "Authorization": `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        tool_id: toolId,
        event_type: eventType,
        file_size_bytes: details?.fileSizeBytes,
        processing_time_ms: details?.processingTimeMs,
        error_message: details?.errorMessage,
      }),
      keepalive: true
    }).catch(() => {});
  }
}
```

---

## ✍️ Phase 3: Programmatic SEO & How-To Guides (1-2 Months)

Currently, only **5 out of 43 tools** have dynamic articles. To rank for high-intent organic terms, write guides for the remaining **38 tools** in 4 batches:

1.  **Batch 1: PDF Tools (13 Articles):** Focus on offline workflows (`pdf-split`, `pdf-rotate`, `pdf-protect`, `pdf-sign`, etc.).
2.  **Batch 2: Dev & Generator Tools (13 Articles):** Focus on formatting and local ciphers (`diff-checker`, `jwt-debugger`, `regex-tester`, `base64-encoder`, etc.).
3.  **Batch 3: Image & Text Tools (6 Articles):** Focus on optimization (`bulk-image-resizer`, `svg-minifier`, `case-converter`, `text-cleaner`, etc.).
4.  **Batch 4: Financial Calculators (5 Articles):** Focus on equity and loan schedules (`saas-mrr`, `cap-table`, `mortgage-calculator`, etc.).

*Note: Ensure all new guides are registered in `apps/web/src/lib/articles.ts` so they automatically generate dynamic paths and multi-lingual alternate sitemap links.*

---

## 📈 Phase 4: AdSense Approval & Soft Rollout (3-4 Weeks)

Apply for Google AdSense only after the site has gathered traffic history and domain authority.

### Monetization Guidelines:
1.  **Traffic Threshold:** Apply for AdSense after consistently hitting **50–100 daily visitors** on GA4.
2.  **Soft Launch Placement:**
    *   Enable sticky vertical ad rails (e.g. 300x600 px) in tool workspaces. These yield higher viewability CPMs without obstructing user operations.
    *   Do not spam banners. Keep the core workspaces clean.
3.  **Replace Publisher ID:** Once approved, replace the default AdSense publisher tag in `src/app/layout.tsx`.

---

## 📶 Phase 5: PWA Service Worker (Offline Cache)

Offline cache capability will allow pages and compiled tool components to load instantly without a network.

> [!WARNING]
> **AdSense Revenue Warning:** Enabling offline support blocks AdSense crawler auction scripts during offline use. This will result in zero ad revenues for offline sessions. Consider caching assets only if you plan to launch a premium license/payment model for offline access.

### 1. Cache Service Worker Caching Logic (`public/sw.js`)
```javascript
const CACHE_NAME = "zerowebtools-v1";
const OFFLINE_URL = "/";

const PRECACHE_ASSETS = [
  "/",
  "/logo.png",
  "/favicon.ico",
  "/pdf.worker.min.js",
  "/manifest.webmanifest",
  "/privacy",
  "/terms",
  "/extensions"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(names.map(name => name !== CACHE_NAME && caches.delete(name)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) return networkResponse;
        const cacheClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cacheClone));
        return networkResponse;
      }).catch(() => caches.match(OFFLINE_URL));
    })
  );
});
```

### 2. Service Worker Registration Component
Render this client-side loader inside `layout.tsx` to launch the worker script:
```typescript
"use client";
import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
```

---

## ⚡ Phase 6: ZeroWebTools Companion & Advanced Privileged Tools (3-6 Months)

To transition ZeroWebTools from a simple utility site to a high-traction, desktop-class platform, we will launch the **ZeroWebTools Companion** extension to unlock privileged operations.

### 1. Extension Rebranding & Setup
* **Name change**: Rebrand from `ZeroWebTools - Developer Utilities` to `ZeroWebTools Companion`.
* **Manifest updates**: Add `unlimitedStorage` and YouTube streaming domain permissions (`*://*.youtube.com/*`, `*://*.googlevideo.com/*`) in `manifest.json`.
* **Communication bridge**: Establish the content-script handshake and `externally_connectable` rules to allow `localhost` and `zerowebtools.com` pages to send commands to the background worker.

### 2. Rolling Out Extension-Dependent Features
We will implement these tools in order of development feasibility and traffic traction:
1. **YouTube Direct Audio Transcriber**: Hook into the new Whisper Tiny pipeline to transcribe YouTube links in under 60 seconds.
2. **YouTube Video/Audio Downloader**: Client-side media buffer downloading with in-browser track merging and MP3 transcoding.
3. **REST API Client**: A CORS-exempt local network requester for developers to test their local endpoints privately.
4. **Universal Web Scraper & Markdown Converter**: Client-side content extractor supporting cookie inheritance to bypass generic scrapers' limits.

### 3. Activating the Growth Loop
* Add call-to-actions (CTAs) in the transcriber and downloader workspaces. When a user pastes a URL requiring external access, check for the Companion extension:
  * **If detected**: Process the request instantly with high speed.
  * **If not detected**: Open a stylized overlay drawer showing a quick video tutorial and a single-click download link to the Chrome Web Store / Firefox Add-ons portal.
* Target keywords around offline, private downloading and local API consoles to rank organically without paying for high backend server resources.

