import type { Metadata } from "next";
import Link from "next/link";
import JsonViewerWorkspace from "@/components/JsonViewerWorkspace";
import HeicConverterWorkspace from "@/components/HeicConverterWorkspace";
import MergePDFWorkspace from "@/components/MergePDFWorkspace";
import SplitPDFWorkspace from "@/components/SplitPDFWorkspace";
import CompressPDFWorkspace from "@/components/CompressPDFWorkspace";
import RotatePDFWorkspace from "@/components/RotatePDFWorkspace";
import { ProtectPDFWorkspace, UnlockPDFWorkspace, WatermarkPDFWorkspace, PageNumbersPDFWorkspace, OrganizePDFWorkspace } from "@/components/PDFEditorsWorkspace";
import { JpgToPdfWorkspace, PdfToJpgWorkspace } from "@/components/ConvertPDFWorkspace";
import SaasMrrWorkspace from "@/components/SaasMrrWorkspace";
import StartupEquityWorkspace from "@/components/StartupEquityWorkspace";
import CaseConverterWorkspace from "@/components/CaseConverterWorkspace";
import AdLayoutSlot from "@/components/AdLayoutSlot";
import ArticleBlock from "@/components/ArticleBlock";
import ToolSidebar from "@/components/ToolSidebar";
import MobileToolActions from "@/components/MobileToolActions";
import {
  CATEGORIES,
  getToolById,
  getCategoryForTool,
  CATEGORY_TAG_STYLES,
  type Tool,
  type ToolCategory,
} from "@/lib/tools";

interface ToolPageProps {
  params: Promise<{ toolId: string }>;
}

export async function generateStaticParams() {
  const liveTools = CATEGORIES.flatMap((c) =>
    c.tools.filter((t) => t.status === "live").map((t) => ({ toolId: t.id }))
  );
  return liveTools;
}

const BASE_URL = "https://zerowebtools.com";

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { toolId } = await params;
  const tool = getToolById(toolId);
  if (!tool) return { title: "Tool Not Found" };

  const canonicalUrl = `${BASE_URL}/tools/${toolId}`;
  const pageTitle = `${tool.title} - Free Client-Side Tool | ZeroWebTools`;

  return {
    title: pageTitle,
    description: tool.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description: tool.metaDescription,
      type: "website",
      url: canonicalUrl,
      siteName: "ZeroWebTools",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: tool.metaDescription,
    },
  };
}



const WORKSPACE_MAP: Record<string, React.ComponentType> = {
  "json-formatter": JsonViewerWorkspace,
  "case-converter": CaseConverterWorkspace,
  "heic-to-jpg": HeicConverterWorkspace,
  "pdf-merge": MergePDFWorkspace,
  "pdf-split": SplitPDFWorkspace,
  "pdf-compress": CompressPDFWorkspace,
  "pdf-rotate": RotatePDFWorkspace,
  "pdf-to-jpg": PdfToJpgWorkspace,
  "jpg-to-pdf": JpgToPdfWorkspace,
  "pdf-protect": ProtectPDFWorkspace,
  "pdf-watermark": WatermarkPDFWorkspace,
  "pdf-page-numbers": PageNumbersPDFWorkspace,
  "pdf-organize": OrganizePDFWorkspace,
  "pdf-unlock": UnlockPDFWorkspace,
  "saas-mrr": SaasMrrWorkspace,
  "startup-equity": StartupEquityWorkspace,
};

const TOOL_ARTICLES: Record<
  string,
  { title: string; sections: { heading: string; level?: "h2" | "h3"; paragraphs?: string[]; listItems?: string[] }[] }
