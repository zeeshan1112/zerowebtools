# ZeroWebTools: Specialized AI Companion Tools Brainstorm

This document explores the synergy between **Client-Side AI** and the **ZeroWebTools Companion** browser extension. It outlines a suite of highly specialized, modern AI tools that bypass CORS, run serverless, and maintain absolute user privacy.

---

## 🧠 The Tech Stack: Local Client-Side AI

Traditional AI tools require massive cloud GPU clusters, costing builders thousands of dollars in API/hosting fees and introducing privacy risks. Our architecture shifts the work to the user's hardware:
* **WebGPU**: Modern WebGPU bindings allow the browser to run LLM and embedding inference directly on the user's graphics card at near-native speeds.
* **Transformers.js (`@xenova/transformers`)**: Runs ONNX Runtime Web in the browser to execute Whisper (speech), BERT (embeddings), and DistilBERT (classification).
* **WebLLM**: A high-performance in-browser LLM engine (running Llama-3, Gemma-2, or Phi-3) using WebGPU.
* **Vector Embeddings (WASM)**: Basic cosine-similarity vector search running locally in JavaScript.

---

## ⚡ Phasing & RAM Optimization (Zero Friction Strategy)

To ensure **minimum user resistance** and support laptops with severe RAM constraints (e.g., standard 8GB machines running dozens of browser tabs), we divide our roadmap into two distinct phases. 

> [!IMPORTANT]
> **Current Focus: Zero-Friction/Lightweight Utilities (<100MB)**
> We defer heavy generative text models (Gemma-2-2B/Phi-3 at 1.4GB+ and cover letter drafting) to future cycles. The initial release prioritizes fast, lightweight operations that load in under 2 seconds and consume negligible RAM.

### Phase 1: Lightweight AI & Scrapers (Active Scope)
1. **YouTube Subtitle Extractor**: **0 MB model size**. Pure XML/WebVTT parsing. Zero CPU/RAM overhead.
2. **Universal Webpage Scraper**: **0 MB model size**. Client-side parser (`dompurify` + `turndown`). Bypasses CORS and session paywalls instantly.
3. **YouTube Video Semantic Search**: **~98 MB total download** (75MB Whisper Tiny + 23MB `all-MiniLM-L6-v2`). Runs locally in Web Workers.
4. **Job Matcher (Keywords & Similarity)**: **~23 MB download**. Calculates keyword overlaps and semantic match percentages without generating text or needing heavy LLM runtimes.

### Phase 2: Generative LLMs & Cover Letters (Deferred Scope)
* **Features**: Cover letter drafting, full article text summarization, social media composer.
* **Requirements**: ~1.4 GB model weights (Gemma-2-2B), WebGPU hardware acceleration, and minimum 8GB-16GB system RAM.

---


## 🛠️ Specialized AI Tool Concepts

