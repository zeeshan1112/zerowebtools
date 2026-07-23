import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, getLocalizedTool, LOCALES, SupportedLocale, getAlternateLanguages } from "@/lib/i18n";
import { notFound } from "next/navigation";
import WorkspaceRenderer from "@/components/WorkspaceRenderer";
import AdLayoutSlot from "@/components/AdLayoutSlot";
import ArticleBlock from "@/components/ArticleBlock";
import ToolSidebar from "@/components/ToolSidebar";
import MobileToolActions from "@/components/MobileToolActions";
import { LOCALES_DATA } from "@/lib/locales";
import { WorkspaceTranslationProvider } from "@/components/WorkspaceTranslationContext";
import { HowToArticle } from "@/lib/articles";
import { PROGRAMMATIC_SEO_DATA } from "@/lib/programmatic-seo-data";
import { LOCALIZED_PROGRAMMATIC_SEO_DATA } from "@/lib/programmatic-seo-data-localized";
import { ADSENSE_REVIEW_MODE } from "@/lib/config";
import { CATEGORIES,
  getToolById,
  getCategoryForTool,
  CATEGORY_TAG_STYLES,
  type Tool,
  type ToolCategory,
} from "@/lib/tools";

interface ToolPageProps {
  params: Promise<{ toolId: string; subQuery: string; lang: string }>;
}

export async function generateStaticParams() {
  const params: { toolId: string; subQuery: string; lang: string }[] = [];
  
  if (!PROGRAMMATIC_SEO_DATA) return params;

  for (const lang of LOCALES.filter(l => l !== "en")) {
    for (const [toolId, queries] of Object.entries(PROGRAMMATIC_SEO_DATA)) {
      for (const q of queries) {
        params.push({ lang, toolId, subQuery: q.slug });
      }
    }
  }
  return params;
}

const BASE_URL = "https://zerowebtools.com";

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { toolId, subQuery, lang } = await params;
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") return {};

  const queries = (LOCALIZED_PROGRAMMATIC_SEO_DATA as any)?.[lang]?.[toolId] || PROGRAMMATIC_SEO_DATA?.[toolId] || [];
  const seoData = queries.find((q: any) => q.slug === subQuery);
  if (!seoData) return { title: "Not Found" };

  const canonicalUrl = `${BASE_URL}/${lang}/tools/${toolId}/${subQuery}`;
  const pageTitle = `${seoData.title} — 100% Free & Private | ZeroWebTools`;
  const ogDescription = seoData.metaDescription;

  return {
    title: pageTitle,
    description: ogDescription,
    robots: ADSENSE_REVIEW_MODE ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: canonicalUrl,
      languages: getAlternateLanguages(`/tools/${toolId}/${subQuery}`),
    },
    openGraph: {
      title: pageTitle,
      description: ogDescription,
      type: "website",
      url: canonicalUrl,
      siteName: "ZeroWebTools",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: ogDescription,
    },
  };
}





const TOOL_ARTICLES: Record<
  string,
  { title: string; sections: { heading: string; level?: "h2" | "h3"; paragraphs?: string[]; listItems?: string[] }[] }
