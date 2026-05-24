<div align="center">
  <img src="logo.png" alt="ZeroWebTools" width="64" height="64" />
  <h1>ZeroWebTools</h1>
  <p><strong>Zero Server Uploads. Zero Latency. Zero Tracking.</strong></p>
  <p>100% client-side browser tools for PDF, images, data, and finance.</p>
  <p>
    <a href="https://zerowebtools.com"><strong>🔗 Try it live</strong></a>
    &nbsp;·&nbsp;
    <a href="https://github.com/zeeshan1112/zerowebtools/issues">Report a Bug</a>
  </p>
  <p>
    <img src="https://img.shields.io/website?url=https%3A%2F%2Fzerowebtools.com&label=zerowebtools.com" alt="Live" />
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
    <img src="https://img.shields.io/badge/Next.js-15-black" alt="Next.js" />
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
  </p>
</div>

---

## 🛠️ The Tool Suite

### PDF Suite Pro (11 tools)
| Tool | What It Does |
|------|-------------|
| **Merge PDF** | Combine multiple PDFs into a single document with drag-and-drop reordering |
| **Split PDF** | Extract specific pages or split ranges cleanly into new documents |
| **Compress PDF** | Reduce file size up to 90% with three compression levels |
| **Rotate PDF** | Rotate pages by 90, 180, or 270 degrees |
| **PDF to JPG** | Render PDF pages as high-resolution JPEG images |
| **JPG to PDF** | Combine images into a PDF with adjustable page size and margins |
| **Protect PDF** | Add 128-bit password encryption and permission locks |
| **Unlock PDF** | Remove password protection from files you own |
| **Organize PDF** | Drag-and-drop page reorder, rotation, and deletion |
| **Watermark PDF** | Stamp custom text (CONFIDENTIAL, DRAFT) with opacity, scale, and angle controls |
| **Page Numbers** | Insert page numbers with custom position, font, and formatting |

### Developer Utilities
| Tool | What It Does |
|------|-------------|
| **JSON Formatter** | Validate, beautify, minify, and explore JSON with a live tree view and syntax highlighting |
| **Case Converter** | Transform between camelCase, snake_case, kebab-case, PascalCase, CONSTANT_CASE |

### Creative & Format Tools
| Tool | What It Does |
|------|-------------|
| **HEIC Converter** | Convert Apple HEIC photos to JPG or PNG with batch upload and ZIP download |
| **Bulk Image Resizer** | Resize, compress, and convert multiple images at once *(coming soon)* |

### Growth & Financial Modelers
| Tool | What It Does |
|------|-------------|
| **SaaS MRR Projections** | Forecast monthly recurring revenue, churn, and customer lifetime value with interactive charts |
| **Equity Vesting Modeler** | Calculate employee option vesting schedules, dilution curves, and stock valuations |

---

## ✨ Key Pillars

1. **Absolute Privacy & Sandboxing** — All processing runs completely in the browser. No server uploads, ever.
2. **Swiss Minimalist Aesthetic** — Grayscale design tokens, dash-bordered grids, premium micro-interactions.
3. **High-Performance WebAssembly** — Client-side decoders for JPEG 2000 (`/JPXDecode`) streams and complex document formats.
4. **Instant Offline Speed** — Loads in milliseconds. Works without a network connection.

---

## 📦 Monorepo Architecture

ZeroWebTools is structured as an **npm workspaces monorepo**. This isn't just organizational preference — it solves real problems:

### Why a Monorepo?

- **Shared Type Safety** — The `@hub/tools-core` package exports TypeScript interfaces and pure functions that the web app imports directly. When a core function signature changes, the build fails at compile time across both packages — no silently broken integrations.
- **Single Source of Truth** — Business logic (JSON parsing, case conversion, financial formulas) lives in `packages/tools-core`, not duplicated in UI components. The web app consumes these as a workspace dependency (`"@hub/tools-core": "*"`) without publishing to npm.
- **Atomic Commits** — A change to how PDF compression works touches both the core library and the UI that renders it. In a monorepo, that's one PR. In a polyrepo, it's coordinated releases across two repos.
- **Fast Local Development** — Workspace dependencies resolve instantly via symlinks. No `npm link` dance, no publishing-canary-versions-to-test-locally.

