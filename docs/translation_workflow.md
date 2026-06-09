# Internationalization (i18n) & Translation Workflow

ZeroWebTools utilizes a unified, fully automated translation orchestrator to translate UI strings, instructional articles, and programmatic SEO queries into multiple target languages.

---

## 🚀 Overview

The translation workflow is driven by the unified orchestration script:
```bash
node scratch/translate_all.js
```

This script extracts all source texts from the codebase, orchestrates parallel translations using the Google Translate API, manages a local cache, and compiles localized output files.

---

## 📂 Data Sources & Extraction

The script dynamically scans the codebase to compile the complete set of texts to be translated:

1. **UI Dictionary**:
   - Source: [apps/web/src/locales/en.json](file:///Users/zee/zeeshanahmad-io/zeelancebox/apps/web/src/locales/en.json)
   - Extracted dynamically from all keys across all sections (e.g. `common`, `categories`, `tools`, etc.).
2. **Instructional Articles**:
   - Source: [apps/web/src/lib/articles/](file:///Users/zee/zeeshanahmad-io/zeelancebox/apps/web/src/lib/articles) (excluding `index.ts`)
   - Scans all category-specific `.ts` files, strips TypeScript annotations, and evaluates the exported `*_ARTICLES` arrays (titles, meta-descriptions, section headings, paragraphs, list items, and FAQs).
3. **Programmatic SEO Queries**:
   - Source: [apps/web/src/lib/programmatic-seo-data.ts](file:///Users/zee/zeeshanahmad-io/zeelancebox/apps/web/src/lib/programmatic-seo-data.ts)
   - Extracts 5 programmatic long-tail sub-queries per tool (titles, meta-descriptions, and article intros).

---

## ⚡ Concurrency & Rate Limiting

To translate tens of thousands of strings without being rate-limited by the translation service:

* **Concurrency Control**: The script processes translations using a worker pool with a configurable concurrency limit (default is `8` parallel workers).
* **Jitter & Delays**: Adds small randomized delays (jitter) between calls to prevent request spikes.
* **Rate-Limit Throttling**: Automatically detects HTTP `429` (Too Many Requests) or `503` (Service Unavailable) status codes:
  - When rate-limited, it pauses all translation requests for **15 seconds**.
  - Retries up to 4 times per text sequence with exponential backoff before falling back safely to the English source text.

---

## 💾 Cache Management

To prevent API overhead and allow quick incremental translation runs, the script uses a persistent JSON cache:

* **Cache File**: Stored in a local scratch directory (`scratch/translation_cache.json`).
* **Autosave**: Periodically flushes new cache entries to disk every 5 seconds if changes have occurred.
* **100% Cache Hits**: If a string has been translated before, it resolves instantly from the cache, preventing redundant network requests.

---

## 🏁 Localized Outputs

Once all translation tasks are fetched or resolved from the cache, the script compiles two main localized files:

1. **Localized Locales Dictionaries**:
   - Saved to: `apps/web/src/locales/[locale].json` (e.g., `es.json`, `de.json`, etc.)
   - Includes both translated UI keys and translated instructional article structures.
2. **Localized Programmatic SEO File**:
   - Saved to: [apps/web/src/lib/programmatic-seo-data-localized.ts](file:///Users/zee/zeeshanahmad-io/zeelancebox/apps/web/src/lib/programmatic-seo-data-localized.ts)
   - Exports the `LOCALIZED_PROGRAMMATIC_SEO_DATA` constant containing translated programmatic SEO data for all supported languages.

---

## 🌍 Supported Locales

The current target languages include:
* Spanish (`es`)
* German (`de`)
* French (`fr`)
* Portuguese (`pt`)
* Japanese (`ja`)
* Chinese (`zh`)
* Hindi (`hi`)
* Italian (`it`)
* Arabic (`ar`)

---

## 🛠️ Translation Workflow for New Tools

When adding a new tool to the suite, follow this simple workflow to automatically generate all translations:

1. Add the tool definition to [apps/web/src/lib/tools.ts](file:///Users/zee/zeeshanahmad-io/zeelancebox/apps/web/src/lib/tools.ts).
2. Add its UI keys to [apps/web/src/locales/en.json](file:///Users/zee/zeeshanahmad-io/zeelancebox/apps/web/src/locales/en.json).
3. Create the article in `apps/web/src/lib/articles/` and export it in the corresponding article array.
4. Add the 5 programmatic SEO sub-queries for the new tool in [apps/web/src/lib/programmatic-seo-data.ts](file:///Users/zee/zeeshanahmad-io/zeelancebox/apps/web/src/lib/programmatic-seo-data.ts).
5. Run the translation script:
   ```bash
   node scratch/translate_all.js
   ```
6. The script will automatically scan the changes, translate the new content (leveraging the cache for existing content), and rebuild all localized output files.
