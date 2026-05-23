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
      { id: "pdf-merge", title: "Merge PDF", description: "Combine multiple PDFs into a single document in any order.", status: "live", metaDescription: "Free online PDF merger. Combine PDF files in any order. All processing in your browser." },
      { id: "pdf-split", title: "Split PDF", description: "Extract or remove individual pages from PDF documents.", status: "live", metaDescription: "Free online PDF splitter. Extract specific pages or split ranges from PDF files. All in your browser." },
      { id: "pdf-compress", title: "Compress PDF", description: "Reduce PDF file size by removing unused objects and optimizing streams.", status: "live", metaDescription: "Free online PDF compressor. Reduce file size while preserving quality. Fully client-side." },
      { id: "pdf-rotate", title: "Rotate PDF", description: "Rotate individual pages or entire PDFs by 90, 180, or 270 degrees.", status: "live", metaDescription: "Free online PDF rotation tool. Rotate pages clockwise or counterclockwise by 90, 180, or 270 degrees." },
      { id: "pdf-to-jpg", title: "PDF to JPG", description: "Convert each PDF page to a high-resolution JPG image.", status: "live", metaDescription: "Free online PDF to JPG converter. Render PDF pages as high-quality JPEG images. Batch conversion supported." },
      { id: "jpg-to-pdf", title: "JPG to PDF", description: "Convert multiple JPG images into a single PDF document.", status: "live", metaDescription: "Free online JPG to PDF converter. Combine images into a PDF with adjustable page size and margins." },
      { id: "pdf-protect", title: "Protect PDF", description: "Add password encryption to PDF files to prevent unauthorized access.", status: "live", metaDescription: "Free online PDF protection tool. Add password encryption and set permissions for printing and editing." },
      { id: "pdf-watermark", title: "Add Watermark", description: "Stamp text or image watermarks onto PDF pages.", status: "live", metaDescription: "Free online PDF watermark tool. Add text watermarks to PDF pages with customizable font, size, and opacity." },
      { id: "pdf-page-numbers", title: "Add Page Numbers", description: "Insert page numbers into PDF documents with custom position and formatting.", status: "live", metaDescription: "Free online page numbering tool. Add page numbers to PDFs with custom position, font, size, and starting number." },
      { id: "pdf-organize", title: "Organize PDF", description: "Reorder, delete, or extract pages from PDF documents.", status: "live", metaDescription: "Free online PDF organizer. Drag and drop pages to reorder, delete, or extract them. All in your browser." },
      { id: "pdf-unlock", title: "Unlock PDF", description: "Remove password protection from PDF files (requires you to know the password).", status: "live", metaDescription: "Free online PDF unlocker. Remove password encryption from PDFs. Must have the password to unlock. All in your browser." },
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
        metaDescription: "Free online JSON formatter. Validate, beautify, and minify JSON data instantly with no data leaving your browser.",
      },
      {
        id: "case-converter",
        title: "Case Converter",
        description: "Transform naming conventions between camelCase, snake_case, kebab-case, and more.",
        status: "live",
        metaDescription: "Free online case converter. Transform text between camelCase, snake_case, kebab-case, PascalCase, and CONSTANT_CASE instantly.",
      },
      {
        id: "base64-encoder",
        title: "Base64 Cipher Modeler",
        description: "Encode text or files to Base64 and decode Base64 back to readable format instantly.",
        status: "coming-soon",
        metaDescription: "Free online Base64 encoder and decoder. Convert text and files to and from Base64 format instantly.",
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
        metaDescription: "Free online HEIC to JPG and HEIC to PNG converter. Instantly convert Apple HEIC photos to standard formats. Batch upload, bulk download. All processing in your browser.",
      },
      {
        id: "bulk-image-resizer",
        title: "Bulk Image Resizer & Compressor",
        description: "Resize, compress, and convert multiple images at once. Download as ZIP.",
        status: "coming-soon",
        metaDescription: "Free bulk image resizer and compressor. Resize multiple images, compress by quality, batch convert to WebP or JPEG. All in your browser.",
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
        metaDescription: "Free online SaaS MRR and Growth Projection modeler. Project MRR growth, churn rates, and Customer Lifetime Value client-side.",
      },
      {
        id: "startup-equity",
        title: "Equity Vesting Modeler",
        description: "Calculate employee option vesting schedules, stock valuations, and founder dilution curves.",
        status: "live",
        metaDescription: "Free online startup equity option vesting and dilution calculator. Model employee stock options and founder vesting client-side.",
      },
    ],
  },
];

export const ALL_TOOLS: Tool[] = CATEGORIES.flatMap((c) => c.tools);

export const CATEGORY_TAG_STYLES: Record<string, string> = {
  "pdf-tools": "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100",
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