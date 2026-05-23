/**
 * JSON Tree Node — each parsed JSON value becomes one node in the tree.
 */
export interface JsonTreeNode {
  /** Unique path within the tree, e.g. "root.address.city" or "root.0" */
  id: string;
  /** The object key this node belongs to (empty for array items) */
  key: string;
  /** Human-readable value string */
  value: string;
  /** JavaScript typeof result for value */
  type: "string" | "number" | "boolean" | "null" | "object" | "array" | "undefined";
  /** Depth level (0 = root) */
  depth: number;
  /** Whether this node can be expanded (object/array with children) */
  expandable: boolean;
  /** Number of direct children */
  childCount: number;
  /** Children node IDs (for tree traversal) */
  children: string[];
  /** The parent node ID, empty string for root */
  parent: string;
}

export interface JsonParseResult {
  success: boolean;
  tree: JsonTreeNode[];
  rootId: string;
  error?: string;
  stats: {
    charCount: number;
    lineCount: number;
    nodeCount: number;
    depth: number;
  };
}

type RawJson = Record<string, unknown> | unknown[] | string | number | boolean | null | undefined;

function getType(val: unknown): JsonTreeNode["type"] {
  if (val === null) return "null";
  if (Array.isArray(val)) return "array";
  return typeof val as JsonTreeNode["type"];
}

function formatValue(val: unknown): string {
  if (val === null) return "null";
  if (typeof val === "string") return `"${val}"`;
  if (typeof val === "boolean" || typeof val === "number") return String(val);
  if (Array.isArray(val)) return `Array(${val.length})`;
  if (typeof val === "object") return `{${Object.keys(val).length} keys}`;
  return String(val);
}

function buildTree(
  val: any,
  parentId: string,
  key: string,
  depth: number,
  counter: { idx: number },
): [JsonTreeNode[], string] {
  const idx = counter.idx++;
  const id = parentId ? `${parentId}.${key || idx}` : "root";
  const type = getType(val);
  const expandable = type === "object" || type === "array";
  const childIds: string[] = [];

  const node: JsonTreeNode = {
    id,
    key,
    value: formatValue(val),
    type,
    depth,
    expandable,
    childCount: 0,
    children: childIds,
    parent: parentId,
  };

  const allNodes: JsonTreeNode[] = [node];

  if (type === "object" && val !== null && typeof val === "object" && !Array.isArray(val)) {
    const entries = Object.entries(val as Record<string, unknown>);
    node.childCount = entries.length;
    for (const [k, v] of entries) {
      const [childNodes] = buildTree(v, id, k, depth + 1, counter);
      const firstChild = childNodes[0];
      childIds.push(firstChild.id);
      node.children = childIds;
      allNodes.push(...childNodes);
    }
  } else if (type === "array" && Array.isArray(val)) {
    node.childCount = val.length;
    for (let i = 0; i < val.length; i++) {
      const [childNodes] = buildTree(val[i], id, String(i), depth + 1, counter);
      const firstChild = childNodes[0];
      childIds.push(firstChild.id);
      node.children = childIds;
      allNodes.push(...childNodes);
    }
  }

  return [allNodes, id];
}

function maxDepth(tree: JsonTreeNode[], rootId: string): number {
  const map = new Map(tree.map((n) => [n.id, n]));
  let max = 0;
  for (const node of tree) {
    if (node.id !== rootId) {
      let d = 0;
      let cur = node.parent;
      while (cur && map.has(cur)) {
        d++;
        cur = map.get(cur)!.parent;
      }
      if (d > max) max = d;
    }
  }
  return max;
}

/**
 * Parse raw JSON string into a hierarchical tree of JsonTreeNode objects.
 * All processing is stateless — zero DOM dependencies.
 */
export function parseJsonToTree(raw: string): JsonParseResult {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) {
    return {
      success: false,
      tree: [],
      rootId: "",
      error: "Input is empty.",
      stats: { charCount: 0, lineCount: 0, nodeCount: 0, depth: 0 },
    };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch (err: unknown) {
    return {
      success: false,
      tree: [],
      rootId: "",
      error: err instanceof Error ? err.message : "Invalid JSON.",
      stats: { charCount: trimmed.length, lineCount: trimmed.split("\n").length, nodeCount: 0, depth: 0 },
    };
  }

  const [tree, rootId] = buildTree(parsed, "", "", 0, { idx: 0 });
  const depth = maxDepth(tree, rootId);

  return {
    success: true,
    tree,
    rootId,
    stats: {
      charCount: trimmed.length,
      lineCount: trimmed.split("\n").length,
      nodeCount: tree.length,
      depth,
    },
  };
}

/**
 * Search the tree for nodes whose key or value contains the query string (case-insensitive).
 */
export function searchTree(tree: JsonTreeNode[], query: string): Set<string> {
  const q = query.toLowerCase();
  const matched = new Set<string>();

  for (const node of tree) {
    if (node.key.toLowerCase().includes(q) || node.value.toLowerCase().includes(q)) {
      matched.add(node.id);
      // Also mark all ancestors so the path is visible
      let cur = node.parent;
      while (cur) {
        matched.add(cur);
        const parent = tree.find((n) => n.id === cur);
        if (!parent) break;
        cur = parent.parent;
      }
    }
  }
  return matched;
}

/**
 * Get the flat path string for a node (e.g. "root.address.city").
 */
export function getNodePath(tree: JsonTreeNode[], id: string): string {
  const parts: string[] = [];
  let cur = tree.find((n) => n.id === id);
  while (cur && cur.id !== "root") {
    parts.unshift(cur.key);
    const parentId = cur.parent;
    cur = tree.find((n) => n.id === parentId);
  }
  return parts.join(".") || ".";
}