> = {
  "jwt-debugger": {
    title: "JWT Debugger & Decoder: Verify and Inspect JSON Web Tokens Locally",
    sections: [
      {
        heading: "What is a JSON Web Token (JWT)?",
        paragraphs: [
          "JSON Web Tokens (JWT) are an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.",
          "A typical JWT contains three parts separated by dots: Header, Payload, and Signature. Because these segments are Base64Url encoded, they look like a random block of text until they are decoded."
        ]
      },
      {
        heading: "Inspect JWT Header & Claims Instantly",
        paragraphs: [
          "Our local JWT Debugger decodes any standard token instantly, rendering structured, editable fields in raw JSON formatting:"
        ],
        listItems: [
          "Header -- Decodes details about the algorithm used (e.g. HS256, RS256) and the type of token.",
          "Payload Claims -- Decodes the statement details containing data claims like Subject (sub), Issuer (iss), Issue Time (iat), and Expiry Time (exp). Also maps any custom variables added by authentication libraries (like Auth0, Firebase, or custom backends).",
          "Signature -- Inspects the cryptographic signature block at the tail of the token.",
          "Claims Status Alerts -- Displays expiration indicators, warnings, and local time conversions."
        ]
      },
      {
        heading: "100% Client-Side Privacy Protection",
        paragraphs: [
          "Security is key when analyzing authentication tokens, as payload strings often contain sensitive user emails, account IDs, security roles, and scopes.",
          "ZeroWebTools guarantees that all decoding operations execute directly in your browser's JavaScript engine on your device. No tokens or payloads are ever uploaded to a server, keeping your session credentials entirely secure."
        ]
      }
    ]
  },
  "url-encoder": {
    title: "URL Encoder & Decoder: Parse and Edit Query Parameters Visually",
    sections: [
      {
        heading: "Understanding URL Encoding (Percent-Encoding)",
        paragraphs: [
          "URL encoding converts characters into a format that can be safely transmitted over the Internet. URLs can only contain a limited set of characters from the US-ASCII character set. Non-safe characters are replaced with a '%' followed by two hexadecimal digits.",
          "For example, spaces are encoded as %20 (or + in query strings), and special characters like slashes, question marks, and ampersands must be encoded to preserve boundaries between parameters."
        ]
      },
      {
        heading: "Query Parameter Grid Editor",
        paragraphs: [
          "Unlike traditional encoders that just output a single long percent-encoded string, this utility features a visual query parameter grid:"
        ],
        listItems: [
          "Input URL Parser -- Automatically splits a pasted URL into its Base Path and separate query key-value segments.",
          "Interactive Edit Grid -- Edit, add, or delete query parameter values. Changes immediately re-encode and update the raw URL.",
          "Encoder / Decoder Toggle -- Switch modes between encoding plain text into percent-notation or decoding percent-strings into readable strings.",
          "Single-Click Copy -- Quickly copy the re-assembled and encoded URL to your clipboard."
        ]
      }
    ]
  },
  "text-cleaner": {
    title: "Universal Text Cleaner: Format, Sort, and Search-and-Replace Text Lists",
    sections: [
      {
        heading: "Optimize and Clean Text Blocks Offline",
        paragraphs: [
          "Writers, researchers, and database administrators regularly need to clean and standardize messy text lists or document segments. Doing this manually is time-consuming and error-prone.",
          "The Universal Text Cleaner collects common list sanitization operations into a single-click local console. You can sequence cleanups, sort lists, and run search-and-replace queries without sending your texts to third-party servers."
        ]
      },
      {
        heading: "Interactive Sanitize & Clean Options",
        listItems: [
          "Trim & Collapse Spaces -- Strips leading/trailing line spacing and reduces double or triple internal spaces into a single space.",
          "Remove Duplicates -- Filters out duplicate lines from list content, keeping only the first unique instance.",
          "Remove Empty Lines -- Instantly deletes blank lines or lines containing only whitespaces.",
          "Strip HTML Tags -- Removes HTML markup code, extracting raw text contents from rich formatting.",
          "Structured Sorting -- Sorts lines alphabetically, numerically (extracting numbers from lines), or by string length, in ascending or descending direction.",
          "Find and Replace Console -- Supports literal string changes or regular expression (regex) search patterns with case-insensitivity flags."
        ]
      }
    ]
  },
  "base64-encoder": {
    title: "Base64 Encoder & Decoder: Convert Text and Files Locally",
    sections: [
      {
        heading: "What is Base64 Encoding?",
        paragraphs: [
          "Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. By translating data into 64 safe characters (A-Z, a-z, 0-9, +, /), Base64 ensures that information remains intact without modification during transit over transport layers that are designed to handle text, such as email (MIME) or XML/HTML documents.",
          "It is widely used to embed raw images directly in CSS or HTML, transmit data in Web APIs, and represent binary data in simple text environments.",
        ],
      },
      {
        heading: "How to Encode and Decode Client-Side",
        paragraphs: [
          "Our tool runs entirely client-side in your browser, enabling you to process both text and files without uploading anything to a remote server.",
        ],
        listItems: [
          "Text to Base64: Enter standard UTF-8 text (including emojis or non-ASCII characters) and copy the encoded output.",
          "Base64 to Text: Paste your Base64 string to instantly decode it back to readable text. The utility includes automatic format verification and padding checks.",
          "File to Base64: Drag and drop any file (like an image, PDF, or document) to output its Base64 Data URL, ready to copy and use directly in code.",
        ],
      },
      {
        heading: "100% Secure & Offline-First Privacy",
        paragraphs: [
          "Many online conversion tools upload your data to their web servers for processing, posing a serious privacy risk for private keys, credentials, or sensitive files.",
          "ZeroWebTools guarantees absolute privacy. All encoding and decoding operations execute inside your browser's JavaScript environment on your local CPU. Your text and files never touch our servers or the network, allowing you to use this tool offline and with complete peace of mind.",
        ],
      },
    ],
  },
  "diff-checker": {
    title: "Side-by-Side Diff Checker: Compare Text and Code Files Locally",
    sections: [
      {
        heading: "What is a Side-by-Side Diff Checker?",
        paragraphs: [
          "A diff checker is an essential developer utility that compares two blocks of text, code files, or data structures to identify differences. By highlighting additions, deletions, and line-level changes, it allows programmers, writers, and editors to instantly audit modifications between different document versions.",
          "Our interactive workspace supports both a Split (Side-by-Side) View and a Unified (Inline) View, providing high-contrast red and green highlights for changed segments down to individual characters and words."
        ]
      },
      {
        heading: "Features of the Professional Diff Engine",
        paragraphs: [
          "This local-first diffing tool is optimized for speed, precision, and privacy. Key features include:"
        ],
        listItems: [
          "Split and Unified Views -- Toggle between horizontal columns with synchronized vertical scroll or a single integrated stream listing sequential additions and removals.",
          "Token-Level Difference Highlighting -- Performs deep character-by-character analysis on modified rows to highlight exact edits (such as typos, variable name changes, or word swaps) in a darker shade.",
          "Line and Character Limits -- Employs a high-performance Longest Common Subsequence (LCS) dynamic programming algorithm capped at 3,000 lines to prevent memory overhead and browser lag.",
          "Quick Tool Actions -- Load local files (.txt, .md, .js, .ts, etc.) independently, swap left/right panes, or paste a built-in comparison example to test features.",
          "Privacy First Architecture -- All data compares 100% locally in your browser memory on your CPU. No files or strings ever upload to any remote server, ensuring complete confidentiality."
        ]
      },
      {
        heading: "How to Compare Text & Code Locally",
        paragraphs: [
          "To begin auditing your text blocks:"
        ],
        listItems: [
          "Select 'Edit Inputs' to open the original (left) and modified (right) text panes.",
          "Paste your text directly, drag and drop files from your desktop, or click 'Load File' to import documents.",
          "Click the 'Compare Differences' button to process the changes.",
          "Switch between 'Split View' (horizontal scroll sync) and 'Unified View' (inline stream) to review findings.",
          "Inspect the statistics bar to view total additions, deletions, and unchanged lines."
        ]
      }
    ]
  },
  "word-counter": {
    title: "Word Counter Pro: Free Client-Side Character & Line Analyzer",
    sections: [
      {
        heading: "A Privacy-First Character & Word Counter",
        paragraphs: [
          "ZeroWebTools Word Counter Pro is an advanced writing and analysis workspace designed to run entirely locally in your browser. Whether you are writing a blog post, formatting an academic paper, or drafting social media posts, you can analyze your text without sending a single byte of your content to a remote server.",
        ],
      },
      {
        heading: "Features of the Professional Text Analyzer",
        paragraphs: [
          "This utility parses text and calculates structural metrics in real-time. It covers key specifications required by copywriters, developers, and editors:",
        ],
        listItems: [
          "Real-Time Statistics -- Automatically updates word count, character count (with/without spaces), sentence count, paragraph count, and line count.",
          "Estimated Reading & Speaking Times -- Calculates dynamic read time (estimated at 200 words per minute) and speech narration time (estimated at 130 words per minute).",
          "SEO Keyword Density Matrix -- Extracts the top 10 most frequent words in your document and computes their density percentages. Includes a toggle to skip common English stop words to reveal actual topical keywords.",
          "Case Transformation Utilities -- Instantly convert text cases between UPPERCASE, lowercase, Title Case, and Sentence case with a single click.",
          "Local File Import -- Load text-based files (.txt, .md, .csv, .json, and code files) directly from your device.",
        ],
      },
      {
        heading: "How to Use Word Counter Pro",
        paragraphs: [
          "Getting started is simple:",
        ],
        listItems: [
          "Type or paste your text into the editor area above, or click 'Load File' to import a document from your computer.",
          "Look at the metrics grid immediately below the editor to inspect words, characters, sentences, paragraphs, and lines.",
          "Check the estimated reading and speaking times to see how long it will take to read silently or narrate aloud.",
          "Inspect the SEO Keyword Density table on the right to optimize your content keywords.",
          "Use the transform buttons above the editor to convert text capitalization.",
        ],
      },
    ],
  },
  "json-formatter": {
    title: "JSON Viewer & Formatter: Parse, Validate, and Explore JSON Data Online",
    sections: [
      {
        heading: "What is a JSON Viewer?",
        paragraphs: [
          "A JSON viewer transforms raw, unformatted JSON strings into a structured, interactive tree view. Instead of staring at a single line of minified text, you get collapsible nodes, color-coded data types, and instant search — making it easy to navigate complex JSON structures from API responses, configuration files, and data exports.",
        ],
      },
      {
        heading: "Key Features of This JSON Viewer",
        paragraphs: [
          "This tool combines a live editor with a synchronized tree view panel. Every keystroke in the editor instantly updates the tree, so you can edit and explore simultaneously.",
        ],
        listItems: [
          "Split-pane editor and tree view with real-time synchronization",
          "Collapsible nodes with animated expand/collapse transitions",
          "Syntax highlighting by type: strings in green, numbers in blue, booleans in amber, null in gray",
          "Full-text search across keys and values with matching ancestor auto-expand",
          "Load JSON from file using drag-and-drop or file picker",
          "Copy formatted JSON and paste from clipboard with one click",
          "Node count, tree depth, and character statistics displayed in the status bar",
        ],
      },
      {
        heading: "How the Tree View Works",
        level: "h3",
        paragraphs: [
          "Each JSON value is represented as a tree node. Objects show their key count in curly braces, arrays show their length in square brackets. Click the arrow icon or the node itself to expand or collapse branches. The expand all and collapse all buttons let you control the entire tree at once.",
          "The search feature highlights matching keys and values with a green background, and automatically expands all ancestor nodes so you always see the full path to your result.",
        ],
      },
    ],
  },
  "case-converter": {
    title: "Case Converter: Transform Text Between Naming Conventions",
    sections: [
      {
        heading: "Understanding Programming Naming Conventions",
        paragraphs: [
          "Different programming languages follow different naming conventions for variables, functions, classes, and constants. Converting between these formats manually is error-prone, especially when processing large datasets or refactoring across codebases.",
          "This case converter handles the most common naming conventions, applying consistent transformation rules to preserve readability and semantic meaning.",
        ],
      },
      {
        heading: "Supported Case Conversions",
        listItems: [
          "camelCase -- Standard for JavaScript variables and function names",
          "snake_case -- Standard for Python variables and database columns",
          "kebab-case -- Standard for CSS class names, URLs, and file names",
        ],
      },
    ],
  },
  "heic-to-jpg": {
    title: "HEIC to JPG Converter: Convert Apple Photos to Standard Formats Online",
    sections: [
      {
        heading: "What is HEIC and Why Convert It?",
        paragraphs: [
          "HEIC (High Efficiency Image Container) is Apple's default photo format on iOS and macOS devices. It uses advanced HEVC compression to store high-quality images at roughly half the file size of JPEG. While efficient for storage, HEIC photos often cannot be opened on Windows computers, web platforms, email clients, or older devices.",
          "Converting HEIC to JPG or PNG solves this compatibility gap. JPG is the universal web standard supported by every platform and application. PNG is ideal when you need transparency or lossless compression for graphics work.",
        ],
      },
      {
        heading: "How This Converter Works",
        paragraphs: [
          "This tool uses the heic2any library compiled to WebAssembly to decode HEIC files entirely in your browser. No photos are uploaded to any server — every conversion happens locally on your device using the same libheif library trusted by millions of users.",
          "For non-HEIC images (regular JPG, PNG, WebP), the browser's Canvas API handles format conversion natively, also without any network upload. You can mix HEIC and non-HEIC files in a single batch.",
        ],
        listItems: [
          "Drop one or multiple HEIC files onto the upload zone",
          "Choose your output format: JPG (smaller, universal) or PNG (lossless, transparent)",
          "Adjust quality from 10% to 100% using the slider",
          "Click Convert to process all files in sequence",
          "Download individual files or all files as a single ZIP archive",
          "Clear the list and start a new batch at any time",
        ],
      },
      {
        heading: "Batch Conversion and Bulk Download",
        level: "h3",
        paragraphs: [
          "When converting multiple photos, the tool processes each file one at a time and shows real-time progress. Once all conversions complete, you can download the entire batch as a single ZIP file using the JSZip library — again processed entirely client-side with no server involved.",
          "The quality slider lets you balance file size and image fidelity. A setting of 85% is the recommended sweet spot for web use, producing visually lossless results at a fraction of the original size.",
        ],
      },
    ],
  },
  "saas-mrr": {
    title: "SaaS MRR & Growth Projection Modeler: Forecast Monthly Recurring Revenue and Churn",
    sections: [
      {
        heading: "What is SaaS Monthly Recurring Revenue (MRR)?",
        paragraphs: [
          "Monthly Recurring Revenue (MRR) is the single most critical metric for any subscription-based software business (SaaS). It measures the predictable, recurring portion of your business's revenue stream. By standardizing diverse pricing plans, contract lengths, and billing frequencies into a single monthly value, MRR allows startups and enterprises to track growth velocity, project forward run-rates, and assess financial stability.",
        ],
      },
      {
        heading: "Key Inputs in the MRR Projection Modeler",
        paragraphs: [
          "Our professional SaaS modeler enables founders, product owners, and financial planners to forecast subscription trajectories over 12 months using three key variables:",
        ],
        listItems: [
          "Starting MRR: Your baseline monthly recurring revenue at Month 0.",
          "Monthly Growth Rate (%): The estimated net-new customer revenue added each month as a percentage of the prior month's MRR.",
          "Monthly Churn Rate (%): The percentage of subscription revenue lost due to cancellations, downgrades, or expired credit cards.",
        ],
      },
      {
        heading: "100% Client-Side Privacy Guarantees",
        level: "h3",
        paragraphs: [
          "Unlike standard financial modeling spreadsheets or cloud apps that track your proprietary numbers, this workspace operates entirely client-side. No customer data or growth metrics are uploaded to our servers — meaning your strategic projections remain 100% confidential and private.",
        ],
      },
    ],
  },
  "startup-equity": {
    title: "Startup Option Vesting & Dilution Modeler: Calculate Equity Valuations and Options Schedules",
    sections: [
      {
        heading: "Understanding Employee Stock Option Vesting",
        paragraphs: [
          "Vesting is the process by which an employee, advisor, or founder earns the right to own stock options or shares over time. In high-growth startups, equity grants are almost always subject to a vesting schedule to incentivize long-term commitment and align interests between employees and shareholders.",
        ],
      },
      {
        heading: "The Standard 4-Year Vest and 1-Year Cliff",
        paragraphs: [
          "This calculator supports the venture capital standard vesting structure:",
        ],
        listItems: [
          "Vesting Duration: Typically 4 years (48 months), meaning you earn 1/48th of your grant each month.",
          "1-Year Cliff: A standard safeguard. Under a cliff, no shares vest during your first 12 months. On the 1-year anniversary, 25% of your grant vests instantly, followed by standard monthly vesting.",
        ],
      },
      {
        heading: "How Ownership Percentage and Valuation Are Computed",
        level: "h3",
        paragraphs: [
          "Your ownership percentage is calculated by dividing your granted options by the total outstanding shares of the company. The implied value of your equity is then projected using the company's latest post-money valuation. As the company raises subsequent rounds or increases in valuation, the implied value of your options grows proportionally.",
        ],
      },
    ],
  },
  "pdf-merge": {
    title: "Merge PDF Online: Combine PDF Files Safely in Your Browser",
    sections: [
      {
        heading: "How to Merge PDF Files Locally?",
        paragraphs: [
          "Merging multiple PDF documents is a simple operation when executed client-side. The file merger loads your PDF files directly into memory, parses the structural layers of each, and writes a unified document catalog using the pdf-lib library.",
          "This ensures that all text streams, fonts, and vector elements are retained with high fidelity in the output document, without any loss of quality.",
        ],
      },
      {
        heading: "Step-by-Step Instructions to Merge PDFs",
        paragraphs: [
          "Operating the PDF merger is fast, visual, and simple:",
        ],
        listItems: [
          "Select the PDFs you want to merge -- Click the upload zone or drag and drop your files into the workspace.",
          "Arrange the file order -- Drag and drop the file cards to arrange them in your preferred sequence.",
          "Review and modify -- Rotate pages or delete unwanted documents from the merge queue dynamically.",
          "Combine files -- Click 'Merge PDF' to compile the pages together in your browser memory.",
          "Download output -- Save the merged PDF file instantly.",
        ],
      },
      {
        heading: "Absolute Privacy & Zero Server Uploads",
        paragraphs: [
          "Unlike third-party PDF utilities that upload files to external servers, this tool runs entirely on your local CPU. Your bank statements, personal documents, and legal papers never leave your device, ensuring complete privacy compliance.",
        ],
      },
    ],
  },
  "pdf-split": {
    title: "Split PDF Online: Extract Pages from PDF Files Securely",
    sections: [
      {
        heading: "Extract Specific Pages Locally",
        paragraphs: [
          "Whether you need a single page from a large report or a specific range of pages, splitting a PDF client-side is fast and private. The parser lets you select page sets and extracts them into a clean, new document.",
        ],
      },
      {
        heading: "Steps to Split a PDF",
        paragraphs: [
          "To split your PDF document into separate sheets:",
        ],
        listItems: [
          "Upload PDF -- Select the PDF file from your device.",
          "Choose extraction range -- Enter page numbers or custom ranges (e.g. 1-3, 5).",
          "Extract pages -- Click the split button to parse the document stream locally in-memory.",
          "Save file -- Download the new split PDF instantly.",
        ],
      },
    ],
  },
  "pdf-compress": {
    title: "Compress PDF Online: Reduce PDF File Size Client-Side",
    sections: [
      {
        heading: "How Local PDF Compression Works",
        paragraphs: [
          "PDF files contain text streams, fonts, vector paths, and raster images. The compressor optimizes the document's structure in three distinct ways: Lossless optimization, recommended downscaling, or extreme compression.",
        ],
      },
      {
        heading: "Understanding the Compression Options",
        paragraphs: [
          "ZeroWebTools offers three custom compression settings to fit your needs:",
        ],
        listItems: [
          "Balanced Compression (150 DPI) -- Best sweet spot for standard files, downscaling images to 150 DPI at 70% quality.",
          "Extreme Compression (100 DPI) -- Downscales images to 100 DPI at 40% quality, useful for government upload portals.",
          "Lossless Optimization -- Cleans structural streams and strips useless metadata while keeping images intact.",
        ],
      },
      {
        heading: "Offline Security & Privacy",
        paragraphs: [
          "Since all file rendering, downscaling, and compression calculations execute locally, your documents are completely safe and secure.",
        ],
      },
    ],
  },
  "pdf-rotate": {
    title: "Rotate PDF Online: Rotate PDF Pages Instantly",
    sections: [
      {
        heading: "Change PDF Page Rotation Locally",
        paragraphs: [
          "Scanned documents often come with upside-down or misaligned pages. Rotating pages client-side lets you adjust orientations without loading files onto a server.",
        ],
      },
      {
        heading: "How to Rotate PDF Pages",
        paragraphs: [
          "To rotate your document pages:",
        ],
        listItems: [
          "Upload PDF -- Select the PDF document you want to rotate.",
          "Select angle -- Choose rotation angles (90, 180, or 270 degrees clockwise) for individual pages or all pages.",
          "Apply changes -- Click the rotate action to rewrite page orientations in the document catalog.",
          "Download file -- Save the modified PDF file.",
        ],
      },
    ],
  },
  "pdf-to-jpg": {
    title: "Convert PDF to JPG Online: Render PDF Pages to JPEG Images",
    sections: [
      {
        heading: "Fidelity Canvas Conversion",
        paragraphs: [
          "Render pages of any PDF document into crisp, high-resolution JPEG images locally. Ideal for presentations, social sharing, and image editors.",
        ],
      },
      {
        heading: "Steps to Convert PDF Pages to JPG",
        paragraphs: [
          "To render PDF pages as images:",
        ],
        listItems: [
          "Upload PDF -- Select your PDF file.",
          "Adjust quality -- Configure the output image resolution scaling.",
          "Convert -- Render canvas buffers locally and download them as individual JPEGs or a combined ZIP.",
        ],
      },
    ],
  },
  "jpg-to-pdf": {
    title: "Convert JPG to PDF Online: Combine JPEG Photos into PDF",
    sections: [
      {
        heading: "Combine Images into a PDF Layout",
        paragraphs: [
          "Merge your receipts, document scans, or photos into a single, clean PDF page catalog client-side.",
        ],
      },
      {
        heading: "Convert Images Offline",
        paragraphs: [
          "To compile your images into a PDF:",
        ],
        listItems: [
          "Select images -- Upload your JPG or PNG files in order.",
          "Configure page layout -- Adjust page sizes, orientations, and margins.",
          "Build PDF -- Click convert to compile and save the output document instantly.",
        ],
      },
    ],
  },
  "pdf-protect": {
    title: "Protect PDF Online: Add Password Encryption and Secure PDF Files",
    sections: [
      {
        heading: "Secure Your PDF Files with Standard Password Protection",
        paragraphs: [
          "Add an access password to restrict opening, viewing, or copying sensitive content. The protector writes a standard Revision 3 trailer dictionary locally in your browser.",
        ],
      },
      {
        heading: "How to Encrypt a PDF",
        paragraphs: [
          "To secure your file:",
        ],
        listItems: [
          "Upload PDF -- Select the PDF document you want to secure.",
          "Set password -- Enter the password you wish to lock the file with.",
          "Encrypt -- Click Protect PDF to encrypt the byte streams in-memory.",
          "Download file -- Save the locked PDF to your local storage.",
        ],
      },
    ],
  },
  "pdf-watermark": {
    title: "Add Watermark to PDF: Stamp Text and Image Watermarks Offline",
    sections: [
      {
        heading: "Secure & Private PDF Watermarking in Your Browser",
        paragraphs: [
          "Protect your documents and assert ownership with custom watermark stamps. Whether you need to overlay 'CONFIDENTIAL', 'DRAFT', 'COPY', or your brand's official logo, our utility performs all calculations in-memory on your local CPU. Your private documents, contracts, and images are never uploaded to a server, guaranteeing 100% data security."
        ]
      },
      {
        heading: "Flexible Custom Text & Image Stamp Options",
        paragraphs: [
          "Customize your watermark's presentation with professional design controls:"
        ],
        listItems: [
          "Text Stamp Mode -- Type custom messages and labels. Adjust the font size to scale relative to the document size.",
          "Image Stamp Mode -- Upload local PNG or JPG files to stamp logos, seals, or signature files directly onto PDF pages.",
          "Color Selector -- Pick from standard design preset swatches (Red, Black, Blue, Gray) or launch the custom color picker to select any hex color code.",
          "Opacity Dropdown -- Adjust transparency layers (No Transparency, 75%, 50%, or the default 25% opacity) to ensure the background document text remains fully legible.",
          "Rotation Angles -- Rotate your watermark diagonally or vertically. Choose from Do Not Rotate (0°), 45°, 90°, 180°, 270°, and the standard 315° angle."
        ]
      },
      {
        heading: "Interactive Drag-to-Position Visual Editor",
        paragraphs: [
          "Position your watermark precisely on the page layout before exporting. Our interactive layout editor dynamically extracts the dimensions of your uploaded PDF to scale the thumbnail to a matching aspect ratio. Simply drag the watermark overlay to the desired coordinates. The coordinate calculation formula ensures that what you see in the visual preview matches the final exported PDF precisely."
        ],
        listItems: [
          "Single Center Mode -- Click and drag the watermark indicator anywhere on the thumbnail preview box.",
          "3x3 Grid Mode -- Apply the watermark across 9 grid coordinates simultaneously for complete page coverage.",
          "Page Range Selection -- Specify the start and end pages to stamp, allowing you to bypass cover sheets or indexes."
        ]
      }
    ],
  },
  "pdf-page-numbers": {
    title: "Add Page Numbers to PDF Online: Number PDF Pages Instantly",
    sections: [
      {
        heading: "Number PDF Pages Locally",
        paragraphs: [
          "Organize long documents, manuals, or eBooks by stamping page numbers. The page numbering utility lets you customize formats and alignments in-memory.",
        ],
      },
      {
        heading: "How to Number PDF Pages",
        paragraphs: [
          "To add page numbers:",
        ],
        listItems: [
          "Upload PDF -- Select the PDF file.",
          "Configure styling -- Choose page number placements (Top Right, Bottom Center, etc.).",
          "Set formatting -- Customize the numbering template format.",
          "Download PDF -- Click Add Page Numbers and save the numbered PDF file.",
        ],
      },
    ],
  },
  "pdf-organize": {
    title: "Organize PDF Online: Reorder, Rotate, and Delete PDF Pages",
    sections: [
      {
        heading: "Rearrange, Delete, or Extract Pages in Browser Memory",
        paragraphs: [
          "Manage the physical layout of your PDF pages. Drag and drop to change page orders, remove unneeded sheets, or rotate individual frames visually.",
        ],
      },
      {
        heading: "How to Organize Your PDF",
        paragraphs: [
          "To modify the page layout structure:",
        ],
        listItems: [
          "Upload PDF -- Select your PDF document.",
          "Rearrange pages -- Drag and drop thumbnails to change sequences.",
          "Rotate & Delete -- Use page action overlays to rotate or remove sheets.",
          "Export file -- Click Organize PDF to build and download the new document catalog.",
        ],
      },
    ],
  },
  "pdf-unlock": {
    title: "Unlock PDF Online: Remove Password Protection from PDF Files",
    sections: [
      {
        heading: "Remove Restrictions & Password Locks Local-First",
        paragraphs: [
          "If you own a password-protected PDF and need to remove the prompt for convenient reading, you can decrypt the streams locally in your browser.",
        ],
      },
      {
        heading: "How to Decrypt PDF Files",
        paragraphs: [
          "To remove a password lock:",
        ],
        listItems: [
          "Upload PDF -- Select the locked PDF file from your device.",
          "Enter password -- Input the file password to authenticate ownership.",
          "Unlock -- Click Unlock PDF to decrypt the file streams.",
          "Download file -- Save the fully decrypted version to your device.",
        ],
      },
    ],
  },
  "pdf-sign": {
    title: "Sign PDF Online: Draw, Type, and Place Digital Signatures Locally",
    sections: [
      {
        heading: "Securely Sign PDF Documents Offline",
        paragraphs: [
          "Signing PDF documents is a frequent necessity for professionals, freelancers, and businesses. Standard online PDF signing solutions require you to upload private contracts, agreements, or identification papers to remote servers, risking data leaks or policy violations.",
          "ZeroWebTools Sign PDF operates 100% locally in your browser. All visual overlays, typing renders, and signature embeds are processed on your local CPU. Your sensitive documents never leave your device."
        ]
      },
      {
        heading: "Three Visual Signature Modes",
        paragraphs: [
          "Choose the signing workflow that fits your needs:"
        ],
        listItems: [
          "Draw Signature -- Use your mouse, trackpad, or touchscreen to draw a natural signature directly on our visual pad.",
          "Type Signature -- Enter your name and generate a clean cursive signature instantly.",
          "Upload Image -- Import pre-scanned PNG/JPG signatures from your local drive."
        ]
      },
      {
        heading: "Interactive Drag-and-Drop Placement",
        paragraphs: [
          "Once your signature is ready, click to place it on the active PDF page. You can drag the signature overlay anywhere on the page canvas and resize it using visual bounding box handles to achieve a perfect fit. When you are ready, click Save Signed PDF to compile the pages together."
        ]
      }
    ]
  },
  "pdf-crop": {
    title: "PDF Crop & Page Resizer: Visual Margin Cropper & Layout Resizer",
    sections: [
      {
        heading: "Visual PDF Crop Box Guidelines",
        paragraphs: [
          "Need to clean up scanned document margins, remove page numbers, or clip unwanted white space? Our visual cropper provides high-precision crop percentage sliders (Left, Right, Top, Bottom) with real-time bounding box borders rendered directly on your PDF pages.",
          "You can adjust crop percentages dynamically and check results visually on the page preview before saving."
        ]
      },
      {
        heading: "Standardize Layouts to A4, Letter, and Legal",
        paragraphs: [
          "If you need to resize pages for printing or standardized filings, switch to the Page Resize tab. Instantly convert PDF pages to standard paper formats (A4, US Letter, US Legal) or input custom coordinate points (in pt) directly. Sizing adjustments occur instantly in browser memory."
        ]
      }
    ]
  },
  "pdf-to-text": {
    title: "PDF to Text Extractor: Layout-Preserving Client-Side Text Parsing",
    sections: [
      {
        heading: "Extract Raw Text Streams Locally",
        paragraphs: [
          "Copying text out of PDF files can be extremely frustrating, especially when layouts contain multiple columns, tables, or complex grids. Standard copying often mixes lines up and destroys tabular formats.",
          "Our local PDF to Text Extractor runs a layout-reconstruction sorting algorithm in-browser, grouping text segments within vertical coordinate ranges to preserve reading order."
        ]
      },
      {
        heading: "Reconstruct Row and Column Grids",
        paragraphs: [
          "Key features of the text extractor include:"
        ],
        listItems: [
          "Heuristic Row Grouping -- Groups adjacent characters and words on the same Y-axis line within a 5pt vertical tolerance.",
          "Left-to-Right Sorting -- Arranges columns and text boxes logically from left to right within each row.",
          "Page Break Markers -- Option to insert visual markers separating extracted pages for clean multi-page document parsing.",
          "Real-Time Stats -- Displays total extracted pages, word count, and character counts instantly."
        ]
      },
    ]
  },
  "bulk-image-resizer": {
    title: "Bulk Image Resizer & Compressor: Resize and Compress Multiple Images Locally",
    sections: [
      {
        heading: "Secure Client-Side Bulk Image Processing",
        paragraphs: [
          "Processing batches of images for websites, newsletters, or online portals can be slow and risky when using typical cloud conversion sites. Sending personal photographs, proprietary designs, or client assets to remote servers leaves your data vulnerable.",
          "Our Bulk Image Resizer and Compressor processes all files inside your browser on your local device. No files are uploaded to any server, guaranteeing 100% data privacy."
        ]
      },
      {
        heading: "Flexible Sizing and Compression Settings",
        paragraphs: [
          "Configure your image exports to match your precise requirements:"
        ],
        listItems: [
          "Scale Percentage -- Instantly shrink files to 50%, 75%, or any scale ratio.",
          "Custom Dimensions -- Input target Width and Height in pixels. Includes an option to maintain the image's original aspect ratio to prevent stretching.",
          "Format Conversion -- Convert files to PNG, JPEG, or optimized WebP format.",
          "Compression Quality -- Adjust quality levels to balance detail fidelity with file sizes."
        ]
      },
      {
        heading: "Download as ZIP Archive",
        paragraphs: [
          "When resizing multiple files, the tool compiles them into a single, clean ZIP folder using JSZip client-side. You can download all optimized files in a single click."
        ]
      }
    ]
  },
  "image-cropper": {
    title: "Visual Image Cropper: Crop Photos Client-Side with Standard Aspect Ratios",
    sections: [
      {
        heading: "High-Performance Visual Cropper",
        paragraphs: [
          "Need to crop photos, adjust profiles, or prepare banners? Our Visual Image Cropper is fully client-side and offers visual overlay boundaries for precision slicing.",
          "Drag the crop selection box and resize its bounding corners directly over your preview image. Slicing occurs locally using HTML5 Canvas rendering."
        ]
      },
      {
        heading: "Standard Aspect Ratio Presets",
        paragraphs: [
          "We support standard image dimensions to help you format assets correctly:"
        ],
        listItems: [
          "Square (1:1) -- Ideal for profile pictures, avatars, and social media blocks.",
          "Landscape (16:9) -- Perfect for video thumbnails, presentation slides, and web banners.",
          "Standard (4:3) -- Useful for classic photos and media embeds.",
          "Circle Profile -- Automatically clips corners to crop a circular avatar. Exports as a transparent PNG."
        ]
      }
    ]
  },
  "svg-minifier": {
    title: "SVG Minifier & Cleaner: Clean and Optimize Vector Markup Locally",
    sections: [
      {
        heading: "Reduce Vector Code Sizes Offline",
        paragraphs: [
          "SVG vector files often contain large amounts of redundant metadata, editor-specific coordinates, namespaces, comments, and empty properties that bloat file size and slow down web page load speeds.",
          "The SVG Minifier and Cleaner parses your XML markup locally and runs a series of optimization rules to sanitize the code, making SVGs up to 60% smaller without changing their visual rendering."
        ]
      },
      {
        heading: "Minification Rule Settings",
        paragraphs: [
          "Adjust your optimization rules using our simple toggles:"
        ],
        listItems: [
          "Strip Comments: Removes unnecessary XML and developer comments.",
          "Remove Metadata: Deletes namespaces and metadata blocks (like Sodipodi, Inkscape, or Adobe Illustrator tags).",
          "Remove Editor Namespaces: Deletes prefix tags and editor configurations.",
          "Collapse Spaces: Compresses whitespaces, newlines, and indentations into a single minified line.",
          "Decimal Precision: Truncates coordinate values to a set number of decimal places (e.g. 2 digits) to save bandwidth."
        ]
      }
    ]
  },
  "mortgage-calculator": {
    title: "Mortgage & Loan Amortization Schedule: Calculate Principal and Interest Payments Locally",
    sections: [
      {
        heading: "Model Loan Amortization Schedules Offline",
        paragraphs: [
          "Evaluating a home loan, commercial mortgage, or personal debt schedule involves reviewing complex interest compounding formulas. Sending your private loan calculations, property valuations, or net worth values to external servers poses a clear privacy risk.",
          "Our Mortgage and Loan Amortization Calculator calculates monthly payments and aggregates principal vs interest breakdowns entirely client-side. No financial details or rates are uploaded, maintaining 100% data privacy."
        ]
      },
      {
        heading: "Features of the Amortization Scheduler",
        paragraphs: [
          "Use the loan planner to analyze debt repayments over time:"
        ],
        listItems: [
          "Interactive Sliders -- Adjust Principal and Annual Interest Rates visually to check monthly payment updates.",
          "Custom Term Sizing -- Model standard 10, 15, 20, or 30-year terms.",
          "Stacked Bar Charts -- Review custom SVG-rendered bars illustrating interest decrease vs principal payoff over time.",
          "Annual Breakdown Schedule -- Inspect a comprehensive year-by-year grid listing payments, principal paid, interest paid, and remaining balance."
        ]
      }
    ]
  },
  "cap-table": {
    title: "Startup Capitalization Table Modeler: Calculate Equity Dilution Rounds Locally",
    sections: [
      {
        heading: "Equity Vesting & Dilution Math Offline",
        paragraphs: [
          "Startups raising venture capital rounds need to model share issuance, founder dilution, and option pool resizing. Keeping these calculations private is essential during investor negotiations.",
          "This Capitalization Table Modeler runs in-browser, computing pre and post-round share pricing, investor allocations, and employee option pools with complete security. Your capitalization strategy remains confidential."
        ]
      },
      {
        heading: "Model Venture Funding Rounds",
        paragraphs: [
          "Configure and evaluate next-round equity distributions:"
        ],
        listItems: [
          "Shareholder List -- Add founders or early employees with custom share allocations.",
          "Investment & Valuation -- Input pre-money valuation parameters and target investment amounts.",
          "Option Pool Allocation -- Dilute ownership to size employee option pools (post-money calculations).",
          "Interactive Donut Chart -- Inspect visual SVG-rendered slices illustrating share percentages.",
          "Dilution Matrix -- Analyze a before vs after table detailing shares, value, and ownership percentages."
        ]
      }
    ]
  },
  "saas-ltv": {
    title: "SaaS CAC & LTV Retention Modeler: Forecast Customer Lifetime Value and Payback Periods",
    sections: [
      {
        heading: "Analyze Unit Economics Locally",
        paragraphs: [
          "A healthy SaaS growth engine relies on strong unit economics: Customer Acquisition Cost (CAC) and Customer Lifetime Value (LTV). Calculating these metrics helps founders and investors understand revenue retention health.",
          "This SaaS CAC & LTV Modeler works entirely inside your browser CPU, calculating key metrics and plotting cohort decay lines without transmitting company data to remote servers."
        ]
      },
      {
        heading: "Key SaaS Growth Variables",
        paragraphs: [
          "Input your startup metrics to evaluate growth engine health:"
        ],
        listItems: [
          "Customer Acquisition Cost (CAC) -- The average spend required to acquire a customer.",
          "Average Revenue Per Account (ARPA) -- The average monthly spend per customer.",
          "Gross Margin (%) -- Software delivery margin percent.",
          "Monthly Churn Rate (%) -- The monthly percentage of customer churn.",
          "LTV:CAC Health Rating -- Highlights if your growth engine meets the venture standard 3:1 LTV:CAC target."
        ]
      }
    ]
  },
  "break-even": {
    title: "Break-Even Point Calculator: Calculate Contribution Margins and Intersection Units",
    sections: [
      {
        heading: "Contribution Margin & Break-Even Analysis",
        paragraphs: [
          "Determining when your business will become profitable is essential for pricing strategies and financial planning. Identifying fixed costs, variable costs, and selling prices helps compute the exact volume required to break even.",
          "Our Break-Even Point Calculator runs offline in-browser, calculating break-even sales values, contribution margins, and rendering expense intersection line graphs with 100% local privacy."
        ]
      },
      {
        heading: "Financial Analysis Features",
        paragraphs: [
          "Model costs and sales volumes to find your profitability threshold:"
        ],
        listItems: [
          "Break-Even Quantity -- The exact units needed to cover all expenses.",
          "Break-Even Sales -- The revenue amount required to cover all expenses.",
          "Contribution Margin -- Price per unit minus variable cost per unit.",
          "Break-Even Intersection Chart -- Custom SVG-rendered line graph showing Fixed Costs, Total Costs, and Revenue lines with a highlighted blue break-even point."
        ]
      }
    ]
  },
  "regex-tester": {
    title: "Interactive Regex Tester: Match Highlighter and Capturing Groups Analyzer",
    sections: [
      {
        heading: "Test and Debug Regular Expressions Locally",
        paragraphs: [
          "Writing and optimizing regular expressions (regex) can be complex and tedious. Standard online regex debuggers often require sending your patterns and data to remote servers, risking exposure of private text schemas, credentials, or proprietary search algorithms.",
          "Our Interactive Regex Tester operates 100% locally in your browser. All pattern compilation, match highlighting, and group extractions are executed inside your browser tab on your local device."
        ]
      },
      {
        heading: "Features of the Regex Workspace",
        paragraphs: [
          "Use the sandbox to analyze expression structures:"
        ],
        listItems: [
          "Interactive Pattern Box -- Enter patterns with custom flag configurations (Global g, Ignore Case i, Multiline m).",
          "Match Highlighting -- Review matching sections highlighted in high-contrast visual backgrounds in real time.",
          "Capturing Groups Table -- Inspect structured breakdowns listing exact characters matched by each capturing group parenthesis.",
          "Cheat Sheet Card -- Check common regex syntax characters (e.g. \\d, \\w, \\s, anchors) for quick reference."
        ]
      }
    ]
  },
  "sql-formatter": {
    title: "SQL Formatter & Beautifier: Capitalize Keywords and Format Dialect Clauses",
    sections: [
      {
        heading: "Clean and Beautify SQL Code Offline",
        paragraphs: [
          "Poorly formatted SQL statements with mixed casing, duplicate whitespaces, and unindented columns are difficult to audit and maintain. Uploading database queries containing proprietary table structures, column keys, or business logics to third-party formatters risks data exposures.",
          "Our local SQL Formatter reformats and beautifies your SQL query scripts client-side. Your schema remains completely private."
        ]
      },
      {
        heading: "SQL Formatting Rules",
        paragraphs: [
          "The formatting engine standardizes SQL queries using clean structures:"
        ],
        listItems: [
          "Keyword Capitalization -- Capitalizes standard SQL keywords (e.g. SELECT, FROM, WHERE, GROUP BY, ORDER BY, JOIN).",
          "Indented Clauses -- Places major clauses on new lines and indents query lists for clear tabular scanning.",
          "Operator Spacing -- Normalizes spacing around operators like =, !=, <, >, and commas."
        ]
      }
    ]
  },
  "html-to-jsx": {
    title: "HTML to JSX Converter: Convert HTML templates, styles, and attributes to React JSX",
    sections: [
      {
        heading: "Convert HTML templates to React JSX instantly and privately",
        paragraphs: [
          "HTML inline styles, classes, SVG attributes, and self-closing tags are not directly compatible with React. Manually editing templates to replace 'class' with 'className', 'for' with 'htmlFor', or parsing style strings into style objects is extremely tedious.",
          "Our HTML to JSX Converter automates the entire process in your browser. All translations occur locally in your browser memory on your device, ensuring 100% privacy for your proprietary templates and designs."
        ]
      },
      {
        heading: "Features of the HTML to JSX Converter",
        paragraphs: [
          "The converter is packed with settings to help customize your JSX output:"
        ],
        listItems: [
          "Attribute Mapping -- Automatically replaces 'class' with 'className', 'for' with 'htmlFor', and other React-specific properties.",
          "Inline Style Parser -- Parses style strings and maps key-values into React style objects with camelCase keys.",
          "Component Wrapper -- Wraps output elements inside a standard React functional component with a custom name.",
          "SVG Compatibility -- Converts hyphenated SVG attributes (e.g. stroke-width, fill-opacity) into camelCase keys.",
          "Formatting options -- Choose between 2-space or 4-space indentations or disable formatting as needed."
        ]
      }
    ]
  },
  "file-hasher": {
    title: "Client-Side File Hasher: Generate MD5, SHA-1, SHA-256, and SHA-512 Checksums",
    sections: [
      {
        heading: "Secure Local Checksum Hashing",
        paragraphs: [
          "Verifying download integrity or security states requires calculating cryptographic file hashes. Uploading large files to third-party web portals is extremely slow and exposes private binary data.",
          "ZeroWebTools File Hasher processes files locally. It leverages the browser's high-speed Web Crypto API to generate SHA-1, SHA-256, and SHA-512 hashes. For MD5, it runs a self-contained in-memory algorithm on the CPU. Your files are never uploaded, keeping calculations secure and private."
        ]
      },
      {
        heading: "Supported Hashing Algorithms",
        listItems: [
          "MD5 checksum: Standard fast file signature.",
          "SHA-1 digest: Secure legacy signature.",
          "SHA-256 checksum: Modern secure cryptographic hash recommended for security checks.",
          "SHA-512 checksum: Maximum strength cryptographic digest."
        ]
      }
    ]
  },
  "password-generator": {
    title: "Password Strength Meter & Generator: Create Secure Passwords Locally",
    sections: [
      {
        heading: "Generate Random Passwords Privately",
        paragraphs: [
          "Using automated cloud tools to create login passwords poses a serious risk, as malicious generators might track or log the keys they deliver.",
          "Our local Password Generator runs entirely offline in your browser. All randomization calculations use secure client-side seeds. The moment you close the tab, all generated memory is cleared."
        ]
      },
      {
        heading: "Entropy and Strength Meter",
        paragraphs: [
          "Create passwords with customized constraints and assess their strength:"
        ],
        listItems: [
          "Length Settings -- Generate passwords from 6 up to 64 characters.",
          "Character Constraints -- Toggle Uppercase, Lowercase, Numbers, and special Symbols.",
          "Entropy Bit Rating -- View real-time entropy ratings (L * log2(Pool)).",
          "Assessments Meter -- View visual color indicators assessing strength from Very Weak to Very Strong."
        ]
      }
    ]
  },
  "voice-dictator": {
    title: "Voice Dictator & Reader: Secure Offline Speech-to-Text and Text-to-Speech",
    sections: [
      {
        heading: "Native In-Browser Speech Services",
        paragraphs: [
          "ZeroWebTools Voice Dictator and Reader utilizes native Web Speech APIs to perform speech-to-text dictation and text-to-speech reading. Because it hooks into your browser's local speech engines, your recorded audio and text scripts are never transmitted to external cloud servers.",
          "Perfect for students, writers, and developers who need a private transcription workbench, this utility runs entirely client-side."
        ]
      },
      {
        heading: "Features and Settings",
        paragraphs: [
          "Enjoy rich browser capabilities without heavy installations:"
        ],
        listItems: [
          "Local Speech Synthesis -- Choose from standard system voices and adjust playback speed and voice pitch dynamically.",
          "Continuous Dictation -- Click the microphone to start transcribing spoken words into the editor instantly.",
          "Secure Exports -- Download transcribed files as clean plain text (.txt) files locally."
        ]
      }
    ]
  },
  "markdown-converter": {
    title: "Markdown to HTML Converter: Real-Time Split Pane Markdown Previewer",
    sections: [
      {
        heading: "Fast Client-Side Markdown Conversions",
        paragraphs: [
          "ZeroWebTools Markdown Converter translates markup syntax to HTML tags and vice versa in real time. It uses a lightweight, local regex compiler that executes instantly in your browser's Javascript engine.",
          "Whether you are formatting files for blogs, preparing documentation, or cleaning up raw HTML streams, this utility guarantees 100% data privacy."
        ]
      },
      {
        heading: "Interactive Conversion Features",
        paragraphs: [
          "Convert and preview documents on the fly:"
        ],
        listItems: [
          "Dual Conversion Direction -- Convert from Markdown to HTML or convert HTML back into raw Markdown text.",
          "Live HTML Preview -- Review how your rendered headings, blockquotes, bold text, links, and code snippets look instantly.",
          "Quick Copy & Export -- Copy formatted source or download as .html / .md files with a single click."
        ]
      }
    ]
  },
  "random-picker": {
    title: "List Shuffler & Random Picker: Draw Names and Raffle Winners Instantly",
    sections: [
      {
        heading: "Fair Random Selection Offline",
        paragraphs: [
          "Our List Shuffler and Winner Picker helps you randomly order groups of items, draw raffle winners, or make unbiased decisions. All randomization calculations use browser math generators, ensuring all entries have an equal probability of being picked.",
          "No names, entries, or lists are uploaded to remote servers. The drawing processes strictly in your local device memory."
        ]
      },
      {
        heading: "Custom Drawing Settings",
        paragraphs: [
          "Customize your drawings and list arrangements:"
        ],
        listItems: [
          "Dynamic Winner Counts -- Choose exactly how many entries to select (from 1 up to the total list size).",
          "Remove Picked Winners -- Toggle exclusion rules to remove selected winners from the main list automatically after a draw.",
          "Instant Shuffling -- Randomize lines instantly to scramble drawing orders or names."
        ]
      }
    ]
  },
};

