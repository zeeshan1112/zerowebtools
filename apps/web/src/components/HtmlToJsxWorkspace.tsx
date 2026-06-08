"use client";

import React, { useState, useEffect } from "react";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";
import ProcessingOverlay from "./ProcessingOverlay";

const CONVERSION_STEPS = [
  "Parsing HTML markup structure...",
  "Converting attributes (class -> className, for -> htmlFor)...",
  "Translating inline styles to JSX style objects...",
  "Formatting output component tree...",
];

const EXAMPLE_HTML = `<div class="card" id="main-card" style="margin-top: 20px; padding: 15px; border-radius: 8px;">
  <!-- Card Header -->
  <h2 class="title" style="font-size: 1.5rem; color: #333;">Welcome to ZeroWebTools</h2>
  <p class="description">Convert HTML templates to React JSX instantly and privately.</p>
  
  <div class="actions">
    <label for="newsletter-email">Subscribe to updates</label>
    <input type="email" id="newsletter-email" placeholder="Enter your email" required disabled />
    <button onclick="alert('Subscribed!')" class="btn btn-primary" style="background-color: #6366f1; color: white;">
      Subscribe
    </button>
  </div>
  
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
</div>`;

export default function HtmlToJsxWorkspace() {
  const t = useWorkspaceTranslation();

  const [htmlInput, setHtmlInput] = useState("");
  const [jsxOutput, setJsxOutput] = useState("");
  const [showProcessing, setShowProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Conversion Options
  const [createWrapper, setCreateWrapper] = useState(false);
  const [componentName, setComponentName] = useState("MyComponent");
  const [stripComments, setStripComments] = useState(true);
  const [formatIndent, setFormatIndent] = useState(true);
  const [indentSize, setIndentSize] = useState(2);

  // Re-run conversion if options change when there is input
  useEffect(() => {
    if (htmlInput.trim()) {
      runDirectConversion();
    } else {
      setJsxOutput("");
    }
  }, [createWrapper, componentName, stripComments, formatIndent, indentSize]);

  const runDirectConversion = () => {
    const output = convertHtmlToJsx(htmlInput, {
      stripComments,
      createWrapper,
      componentName,
      formatIndent,
      indentSize,
    });
    setJsxOutput(output);
  };

  const handleConvertClick = () => {
    if (!htmlInput.trim()) return;
    setShowProcessing(true);
  };

  const handleFinishedProcessing = () => {
    runDirectConversion();
    setShowProcessing(false);
  };

  const handleCopy = () => {
    if (!jsxOutput) return;
    navigator.clipboard.writeText(jsxOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (!jsxOutput) return;
    const blob = new Blob([jsxOutput], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = createWrapper ? `${componentName || "Component"}.tsx` : "converted.jsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoadExample = () => {
    setHtmlInput(EXAMPLE_HTML);
    setJsxOutput("");
  };

  const handleClear = () => {
    setHtmlInput("");
    setJsxOutput("");
  };

  const convertHtmlToJsx = (
    html: string,
    options: {
      stripComments: boolean;
      createWrapper: boolean;
      componentName: string;
      formatIndent: boolean;
      indentSize: number;
    }
  ): string => {
    if (typeof window === "undefined" || !html.trim()) return "";

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const body = doc.body;

    const ATTRIBUTE_MAP: Record<string, string> = {
      class: "className",
      for: "htmlFor",
      autocomplete: "autoComplete",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      colspan: "colSpan",
      rowspan: "rowSpan",
      contenteditable: "contentEditable",
      readonly: "readOnly",
      tabindex: "tabIndex",
      maxlength: "maxLength",
      minlength: "minLength",
      novalidate: "noValidate",
      spellcheck: "spellCheck",
      crossorigin: "crossOrigin",
      usemap: "useMap",
      formnovalidate: "formNoValidate",
      ismap: "isMap",
      playsinline: "playsInline",
      srcdoc: "srcDoc",
      srcset: "srcSet",
      allowfullscreen: "allowFullScreen",
      async: "async",
      defer: "defer",
      checked: "checked",
      disabled: "disabled",
      required: "required",
      selected: "selected",
      multiple: "multiple",
      muted: "muted",
      loop: "loop",
      controls: "controls",
      default: "default",
      hidden: "hidden",
      open: "open",
    };

    const selfClosingTags = [
      "area", "base", "br", "col", "embed", "hr", "img", "input",
      "keygen", "link", "meta", "param", "source", "track", "wbr"
    ];

    const parseStyleAttribute = (styleStr: string, depth: number): string => {
      const styles: Record<string, string> = {};
      const rules = styleStr.split(/;(?![^(]*\))/g);
      
      rules.forEach((rule) => {
        const trimmed = rule.trim();
        if (!trimmed) return;
        const colonIndex = trimmed.indexOf(":");
        if (colonIndex === -1) return;
        
        const key = trimmed.slice(0, colonIndex).trim();
        const value = trimmed.slice(colonIndex + 1).trim();
        
        if (key && value) {
          let camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          if (camelKey.startsWith("Ms")) {
            camelKey = "ms" + camelKey.slice(2);
          }
          styles[camelKey] = value;
        }
      });
      
      if (Object.keys(styles).length === 0) return "";
      
      const innerIndent = options.formatIndent ? " ".repeat((depth + 1) * options.indentSize) : "";
      const closingIndent = options.formatIndent ? " ".repeat(depth * options.indentSize) : "";
      
      const pairs = Object.entries(styles).map(([k, v]) => {
        const isNum = /^[0-9.]+$/.test(v);
        const formattedVal = isNum ? v : `"${v.replace(/"/g, '\\"')}"`;
        return options.formatIndent ? `${innerIndent}${k}: ${formattedVal}` : `${k}: ${formattedVal}`;
      });
      
      return options.formatIndent 
        ? `{\n${pairs.join(",\n")}\n${closingIndent}}`
        : `{ ${pairs.join(", ")} }`;
    };

    const serializeNode = (node: Node, depth: number): string => {
      const indent = options.formatIndent ? " ".repeat(depth * options.indentSize) : "";

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        if (!text.trim()) {
          return "";
        }
        const escaped = text
          .trim()
          .replace(/{/g, '{"{"}')
          .replace(/}/g, '{"}"}');
        return options.formatIndent ? `${indent}${escaped}\n` : escaped;
      }

      if (node.nodeType === Node.COMMENT_NODE) {
        if (options.stripComments) {
          return "";
        }
        return options.formatIndent 
          ? `${indent}{/*${node.textContent}*/}\n`
          : `{/*${node.textContent}*/}`;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        const tagName = el.tagName.toLowerCase();
        
        const attrs: string[] = [];
        for (let i = 0; i < el.attributes.length; i++) {
          const attr = el.attributes[i];
          const name = attr.name;
          const value = attr.value;
          
          let jsxName = name;
          if (ATTRIBUTE_MAP[name]) {
            jsxName = ATTRIBUTE_MAP[name];
          } else if (name.startsWith("data-") || name.startsWith("aria-")) {
            jsxName = name;
          } else if (name.includes("-")) {
            jsxName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          }
          
          if (name === "style") {
            const styleObjStr = parseStyleAttribute(value, depth);
            if (styleObjStr) {
              attrs.push(`style={${styleObjStr}}`);
            }
            continue;
          }
          
          if (name.startsWith("on") && name.length > 2) {
            jsxName = "on" + name.charAt(2).toUpperCase() + name.slice(3);
          }
          
          const isBooleanAttr = ["required", "disabled", "checked", "selected", "readonly", "multiple", "muted", "loop", "controls", "autofocus", "autoplay", "async", "defer"].includes(name);
          if (isBooleanAttr && (value === "" || value.toLowerCase() === name)) {
            attrs.push(jsxName);
          } else {
            const escapedValue = value.replace(/"/g, '&quot;');
            attrs.push(`${jsxName}="${escapedValue}"`);
          }
        }
        
        const attrsStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
        
        const hasChildren = el.childNodes.length > 0;
        const isSelfClosing = selfClosingTags.includes(tagName) || (!hasChildren && tagName !== "div" && tagName !== "span" && tagName !== "p" && tagName !== "script" && tagName !== "style");
        
        if (isSelfClosing) {
          return options.formatIndent ? `${indent}<${tagName}${attrsStr} />\n` : `<${tagName}${attrsStr} />`;
        }
        
        let childrenStr = "";
        let hasElementChildren = false;
        for (let i = 0; i < el.childNodes.length; i++) {
          const child = el.childNodes[i];
          if (child.nodeType === Node.ELEMENT_NODE) {
            hasElementChildren = true;
          }
          childrenStr += serializeNode(child, depth + 1);
        }
        
        if (!hasElementChildren) {
          const textVal = el.textContent?.trim() || "";
          const escapedText = textVal
            .replace(/{/g, '{"{"}')
            .replace(/}/g, '{"}"}');
          return options.formatIndent 
            ? `${indent}<${tagName}${attrsStr}>${escapedText}</${tagName}>\n`
            : `<${tagName}${attrsStr}>${escapedText}</${tagName}>`;
        }
        
        return options.formatIndent
          ? `${indent}<${tagName}${attrsStr}>\n${childrenStr}${indent}</${tagName}>\n`
          : `<${tagName}${attrsStr}>${childrenStr}</${tagName}>`;
      }

      return "";
    };

    const nodes: Node[] = [];
    for (let i = 0; i < body.childNodes.length; i++) {
      const node = body.childNodes[i];
      if (
        node.nodeType === Node.ELEMENT_NODE ||
        (node.nodeType === Node.COMMENT_NODE && !options.stripComments) ||
        (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
      ) {
        nodes.push(node);
      }
    }

    if (nodes.length === 0) return "";

    let jsxContent = "";
    const startDepth = options.createWrapper ? 2 : 0;
    
    if (nodes.length > 1) {
      let innerContent = "";
      nodes.forEach((node) => {
        innerContent += serializeNode(node, startDepth + 1);
      });
      if (options.formatIndent) {
        const indent = " ".repeat(startDepth * options.indentSize);
        jsxContent = `${indent}<>\n${innerContent}${indent}</>\n`;
      } else {
        jsxContent = `<>${innerContent}</>`;
      }
    } else {
      jsxContent = serializeNode(nodes[0], startDepth);
    }

    if (options.createWrapper) {
      const compName = options.componentName.trim() || "MyComponent";
      return `import React from "react";\n\nexport default function ${compName}() {\n  return (\n${jsxContent}  );\n}\n`;
    }

    return jsxContent.trim();
  };

  return (
    <div className="space-y-6">
      {/* 1. Split-pane Editors (Full width on top) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input HTML Code */}
        <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col h-[400px]">
          <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary flex justify-between items-center select-none">
            <span>Raw HTML Code</span>
            {htmlInput && (
              <button
                onClick={handleClear}
                className="text-red-500 hover:text-red-600 text-[10px] font-bold cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <textarea
            value={htmlInput}
            onChange={(e) => {
              setHtmlInput(e.target.value);
              setJsxOutput("");
            }}
            placeholder={t("placeholder_input", "Paste your HTML code here...")}
            className="w-full flex-1 p-4 bg-zinc-950/20 border-none outline-none font-mono text-xs text-ink resize-none focus:ring-0 focus:outline-none"
          />
        </div>

        {/* Output JSX Code */}
        <div className="rounded-2xl border border-border bg-surface-elevated overflow-hidden flex flex-col h-[400px]">
          <div className="bg-zinc-50 dark:bg-zinc-900/60 border-b border-border px-4 py-2.5 text-xs font-bold text-ink-secondary flex justify-between items-center select-none">
            <span>React JSX</span>
            {jsxOutput && (
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer"
                >
                  {copied ? t("copied", "Copied!") : t("copy_btn", "Copy JSX")}
                </button>
                <button
                  onClick={handleDownload}
                  className="text-accent hover:text-accent-hover text-[10px] font-bold cursor-pointer"
                >
                  {t("download_btn", "Download JSX")}
                </button>
              </div>
            )}
          </div>
          <textarea
            readOnly
            value={jsxOutput}
            placeholder={t("placeholder_output", "Your converted JSX will appear here...")}
            className="w-full flex-1 p-4 bg-zinc-950/30 border-none outline-none font-mono text-xs text-ink-secondary resize-none focus:ring-0 focus:outline-none select-text"
          />
        </div>
      </div>

      {/* 2. Conversion Settings (Below editors) */}
      <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm select-none">
        <div className="flex flex-col lg:flex-row gap-6 justify-between lg:items-start">
          
          {/* Header & Meta */}
          <div className="space-y-1.5 lg:w-1/3">
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider">
              {t("settings_title", "Conversion Settings")}
            </h3>
            <p className="text-xs text-ink-secondary leading-relaxed">
              {t("settings_desc", "Configure the behavior and formatting of the generated JSX code.")}
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1 lg:w-2/3">
            {/* Options Checklist */}
            <div className="space-y-3.5">
              {/* Option: Create Component Wrapper */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={createWrapper}
                  onChange={(e) => setCreateWrapper(e.target.checked)}
                  className="mt-0.5 rounded border-border bg-surface text-accent focus:ring-accent/20 cursor-pointer h-4 w-4"
                />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-ink group-hover:text-accent transition-colors">
                    {t("option_wrapper", "Create component wrapper")}
                  </span>
                </div>
              </label>

              {/* Option: Strip Comments */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={stripComments}
                  onChange={(e) => setStripComments(e.target.checked)}
                  className="mt-0.5 rounded border-border bg-surface text-accent focus:ring-accent/20 cursor-pointer h-4 w-4"
                />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-ink group-hover:text-accent transition-colors">
                    {t("option_strip_comments", "Strip HTML comments")}
                  </span>
                </div>
              </label>

              {/* Option: Format Indentation */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formatIndent}
                  onChange={(e) => setFormatIndent(e.target.checked)}
                  className="mt-0.5 rounded border-border bg-surface text-accent focus:ring-accent/20 cursor-pointer h-4 w-4"
                />
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-ink group-hover:text-accent transition-colors">
                    {t("option_format_indent", "Format indentation")}
                  </span>
                </div>
              </label>
            </div>

            {/* Dynamic settings input fields */}
            <div className="space-y-4">
              {/* Option: Component Name input */}
              {createWrapper && (
                <div className="space-y-1.5 animate-fadeIn">
                  <label htmlFor="component-name-input" className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">
                    {t("option_wrapper_name", "Component Name")}
                  </label>
                  <input
                    id="component-name-input"
                    type="text"
                    value={componentName}
                    onChange={(e) => setComponentName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-mono text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  />
                </div>
              )}

              {/* Option: Indentation configuration (2, 3, 4 spaces) */}
              {formatIndent && (
                <div className="space-y-1.5 animate-fadeIn">
                  <span className="text-[10px] font-bold text-ink-muted uppercase tracking-wider block">
                    {t("option_indent_size", "Indentation size")}
                  </span>
                  <div className="flex gap-2">
                    {[2, 3, 4].map((size) => (
                      <button
                        key={size}
                        onClick={() => setIndentSize(size)}
                        className={`flex-1 py-1.5 px-3.5 rounded-lg border text-xs font-bold cursor-pointer transition-all ${
                          indentSize === size
                            ? "bg-accent/10 border-accent text-accent"
                            : "border-border hover:border-accent/40 text-ink-secondary hover:text-ink"
                        }`}
                      >
                        {size === 2
                          ? t("option_indent_2", "2 spaces")
                          : size === 3
                          ? t("option_indent_3", "3 spaces")
                          : t("option_indent_4", "4 spaces")}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Action buttons footer inside settings card */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border/40">
          <button
            onClick={handleLoadExample}
            className="px-4 py-2 border border-border hover:border-accent text-ink hover:text-accent text-xs font-semibold rounded-xl hover:bg-accent/5 transition-colors cursor-pointer text-center"
          >
            {t("load_example", "Load Example")}
          </button>
          <button
            onClick={handleConvertClick}
            disabled={!htmlInput.trim()}
            className="px-6 py-2 bg-accent hover:bg-accent-hover text-white dark:text-black disabled:opacity-40 disabled:cursor-not-allowed text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-sm shadow-accent/10"
          >
            {t("convert_btn", "Convert to JSX")}
          </button>
        </div>

      </div>

      <ProcessingOverlay
        isOpen={showProcessing}
        steps={CONVERSION_STEPS}
        loadingText={t("converting_overlay_title", "Converting HTML to JSX...")}
        duration={1500}
        onFinished={handleFinishedProcessing}
      />
    </div>
  );
}