```
┌────────────────────────────────────────────────────────────────────────┐
│                        User's Current Web Page                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                         Active Tab DOM / Cookies
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   ZeroWebTools Companion Extension                     │
│    - Extracts DOM & active sessions (Bypasses paywalls)                │
│    - Fetches raw video/audio tracks (Bypasses CORS restrictions)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                           Pipes raw text/audio
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       ZeroWebTools Web Workspace                       │
│    - WebGPU / Web Workers running local LLM & Embedding Models         │
│    - Generates 100% private, serverless output                         │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 1. YouTube Video Semantic Search & Q&A
Instead of just transcribing a video, let the user "chat" with the video and find exact moments semantically.

* **How the Extension Helps**: The extension fetches the subtitles track (XML/WebVTT) or downloads the audio stream (via Invidious proxy) for local transcription.
* **The AI Workflow**:
  1. The transcriber generates a timestamped text block.
  2. A local embedding model (e.g., `all-MiniLM-L6-v2`) converts each segment into a vector embedding array.
  3. The website stores these vectors in a temporary in-memory database.
  4. The user types a query: *"Where does he explain the database migration?"*
  5. The tool computes the cosine similarity and highlights the exact timestamps (with direct links to click and play that specific portion of the video).
* **Target Audience**: Students, researchers, developers watching long coding tutorials or conference keynotes.

---

### 2. Universal Webpage RAG & Summarizer (Offline Reader)
Let users summarize, query, and dissect long articles, document files, or forum threads.

* **How the Extension Helps**: Standard scraper APIs get blocked by Cloudflare or paywalls. Because the extension runs in the user's browser, it inherits their local cookie session context—allowing it to scrape articles behind private pages and logged-in states they already have access to.
* **The AI Workflow**:
  1. User clicks the extension popup on an active tab.
  2. The extension extracts the main article body text.
  3. The text is loaded into a local RAG (Retrieval-Augmented Generation) layout.
  4. A WebGPU-compiled model (like **Gemma-2-2B** or **Phi-3**) generates a bulleted summary, main takeaways, and answers user questions—all offline.
* **Target Audience**: Researchers, LLM engineers seeking clean datasets, and users reading long newsletters/documentation.

---

### 3. Universal Job Matcher & Resume Customizer
Automate and optimize job applications based on the user's actual resume.

* **How the Extension Helps**: When the user browses a job posting page (LinkedIn, Indeed, greenhouse.io), the extension parses the page’s DOM to extract the job title, requirements, and company description.
* **The AI Workflow**:
  1. The extension passes the job description to the website's local workspace.
  2. The website matches this data against the user's stored resume (saved securely in the extension's `unlimitedStorage`).
  3. The AI engine runs a local classifier to show a **"Match Score %"** and highlights missing keywords.
  4. With one click, it drafts a tailored cover letter and suggests bulleted edits to align their resume to the job description.
* **Target Audience**: Active job seekers looking to scale their applications with privacy.

---

### 4. AI-Powered Schema Extractor (HTML to JSON)
Convert arbitrary webpage layouts into structured tables or API-like JSON arrays.

* **How the Extension Helps**: Grabs the fully-rendered client-side DOM (after SPAs like React execute) and passes it to the website.
* **The AI Workflow**:
  1. The user defines a target schema: `{ product_name: "string", price: "number", rating: "string" }`.
  2. A lightweight zero-shot classification model parses the page tags and classes.
  3. The AI isolates repeated list elements and maps them directly to the schema.
  4. The user downloads a structured CSV or JSON file containing the extracted data.
* **Target Audience**: Data analysts, growth hackers, and developers performing lead generation.

---

### 5. Podcast Clippify & Social Post Composer
Turn long-form podcast audio or SoundCloud files into high-engagement social posts.

* **How the Extension Helps**: Bypasses CORS boundaries to fetch raw audio files from Apple Podcasts, Spotify Web, or RSS feeds.
* **The AI Workflow**:
  1. The user selects a 2-to-5 minute audio chunk on an interactive waveform editor.
  2. Our Whisper Tiny model transcribes the chunk locally.
  3. A local generative model summarizes the transcript and drafts social hooks (a Twitter thread, a LinkedIn post, or a newsletter summary).
  4. Offers a single-click copy option.
* **Target Audience**: Content creators, marketers, and podcast editors.

---

## 🔒 The Ultimate Value Proposition: Privacy & Zero Infrastructure Costs

| Metric | Traditional Cloud AI Tools | ZeroWebTools Client-Side AI |
|--------|----------------------------|----------------------------|
| **Server Costs** | High ($0.0015 / 1K tokens) | **$0.00** (Runs on client GPU/CPU) |
| **Data Privacy** | Code/Text uploaded to servers | **100% Private** (Never leaves device) |
| **API Limits** | Rate-limited by subscription keys | **Unlimited** (Bound only by client CPU) |
| **Offline Support**| Fails without internet connection | **Fully Functional** once cached |

---

## 🎨 UI/UX Mockup: Job Matcher & Resume Customizer

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