### Directory Structure

```
zerowebtools/
├── apps/
│   └── web/                    # Next.js 15 — UI, routing, static export
│       ├── src/
│       │   ├── app/            # App Router pages (tools/[toolId], privacy, terms)
│       │   ├── components/     # React workspaces (MergePDF, HEIC converter, etc.)
│       │   └── lib/            # Tool registry, icons, shared utilities
│       └── public/             # Static assets (logo, WASM, PDF worker)
├── packages/
│   └── tools-core/             # @hub/tools-core — pure TypeScript, no React
│       └── src/
│           ├── jsonFormatter.ts        # JSON validation & tree-walking engine
│           ├── caseConverter.ts        # camelCase ↔ snake_case ↔ kebab-case
│           └── index.ts               # Public API barrel export
├── tests/                      # Playwright E2E specs
├── package.json                # Root workspace config (npm workspaces)
└── vitest.config.ts            # Unit test runner
```

### How Workspace Dependencies Work

The root `package.json` declares `"workspaces": ["apps/*", "packages/*"]`. The web app (`@hub/web`) lists `@hub/tools-core` as a dependency — npm resolves this directly to the local `packages/tools-core` directory via symlink. No npm publish step needed. Changes to `tools-core` are immediately available to the web app after `npm run build:tools-core`.

```
@hub/web (Next.js app)
  └── imports @hub/tools-core
        ├── jsonFormatter    →  JSON validation & beautification engine
        ├── caseConverter    →  Multi-format text transformation
        └── index            →  Barrel export of all public APIs
```

---

## 🔧 Setup & Development

### Quick Start

```bash
git clone https://github.com/zeeshan1112/zerowebtools.git
cd zerowebtools
npm install
npm run dev:web
```

Open [http://localhost:3000](http://localhost:3000) to start using the tools.

### Build for Production

```bash
npm run build:web          # Static export to apps/web/out/
```

### PDFJS Static Assets

For scanned PDF processing (JPEG 2000 decoders), copy the worker and WASM assets:

```bash
cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs apps/web/public/pdf.worker.min.js
mkdir -p apps/web/public/wasm
cp node_modules/pdfjs-dist/wasm/* apps/web/public/wasm/
```

### Available Scripts

| Command | What It Does |
|---------|-------------|
| `npm run dev:web` | Start Next.js dev server on localhost:3000 |
| `npm run build:web` | Production build + static export |
| `npm run build:tools-core` | Compile `@hub/tools-core` TypeScript |
| `npm run test` | Run all tests (Vitest unit + Playwright E2E) |
| `npm run test:unit` | Vitest unit tests only |
| `npm run test:e2e` | Playwright E2E tests (requires Chrome) |
| `npm run lint` | Lint all workspace packages |
| `npm run typecheck` | Type-check all workspace packages |

---

## 🔒 Security Architecture

```
User File → Browser Canvas/Memory → Local WASM/JS Processing → Same-Origin Blob Download
                  │                                      │
                  └── Files never leave the browser ──────┘
```

- **Zero Server Streams** — Files never exit the browser's execution context
- **Isolated Web Workers** — Heavy decoders run in background sandboxes of the same origin
- **Blob URL Downloads** — Temporary links self-destruct on tab close

---

## ⚡ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **React 19** & **Next.js 15** (App Router, Static Export) |
| Styling | **Tailwind CSS 4** with grayscale design token theme |
| Motion | **Framer Motion** for page transitions and micro-interactions |
| PDF Engine | **pdf-lib** (binary stream writer) & **pdfjs-dist** (canvas page renderer, WASM) |
| Encryption | **@pdfsmaller/pdf-encrypt-lite** for 128-bit browser-standard PDF encryption |
| Core Library | **@hub/tools-core** — pure TypeScript, zero React dependency |
| Testing | **Vitest** (unit) & **Playwright** (E2E against real Chrome) |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

Bug reports and feature requests are welcome at [GitHub Issues](https://github.com/zeeshan1112/zerowebtools/issues).

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.