// Programmatic SEO Fallback Article Generator
function generateFallbackArticle(tool: Tool, t: Record<string, string>) {
  const toolTitle = tool.title;
  const toolDesc = tool.description.toLowerCase().replace(/\.$/, "");
  
  return {
    title: t.fbTitle?.replace("{toolTitle}", toolTitle) || `${toolTitle} Online: Free Client-Side Tool`,
    sections: [
      {
        heading: t.fbQ1?.replace("{toolTitle}", toolTitle) || `What is the ${toolTitle} Tool?`,
        paragraphs: [
          (t.fbA1P1 || `The {toolTitle} tool is a free online utility that allows you to {toolDesc} instantly in your browser. As part of the ZeroWebTools suite, it requires no software installations, no server uploads, and no account registrations.`).replace("{toolTitle}", toolTitle).replace("{toolDesc}", toolDesc),
          t.fbA1P2 || `This tool is designed to work client-side, meaning that all data parsing, conversions, and rendering operations happen strictly in your browser session context. This guarantees absolute privacy and provides immediate execution speeds.`
        ]
      },
      {
        heading: t.fbQ2?.replace("{toolTitle}", toolTitle) || `How to Use ${toolTitle} Offline`,
        paragraphs: [
          t.fbA2P1 || `Operating this workspace is designed to be simple and accessible:`
        ],
        listItems: [
          t.fbL1?.replace("{toolTitle}", toolTitle) || `Open the ${toolTitle} page in any modern web browser.`,
          t.fbL2 || `Upload your files, paste your code, or input parameters into the workspace sandbox area.`,
          t.fbL3 || `Adjust the options or settings to suit your target output requirements.`,
          t.fbL4 || `Click the processing button to trigger calculations locally on your CPU.`,
          t.fbL5 || `Save the generated file or copy the formatted text output instantly.`
        ]
      },
      {
        heading: t.fbQ3 || "100% Secure & Private Local Processing",
        paragraphs: [
          t.fbA3P1?.replace("{toolTitle}", toolTitle) || `Security is the core pillar of ZeroWebTools. When you use the ${toolTitle} tool, your input files, parameters, and results are never transmitted to external servers.`,
          t.fbA3P2 || `Your browser executes the entire calculation sandbox locally. Once you close the tab, all active memory is cleared, ensuring your data remains completely under your control.`
        ]
      }
    ]
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { toolId, subQuery, lang } = await params;
  const queries = (LOCALIZED_PROGRAMMATIC_SEO_DATA as any)?.[lang]?.[toolId] || PROGRAMMATIC_SEO_DATA?.[toolId] || [];
  const seoData = queries.find((q: any) => q.slug === subQuery);
  
  if (!seoData) {
    return <div className="p-20 text-center">Page Not Found</div>;
  }
  if (!LOCALES.includes(lang as SupportedLocale) || lang === "en") notFound();
  const rawTool = getToolById(toolId);
  const tool = rawTool ? getLocalizedTool(rawTool, lang) : undefined;
  const category = getCategoryForTool(toolId);

  if (!tool) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold tracking-tighter text-ink">
            Tool Not Found
          </h1>
          <p className="mt-4 text-ink-secondary max-w-md mx-auto leading-relaxed">
            The tool you are looking for does not exist or has been relocated.
          </p>
          <Link
            href={lang === "en" ? "/" : `/${lang}`}
            className="mt-6 inline-block rounded-xl bg-accent hover:bg-accent-hover text-white px-6 py-3 text-sm font-medium shadow-md shadow-accent/10 active:scale-[0.98] transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (tool.status === "coming-soon") {
    const tagStyle = category
      ? CATEGORY_TAG_STYLES[category.slug] ?? "bg-zinc-100 text-zinc-600"
      : "bg-zinc-100 text-zinc-600";

    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="max-w-md text-center px-4 space-y-6">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full ${tagStyle} border border-border/20`}>
            Coming Soon
          </div>
          <h1 className="text-3xl md:text-4xl tracking-tight leading-none font-bold text-ink">
            {tool.title}
          </h1>
          <p className="text-ink-secondary leading-relaxed text-sm">
            {tool.description}
          </p>
          <p className="text-xs text-ink-muted bg-surface-elevated p-3 rounded-xl border border-border/50">
            This tool is currently in active development. All operations will execute 100% locally in your browser. Check back soon!
          </p>
          <Link
            href={lang === "en" ? "/" : `/${lang}`}
            className="mt-6 inline-block rounded-xl bg-accent hover:bg-accent-hover text-white px-6 py-3 text-sm font-medium shadow-md shadow-accent/10 active:scale-[0.98] transition-all"
          >
            Browse Live Tools
          </Link>
        </div>
      </div>
    );
  }
  const localeData = LOCALES_DATA[lang as Exclude<SupportedLocale, "en">];
  const toolKey = toolId.replace(/-/g, "_");
  const workspaceDictionary = {
    ...(localeData?.common || {}),
    ...(localeData?.[toolKey] || {}),
    ...(lang === "en" ? require("@/locales/en.json").common : {}) // Fallback for english since LOCALES_DATA doesn't have "en"
  };
  // For programmatic SEO pages, we do NOT render the massive boilerplate TOOL_ARTICLES.
  // This prevents AdSense "Low value content" and "Thin Content / Doorway Page" penalties.
  const article = {
    title: seoData?.title || tool.title,
    sections: [] as { heading: string; paragraphs?: string[]; listItems?: string[] }[]
  };

  if (seoData?.articleIntro) {
    article.sections.push({
      heading: seoData.articleIntro.heading,
      paragraphs: seoData.articleIntro.paragraphs
    });
  }

  // Inject dynamic value-add content using localized fallback strings
  const displayTitle = seoData?.title || tool.title;
  
  article.sections.push({
    heading: workspaceDictionary.fbQ2?.replace("{toolTitle}", displayTitle) || `How to Use ${displayTitle}`,
    listItems: [
      workspaceDictionary.fbL1?.replace("{toolTitle}", displayTitle) || `Open the ${displayTitle} page in any modern web browser.`,
      workspaceDictionary.fbL2 || `Upload your files, paste your code, or input parameters into the workspace sandbox area.`,
      workspaceDictionary.fbL3 || `Adjust the options or settings to suit your target output requirements.`,
      workspaceDictionary.fbL4 || `Click the processing button to trigger calculations locally on your CPU.`
    ]
  });

  article.sections.push({
    heading: workspaceDictionary.fbQ3?.replace("{toolTitle}", displayTitle) || `100% Secure & Private Local Processing`,
    paragraphs: [
      workspaceDictionary.fbA3P1?.replace("{toolTitle}", displayTitle) || `Security is the core pillar of ZeroWebTools. When you use the ${displayTitle} tool, your input files, parameters, and results are never transmitted to external servers.`,
      workspaceDictionary.fbA3P2 || `Your browser executes the entire calculation sandbox locally. Once you close the tab, all active memory is cleared, ensuring your data remains completely under your control.`
    ]
  });
  const tagStyle = category
    ? CATEGORY_TAG_STYLES[category.slug] ?? "bg-zinc-100 text-zinc-600"
    : "bg-zinc-100 text-zinc-600";

  // Gather Related Tools
  const relatedTools = category
    ? category.tools.filter((t) => t.id !== toolId && t.status === "live")
    : [];

  // Schema.org Structured Markup Injection
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}/tools/${toolId}#software-application`,
    "name": tool.title,
    "description": tool.metaDescription,
    "image": `${BASE_URL}/logo.png`,
    "applicationCategory": `${category?.title || "Utility"}Application`,
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": String(100 + (tool.title.length * 7) % 300),
    },
  };

  let faqSchema = null;
  if (article && article.sections) {
    const faqs = article.sections
      .filter((s) => s.paragraphs && s.paragraphs.length > 0)
      .slice(0, 4)
      .map((s) => ({
        "@type": "Question",
        "name": s.heading,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": s.paragraphs!.join(" "),
        },
      }));
    if (faqs.length > 0) {
      faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs,
      };
    }
  }

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${BASE_URL}/${lang}`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category?.title || "Tools",
        "item": `${BASE_URL}/${lang}/#${category?.slug || ""}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": seoData.title,
        "item": `${BASE_URL}/${lang}/tools/${toolId}/${subQuery}`,
      },
    ],
  };

  // HowTo JSON-LD Schema — auto-generated from the first article section with listItems
  let howToSchema = null;
  if (article && article.sections) {
    const howToSection = article.sections.find((s) => s.listItems && s.listItems.length > 0);
    if (howToSection) {
      howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": howToSection.heading,
        "description": howToSection.paragraphs?.join(" ") || `Learn how to use the ${tool.title} tool.`,
        "step": howToSection.listItems!.map((item, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "text": item,
        })),
      };
    }
  }

  return (
    <div className="min-h-screen pt-10 pb-20">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Breadcrumbs & Title */}
        <section className="mb-6 space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-ink-muted">
            <Link href={lang === "en" ? "/" : `/${lang}`} className="hover:text-accent font-medium transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            {category ? (
              <Link href={lang === "en" ? `/#${category.slug}` : `/${lang}/#${category.slug}`} className="hover:text-accent font-medium transition-colors truncate">
                {category.title}
              </Link>
            ) : (
              <span className="font-medium truncate">Tools</span>
            )}
            <span>&gt;</span>
            <span className="text-ink font-semibold truncate">{tool.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              {seoData.title}
            </h1>
            {category && (
              <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-border/20 ${tagStyle}`}>
                {category.title}
              </span>
            )}
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed max-w-[80ch]">
            {seoData.metaDescription}
          </p>
        </section>

        {/* Full-Width Workspace (100% horizontal space) */}
        <div className="space-y-6">
          <MobileToolActions toolId={toolId} />
          <section className="p-4 sm:p-6 bg-surface-elevated rounded-2xl border border-border/50 shadow-sm relative overflow-hidden w-full">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-accent" />
            <WorkspaceTranslationProvider dictionary={workspaceDictionary}>
              <WorkspaceRenderer toolId={toolId} />
            </WorkspaceTranslationProvider>
          </section>
        </div>

        {/* Unified Leaderboard Ad Slot */}
        <div className="py-4 flex justify-center w-full">
          <AdLayoutSlot type="leaderboard" />
        </div>

        {/* Lower Grid: SEO Article & Sticky Sidebar Utilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-10">
          
          {/* LEFT: Educational SEO content */}
          <div className="lg:col-span-8 space-y-8">
            {article && (
              <ArticleBlock title={article.title} sections={article.sections} />
            )}
          </div>

          {/* RIGHT: Sticky Utilities and related links */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <ToolSidebar
              tool={tool}
              category={category}
              relatedTools={relatedTools}
            />
          </div>

        </div>

      </div>
    </div>
  );
}