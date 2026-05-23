import { PDFDocument, PDFImage, StandardFonts, rgb, PageSizes } from "pdf-lib";

export async function loadPDFDoc(file: File, password?: string): Promise<PDFDocument> {
  const arrayBuffer = await file.arrayBuffer();
  return PDFDocument.load(arrayBuffer, password ? { password } as any : undefined);
}

export async function savePDFDoc(doc: PDFDocument): Promise<Blob> {
  const bytes = await doc.save();
  return new Blob([bytes as any], { type: "application/pdf" });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
}

/** Render a single PDF page to a Blob at the given scale (1 = 72dpi). */
export async function renderPDFPageToJPG(
  file: File,
  pageIndex: number,
  quality = 0.9,
  scale = 2,
): Promise<Blob> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/build/pdf.worker.min.mjs";

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({
    data: arrayBuffer,
    cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/standard_fonts/",
  }).promise;
  const page = await pdf.getPage(pageIndex + 1);
  let viewport = page.getViewport({ scale });

  // Safeguard: Limit max dimension to 1200px to prevent canvas OOM / empty rendering
  const maxDim = 1200;
  if (viewport.width > maxDim || viewport.height > maxDim) {
    const factor = maxDim / Math.max(viewport.width, viewport.height);
    viewport = page.getViewport({ scale: scale * factor });
  }

  const canvas = document.createElement("canvas");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  const ctx = canvas.getContext("2d")!;

  // Paint solid white background to ensure transparent pages/images render properly when saved as JPEG
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext: ctx as any, viewport } as any).promise;

  return new Promise((resolve) => canvas.toBlob((b) => resolve(b!), "image/jpeg", quality));
}

/** Render page 1 of a PDF as a small thumbnail data URL. */
export async function renderPDFThumbnail(file: File): Promise<string> {
  try {
    const blob = await renderPDFPageToJPG(file, 0, 0.8, 0.6);
    return URL.createObjectURL(blob);
  } catch {
    return ""; // Silently fail — thumbnail is cosmetic
  }
}

/** Render ALL pages of a PDF as an array of data URLs for preview. */
export async function renderAllPDFPages(file: File | Blob, scale = 1.5): Promise<string[]> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/build/pdf.worker.min.mjs";

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({
    data: arrayBuffer,
    cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@5.7.284/standard_fonts/",
  }).promise;
  const pages: string[] = [];

  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    let viewport = page.getViewport({ scale });

    // Safeguard: Limit max dimension to 1200px to prevent canvas OOM / empty rendering
    const maxDim = 1200;
    if (viewport.width > maxDim || viewport.height > maxDim) {
      const factor = maxDim / Math.max(viewport.width, viewport.height);
      viewport = page.getViewport({ scale: scale * factor });
    }

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;

    // Paint solid white background to ensure transparent pages/images render properly when saved as JPEG
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({ canvasContext: ctx as any, viewport } as any).promise;
    const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.9));
    pages.push(URL.createObjectURL(blob));
  }

  return pages;
}

export async function loadImageToPDF(doc: PDFDocument, file: File): Promise<PDFImage> {
  const bytes = await file.arrayBuffer();
  if (file.type === "image/png") return doc.embedPng(bytes);
  if (file.type === "image/jpeg" || file.type === "image/jpg") return doc.embedJpg(bytes);
  return doc.embedJpg(bytes);
}

export function getFilename(tool: string, original?: string): string {
  const base = original?.replace(/\.[^.]+$/, "") ?? "document";
  const map: Record<string, string> = {
    "pdf-merge": "merged.pdf",
    "pdf-split": "split.zip",
    "pdf-compress": `${base}-compressed.pdf`,
    "pdf-rotate": `${base}-rotated.pdf`,
    "pdf-to-jpg": `${base}.zip`,
    "jpg-to-pdf": `${base}.pdf`,
    "pdf-protect": `${base}-protected.pdf`,
    "pdf-unlock": `${base}-unlocked.pdf`,
    "pdf-watermark": `${base}-watermarked.pdf`,
    "pdf-page-numbers": `${base}-numbered.pdf`,
    "pdf-organize": `${base}-organized.pdf`,
  };
  return map[tool] ?? "output.pdf";
}

export { PDFDocument, StandardFonts, rgb, PageSizes };