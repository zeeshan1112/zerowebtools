"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { parseJsonToTree, searchTree, type JsonTreeNode, type JsonParseResult } from "@hub/tools-core";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";
import { trackToolEvent } from "@/lib/telemetry";

/* ─── helpers ─── */

function typeColor(type: JsonTreeNode["type"]): string {
  switch (type) {
    case "string":  return "text-emerald-600";
    case "number":  return "text-sky-600";
    case "boolean": return "text-amber-600";
    case "null":    return "text-zinc-400";
    default:        return "text-ink";
  }
}

function bracketLabel(type: JsonTreeNode["type"], count: number): string {
  if (type === "array") return `[${count}]`;
  if (type === "object") return `{${count}}`;
  return "";
}

function indentStyle(depth: number): React.CSSProperties {
  return { paddingLeft: `${12 + depth * 20}px` };
}

/* ─── props ─── */

interface JsonViewerWorkspaceProps {
  defaultInput?: string;
}

/* ─── tree node row ─── */

interface RowProps {
  node: JsonTreeNode;
  childrenMap: Map<string, JsonTreeNode[]>;
  expanded: Set<string>;
  toggle: (id: string) => void;
  highlightText: string;
}

function TreeNodeRow({ node, childrenMap, expanded, toggle, highlightText }: RowProps) {
  const hasChildren = childrenMap.get(node.id) && childrenMap.get(node.id)!.length > 0;
  const isOpen = expanded.has(node.id);

  function highlight(text: string): React.ReactNode {
    if (!highlightText || !text.toLowerCase().includes(highlightText.toLowerCase())) return text;
    const idx = text.toLowerCase().indexOf(highlightText.toLowerCase());
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-accent-light rounded-sm px-0.5">{text.slice(idx, idx + highlightText.length)}</mark>
        {text.slice(idx + highlightText.length)}
      </>
    );
  }

  return (
    <div>
      <div
        className="flex items-center gap-1.5 py-[3px] text-sm leading-6 cursor-pointer hover:bg-zinc-50/60 rounded-sm group select-none"
        style={indentStyle(node.depth)}
        onClick={node.expandable ? () => toggle(node.id) : undefined}
      >
        {/* expand arrow */}
        {node.expandable ? (
          <span
            className={`shrink-0 w-4 h-4 flex items-center justify-center text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              <path d="M3 1l5 4-5 4V1z" />
            </svg>
          </span>
        ) : (
          <span className="shrink-0 w-4" />
        )}

        {/* key */}
        {node.key !== "" && (
          <span className="text-zinc-700 font-medium shrink-0">
            {highlight(node.key)}
            <span className="text-zinc-400 mx-0.5">:</span>
          </span>
        )}

        {/* value */}
        {!node.expandable || !isOpen ? (
          node.expandable && !isOpen ? (
            <span className={typeColor(node.type)}>
              {bracketLabel(node.type, node.childCount)}
            </span>
          ) : (
            <span className={typeColor(node.type)}>
              {highlight(node.value)}
            </span>
          )
        ) : null}
      </div>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
          >
            {childrenMap.get(node.id)!.map((child) => (
              <TreeNodeRow
                key={child.id}
                node={child}
                childrenMap={childrenMap}
                expanded={expanded}
                toggle={toggle}
                highlightText={highlightText}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── format converters ─── */

function jsonToTypeScript(val: any, name = "RootObject"): string {
  if (val === null) return `type ${name} = null;`;
  if (typeof val !== "object") return `type ${name} = ${typeof val};`;
  
  if (Array.isArray(val)) {
    if (val.length === 0) return `type ${name} = any[];`;
    const item = val[0];
    if (typeof item !== "object" || item === null) {
      return `type ${name} = ${typeof item}[];`;
    }
    return `${jsonToTypeScript(item, name + "Item")}\n\ntype ${name} = ${name}Item[];`;
  }

  let result = `export interface ${name} {\n`;
  const subTypes: string[] = [];

  for (const [key, value] of Object.entries(val)) {
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
    if (value === null) {
      result += `  ${safeKey}: null;\n`;
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        result += `  ${safeKey}: any[];\n`;
      } else {
        const item = value[0];
        if (typeof item !== "object" || item === null) {
          result += `  ${safeKey}: ${typeof item}[];\n`;
        } else {
          const subTypeName = name + key.charAt(0).toUpperCase() + key.slice(1) + "Item";
          subTypes.push(jsonToTypeScript(item, subTypeName));
          result += `  ${safeKey}: ${subTypeName}[];\n`;
        }
      }
    } else if (typeof value === "object") {
      const subTypeName = name + key.charAt(0).toUpperCase() + key.slice(1);
      subTypes.push(jsonToTypeScript(value, subTypeName));
      result += `  ${safeKey}: ${subTypeName};\n`;
    } else {
      result += `  ${safeKey}: ${typeof value};\n`;
    }
  }

  result += `}`;
  return subTypes.length > 0 ? `${subTypes.join("\n\n")}\n\n${result}` : result;
}

function jsonToGo(val: any, name = "Root"): string {
  if (val === null || typeof val !== "object") return `type ${name} any`;
  if (Array.isArray(val)) {
    if (val.length === 0) return `type ${name} []any`;
    const item = val[0];
    if (typeof item !== "object" || item === null) {
      return `type ${name} []${typeof item === "number" ? "float64" : typeof item}`;
    }
    return `${jsonToGo(item, name + "Item")}\ntype ${name} []${name}Item`;
  }

  let result = `type ${name} struct {\n`;
  const subTypes: string[] = [];

  for (const [key, value] of Object.entries(val)) {
    const pascalKey = key.split(/[-_]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("");
    const structTag = `\t\`json:"${key}"\``;
    
    if (value === null) {
      result += `\t${pascalKey} any${structTag}\n`;
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        result += `\t${pascalKey} []any${structTag}\n`;
      } else {
        const item = value[0];
        if (typeof item !== "object" || item === null) {
          const typeName = typeof item === "number" ? "float64" : typeof item;
          result += `\t${pascalKey} []${typeName}${structTag}\n`;
        } else {
          const subTypeName = name + pascalKey + "Item";
          subTypes.push(jsonToGo(item, subTypeName));
          result += `\t${pascalKey} []${subTypeName}${structTag}\n`;
        }
      }
    } else if (typeof value === "object") {
      const subTypeName = name + pascalKey;
      subTypes.push(jsonToGo(value, subTypeName));
      result += `\t${pascalKey} ${subTypeName}${structTag}\n`;
    } else {
      const typeName = typeof value === "number" ? "float64" : typeof value === "boolean" ? "bool" : "string";
      result += `\t${pascalKey} ${typeName}${structTag}\n`;
    }
  }

  result += `}`;
  return subTypes.length > 0 ? `${subTypes.join("\n\n")}\n\n${result}` : result;
}

function jsonToPython(val: any, name = "Root"): string {
  if (val === null || typeof val !== "object") return `${name} = Any`;
  if (Array.isArray(val)) {
    if (val.length === 0) return `${name} = List[Any]`;
    const item = val[0];
    if (typeof item !== "object" || item === null) {
      const typeName = typeof item === "number" ? "float" : typeof item === "boolean" ? "bool" : "str";
      return `${name} = List[${typeName}]`;
    }
    return `${jsonToPython(item, name + "Item")}\n${name} = List[${name}Item]`;
  }

  let result = `@dataclass\nclass ${name}:\n`;
  const subTypes: string[] = [];

  for (const [key, value] of Object.entries(val)) {
    const pythonKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    
    if (value === null) {
      result += `    ${pythonKey}: Any\n`;
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        result += `    ${pythonKey}: List[Any]\n`;
      } else {
        const item = value[0];
        if (typeof item !== "object" || item === null) {
          const typeName = typeof item === "number" ? "float" : typeof item === "boolean" ? "bool" : "str";
          result += `    ${pythonKey}: List[${typeName}]\n`;
        } else {
          const subTypeName = name + key.charAt(0).toUpperCase() + key.slice(1) + "Item";
          subTypes.push(jsonToPython(item, subTypeName));
          result += `    ${pythonKey}: List[${subTypeName}]\n`;
        }
      }
    } else if (typeof value === "object") {
      const subTypeName = name + key.charAt(0).toUpperCase() + key.slice(1);
      subTypes.push(jsonToPython(value, subTypeName));
      result += `    ${pythonKey}: ${subTypeName}\n`;
    } else {
      const typeName = typeof value === "number" ? "float" : typeof value === "boolean" ? "bool" : "str";
      result += `    ${pythonKey}: ${typeName}\n`;
    }
  }

  return subTypes.length > 0 ? `${subTypes.join("\n\n")}\n\n${result}` : result;
}

function jsonToXml(val: any, rootName = "root"): string {
  function toXmlHelper(obj: any): string {
    if (obj === null) return "";
    if (typeof obj !== "object") return String(obj);
    let xml = "";
    if (Array.isArray(obj)) {
      for (const item of obj) {
        xml += `<item>${toXmlHelper(item)}</item>`;
      }
    } else {
      for (const [key, value] of Object.entries(obj)) {
        const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "");
        xml += `<${safeKey}>${toXmlHelper(value)}</${safeKey}>`;
      }
    }
    return xml;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n${toXmlHelper(val).split("><").join(">\n<")}\n</${rootName}>`;
}

function jsonToYaml(val: any, indent = 0): string {
  if (val === null) return "null";
  if (typeof val !== "object") return String(val);
  const spacing = " ".repeat(indent);
  
  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    let yaml = "";
    for (const item of val) {
      if (typeof item === "object" && item !== null) {
        yaml += `\n${spacing}- ${jsonToYaml(item, indent + 2).trim()}`;
      } else {
        yaml += `\n${spacing}- ${jsonToYaml(item, indent)}`;
      }
    }
    return yaml;
  }

  let yaml = "";
  for (const [key, value] of Object.entries(val)) {
    if (typeof value === "object" && value !== null) {
      yaml += `\n${spacing}${key}:${jsonToYaml(value, indent + 2)}`;
    } else {
      yaml += `\n${spacing}${key}: ${jsonToYaml(value, indent)}`;
    }
  }
  return yaml;
}

/* ─── main component ─── */

type TabType = "tree" | "typescript" | "go" | "python" | "xml" | "yaml";

const DEFAULT_JSON = JSON.stringify(
  {
    firstName: "John",
    lastName: "Smith",
    gender: "man",
    age: 32,
    address: {
      streetAddress: "21 2nd Street",
      city: "New York",
      state: "NY",
      postalCode: "10021",
    },
    phoneNumbers: [
      { type: "home", number: "212 555-1234" },
      { type: "fax", number: "646 555-4567" },
    ],
  },
  null,
  2,
);

export default function JsonViewerWorkspace({ defaultInput }: JsonViewerWorkspaceProps) {
  const t = useWorkspaceTranslation();
  const [raw, setRaw] = useState(defaultInput ?? DEFAULT_JSON);
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["root"]));
  const [activeTab, setActiveTab] = useState<TabType>("tree");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const result: JsonParseResult = useMemo(() => parseJsonToTree(raw), [raw]);

  // Initial client-side sync from localStorage & dynamic tab detection to avoid SSR mismatches
  useEffect(() => {
    try {
      const saved = localStorage.getItem("zeelancebox_json_raw");
      if (saved) setRaw(saved);

      const path = window.location.pathname;
      if (path.includes("json-to-typescript")) setActiveTab("typescript");
      else if (path.includes("json-to-go")) setActiveTab("go");
      else if (path.includes("json-to-python")) setActiveTab("python");
      else if (path.includes("json-to-xml")) setActiveTab("xml");
      else if (path.includes("json-to-yaml")) setActiveTab("yaml");
    } catch (_) {}
  }, []);

  // Debounced auto-saving and telemetry loop
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem("zeelancebox_json_raw", raw);
      } catch (_) {}

      if (raw && raw !== DEFAULT_JSON) {
        if (result.success) {
          trackToolEvent("json-formatter", "success", { fileSizeBytes: raw.length });
        } else {
          trackToolEvent("json-formatter", "error", { errorMessage: result.error || "Invalid JSON" });
        }
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [raw, result]);

  const childrenMap = useMemo(() => {
    const m = new Map<string, JsonTreeNode[]>();
    if (result.success) {
      for (const node of result.tree) {
        if (node.parent === "") continue;
        const existing = m.get(node.parent) ?? [];
        existing.push(node);
        m.set(node.parent, existing);
      }
    }
    return m;
  }, [result]);

  const searchMatches = useMemo(() => {
    if (!searchQuery || !result.success) return new Set<string>();
    return searchTree(result.tree, searchQuery);
  }, [searchQuery, result]);

  // Auto-expand search matches
  useMemo(() => {
    if (searchQuery && searchMatches.size > 0) {
      setExpanded((prev) => {
        const next = new Set(prev);
        for (const id of searchMatches) next.add(id);
        return next;
      });
    }
  }, [searchQuery, searchMatches]);

  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    if (result.success) setExpanded(new Set(result.tree.map((n) => n.id)));
  }, [result]);

  const collapseAll = useCallback(() => {
    setExpanded(new Set(["root"]));
  }, []);

  const handleFileLoad = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") setRaw(text);
    };
    reader.readAsText(file);
  }, []);

  const handleCopy = useCallback(() => {
    if (result.success) {
      navigator.clipboard.writeText(JSON.stringify(JSON.parse(raw), null, 2));
    }
  }, [result, raw]);

  const handleClipboardPaste = useCallback(() => {
    navigator.clipboard.readText().then((text) => setRaw(text));
  }, []);

  const convertedCode = useMemo(() => {
    if (!result.success) return "";
    try {
      const parsed = JSON.parse(raw);
      switch (activeTab) {
        case "typescript":
          return jsonToTypeScript(parsed);
        case "go":
          return jsonToGo(parsed);
        case "python":
          return "from dataclasses import dataclass\nfrom typing import Any, List\n\n" + jsonToPython(parsed);
        case "xml":
          return jsonToXml(parsed);
        case "yaml":
          return jsonToYaml(parsed).trim();
        default:
          return "";
      }
    } catch (_) {
      return "";
    }
  }, [raw, result.success, activeTab]);

  return (
    <div className="space-y-4">
      {/* Search + Actions row */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[200px]">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none"
            fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("search_placeholder", "Search keys and values...")}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-surface-elevated text-sm text-ink placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
          />
        </div>

        <div className="flex gap-1.5">
          <button onClick={expandAll} className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-ink-secondary hover:bg-zinc-50 active:scale-[0.97] transition-all cursor-pointer">
            {t("expand_all", "Expand all")}
          </button>
          <button onClick={collapseAll} className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-ink-secondary hover:bg-zinc-50 active:scale-[0.97] transition-all cursor-pointer">
            {t("collapse_all", "Collapse all")}
          </button>
        </div>
      </div>

      {/* Split view: editor left / tree right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor panel */}
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-50/60 border-b border-border">
            <span className="text-xs font-medium text-ink-muted uppercase tracking-wider">{t("editor", "Editor")}</span>
            <div className="flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                </svg>
                {t("load_file", "Load file")}
              </button>
              <button
                onClick={handleClipboardPaste}
                className="flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
                {t("paste", "Paste")}
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                {t("copy_btn", "Copy")}
              </button>
            </div>
          </div>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={t("placeholder", "Paste your raw JSON code here...")}
            className="w-full h-[400px] lg:h-[520px] p-4 font-mono text-sm text-ink bg-surface-elevated resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>

        {/* Tree viewer / Converter panel */}
        <div className="rounded-xl border border-border overflow-hidden flex flex-col">
          <div className="flex flex-wrap items-center justify-between px-4 py-1.5 bg-zinc-50/60 border-b border-border gap-2">
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setActiveTab("tree")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === "tree" ? "bg-accent text-white dark:text-black" : "text-ink-muted hover:text-ink"
                }`}
              >
                Tree View
              </button>
              <button
                onClick={() => setActiveTab("typescript")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === "typescript" ? "bg-accent text-white dark:text-black" : "text-ink-muted hover:text-ink"
                }`}
              >
                TS Interface
              </button>
              <button
                onClick={() => setActiveTab("go")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === "go" ? "bg-accent text-white dark:text-black" : "text-ink-muted hover:text-ink"
                }`}
              >
                Go Struct
              </button>
              <button
                onClick={() => setActiveTab("python")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === "python" ? "bg-accent text-white dark:text-black" : "text-ink-muted hover:text-ink"
                }`}
              >
                Python Class
              </button>
              <button
                onClick={() => setActiveTab("xml")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === "xml" ? "bg-accent text-white dark:text-black" : "text-ink-muted hover:text-ink"
                }`}
              >
                XML
              </button>
              <button
                onClick={() => setActiveTab("yaml")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === "yaml" ? "bg-accent text-white dark:text-black" : "text-ink-muted hover:text-ink"
                }`}
              >
                YAML
              </button>
            </div>
            {result.success && activeTab === "tree" && (
              <div className="hidden sm:flex items-center gap-3 text-xs text-ink-muted">
                <span>{t("stats_nodes", "{count} nodes").replace("{count}", String(result.stats.nodeCount))}</span>
                <span>{t("stats_depth", "depth {depth}").replace("{depth}", String(result.stats.depth))}</span>
              </div>
            )}
          </div>

          <div className="h-[400px] lg:h-[520px] overflow-auto p-2 bg-surface-elevated font-mono text-sm relative">
            {!result.success ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-red-500">{result.error ? t("invalid_status", "Invalid JSON: {error}").replace("{error}", result.error) : t("invalid_json", "Invalid JSON")}</p>
              </div>
            ) : activeTab === "tree" ? (
              result.tree.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-zinc-400">{t("empty_prompt", "Paste JSON to view the tree")}</p>
                </div>
              ) : (
                <div className="space-y-0 p-2">
                  {childrenMap.get("root")?.map((child) => (
                    <TreeNodeRow
                      key={child.id}
                      node={child}
                      childrenMap={childrenMap}
                      expanded={expanded}
                      toggle={toggleExpand}
                      highlightText={searchQuery}
                    />
                  ))}
                </div>
              )
            ) : (
              <div className="h-full flex flex-col">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => navigator.clipboard.writeText(convertedCode)}
                    className="px-2.5 py-1.5 rounded-lg bg-surface hover:bg-zinc-100 border border-border text-xs font-semibold text-ink-secondary hover:text-ink flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                    </svg>
                    Copy Output
                  </button>
                </div>
                <textarea
                  readOnly
                  value={convertedCode}
                  placeholder="Output code will appear here..."
                  className="w-full h-full p-4 pr-16 bg-transparent resize-none font-mono text-sm text-ink-secondary focus:outline-none leading-relaxed"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        className="hidden"
        onChange={handleFileLoad}
      />
    </div>
  );
}