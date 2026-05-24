"use client";

import React, { useState } from "react";
import { toCamelCase, toSnakeCase, toKebabCase } from "@hub/tools-core";

export default function CaseConverterWorkspace() {
  const [text, setText] = useState("hello world example");

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-ink" htmlFor="text-input">
        Input Text
      </label>
      <input
        id="text-input"
        type="text"
        className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        {[
          { label: "camelCase", value: toCamelCase(text) },
          { label: "snake_case", value: toSnakeCase(text) },
          { label: "kebab-case", value: toKebabCase(text) },
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
