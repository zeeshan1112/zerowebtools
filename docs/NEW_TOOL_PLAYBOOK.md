# Playbook: Adding a New Tool to ZeroWebTools (A-to-Z Lifecycle)

To ensure high-quality SEO, prevent duplicate content warnings in Google Search Console, and maintain performance, follow this step-by-step lifecycle whenever you add a new utility tool.

---

## Phase 1: Core Tool Development
1. **Source Code**: Implement the client-side tool workspace in the appropriate components folder (typically under `apps/web/src/components/workspaces/[toolId]`).
2. **Metadata Registration**:
   * Open [tools.ts](file:///Users/zee/zeeshanahmad-io/zerowebtools/apps/web/src/lib/tools.ts).
   * Find the relevant category and append your new tool object:
     ```typescript
     {
       id: "my-new-tool",
       title: "My New Tool",
       description: "A short descriptions for cards",
       status: "live",
       metaDescription: "Detailed SEO meta description for English."
     }
     ```

---

## Phase 2: Metadata & SEO Guides
1. **Create the Guide**:
   * Open the category file in `apps/web/src/lib/articles/` (e.g. `pdf.ts` or `devtools.ts`).
   * Add the how-to guide metadata object structure:
     ```typescript
     {
       slug: "how-to-use-my-new-tool",
       title: "How to Use My New Tool Privately",
       metaDescription: "Learn how to use my new tool securely in your browser...",
       toolId: "my-new-tool",
       sections: [
         {
           heading: "The Problem We Solve",
           paragraphs: ["First paragraph...", "Second paragraph..."]
         },
         {
           heading: "Key Benefits",
           listItems: ["Benefit 1 -- description...", "Benefit 2 -- description..."]
         }
       ],
       faqs: [
         {
           question: "Does this upload my files?",
           answer: "No, everything runs 100% locally in your browser."
         }
       ]
     }
     ```

---

## Phase 3: Localization (The Translation Checklist)
Before launching, you must translate the tool metadata and guide. If a language is skipped, the system will automatically hide the localized guide route (returning 404) and exclude it from the sitemap alternates to prevent duplicate canonical penalties.

For each of the 9 supported locales:
* `es.json` (Spanish)
* `de.json` (German)
* `fr.json` (French)
* `pt.json` (Portuguese)
* `ja.json` (Japanese)
* `zh.json` (Chinese)
* `hi.json` (Hindi)
* `it.json` (Italian)
* `ar.json` (Arabic)

### Localized Tool Strings
Add the tool's workspace labels, instructions, placeholder text, and buttons to the translation JSON dictionary under the tool key (e.g. `"my_new_tool"`):
```json
"my_new_tool": {
  "dropzoneTitle": "Arrastra y suelta tus archivos aquí",
  "processButton": "Procesar ahora"
}
```

### Localized SEO Article (Crucial)
Add the translated guide under the `"articles"` key in the locale JSON file, matching your `toolId` (`"my-new-tool"`):
```json
"articles": {
  "my-new-tool": {
    "title": "Cómo usar mi nueva herramienta de forma privada",
    "metaDescription": "Aprenda a utilizar la nueva herramienta de forma segura en su navegador...",
    "sections": [
      {
        "heading": "El problema que solucionamos",
        "paragraphs": ["Primer párrafo..."]
      }
    ],
    "faqs": [
      {
        "question": "¿Esto sube mis archivos?",
        "answer": "No, todo se ejecuta 100% localmente en su navegador."
      }
    ]
  }
}
```

---

## Phase 4: Verification Checklist
Prior to committing and merging your changes:
1. **Run TypeScript Check**:
   ```bash
   npm run typecheck
   ```
2. **Build Verification**:
   Ensure Next.js builds successfully and prerenders all pages:
   ```bash
   npm run build:web
   ```
3. **Verify Sitemap Output**:
   Check `http://localhost:3000/sitemap.xml` in your browser. Verify that your new guide is listed, and its `<xhtml:link>` elements only reference the languages you actually translated!
