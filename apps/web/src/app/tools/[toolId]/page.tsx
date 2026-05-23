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
import AdLayoutSlot from "@/components/AdLayoutSlot";
import ArticleBlock from "@/components/ArticleBlock";
import ToolSidebar from "@/components/ToolSidebar";
import {
  CATEGORIES,
  getToolById,
  getCategoryForTool,
  CATEGORY_TAG_STYLES,
} from "@/lib/tools";
import { toCamelCase, toSnakeCase, toKebabCase } from "@hub/tools-core";

interface ToolPageProps {
  params: Promise<{ toolId: string }>;
}

export async function generateStaticParams() {
  const liveTools = CATEGORIES.flatMap((c) =>
    c.tools.filter((t) => t.status === "live").map((t) => ({ toolId: t.id }))
  );
  return liveTools;
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { toolId } = await params;
  const tool = getToolById(toolId);
  if (!tool) return { title: "Tool Not Found" };
  return {
    title: `${tool.title} - Free Client-Side Tool | ZeelanceBox`,
    description: tool.metaDescription,
  };
}

function CaseConverterWorkspace() {
  const sampleText = "hello world example";

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-ink" htmlFor="text-input">
        Input Text
      </label>
      <input
        id="text-input"
        type="text"
        className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
        defaultValue={sampleText}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        {[
          { label: "camelCase", value: toCamelCase(sampleText) },
          { label: "snake_case", value: toSnakeCase(sampleText) },
          { label: "kebab-case", value: toKebabCase(sampleText) },
        ].map((conversion) => (
          <div
            key={conversion.label}
            className="rounded-xl border border-border bg-surface-elevated p-4 shadow-sm"
          >
            <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider">
              {conversion.label}
            </span>
            <output className="block mt-1 text-sm font-mono text-ink">
              {conversion.value}
            </output>
          </div>
        ))}
      </div>
    </div>
  );
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
};

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
  const article = TOOL_ARTICLES[toolId];
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
    "name": tool.title,
    "description": tool.metaDescription,
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

  return (
    <div className="min-h-screen pt-6">
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
            <section className="p-6 bg-surface-elevated rounded-2xl border border-border/50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent to-emerald-400" />
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