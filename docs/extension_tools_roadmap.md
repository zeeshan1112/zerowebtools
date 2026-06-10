# ZeroWebTools: Advanced Extension-Enabled Tools Roadmap

This document outlines the technical design, system workflows, and traction strategies for a new class of **serverless, high-traffic browser tools** enabled by the ZeroWebTools Companion browser extension proxy.

---

## 🚀 The Core Advantage: Client-Side Privileged Operations

Standard web browsers restrict client-side JavaScript from fetching files across origins (CORS restrictions) or connecting to local networks. By leveraging host permissions in the **ZeroWebTools Companion** browser extension, we bypass these sandbox limitations, enabling complex utilities to run **100% serverless, private, and free**.

```
┌─────────────────────────────────────────────────────────────┐
│                   ZeroWebTools Core Engine                  │
└──────────────────────────────┬──────────────────────────────┘
                               │
               Requires privileged CORS/DOM access?
                               │
                 ┌─────────────┴─────────────┐
                YES                          NO
                 │                           │
                 ▼                           ▼
      [Companion Extension]          [Standard Web APIs]
      - Fetch YouTube Streams        - Local PDF parsing
      - Extract Active Tab DOM       - Native Text Conversion
      - Direct Intranet testing      - Local WebAssembly (Whisper)
```

---

## 🛠️ Category A: Privileged Media & Scraping Utilities

### 1. YouTube & Media Downloader (Video & Audio)
Allows users to download or convert media files from YouTube, Vimeo, TikTok, and Reddit.

* **The Workflow**:
  1. User inputs the video link on our site.
  2. The extension background script fetches the video page metadata, decrypts the player signatures (via proxy APIs like Invidious/Piped), and isolates the direct audio/video format URLs.
  3. The extension downloads the audio or video chunks as an `ArrayBuffer` in-memory.
  4. The web page compiles the chunks and offers a local download link.
* **FFmpeg.wasm Integration**: For advanced operations (e.g., merging separate audio and video tracks, converting MP4 to MP3, or cropping sections), a client-side port of `FFmpeg.wasm` runs inside a Web Worker. This allows heavy transcoding to run on the user's CPU without server-side processing.
* **The Hack/Differentiator**: Traditional online downloaders are slow, loaded with spam ads, and require expensive proxy servers. Our tool streams data directly from YouTube’s CDN to the user's browser, costing us $0 in server bandwidth.
* **Traction Potential**: High-volume, high-intent keywords (e.g. *"download youtube mp3 ad free"*).

---

### 2. Universal Web Scraper, Paywall Bypass & Reader View
Sanitizes paywalled website links into clean, readable articles and formatted Markdown files.

* **The Workflow**:
  1. User pastes a website link.
  2. The extension executes a privileged proxy fetch to get the raw webpage structure.
  3. A browser-side parser (like `dompurify` + `turndown` or a Readability engine) strips out ads, sidebars, navigation headers, and modal overlays.
  4. The output is displayed in a split-screen distraction-free reader mode and a raw markdown editor.
* **The Hack/Differentiator (Paywall Bypass Techniques)**:
  * **DOM Restoration (Soft Paywalls)**: Many websites load the full article in the HTML source but hide it behind overlay elements, blur filters, or CSS classes (`display: none`). The extension reads the raw DOM of the page directly, bypassing the visual block.
  * **User-Agent Spoofing (Hard Paywalls)**: To bypass server-side checks (where content is truncated), the extension background worker spoofs the request headers to appear as **Googlebot** (`Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)`) or sets the `Referer` to `https://www.google.com`, which paywall gateways often allow through for SEO indexing.
  * **Web Archive Fallbacks**: If direct access is blocked, the extension queries public caching systems (like the Wayback Machine `web.archive.org` or `archive.today` API endpoints) to retrieve and display the un-paywalled version.
  * **Session Cookie Inheritance**: Bypasses corporate intranets or subscription walls by using the user's logged-in session cookies (which standard server scrapers cannot inherit).
* **Traction Potential**: Highly popular search query targeting *"bypass news paywall privately"* or *"convert webpage to markdown"*.

---

### 3. YouTube Subtitle & Caption Extractor (.SRT / Text)
Extracts closed captions and timing files from any video.

* **The Workflow**:
  1. User pastes a video URL.
  2. The extension fetches the player config and extracts the URL endpoint for the captions track (XML/WebVTT).
  3. The website parses the XML into a readable transcription block or a standardized `.srt` subtitle file.
