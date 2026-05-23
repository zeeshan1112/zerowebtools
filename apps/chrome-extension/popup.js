// ZeelanceBox Chrome Extension — Popup Logic
// Imports computational core from @hub/tools-core via bundler (e.g., esbuild, Vite).
// In production, bundle this file with: esbuild popup.js --bundle --outfile=dist/popup.js
//   or:  npx vite build --config vite.extension.config.ts
//
// The import below resolves to ../../packages/tools-core/src/index.ts
// through the workspace dependency. A bundler step is required to produce
// a self-contained popup.js that inlines the pure logic functions.

import { formatJSON, minifyJSON, toCamelCase, toSnakeCase, toKebabCase, toPascalCase } from "@hub/tools-core";

// --- Tab Switching ---
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-panel");
    tabs.forEach((t) => t.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    const panel = document.getElementById(target ?? "");
    if (panel) panel.classList.add("active");
  });
});

// --- JSON Formatter Panel ---
const jsonInput = document.getElementById("json-input") as HTMLTextAreaElement;
const jsonOutput = document.getElementById("json-output") as HTMLDivElement;
const jsonFormatBtn = document.getElementById("json-format") as HTMLButtonElement;
const jsonMinifyBtn = document.getElementById("json-minify") as HTMLButtonElement;
const jsonClearBtn = document.getElementById("json-clear") as HTMLButtonElement;

jsonFormatBtn.addEventListener("click", () => {
  const result = formatJSON(jsonInput.value);
  jsonOutput.textContent = result.success ? result.data : `Error: ${result.error}`;
  jsonOutput.style.color = result.success ? "var(--ink-muted)" : "#dc2626";
});

jsonMinifyBtn.addEventListener("click", () => {
  const result = minifyJSON(jsonInput.value);
  jsonOutput.textContent = result.success ? result.data : `Error: ${result.error}`;
  jsonOutput.style.color = result.success ? "var(--ink-muted)" : "#dc2626";
});

jsonClearBtn.addEventListener("click", () => {
  jsonInput.value = "";
  jsonOutput.textContent = "Formatted output will appear here.";
  jsonOutput.style.color = "var(--ink-muted)";
});

// --- Case Converter Panel ---
const caseInput = document.getElementById("case-input") as HTMLTextAreaElement;
const outCamel = document.getElementById("out-camel") as HTMLOutputElement;
const outSnake = document.getElementById("out-snake") as HTMLOutputElement;
const outKebab = document.getElementById("out-kebab") as HTMLOutputElement;
const outPascal = document.getElementById("out-pascal") as HTMLOutputElement;

function updateCaseConversions() {
  const raw = caseInput.value;
  outCamel.textContent = toCamelCase(raw);
  outSnake.textContent = toSnakeCase(raw);
  outKebab.textContent = toKebabCase(raw);
  outPascal.textContent = toPascalCase(raw);
}

caseInput.addEventListener("input", updateCaseConversions);
updateCaseConversions();