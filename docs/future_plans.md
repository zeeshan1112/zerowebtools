# ZeroWebTools: Future Feature Blueprints

This document outlines the architecture, code schemas, and implementation plans for features to be added in the future. These features have been deferred to align with business requirements and ad-revenue strategies.

---

## 📊 Feature Blueprint: Supabase & GA4 Telemetry

This blueprint details how to track anonymous tool usage (load, start, success, error) to both Google Analytics (GA4) and a Supabase database. This will help analyze file sizes processed, speed performance, and tool failure rates.

### 1. Database Table Schema (PostgreSQL / Supabase)
Run the following SQL in your Supabase SQL Editor to provision the tracking table with Row Level Security (RLS) policies allowing public anonymous insertions:

```sql
-- Create the anonymous tool usage metrics table
create table public.tool_metrics (
  id uuid default gen_random_uuid() primary key,
  tool_id text not null,
  event_type text not null, -- 'load', 'start', 'success', or 'error'
  file_size_bytes bigint,   -- optional size tracking (in bytes)
  processing_time_ms int,   -- operation speed tracking (in milliseconds)
  error_message text,       -- error traceback for bug debugging
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.tool_metrics enable row level security;

-- Allow public anonymous inserts (clients writing telemetry directly)
create policy "Allow anonymous inserts"
on public.tool_metrics
for insert
with check (true);

-- Restrict reading access to authenticated administrator accounts only
create policy "Restrict reading/writing to authenticated admins only"
on public.tool_metrics
for select
using (auth.role() = 'authenticated');
```

### 2. Environment Variables
Add these keys to Vercel/Netlify or your `.env.local` to enable logging:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Telemetry Engine Implementation (`src/lib/telemetry.ts`)
```typescript
export type TelemetryEventType = "load" | "start" | "success" | "error";

export interface TelemetryDetails {
  fileSizeBytes?: number;
  processingTimeMs?: number;
  errorMessage?: string;
}

export function trackToolEvent(
  toolId: string,
  eventType: TelemetryEventType,
  details?: TelemetryDetails
) {
  // Console logging in development
  if (process.env.NODE_ENV !== "production") {
    console.log(`[TELEMETRY] [${toolId}] [${eventType}]`, details || "");
  }

  // Google Analytics integrations
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", `tool_${eventType}`, {
      tool_id: toolId,
      file_size_bytes: details?.fileSizeBytes,
      processing_time_ms: details?.processingTimeMs,
      error_message: details?.errorMessage,
    });
  }

  // Supabase direct REST post (zero dependency client)
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
    }).catch((err) => {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Supabase log failed:", err);
      }
    });
  }
}
```

---

## 📶 Feature Blueprint: PWA Service Worker (Offline Support)

> [!WARNING]
> **Business Note:** Offering offline capability will prevent Google AdSense scripts from loading (as ads require real-time auctions over the network). This will result in zero ad-impression revenue for offline sessions. Implementing this is recommended only if a premium license/payment model is added to monetize offline use.

### 1. Service Worker Caching Logic (`public/sw.js`)
```javascript
const CACHE_NAME = "zerowebtools-v1";
const OFFLINE_URL = "/";

const PRECACHE_ASSETS = [
  "/",
  "/logo.png",
  "/favicon.ico",
  "/pdf.worker.min.js", // Crucial for offline PDF utilities
  "/manifest.webmanifest",
  "/privacy",
  "/terms",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (
    url.origin !== self.location.origin ||
    url.pathname.startsWith("/_next/webpack-hmr") ||
    url.pathname.startsWith("/api/")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const isStaticAsset =
        url.pathname.startsWith("/_next/static/") ||
        url.pathname.endsWith(".js") ||
        url.pathname.endsWith(".css") ||
        url.pathname.endsWith(".png") ||
        url.pathname.endsWith(".jpg") ||
        url.pathname.endsWith(".svg") ||
        url.pathname.endsWith(".wasm");

      if (cachedResponse && isStaticAsset) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          return networkResponse;
        })
        .catch(() => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === "navigate") return caches.match(OFFLINE_URL);
        });
    })
  );
});
```

### 2. Service Worker Registration Component (`src/components/ServiceWorkerRegister.tsx`)
```typescript
"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => console.log("SW registered:", reg.scope))
          .catch((err) => console.warn("SW failed:", err));
      });
    }
  }, []);

  return null;
}
```
*Note: Render `<ServiceWorkerRegister />` inside your root layout (`src/app/layout.tsx`) under production environments to activate registration.*
