# 🔒 ZeroWebTools

**🔗 [Try it live at zerowebtools.com](https://zerowebtools.com)** &nbsp;|&nbsp; [Report a Bug](https://github.com/zeeshan1112/zerowebtools/issues) &nbsp;|&nbsp; MIT License

[![Live](https://img.shields.io/website?url=https%3A%2F%2Fzerowebtools.com&label=zerowebtools.com)](https://zerowebtools.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/zeeshan1112/zerowebtools/compare)

> **Zero Server Uploads. Zero Latency. Zero Tracking. 100% Client-Side Browser Execution.**

**ZeroWebTools** is a premium, locally-first, open-source suite of secure web tools designed for developers, creators, and modern builders. Crafted in a **Swiss Minimalist** design language (grayscale accents, modular typography, and spacious layouts), the platform runs entirely inside the user's browser sandbox context using WebAssembly (WASM) and client-side JavaScript.

No files, raw bytes, or user data are ever uploaded, processed, or cached on any remote servers—guaranteeing **absolute privacy** and **instantaneous offline execution**.

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

```
zerowebtools/
├── apps/
│   └── web/                # Next.js 15 App (Static Export, Page Routing)
└── packages/
    └── tools-core/         # Core library (growth math, converters, utilities)
```

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
npm run build:web
```

### PDFJS Static Assets

For scanned PDF processing (JPEG 2000 decoders), copy the worker and WASM assets:

```bash
cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs apps/web/public/pdf.worker.min.js
mkdir -p apps/web/public/wasm
cp node_modules/pdfjs-dist/wasm/* apps/web/public/wasm/
```

---

## 🧪 Testing

```bash
npm run test            # All tests (Unit + E2E)
npm run test:unit       # Vitest unit tests only
npm run test:e2e        # Playwright E2E tests (requires Chrome)
```

---

## 🔒 Security Architecture

```
User File → Browser Canvas/Memory → Local WASM/JS Processing → Same-Origin Blob Download
                 │                                      │
                 └── Files never leave the browser ──────┘
```

- **Zero Server Streams** — Files never exit the browser's execution context
- **Isolated Web Workers** — Heavy decoders run in background sandboxes
- **Blob URL Downloads** — Temporary links self-destruct on tab close

---

## ⚡ Tech Stack

- **React 19** & **Next.js 15** (App Router, Static Export)
- **Tailwind CSS** with grayscale design token theme
- **Framer Motion** for page transitions and micro-interactions
- **pdf-lib** (binary stream writer) & **pdfjs-dist** (canvas page renderer)
- **@pdfsmaller/pdf-encrypt-lite** for browser-standard PDF encryption

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