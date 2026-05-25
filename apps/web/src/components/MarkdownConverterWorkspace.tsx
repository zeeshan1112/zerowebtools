"use client";

import React, { useState, useEffect } from "react";
import { markdownToHtml, htmlToMarkdown } from "@hub/tools-core";

const EXAMPLE_MARKDOWN = `# Premium Markdown Tool

Welcome to **ZeroWebTools**! This tool runs 100% locally and privately in your browser.

## Features
- **Fast**: Instant parsing with custom client-side parser.
- **Private**: No data ever leaves your machine.
- **Clean UI**: Beautiful glassmorphic workspace layout.

Here is some code:
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> "Privacy is not an option, it is a prerequisite."

Have fun converting! [Visit GitHub](https://github.com)
`;

const EXAMPLE_HTML = `<h1>Premium Markdown Tool</h1>
<p>Welcome to <strong>ZeroWebTools</strong>! This tool runs 100% locally and privately in your browser.</p>
<h2>Features</h2>
<ul>
<li><strong>Fast</strong>: Instant parsing with custom client-side parser.</li>
<li><strong>Private</strong>: No data ever leaves your machine.</li>
<li><strong>Clean UI</strong>: Beautiful glassmorphic workspace layout.</li>
</ul>
<p>Here is some code:</p>
<pre><code>const greeting = "Hello, World!";
console.log(greeting);</code></pre>
<blockquote>Privacy is not an option, it is a prerequisite.</blockquote>
<p>Have fun converting! <a href="https://github.com" class="text-accent hover:underline">Visit GitHub</a></p>`;

export default function MarkdownConverterWorkspace() {
  const [mode, setMode] = useState<"md2html" | "html2md">("md2html");
  const [input, setInput] = useState(EXAMPLE_MARKDOWN);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // Convert on input change
  useEffect(() => {
    if (mode === "md2html") {
      setOutput(markdownToHtml(input));
    } else {
      setOutput(htmlToMarkdown(input));
    }
  }, [input, mode]);

  const handleModeChange = (newMode: "md2html" | "html2md") => {
    setMode(newMode);
    if (newMode === "md2html") {
      setInput(EXAMPLE_MARKDOWN);
    } else {
      setInput(EXAMPLE_HTML);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (!output) return;
    const filename = mode === "md2html" ? "document.html" : "document.md";
    const mimeType = mode === "md2html" ? "text/html" : "text/markdown";
    const blob = new Blob([output], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoadExample = () => {
    if (mode === "md2html") {
      setInput(EXAMPLE_MARKDOWN);
    } else {
      setInput(EXAMPLE_HTML);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-4 select-none">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-ink uppercase tracking-wider">Conversion Options</h3>

            {/* Mode Switcher */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-ink-muted uppercase block">Direction</label>
              <div className="flex gap-2 bg-zinc-100 dark:bg-zinc-900/60 p-1 rounded-xl border border-border/50">
                <button
                  onClick={() => handleModeChange("md2html")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    mode === "md2html"
                      ? "bg-white dark:bg-zinc-800 text-ink shadow-sm"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  Markdown → HTML
                </button>
                <button
                  onClick={() => handleModeChange("html2md")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    mode === "html2md"
                      ? "bg-white dark:bg-zinc-800 text-ink shadow-sm"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  HTML → Markdown
                </button>
              </div>
            </div>

            <button
              onClick={handleLoadExample}
              className="w-full py-2.5 border border-border hover:border-accent text-ink hover:text-accent text-xs font-bold rounded-xl hover:bg-accent/5 transition-colors cursor-pointer text-center"
            >
              Reset Example
            </button>
          </div>
        </div>

        {/* Editor Workspace */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Pane */}
            <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col h-[400px]">
              <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary flex justify-between items-center select-none">
                <span>{mode === "md2html" ? "Markdown Source" : "HTML Source"}</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === "md2html" ? "Type Markdown here..." : "Type HTML here..."}
                className="w-full flex-1 p-4 bg-zinc-950/20 border-none outline-none font-mono text-xs text-ink resize-none focus:ring-0 focus:outline-none"
              />
            </div>

            {/* Output Pane */}
            <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col h-[400px]">
              <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary flex justify-between items-center select-none">
                <span>{mode === "md2html" ? "Raw HTML Markup" : "Markdown Output"}</span>
                {output && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopy}
                      className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer"
                    >
                      Download
                    </button>
                  </div>
                )}
              </div>
              <textarea
                readOnly
                value={output}
                placeholder="Converted text will appear here..."
                className="w-full flex-1 p-4 bg-zinc-950/30 border-none outline-none font-mono text-xs text-ink-secondary resize-none focus:ring-0 focus:outline-none select-text"
              />
            </div>
          </div>

          {/* Live Preview (Only for Markdown to HTML) */}
          {mode === "md2html" && (
            <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col">
              <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary select-none">
                <span>Live Rich Text Preview</span>
              </div>
              <div
                className="p-6 bg-zinc-950/10 min-h-[150px] overflow-auto prose prose-sm dark:prose-invert max-w-none text-ink select-text leading-relaxed"
                dangerouslySetInnerHTML={{ __html: output }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
