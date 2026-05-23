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

export async function renderPDFPageToJPG(
  file: File,
  pageIndex: number,
  quality = 0.9,
): Promise<Blob> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.449/build/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(pageIndex + 1);
  const viewport = page.getViewport({ scale: 2 });

  const canvas = new OffscreenCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext("2d")!;
  await page.render({ canvasContext: ctx as any, viewport } as any).promise;

  return canvas.convertToBlob({ type: "image/jpeg", quality });
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