"use client";
import React, { useState, useCallback, useRef } from "react";
import { loadPDFDoc, savePDFDoc, downloadBlob, formatBytes, getFilename, StandardFonts, rgb, PDFDocument } from "@/lib/pdf-utils";
import ProcessingOverlay from "./ProcessingOverlay";

const PROTECT_STEPS = [
  "Analyzing PDF catalog stream elements...",
  "Applying security flags & permission locks...",
  "Generating cryptographically secure key block...",
  "Outputting password-encrypted PDF payload...",
];

const UNLOCK_STEPS = [
  "Validating document security permissions...",
  "Removing standard encryption filters...",
  "Rebuilding plain catalog stream trees...",
  "Packaging unlocked output PDF...",
];

const WATERMARK_STEPS = [
  "Analyzing target page layouts...",
  "Calculating overlay coordinate matrices...",
  "Drawing vector watermark elements...",
  "Compiling watermarked document...",
];

const PAGINATE_STEPS = [
  "Reading page layout bounds...",
  "Generating page number layout stamps...",
  "Positioning labels on canvas grids...",
  "Compiling paginated output PDF...",
];

const ORGANIZE_STEPS = [
  "Analyzing page catalog structure...",
  "Re-ordering selected page nodes...",
  "Rebuilding internal document offsets...",
  "Compiling organized output PDF...",
];

function SZ({ onFile, label, accept }: { onFile: (f: File) => void; label: string; accept: string }) {
  const [drag, setDrag] = useState(false);
  return (
    <div onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) onFile(f); }} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} className={`rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all ${drag ? "border-accent bg-accent-surface" : "border-border hover:border-zinc-300 bg-surface-elevated"}`}>
      <input type="file" accept={accept} className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); e.target.value = ""; }} id="dp" />
      <label htmlFor="dp" className="cursor-pointer block"><div className="space-y-2"><div className="w-12 h-12 mx-auto rounded-xl bg-accent-surface flex items-center justify-center text-accent"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg></div><p className="text-sm font-medium text-ink">{label}</p></div></label>
    </div>
  );
}

export function ProtectPDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  const protect = useCallback(async () => {
    if (!file || !password) { setError("Enter a password"); return; }
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const { encryptPDF } = await import("@pdfsmaller/pdf-encrypt-lite");
      const arrayBuffer = await file.arrayBuffer();
      const encryptedBytes = await encryptPDF(new Uint8Array(arrayBuffer), password);
      const blob = new Blob([encryptedBytes as any], { type: "application/pdf" });
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        downloadBlob(blob, getFilename("pdf-protect", file.name));
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Encryption failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, password]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current && file) {
      downloadBlob(pendingBlobRef.current, getFilename("pdf-protect", file.name));
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file]);

  return (
    <div className="relative space-y-5">
      <SZ onFile={(f) => { setFile(f); setError(null); }} label="Drop a PDF to protect" accept=".pdf" />
      {file && <div className="space-y-4">
        <div className="text-sm"><span className="font-medium text-ink">{file.name}</span> <span className="text-ink-muted">{formatBytes(file.size)}</span></div>
        <div><label className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter a strong password" className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" /></div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button onClick={protect} disabled={processing} className="rounded-lg bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">{processing ? "Encrypting..." : "Protect PDF"}</button>
      </div>}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={PROTECT_STEPS}
        loadingText="Encrypting your PDF document..."
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}

export function UnlockPDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  const unlock = useCallback(async () => {
    if (!file || !password) { setError("Enter the password"); return; }
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const { decryptPDF } = await import("@pdfsmaller/pdf-decrypt");
      const arrayBuffer = await file.arrayBuffer();
      const decryptedBytes = await decryptPDF(new Uint8Array(arrayBuffer), password);
      const doc = await PDFDocument.load(decryptedBytes);
      const blob = await savePDFDoc(doc);
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        downloadBlob(blob, getFilename("pdf-unlock", file.name));
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Could not unlock. Check password.");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, password]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current && file) {
      downloadBlob(pendingBlobRef.current, getFilename("pdf-unlock", file.name));
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file]);

  return (
    <div className="relative space-y-5">
      <SZ onFile={(f) => { setFile(f); setError(null); }} label="Drop a protected PDF" accept=".pdf" />
      {file && <div className="space-y-4">
        <div className="text-sm"><span className="font-medium text-ink">{file.name}</span> <span className="text-ink-muted">{formatBytes(file.size)}</span></div>
        <div><label className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">Password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter the PDF password" className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" /></div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button onClick={unlock} disabled={processing} className="rounded-lg bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">{processing ? "Unlocking..." : "Unlock PDF"}</button>
      </div>}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={UNLOCK_STEPS}
        loadingText="Unlocking your PDF document..."
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}