* **The Hack/Differentiator**: Extremely fast (takes < 1 second) because it only fetches a few kilobytes of text data instead of downloading large media files.
* **Traction Potential**: Great for content creators and transcription editors.

---

### 4. Browser-Based REST API Client (Private "Postman" / "Bruno")
A fully client-side interface to construct, execute, and debug HTTP requests.

* **The Workflow**:
  1. The user inputs headers, query params, methods, and endpoint URLs.
  2. The extension background page executes the `fetch` call natively (exempt from browser CORS policies).
  3. Returns response headers, status codes, and formatting previews.
* **The Hack/Differentiator**: Unlike Postman, this client-side client is 100% private, requires no cloud syncing, and can connect to **localhost** (`http://localhost:8000`) or local intranet resources.
* **Traction Potential**: Captures developers looking for lightweight, secure, account-free API testing.

---

### 5. Podcast & SoundCloud Audio Ripper
Downloads MP3 files from podcasts and audio-sharing websites.

* **The Workflow**:
  1. Paste Apple Podcast, Spotify Web, or SoundCloud link.
  2. The extension parses the audio enclosure link (from the underlying RSS feed or metadata).
  3. Fetches the raw audio bytes and sends them to the web workspace.
* **The Hack/Differentiator**: Users can trim the audio clip directly in the browser and send it to our **Audio Transcriber Pro** with a single click.

---

## 🧠 Category B: Specialized Client-Side AI Utilities

> [!IMPORTANT]
> **Performance Optimization Strategy (Phase 1)**
> To ensure maximum accessibility and compatibility for users with standard hardware (e.g. 8GB RAM laptops), we defer heavy generative text LLMs (like Gemma-2-2B at 1.4GB+) to Phase 2. Phase 1 focuses strictly on **lightweight models (<100MB)** including semantic similarity embeddings (~23MB) and pure JS-based scrapers (0MB) to provide zero-resistance user workflows.

### 1. YouTube Video Semantic Search & Q&A
Enables users to search inside videos semantically and ask questions about the content.

* **The Workflow**:
  1. User enters a YouTube URL.
  2. The extension extracts the captions or transcribes the audio in a background worker.
  3. A local WebAssembly embedding model (like `all-MiniLM-L6-v2`, ~23MB) converts each timestamped text segment into a vector embedding array.
  4. The user types a query (e.g. *"Where does he talk about deployment?"*).
  5. The tool performs a local cosine similarity search, instantly returning exact timestamps that match the query semantically.
* **Traction Potential**: Huge developer/student workflow utility for skipping long video tutorials.

---

### 2. Universal Webpage RAG & Summarizer (Offline Reader)
Let users summarize and chat with articles directly from their active browser tab.

* **The Workflow**:
  1. While reading an article, the user clicks the Companion extension icon.
  2. The extension parses the active tab's HTML, strips clutter (ads, comments), and transfers the clean text body to the ZeroWebTools workspace.
  3. The local workspace runs an in-browser WebGPU LLM (like *Gemma-2-2B* or *Phi-3* via WebLLM) to summarize the content or answer questions.
* **The Hack/Differentiator**: Because it runs inside the browser, it inherits the user's active session cookies, allowing it to summarize articles behind logged-in paywalls that cloud-based parsers cannot access.

---

### 3. Universal Job Matcher & Resume Customizer
Automate resume tailoring and analyze job application requirements locally.

* **The Workflow**:
  1. The user uploads their resume (PDF/Text), which is cached securely in their local browser storage.
  2. While browsing a job listing (e.g. LinkedIn, Indeed, Greenhouse), the user clicks the extension overlay button.
  3. The content script extracts the Job Description, Title, and Company from the page DOM.
  4. The web workspace runs a local natural language processing (NLP) analysis to compute a **"Match Quality Score"** and highlight missing keywords (e.g. *TailwindCSS*, *E2E Testing*).
  5. It runs a local LLM to draft a tailored cover letter and adapt resume bullets to the job posting privately.
* **Traction Potential**: Job seekers seeking private, free, and local resume enhancement.

---

### 4. AI-Powered Schema Extractor (HTML to JSON)
Extract structured tables and data lists from dynamic webpages.

* **The Workflow**:
  1. The user visits a data-rich page (e.g., real estate listings, directory lists).
  2. The extension captures the fully-rendered HTML DOM.
  3. The user defines a simple target structure (e.g., `{ name: "string", price: "number" }`).
  4. A local classification model scans the DOM structure and matches repeated elements to the schema, outputting a downloadable JSON/CSV file.

---

