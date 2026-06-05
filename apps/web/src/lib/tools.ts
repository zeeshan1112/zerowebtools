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
    title: "PDF Tools",
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
      {
        id: "pdf-sign",
        title: "Sign PDF",
        description: "Draw, type, or upload a signature to sign PDF pages locally with drag-and-drop scaling.",
        status: "live",
        metaDescription: "Sign PDF files securely in your browser — free and private. Draw your signature, type it, or upload PNG signatures. Scale and place them visually. No server uploads.",
      },
      {
        id: "pdf-crop",
        title: "PDF Crop & Page Resize",
        description: "Crop PDF margins and resize pages to standard sizes (A4, Letter, Legal) client-side.",
        status: "live",
        metaDescription: "Crop PDF margins visually or resize pages to A4, Letter, and Legal layouts instantly. Free and private in-browser utility. No server uploads.",
      },
      {
        id: "pdf-to-text",
        title: "PDF to Text Extractor",
        description: "Extract raw text streams and rebuild structured page layout lists locally.",
        status: "live",
        metaDescription: "Extract text from PDF files in your browser — free and private. Layout-reconstruction algorithm matches tabular streams. Download as plain text. No server uploads.",
      },
    ],
  },
  {
    slug: "text-tools",
    title: "Text Tools",
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
      {
        id: "voice-dictator",
        title: "Native Voice Dictator & Reader",
        description: "Dictate speech to text and narrate text to speech offline using native Web Speech APIs.",
        status: "live",
        metaDescription: "Convert speech to text with live dictation, and read text aloud with local text-to-speech. 100% private client-side utility. No server uploads.",
      },
      {
        id: "markdown-converter",
        title: "Markdown ↔ HTML Converter",
        description: "Convert Markdown markup to HTML and vice versa in real time with side-by-side rich HTML previews.",
        status: "live",
        metaDescription: "Instantly convert Markdown to HTML and HTML to Markdown. Split-pane layout with live rich text preview and copy-to-clipboard functionality. Free and private.",
      },
      {
        id: "random-picker",
        title: "List Shuffler & Random Picker",
        description: "Shuffle lists, draw random items, pick names, or choose raffle winners from custom line feeds.",
        status: "live",
        metaDescription: "Shuffle lists randomly or pick random items/winners from your entries. Free, 100% private, and runs entirely in your browser. No server uploads.",
      },
    ],
  },
  {
    slug: "developer-tools",
    title: "Developer Tools",
    description: "Validate, format, parse, and check your code and data structures client-side.",
    tools: [
      {
        id: "json-formatter",
        title: "JSON Formatter",
        description: "Validate, beautify, and minify JSON data with real-time tree structure explorer.",
        status: "live",
        metaDescription: "Validate, format, and explore JSON data visually — free, instant, and 100% private. Tree view, syntax highlighting, and live error detection. No server uploads.",
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
        id: "regex-tester",
        title: "Interactive Regex Tester",
        description: "Test regular expressions, highlight matches, and inspect capturing groups.",
        status: "live",
        metaDescription: "Test and debug regular expressions locally — free and private. Real-time syntax highlight matches, capture groups, and check cheat sheets. No server uploads.",
      },
      {
        id: "sql-formatter",
        title: "SQL Formatter & Beautifier",
        description: "Format, beautify, and capitalize SQL dialect statements client-side.",
        status: "live",
        metaDescription: "Beautify and format SQL statements instantly — free and private. Capitalize SQL keywords, format clauses, and clean indentation. No server uploads.",
      },
    ],
  },
  {
    slug: "generators",
    title: "Generators",
    description: "Generate passwords, cron expressions, CSS shadows, hashes, dice rolls, and encodings instantly.",
    tools: [

      {
        id: "base64-encoder",
        title: "Base64 Cipher Modeler",
        description: "Encode text or files to Base64 and decode Base64 back to readable format instantly.",
        status: "live",
        metaDescription: "Encode and decode Base64 instantly — free and private. Convert text or files to and from Base64 right in your browser. No server uploads.",
      },
      {
        id: "url-encoder",
        title: "URL Encoder/Decoder & Parameter Grid",
        description: "Percent-encode or decode strings and edit query parameters interactively in a tabular grid layout.",
        status: "live",
        metaDescription: "Encode and decode URLs instantly. Parse URL query parameters into an editable tabular grid to add, delete, or modify keys and reassemble them. 100% client-side.",
      },
      {
        id: "file-hasher",
        title: "Client-Side File Hasher",
        description: "Calculate MD5, SHA-1, SHA-256, and SHA-512 cryptographic checksum digests.",
        status: "live",
        metaDescription: "Generate cryptographic file checksum hashes locally — free and private. Supports MD5, SHA-1, SHA-256, and SHA-512. No server uploads.",
      },
      {
        id: "password-generator",
        title: "Password Strength Meter & Generator",
        description: "Generate secure random passwords and calculate cryptographic entropy strength.",
        status: "live",
        metaDescription: "Create strong, secure passwords and calculate entropy ratings client-side — free and private. Customizable constraints. No server uploads.",
      },
      {
        id: "css-box-shadow",
        title: "CSS Box Shadow Generator",
        description: "Generate and customize CSS box shadows with live preview, inset options, and copy-paste code snippets.",
        status: "live",
        metaDescription: "Generate CSS box shadows visually with real-time preview, inset mode, multi-shadow layering, and instant copy support. 100% private.",
      },
      {
        id: "unix-timestamp-converter",
        title: "Unix Timestamp Converter",
        description: "Convert Unix epoch timestamps to human-readable dates (UTC and local timezone) and vice versa.",
        status: "live",
        metaDescription: "Convert Unix epoch timestamps to human-readable dates (UTC and local timezone) and vice versa. Auto-detects seconds vs milliseconds. 100% private.",
      },
      {
        id: "cron-generator",
        title: "Cron Expression Generator & Parser",
        description: "Build cron schedule expressions visually or parse raw cron expressions into readable English sentences.",
        status: "live",
        metaDescription: "Build cron schedule expressions visually or parse raw cron expressions into readable English. View next 5 runtime dates. 100% private.",
      },
    ],
  },
  {
    slug: "image-tools",
    title: "Image Tools",
    description: "Convert, resize, crop, and optimize images directly in your browser.",
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
        status: "live",
        metaDescription: "Bulk resize, compress, and convert images — free and private. Batch process to WebP, JPEG, or PNG. Adjustable quality and dimensions. Download as ZIP.",
      },
      {
        id: "image-cropper",
        title: "Visual Image Cropper",
        description: "Crop images visually to standard aspect ratios or circular profile formats.",
        status: "live",
        metaDescription: "Crop your images visually client-side — free, instant, and private. Supports Square 1:1, Landscape 16:9, and circular profiles. No server uploads.",
      },
      {
        id: "svg-minifier",
        title: "SVG Minifier & Cleaner",
        description: "Minify and optimize vector SVG markup by stripping comments, namespaces, and rounding decimals.",
        status: "live",
        metaDescription: "Optimize and minify SVG markup offline — free and 100% private. Clean namespace definitions, strip comments, and format decimal coordinates.",
      },
      {
        id: "qr-code-generator",
        title: "QR Code Generator & Customizer",
        description: "Generate customizable QR codes with custom colors, size, margins, and center logo overlays.",
        status: "live",
        metaDescription: "Generate customizable QR codes with custom colors, size, margins, and center logo overlays. Download as vector SVG or PNG. 100% private.",
      },
    ],
  },
  {
    slug: "financial-growth",
    title: "Calculators",
    description: "Model growth, option vesting schedules, and company valuation dilution with interactive tools.",
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
      {
        id: "mortgage-calculator",
        title: "Mortgage & Loan Amortization Schedule",
        description: "Model principal vs interest amortization schedules over 10 to 30 years.",
        status: "live",
        metaDescription: "Calculate monthly loan payments and principal vs interest amortization schedules locally — free and private. Customizable terms up to 30 years. No server uploads.",
      },
      {
        id: "cap-table",
        title: "Startup Capitalization Table Modeler",
        description: "Model stock option pool dilutive rounds and share pricing dilution schedules.",
        status: "live",
        metaDescription: "Calculate startup equity dilution round by round — free and private. Add founders, model seed investment rounds, and size employee option pools. No server uploads.",
      },
      {
        id: "saas-ltv",
        title: "SaaS CAC & LTV Retention Modeler",
        description: "Calculate Customer Lifetime Value (LTV), LTV:CAC efficiency ratios, and cohort decay curves.",
        status: "live",
        metaDescription: "Analyze SaaS customer unit economics offline — free and private. Forecast LTV, LTV:CAC ratios, payback periods, and cohort decay curves. No server uploads.",
      },
      {
        id: "break-even",
        title: "Break-Even Point Calculator",
        description: "Model fixed vs variable costs, contribution margins, and units break-even lines.",
        status: "live",
        metaDescription: "Find your business break-even point instantly — free and private. Calculate break-even units, sales values, contribution margins, and line intersections. No server uploads.",
      },
    ],
  },
  {
    slug: "fun",
    title: "Fun",
    description: "Interactive tools and games for entertainment and utility.",
    tools: [
      {
        id: "dice-roller",
        title: "3D Dice Roller",
        description: "Roll multiple interactive 3D dice with custom sides, animated physics, and text-to-speech totals.",
        status: "live",
        metaDescription: "Free interactive 3D dice roller. Roll multiple custom-sided dice instantly. Features sleek animations, sum calculation, and voice announcements. 100% private.",
      },
      {
        id: "random-team-generator",
        title: "Random Team Generator",
        description: "Split a list of names into randomized teams effortlessly.",
        status: "live",
        metaDescription: "Free online random team generator. Enter a list of names and instantly split them into random teams or groups. 100% private and client-side.",
      },
      {
        id: "coin-flipper",
        title: "3D Coin Flipper",
        description: "Flip a realistic 3D coin instantly for a truly random heads or tails result.",
        status: "live",
        metaDescription: "Free interactive 3D coin flipper. Flip a virtual coin for a fair heads or tails result instantly. Features realistic physics, animations, and sound.",
      },
      {
        id: "spin-the-wheel",
        title: "Spin the Wheel",
        description: "Create a custom spin wheel, add options, and let fate decide with physics-driven spins.",
        status: "live",
        metaDescription: "Free interactive spin the wheel. Create custom wheels with your own options and let physics-driven spins decide the outcome. 100% private and client-side.",
      },
      {
        id: "2048-game",
        title: "2048 Game",
        description: "Play the classic 2048 puzzle game. Slide tiles, merge matching numbers, and aim for the 2048 tile!",
        status: "live",
        metaDescription: "Play the classic 2048 puzzle game online. Slide tiles, merge matching numbers, and aim for the 2048 tile. Mobile-friendly with saved high scores and 100% private.",
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
  "fun": "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100",
};

export function getToolById(id: string): Tool | undefined {
  return ALL_TOOLS.find((t) => t.id === id);
}

export function getCategoryForTool(toolId: string): ToolCategory | undefined {
  return CATEGORIES.find((c) => c.tools.some((t) => t.id === toolId));
}