export function WatermarkPDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [size, setSize] = useState(48);
  const [opacity, setOpacity] = useState(0.15);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  const water = useCallback(async () => {
    if (!file || !text) return;
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const doc = await loadPDFDoc(file);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        const diagonal = Math.sqrt(width * width + height * height);
        const angle = Math.atan2(height, width) * (180 / Math.PI);
        page.drawText(text, { x: width / 2, y: height / 2, size, font, color: rgb(0, 0, 0), opacity, rotate: { type: "degrees" as any, angle: -angle }, xSkew: { type: "degrees" as any, angle: 0 }, ySkew: { type: "degrees" as any, angle: 0 } });
      }
      const blob = await savePDFDoc(doc);
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        downloadBlob(blob, getFilename("pdf-watermark", file.name));
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Watermark failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, text, size, opacity]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current && file) {
      downloadBlob(pendingBlobRef.current, getFilename("pdf-watermark", file.name));
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file]);

  return (
    <div className="relative space-y-5">
      <SZ onFile={(f) => { setFile(f); setError(null); }} label="Drop a PDF to watermark" accept=".pdf" />
      {file && <div className="space-y-4">
        <div className="text-sm"><span className="font-medium text-ink">{file.name}</span> <span className="text-ink-muted">{formatBytes(file.size)}</span></div>
        <div className="space-y-3">
          <div><label className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">Text</label><input value={text} onChange={(e) => setText(e.target.value)} className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" /></div>
          <div className="flex items-center gap-4">
            <div className="flex-1"><label className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">Font size: {size}</label><input type="range" min={12} max={120} value={size} onChange={(e) => setSize(+e.target.value)} className="w-full accent-accent" /></div>
            <div className="flex-1"><label className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">Opacity: {Math.round(opacity * 100)}%</label><input type="range" min={5} max={50} value={opacity * 100} onChange={(e) => setOpacity(+e.target.value / 100)} className="w-full accent-accent" /></div>
          </div>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button onClick={water} disabled={processing} className="rounded-lg bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">{processing ? "Applying..." : "Add Watermark"}</button>
      </div>}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={WATERMARK_STEPS}
        loadingText="Watermarking your PDF document..."
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}