> = {
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
    title: "Add Watermark to PDF Online: Stamp Text Over PDF Pages",
    sections: [
      {
        heading: "Add Custom Watermarks to Your PDF Documents",
        paragraphs: [
          "Stamp labels like 'CONFIDENTIAL', 'DRAFT', or your company name across PDF pages to establish ownership or display statuses.",
        ],
      },
      {
        heading: "How to Add a Watermark",
        paragraphs: [
          "To stamp your PDF:",
        ],
        listItems: [
          "Upload PDF -- Select your PDF file.",
          "Configure text -- Input your watermark text, choose fonts, and select placement positions.",
          "Style stamp -- Adjust opacity, scale, and stamp angles.",
          "Save PDF -- Generate and download the watermarked PDF file.",
        ],
      },
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
};

// Programmatic SEO Fallback Article Generator
function generateFallbackArticle(tool: Tool, category?: ToolCategory) {
  return {
    title: `${tool.title} Online: Free Client-Side Tool`,
    sections: [
      {
        heading: `What is the ${tool.title} Tool?`,
        paragraphs: [
          `The ${tool.title} tool is a free online utility that allows you to ${tool.description.toLowerCase().replace(/\.$/, "")} instantly in your browser. As part of the ZeroWebTools suite, it requires no software installations, no server uploads, and no account registrations.`,
          `This tool is designed to work client-side, meaning that all data parsing, conversions, and rendering operations happen strictly in your browser session context. This guarantees absolute privacy and provides immediate execution speeds.`
        ]
      },
      {
        heading: `How to Use ${tool.title} Offline`,
        paragraphs: [
          `Operating this workspace is designed to be simple and accessible:`
        ],
        listItems: [
          `Open the ${tool.title} page in any modern web browser.`,
          `Upload your files, paste your code, or input parameters into the workspace sandbox area.`,
          `Adjust the options or settings to suit your target output requirements.`,
          `Click the processing button to trigger calculations locally on your CPU.`,
          `Save the generated file or copy the formatted text output instantly.`
        ]
      },
      {
        heading: "100% Secure & Private Local Processing",
        paragraphs: [
          `Security is the core pillar of ZeroWebTools. When you use the ${tool.title} tool, your input files, parameters, and results are never transmitted to external servers.`,
          `Your browser executes the entire calculation sandbox locally. Once you close the tab, all active memory is cleared, ensuring your data remains completely under your control.`
        ]
      }
    ]
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { toolId } = await params;
  const tool = getToolById(toolId);
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
            href="/"
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
            href="/"
            className="mt-6 inline-block rounded-xl bg-accent hover:bg-accent-hover text-white px-6 py-3 text-sm font-medium shadow-md shadow-accent/10 active:scale-[0.98] transition-all"
          >
            Browse Live Tools
          </Link>
        </div>
      </div>
    );
  }

  const WorkspaceComponent = WORKSPACE_MAP[toolId];
  const article = TOOL_ARTICLES[toolId] || (tool ? generateFallbackArticle(tool, category) : undefined);
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
    "image": `${BASE_URL}/og-image.png`,
    "applicationCategory": `${category?.title || "Utility"}Application`,
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
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
        "item": `${BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": category?.title || "Tools",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.title,
        "item": `${BASE_URL}/tools/${toolId}`,
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
        type="application/ld-json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld-json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld-json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld-json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Breadcrumbs & Title */}
        <section className="mb-6 space-y-3">
          <div className="flex items-center gap-1.5 text-xs text-ink-muted">
            <Link href="/" className="hover:text-accent font-medium transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="font-medium truncate">{category?.title || "Tools"}</span>
            <span>&gt;</span>
            <span className="text-ink font-semibold truncate">{tool.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              {tool.title}
            </h1>
            {category && (
              <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-border/20 ${tagStyle}`}>
                {category.title}
              </span>
            )}
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed max-w-[80ch]">
            {tool.description}
          </p>
        </section>

        {/* Dynamic Split Grid: Workspace vs Side Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Interactive Workspace & SEO text */}
          <div className="lg:col-span-8 space-y-10">
            {/* Mobile-only quick actions (Save/Share) — above the workspace */}
            <MobileToolActions toolId={toolId} />
            <section className="p-4 sm:p-6 bg-surface-elevated rounded-2xl border border-border/50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-accent" />
              {WorkspaceComponent && <WorkspaceComponent />}
            </section>

            {/* Below Workspace Leaderboard Ad */}
            <div className="py-2 flex justify-center">
              <AdLayoutSlot type="leaderboard" />
            </div>

            {/* Educational SEO Article Content */}
            {article && (
              <ArticleBlock title={article.title} sections={article.sections} />
            )}
          </div>

          {/* RIGHT: Sticky Utility and Ad Rail */}
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