### 5. Podcast Clippify & Social Post Composer
Compose viral social summaries from podcast audio snippets.

* **The Workflow**:
  1. User inputs a podcast link. The extension downloads the audio file in-memory.
  2. The user trims a 2-to-5 minute clip on a visual waveform.
  3. Whisper Tiny transcribes the clip locally.
  4. A local LLM drafts social media hooks (Twitter threads, LinkedIn summaries) based on the transcript.

---

## 📈 Growth & Acquisition Strategy

```
Visitor Lands on Tool Page (e.g., YouTube Transcriber)
              │
              ▼
    Extension Detected?
      ├── YES ──> Process request instantly (Premium Experience)
      └── NO  ──> Render Download Alert: "Install free Companion to bypass CORS"
                    │
                    ▼
          Drives Chrome Web Store Installs (Growth Loop)
```

1. **The Extension Growth Loop**: Every time a visitor lands on a tool that requires CORS scraping (such as transcribing or downloading a YouTube link), the UI displays a clean call-to-action explaining that installing the extension is necessary to fetch data privately. This converts temporary site visitors into long-term extension users.
2. **Organic SEO Target**: Build programmatic SEO variants targeting:
   - *"download youtube video offline"*
   - *"scrape site to markdown privately"*
   - *"postman local network alternative"*
3. **Zero Hosting Overhead**: Because all file downloads, audio conversions, and API requests run on the user's client device, our hosting bills remain unchanged even with millions of downloads. This allows us to offer completely free and unlimited usage, securing a massive competitive advantage.

---

## 🎨 Layout Mockups & Page Visualizations

### 1. YouTube Audio/Video Downloader Workspace
```
┌──────────────────────────────────────────────────────────────────┐
│  📥 YouTube Audio & Video Downloader                             │
├──────────────────────────────────────────────────────────────────┤
│  Enter YouTube URL:                                              │
│  [ https://youtube.com/watch?v=...                         ] [🔍]│
├──────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ 🎥 Video Title: "Building Serverless Web Tools"            │  │
│  │ Channel: ZeroWebDev | Duration: 12:45                      │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │ Format Selection:                                          │  │
│  │ (o) Video + Audio (MP4 1080p) - [Local Muxing via WASM]    │  │
│  │ ( ) Video Only (MP4 1080p)                                  │  │
│  │ ( ) Audio Only (MP3 320kbps) - [Auto conversion]           │  │
│  ├────────────────────────────────────────────────────────────┤  │
│  │ [⬇️ Start Download (Local Processing)]                      │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### 2. Private REST Client (Postman Alternative)
```
┌──────────────────────────────────────────────────────────────────┐
│  ⚡ ZeroWebTools HTTP Request Console (100% Private)             │
├──────────────────────────────────────────────────────────────────┤
│  [GET  ] [ http://localhost:8080/api/users                 ] [⚡]│
├──────────────────────────────────────────────────────────────────┤
│  Tabs: [Headers (3)] [Query Params] [Body (JSON)] [Settings]     │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Key: Authorization  | Value: Bearer token123               │  │
│  │ Key: Accept         | Value: application/json              │  │
│  └────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│  Response Code: 200 OK | Time: 12ms | Size: 1.2KB                │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ {                                                          │  │
│  │   "status": "success",                                     │  │
│  │   "data": [{"id": 1, "name": "Zee"}]                        │  │
│  │ }                                                          │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### 3. AI Job Matcher & Resume Customizer
```
┌──────────────────────────────────────────────────────────────────┐
│  💼 AI Job Matcher & Resume Customizer                           │
├──────────────────────────────────────────────────────────────────┤
│  [ Active Tab Detected: Software Engineer at Vercel ]            │
├──────────────────────────────────────────────────────────────────┤
│  📊 Match Quality Score: [▓▓▓▓▓▓▓▓░░] 80%                        │
│                                                                  │
│  ⚠️ Missing Keywords:                                            │
│  - "TailwindCSS" (Mentioned 4 times in job description)          │
│  - "E2E Testing" (Mentioned 2 times in job description)          │
├──────────────────────────────────────────────────────────────────┤
│  Actions:                                                        │
│  [📝 Draft Cover Letter]  [✏️ Tailor Resume Bullets]              │
├──────────────────────────────────────────────────────────────────┤
│  Generated Cover Letter (Private Edit Console):                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Dear Vercel Hiring Team,                                   │  │
│  │ I am writing to express my interest in the Software...      │  │
│  │ My experience with Next.js and frontend optimization...     │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```