export function PageNumbersPDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [pos, setPos] = useState<"bottom-center" | "bottom-right" | "top-center">("bottom-center");
  const [start, setStart] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  const add = useCallback(async () => {
    if (!file) return;
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const doc = await loadPDFDoc(file);
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const pages = doc.getPages();
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width } = page.getSize();
        const y = pos.startsWith("bottom") ? 30 : page.getSize().height - 20;
        const x = pos.endsWith("center") ? width / 2 - 15 : width - 50;
        page.drawText(String(start + i), { x, y, size: 10, font, color: rgb(0.4, 0.4, 0.4) });
      }
      const blob = await savePDFDoc(doc);
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        downloadBlob(blob, getFilename("pdf-page-numbers", file.name));
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Page numbering failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, start, pos]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current && file) {
      downloadBlob(pendingBlobRef.current, getFilename("pdf-page-numbers", file.name));
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file]);

  return (
    <div className="relative space-y-5">
      <SZ onFile={(f) => { setFile(f); setError(null); }} label="Drop a PDF" accept=".pdf" />
      {file && <div className="space-y-4">
        <div className="text-sm"><span className="font-medium text-ink">{file.name}</span> <span className="text-ink-muted">{formatBytes(file.size)}</span></div>
        <div className="space-y-3">
          <div><label className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">Starting number</label><input type="number" min={1} value={start} onChange={(e) => setStart(+e.target.value || 1)} className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" /></div>
          <div className="flex items-center gap-2">
            {(["bottom-center", "bottom-right", "top-center"] as const).map((p) => (
              <button key={p} onClick={() => setPos(p)} className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium ${pos === p ? "bg-ink text-white" : "bg-surface-elevated text-ink-muted border-border hover:border-zinc-300"}`}>{p.replace("-", " ")}</button>
            ))}
          </div>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button onClick={add} disabled={processing} className="rounded-lg bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">{processing ? "Adding..." : "Add Page Numbers"}</button>
      </div>}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={PAGINATE_STEPS}
        loadingText="Adding page numbers..."
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}

export function OrganizePDFWorkspace() {
  const [file, setFile] = useState<File | null>(null);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulated processing delay state for labor illusion & dwell time
  const [showProcessingOverlay, setShowProcessingOverlay] = useState(false);
  const pendingBlobRef = useRef<Blob | null>(null);
  const isGeneratingRef = useRef(false);
  const animationFinishedRef = useRef(false);

  const handleFile = useCallback(async (f: File) => {
    setFile(f); setError(null);
    try { const doc = await loadPDFDoc(f); setTotal(doc.getPageCount()); } catch { setError("Could not read PDF"); }
  }, []);

  const organize = useCallback(async () => {
    if (!file || !order.trim()) { setError("Enter page order"); return; }
    setError(null);
    setProcessing(true);
    setShowProcessingOverlay(true);
    pendingBlobRef.current = null;
    animationFinishedRef.current = false;
    isGeneratingRef.current = true;

    try {
      const indices = order.split(",").map((s) => Number(s.trim()) - 1).filter((n) => n >= 0 && n < total);
      if (!indices.length) { setError("No valid pages"); setProcessing(false); setShowProcessingOverlay(false); isGeneratingRef.current = false; return; }
      const doc = await loadPDFDoc(file);
      const out = await PDFDocument.create();
      for (const i of indices) { const [p] = await out.copyPages(doc, [i]); out.addPage(p); }
      const blob = await savePDFDoc(out);
      pendingBlobRef.current = blob;
      isGeneratingRef.current = false;

      if (animationFinishedRef.current) {
        downloadBlob(blob, getFilename("pdf-organize", file.name));
        setShowProcessingOverlay(false);
        setProcessing(false);
      }
    } catch (e: any) {
      setError(e.message || "Organization failed");
      setShowProcessingOverlay(false);
      setProcessing(false);
      isGeneratingRef.current = false;
    }
  }, [file, order, total]);

  const handleProcessingFinished = useCallback(() => {
    animationFinishedRef.current = true;
    if (!isGeneratingRef.current && pendingBlobRef.current && file) {
      downloadBlob(pendingBlobRef.current, getFilename("pdf-organize", file.name));
      setShowProcessingOverlay(false);
      setProcessing(false);
    }
  }, [file]);

  return (
    <div className="relative space-y-5">
      <SZ onFile={handleFile} label="Drop a PDF" accept=".pdf" />
      {file && total > 0 && <div className="space-y-4">
        <div className="text-sm"><span className="font-medium text-ink">{file.name}</span> <span className="text-ink-muted">{formatBytes(file.size)} · {total} pages</span></div>
        <div><label className="text-xs font-medium text-ink-muted uppercase tracking-wider block mb-1">New page order</label><input value={order} onChange={(e) => setOrder(e.target.value)} placeholder={`e.g. ${total},${total-1},${total-2}`} className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent" /></div>
        <p className="text-[11px] text-ink-muted">Comma-separated page numbers (1-{total}). Reorder, repeat, or skip pages.</p>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button onClick={organize} disabled={processing} className="rounded-lg bg-accent text-white px-5 py-2 text-sm font-medium hover:bg-accent-hover active:scale-[0.98] transition-all disabled:opacity-50">{processing ? "Organizing..." : "Organize PDF"}</button>
      </div>}
      <ProcessingOverlay
        isOpen={showProcessingOverlay}
        steps={ORGANIZE_STEPS}
        loadingText="Reorganizing your PDF pages..."
        duration={3500}
        onFinished={handleProcessingFinished}
      />
    </div>
  );
}