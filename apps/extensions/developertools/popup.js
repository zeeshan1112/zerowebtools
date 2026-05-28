/**
 * popup.js - ZeroWebTools Chrome Extension
 * 
 * Intercepts UI events and binds them to the shared @hub/tools-core logic.
 */

import {
  formatJSON,
  minifyJSON,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  toPascalCase,
  computeLineDiff,
  decodeJwtToken,
  encodeBase64,
  decodeBase64,
  encodeUrlString,
  decodeUrlString,
  parseJsonToTree
} from "@hub/tools-core";

document.addEventListener("DOMContentLoaded", () => {
  // --- Tab Switching Logic ---
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      
      tab.classList.add("active");
      const targetPanel = document.getElementById(tab.getAttribute("data-panel"));
      if (targetPanel) targetPanel.classList.add("active");
    });
  });

  // --- Copy to Clipboard Helper ---
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        // Output might be text content or value (for input/textarea)
        const textToCopy = targetEl.value !== undefined ? targetEl.value : targetEl.textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
          const originalText = btn.textContent;
          btn.textContent = "Copied!";
          btn.style.color = "var(--success)";
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.color = "";
          }, 1500);
        });
      }
    });
  });

  // --- JSON Formatter & Tree Explorer ---
  const jsonInput = document.getElementById("json-input");
  const jsonTreeContainer = document.getElementById("json-tree-container");
  const jsonCopyBtn = document.getElementById("json-copy-btn");
  let latestFormattedJson = "";

  // Recursively render a JSON tree node
  function renderTreeNode(node, nodeMap) {
    const container = document.createElement("div");
    container.className = "tree-node-wrapper";

    const row = document.createElement("div");
    row.className = "tree-row";
    
    // Shift indent relative to children rendering (depth * 12px)
    const indent = node.depth * 12;
    row.style.paddingLeft = indent + "px";

    // Toggle arrow
    const arrow = document.createElement("span");
    arrow.className = "tree-arrow";
    if (node.expandable) {
      arrow.innerHTML = `<svg width="6" height="6" viewBox="0 0 10 10" fill="currentColor"><path d="M3 1l5 4-5 4V1z" /></svg>`;
    }
    row.appendChild(arrow);

    // Key
    if (node.key !== "") {
      const keySpan = document.createElement("span");
      keySpan.className = "tree-key";
      keySpan.textContent = node.key;
      row.appendChild(keySpan);

      const colon = document.createElement("span");
      colon.style.color = "var(--ink-muted)";
      colon.textContent = ":";
      row.appendChild(colon);
    }

    // Value/Bracket preview
    const valSpan = document.createElement("span");
    valSpan.className = `tree-val-${node.type}`;
    valSpan.setAttribute("data-type", node.type);
    valSpan.setAttribute("data-count", node.childCount);
    
    if (node.expandable) {
      valSpan.classList.add("tree-val-bracket");
      valSpan.textContent = node.type === "array" ? `[${node.childCount}]` : `{${node.childCount}}`;
    } else {
      valSpan.textContent = node.value;
    }
    row.appendChild(valSpan);
    container.appendChild(row);

    // Child elements
    if (node.expandable && node.children.length > 0) {
      const childrenContainer = document.createElement("div");
      childrenContainer.className = "tree-children";

      node.children.forEach(childId => {
        const childNode = nodeMap.get(childId);
        if (childNode) {
          childrenContainer.appendChild(renderTreeNode(childNode, nodeMap));
        }
      });
      container.appendChild(childrenContainer);

      // Expand/Collapse event listener
      row.addEventListener("click", (e) => {
        e.stopPropagation();
        const currentlyExpanded = childrenContainer.classList.contains("expanded");
        if (currentlyExpanded) {
          childrenContainer.classList.remove("expanded");
          arrow.classList.remove("expanded");
          valSpan.style.display = "";
          valSpan.textContent = node.type === "array" ? `[${node.childCount}]` : `{${node.childCount}}`;
        } else {
          childrenContainer.classList.add("expanded");
          arrow.classList.add("expanded");
          valSpan.style.display = "none";
        }
      });
    }

    return container;
  }

  // Parse input JSON and refresh the tree view
  const updateTreeView = () => {
    const val = jsonInput.value.trim();
    if (!val) {
      jsonTreeContainer.textContent = "Interactive tree explorer will appear here.";
      jsonTreeContainer.style.color = "var(--ink-muted)";
      latestFormattedJson = "";
      return;
    }

    const parseResult = parseJsonToTree(val);
    if (parseResult.success) {
      const nodeMap = new Map(parseResult.tree.map(n => [n.id, n]));
      jsonTreeContainer.innerHTML = "";
      
      const rootNode = nodeMap.get("root");
      if (rootNode) {
        // Cache formatted representation for copy button
        try {
          const res = formatJSON(val);
          if (res.success) latestFormattedJson = res.data;
        } catch (_) {}

        // Render root brackets if expandable (object/array)
        if (rootNode.expandable) {
          const openBracket = document.createElement("div");
          openBracket.className = "tree-row";
          openBracket.style.color = "var(--ink-muted)";
          openBracket.style.fontWeight = "600";
          openBracket.textContent = rootNode.type === "array" ? "[" : "{";
          jsonTreeContainer.appendChild(openBracket);

          const childrenContainer = document.createElement("div");
          childrenContainer.className = "tree-children expanded";
          
          if (rootNode.children.length > 0) {
            rootNode.children.forEach(childId => {
              const childNode = nodeMap.get(childId);
              if (childNode) {
                childrenContainer.appendChild(renderTreeNode(childNode, nodeMap));
              }
            });
          }
          jsonTreeContainer.appendChild(childrenContainer);

          const closeBracket = document.createElement("div");
          closeBracket.className = "tree-row";
          closeBracket.style.color = "var(--ink-muted)";
          closeBracket.style.fontWeight = "600";
          closeBracket.textContent = rootNode.type === "array" ? "]" : "}";
          jsonTreeContainer.appendChild(closeBracket);
        } else {
          // Primitive
          jsonTreeContainer.appendChild(renderTreeNode(rootNode, nodeMap));
        }
      }
      jsonTreeContainer.style.color = "var(--ink)";
    } else {
      jsonTreeContainer.textContent = "Invalid JSON: " + (parseResult.error || "Unknown error");
      jsonTreeContainer.style.color = "var(--error)";
      latestFormattedJson = "";
    }
  };

  // Bind real-time input parsing
  jsonInput.addEventListener("input", updateTreeView);

  document.getElementById("json-format").addEventListener("click", () => {
    try {
      const result = formatJSON(jsonInput.value);
      if (result.success) {
        // Cache formatted version, update output explorer, and keep input unchanged
        latestFormattedJson = result.data;
        updateTreeView();
      } else {
        jsonTreeContainer.textContent = "Invalid JSON: " + (result.error || "Unknown error");
        jsonTreeContainer.style.color = "var(--error)";
      }
    } catch (e) {
      jsonTreeContainer.textContent = "Invalid JSON: " + e.message;
      jsonTreeContainer.style.color = "var(--error)";
    }
  });

  document.getElementById("json-minify").addEventListener("click", () => {
    try {
      const result = minifyJSON(jsonInput.value);
      if (result.success) {
        // Cache minified version, render plain minified text, and keep input unchanged
        latestFormattedJson = result.data;
        jsonTreeContainer.innerHTML = `<pre style="white-space: pre-wrap; word-break: break-all; font-family: inherit; margin: 0; color: var(--ink);">${result.data}</pre>`;
        jsonTreeContainer.style.color = "var(--ink)";
      } else {
        jsonTreeContainer.textContent = "Invalid JSON: " + (result.error || "Unknown error");
        jsonTreeContainer.style.color = "var(--error)";
      }
    } catch (e) {
      jsonTreeContainer.textContent = "Invalid JSON: " + e.message;
      jsonTreeContainer.style.color = "var(--error)";
    }
  });

  document.getElementById("json-expand-all").addEventListener("click", () => {
    const wrappers = jsonTreeContainer.querySelectorAll(".tree-node-wrapper");
    wrappers.forEach(wrap => {
      const children = wrap.querySelector(".tree-children");
      const arrow = wrap.querySelector(".tree-arrow");
      const val = wrap.querySelector(".tree-val-bracket");
      if (children && arrow && val) {
        children.classList.add("expanded");
        arrow.classList.add("expanded");
        val.style.display = "none";
      }
    });
  });

  document.getElementById("json-collapse-all").addEventListener("click", () => {
    const wrappers = jsonTreeContainer.querySelectorAll(".tree-node-wrapper");
    wrappers.forEach(wrap => {
      const children = wrap.querySelector(".tree-children");
      const arrow = wrap.querySelector(".tree-arrow");
      const val = wrap.querySelector(".tree-val-bracket");
      if (children && arrow && val) {
        children.classList.remove("expanded");
        arrow.classList.remove("expanded");
        val.style.display = "";
        const nodeType = val.getAttribute("data-type");
        const childCount = val.getAttribute("data-count");
        val.textContent = nodeType === "array" ? `[${childCount}]` : `{${childCount}}`;
      }
    });
  });

  document.getElementById("json-clear").addEventListener("click", () => {
    jsonInput.value = "";
    jsonTreeContainer.textContent = "Interactive tree explorer will appear here.";
    jsonTreeContainer.style.color = "var(--ink-muted)";
    latestFormattedJson = "";
  });

  // Custom copy handler for JSON Formatter
  jsonCopyBtn.addEventListener("click", () => {
    const textToCopy = latestFormattedJson || jsonInput.value;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = jsonCopyBtn.textContent;
        jsonCopyBtn.textContent = "Copied!";
        jsonCopyBtn.style.color = "var(--success)";
        setTimeout(() => {
          jsonCopyBtn.textContent = originalText;
          jsonCopyBtn.style.color = "";
        }, 1500);
      });
    }
  });

  // Initial Tree render for default input
  updateTreeView();

  // --- Case Converter ---
  const caseInput = document.getElementById("case-input");
  const updateCases = () => {
    const val = caseInput.value || "hello world example";
    document.getElementById("out-camel").textContent = toCamelCase(val);
    document.getElementById("out-snake").textContent = toSnakeCase(val);
    document.getElementById("out-kebab").textContent = toKebabCase(val);
    document.getElementById("out-pascal").textContent = toPascalCase(val);
  };
  caseInput.addEventListener("input", updateCases);
  // init
  updateCases();

  // --- Diff Checker ---
  const diffOrig = document.getElementById("diff-original");
  const diffMod = document.getElementById("diff-modified");
  const diffOutput = document.getElementById("diff-output");

  document.getElementById("diff-analyze").addEventListener("click", () => {
    try {
      const rows = computeLineDiff(diffOrig.value, diffMod.value);
      diffOutput.innerHTML = "";
      
      rows.forEach(row => {
        // Since space is limited in popup, we render it inline (like Github unified diff)
        if (row.left && row.left.type === "removed") {
          const div = document.createElement("div");
          div.className = "diff-row removed";
          div.textContent = "- " + row.left.content;
          diffOutput.appendChild(div);
        }
        if (row.right && row.right.type === "added") {
          const div = document.createElement("div");
          div.className = "diff-row added";
          div.textContent = "+ " + row.right.content;
          diffOutput.appendChild(div);
        }
        if (row.left && row.left.type === "unchanged") {
          const div = document.createElement("div");
          div.className = "diff-row";
          div.textContent = "  " + row.left.content;
          diffOutput.appendChild(div);
        }
      });
      diffOutput.style.color = "var(--ink)";
    } catch (e) {
      diffOutput.textContent = e.message;
      diffOutput.style.color = "var(--error)";
    }
  });

  // --- JWT Debugger ---
  const jwtInput = document.getElementById("jwt-input");
  const jwtHeader = document.getElementById("jwt-header-text");
  const jwtPayload = document.getElementById("jwt-payload-text");
  const jwtSignature = document.getElementById("jwt-signature-text");

  jwtInput.addEventListener("input", () => {
    const token = jwtInput.value.trim();
    if (!token) {
      jwtHeader.textContent = "";
      jwtPayload.textContent = "";
      jwtSignature.textContent = "";
      return;
    }
    
    const result = decodeJwtToken(token);
    if (result.validFormat) {
      jwtHeader.textContent = JSON.stringify(result.header, null, 2);
      jwtHeader.style.color = "var(--ink)";
      jwtPayload.textContent = JSON.stringify(result.payload, null, 2);
      jwtPayload.style.color = "var(--ink)";
      jwtSignature.textContent = result.signature || "";
      jwtSignature.style.color = "var(--ink)";
    } else {
      jwtHeader.textContent = "Invalid Token";
      jwtHeader.style.color = "var(--error)";
      jwtPayload.textContent = result.error || "Malformed JWT structure";
      jwtPayload.style.color = "var(--error)";
      jwtSignature.textContent = "";
    }
  });

  // --- Base64 Cipher ---
  const base64Input = document.getElementById("base64-input");
  const base64Output = document.getElementById("base64-output-text");

  document.getElementById("base64-encode").addEventListener("click", () => {
    base64Output.textContent = encodeBase64(base64Input.value);
    base64Output.style.color = "var(--ink)";
  });

  document.getElementById("base64-decode").addEventListener("click", () => {
    try {
      base64Output.textContent = decodeBase64(base64Input.value);
      base64Output.style.color = "var(--ink)";
    } catch (e) {
      base64Output.textContent = "Invalid Base64 string.";
      base64Output.style.color = "var(--error)";
    }
  });

  // --- URL Encoder ---
  const urlInput = document.getElementById("url-input");
  const urlOutput = document.getElementById("url-output-text");

  document.getElementById("url-encode").addEventListener("click", () => {
    urlOutput.textContent = encodeUrlString(urlInput.value);
    urlOutput.style.color = "var(--ink)";
  });

  document.getElementById("url-decode").addEventListener("click", () => {
    try {
      urlOutput.textContent = decodeUrlString(urlInput.value);
      urlOutput.style.color = "var(--ink)";
    } catch (e) {
      urlOutput.textContent = "Invalid URL encoding.";
      urlOutput.style.color = "var(--error)";
    }
  });
});