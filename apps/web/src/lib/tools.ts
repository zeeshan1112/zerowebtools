export type ToolStatus = "live" | "coming-soon";

export interface Tool {
  id: string;
  title: string;
  description: string;
  status: ToolStatus;
  metaDescription: string;
}

export interface ToolCategory {
  slug: string;
  title: string;
  description: string;
  tools: Tool[];
}

export const CATEGORIES: ToolCategory[] = [
  {
    slug: "pdf-tools",
    title: "PDF Suite Pro",
    description: "Merge, split, compress, rotate, convert, sign, and secure PDFs — all securely in your browser.",
    tools: [
      { id: "pdf-merge", title: "Merge PDF", description: "Combine multiple PDFs into a single document in any order.", status: "live", metaDescription: "Merge PDF files into one — free, instant, and 100% private. No signup, no upload to servers. Rearrange pages and download in seconds." },
      { id: "pdf-split", title: "Split PDF", description: "Extract or remove individual pages from PDF documents.", status: "live", metaDescription: "Split or extract PDF pages instantly — free, private, no server uploads. Select exact pages or ranges and download in one click." },
      { id: "pdf-compress", title: "Compress PDF", description: "Reduce PDF file size by removing unused objects and optimizing streams.", status: "live", metaDescription: "Shrink PDF file sizes by up to 90% — free, fast, and fully private. Three compression levels. No signup, no email required." },
      { id: "pdf-rotate", title: "Rotate PDF", description: "Rotate individual pages or entire PDFs by 90, 180, or 270 degrees.", status: "live", metaDescription: "Rotate PDF pages instantly — 90, 180, or 270 degrees. Free, private, works right in your browser. No signup needed." },
      { id: "pdf-to-jpg", title: "PDF to JPG", description: "Convert each PDF page to a high-resolution JPG image.", status: "live", metaDescription: "Convert PDF pages to high-quality JPG images — free, instant, and private. Batch conversion supported. No server uploads, no signup." },
      { id: "jpg-to-pdf", title: "JPG to PDF", description: "Convert multiple JPG images into a single PDF document.", status: "live", metaDescription: "Turn JPG images into a clean PDF — free, private, and instant. Adjust page size, margins, and orientation. No signup needed." },
      { id: "pdf-protect", title: "Protect PDF", description: "Add password encryption to PDF files to prevent unauthorized access.", status: "live", metaDescription: "Password-protect your PDF in seconds — free, private, and instant. 128-bit encryption. No signup, no server uploads." },
      { id: "pdf-watermark", title: "Add Watermark", description: "Stamp text or image watermarks onto PDF pages.", status: "live", metaDescription: "Stamp watermarks on your PDF — CONFIDENTIAL, DRAFT, or your brand name. Custom font, opacity, angle, and position. Free and private." },
      { id: "pdf-page-numbers", title: "Add Page Numbers", description: "Insert page numbers into PDF documents with custom position and formatting.", status: "live", metaDescription: "Add page numbers to any PDF — top, bottom, center, or corner. Custom font, size, and starting number. Free, private, instant." },
      { id: "pdf-organize", title: "Organize PDF", description: "Reorder, delete, or extract pages from PDF documents.", status: "live", metaDescription: "Drag-and-drop PDF page organizer — reorder, delete, or extract pages visually. Free, private, and works right in your browser." },
      { id: "pdf-unlock", title: "Unlock PDF", description: "Remove password protection from PDF files (requires you to know the password).", status: "live", metaDescription: "Remove PDF password protection instantly — free and private. Enter your password, decrypt, and download. No server uploads." },
    ],
  },
  {
    slug: "text-tools",
    title: "Writing & Content Utilities",
    description: "Clean, format, count, and convert text contents instantly in your browser.",
    tools: [
      {
        id: "word-counter",
        title: "Word Counter Pro",
        description: "Count words, characters, sentences, and paragraphs in real-time, plus keyword density analysis.",
        status: "live",
        metaDescription: "Free client-side word and character counter. Analyze reading time, speaking time, lines, sentences, and keyword density. 100% private.",
      },
      {
        id: "case-converter",
        title: "Case Converter",
        description: "Transform naming conventions between camelCase, snake_case, kebab-case, and more.",
        status: "live",
        metaDescription: "Convert text between any naming convention — camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE. Free, instant, and private.",
      },
      {
        id: "text-cleaner",
        title: "Universal Text Cleaner",
        description: "Clean spaces, deduplicate lines, remove empty lines, strip HTML, sort lists, and run search-and-replace queries.",
        status: "live",
        metaDescription: "Clean, format, sort, and replace text sequences client-side. Remove duplicates and empty lines, strip HTML, and run regex find-replace. 100% private.",
      },
    ],
  },
  {
    slug: "converters",
    title: "Developer Workspaces",
    description: "Validate, format, parse, and convert your data structures client-side.",
    tools: [
      {
        id: "json-formatter",
        title: "JSON Formatter",
        description: "Validate, beautify, and minify JSON data with real-time tree structure explorer.",
        status: "live",
        metaDescription: "Validate, format, and explore JSON data visually — free, instant, and 100% private. Tree view, syntax highlighting, and live error detection. No server uploads.",
      },
      {
        id: "base64-encoder",
        title: "Base64 Cipher Modeler",
        description: "Encode text or files to Base64 and decode Base64 back to readable format instantly.",
        status: "live",
        metaDescription: "Encode and decode Base64 instantly — free and private. Convert text or files to and from Base64 right in your browser. No server uploads.",
      },
      {
        id: "diff-checker",
        title: "Side-by-Side Diff Checker",
        description: "Compare two text blocks or code files side-by-side or inline to highlight additions, deletions, and character modifications.",
        status: "live",
        metaDescription: "Compare two text files side-by-side or inline to highlight additions, deletions, and character modifications in real time. 100% private and client-side.",
      },
      {
        id: "jwt-debugger",
        title: "JWT Debugger & Decoder",
        description: "Decode JSON Web Tokens (JWT) header, payload, and signatures client-side, with claims validation.",
        status: "live",
        metaDescription: "Decode, parse, and validate JSON Web Tokens (JWT) locally. Review algorithms, payload claims, and expiration details with 100% client-side privacy.",
      },
      {
        id: "url-encoder",
        title: "URL Encoder/Decoder & Parameter Grid",
        description: "Percent-encode or decode strings and edit query parameters interactively in a tabular grid layout.",
        status: "live",
        metaDescription: "Encode and decode URLs instantly. Parse URL query parameters into an editable tabular grid to add, delete, or modify keys and reassemble them. 100% client-side.",
      },
    ],
  },
  {
    slug: "image-tools",
    title: "Creative Utilities",
    description: "Convert, resize, and optimize images directly in your browser.",
    tools: [
      {
        id: "heic-to-jpg",
        title: "HEIC Photo Converter",
        description: "Convert Apple HEIC photos to standard JPG or PNG format instantly in batch.",
        status: "live",
        metaDescription: "Convert HEIC to JPG or PNG instantly — free, private, and no signup. Batch upload Apple photos, adjust quality, and download as ZIP. All in your browser.",
      },
      {
        id: "bulk-image-resizer",
        title: "Bulk Image Resizer & Compressor",
        description: "Resize, compress, and convert multiple images at once. Download as ZIP.",
        status: "coming-soon",
        metaDescription: "Bulk resize, compress, and convert images — free and private. Batch process to WebP, JPEG, or PNG. Adjustable quality and dimensions. Download as ZIP.",
      },
    ],
  },
  {
    slug: "financial-growth",
    title: "Financial & Growth Modelers",
    description: "Model growth, option vesting schedules, and company valuation dilution with professional interactive tools.",
    tools: [
      {
        id: "saas-mrr",
        title: "SaaS MRR Projections",
        description: "Project Monthly Recurring Revenue growth, Customer Lifetime Value cohorts, and churn rates.",
        status: "live",
        metaDescription: "Model your SaaS MRR growth trajectory — free, private, and instant. Forecast revenue, churn, and customer LTV with interactive charts. No signup needed.",
      },
      {
        id: "startup-equity",
        title: "Equity Vesting Modeler",
        description: "Calculate employee option vesting schedules, stock valuations, and founder dilution curves.",
        status: "live",
        metaDescription: "Calculate startup equity vesting, dilution, and option valuations — free, private, and instant. Model 4-year vest with 1-year cliff. No signup needed.",
      },
    ],
  },
];

export const ALL_TOOLS: Tool[] = CATEGORIES.flatMap((c) => c.tools);

export const CATEGORY_TAG_STYLES: Record<string, string> = {
  "pdf-tools": "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100",
  "text-tools": "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100",
  "converters": "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100",
  "image-tools": "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100",
  "financial-growth": "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100",
};

export function getToolById(id: string): Tool | undefined {
  return ALL_TOOLS.find((t) => t.id === id);
}

export function getCategoryForTool(toolId: string): ToolCategory | undefined {
  return CATEGORIES.find((c) => c.tools.some((t) => t.id === toolId));
}