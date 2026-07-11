"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Reorder, motion, AnimatePresence } from "framer-motion";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";
import { pdf } from "@react-pdf/renderer";
import { ResumeDocument } from "./ResumePDFTemplates";

const ReactPDFViewer = dynamic(() => import("./ResumePDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-ink-muted min-h-[400px]">
      <svg className="animate-spin mb-4 h-8 w-8 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading Professional PDF Engine...
    </div>
  )
});

import { ResumeData, ResumeItem, SkillItem, DEFAULT_RESUME } from "./resume-types";

// --- Helpers ---
const moveItem = <T,>(list: T[], index: number, direction: -1 | 1): T[] => {
  if (index + direction < 0 || index + direction >= list.length) return list;
  const newItems = [...list];
  const temp = newItems[index];
  newItems[index] = newItems[index + direction];
  newItems[index + direction] = temp;
  return newItems;
};

// --- Main Component ---
export default function ResumeBuilderWorkspace() {
  const t = useWorkspaceTranslation();
  const [data, setData] = useState<ResumeData>(DEFAULT_RESUME);
  
  useEffect(() => {
    if (!data.customSections) {
      setData(prev => ({ ...prev, customSections: [] }));
    }
  }, [data.customSections]);
  const [previewData, setPreviewData] = useState<ResumeData>(DEFAULT_RESUME);
  const [activeTab, setActiveTab] = useState<"content" | "design">("content");
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [isBuildingPdf, setIsBuildingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setIsBuildingPdf(true);
    try {
      const blob = await pdf(<ResumeDocument data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Resume-${data.personal.fullName?.replace(/\s+/g, '-') || 'Builder'}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsBuildingPdf(false);
    }
  };
  const [activeEditorSection, setActiveEditorSection] = useState<string>("personal");

  // LocalStorage Sync
  useEffect(() => {
    const saved = localStorage.getItem("resume-builder-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(parsed);
        setPreviewData(parsed);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (data !== DEFAULT_RESUME) {
      localStorage.setItem("resume-builder-data", JSON.stringify(data));
    }
  }, [data]);

  const handlePrint = () => {
    const element = document.getElementById("hidden-resume-renderer");
    if (!element) return;
    
    // Create an isolated hidden iframe for pristine printing. The browser's native print engine perfectly supports oklch and page breaks!
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '100vw';
    iframe.style.height = '100vh';
    iframe.style.zIndex = '-9999';
    iframe.style.pointerEvents = 'none';
    iframe.style.opacity = '0';
    document.body.appendChild(iframe);
    
    const iframeDoc = iframe.contentWindow?.document;
    if (!iframeDoc) return;

    // Grab all stylesheets from the parent to ensure Tailwind and custom styles work
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(s => s.outerHTML)
      .join('\\n');
      
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume</title>
          ${styles}
          <style>
            @media print {
              @page { size: A4 portrait; margin: ${data.settings.template === "creative" ? "0" : "15mm"}; }
              body { background: white !important; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .resume-block { break-inside: avoid; page-break-inside: avoid; }
            }
          </style>
        </head>
        <body class="bg-white text-black p-0 m-0 w-[210mm]">
          ${element.innerHTML}
        </body>
      </html>
    `);
    iframeDoc.close();
    
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 500);
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-${data.personal.fullName.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUploadJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setData(parsed);
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  // --- Handlers ---
  const updatePersonal = (field: keyof ResumeData["personal"], value: any) => {
    setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const updateSetting = (field: keyof ResumeData["settings"], value: any) => {
    setData(prev => ({ ...prev, settings: { ...prev.settings, [field]: value } }));
  };

  const updateItem = (category: keyof ResumeData, index: number, field: keyof ResumeItem, value: any) => {
    setData(prev => {
      const arr = [...(prev[category] as any[])];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [category]: arr };
    });
  };

  const addItem = (category: keyof ResumeData) => {
    setData(prev => {
      const newItem: ResumeItem = {
        id: Math.random().toString(36).substr(2, 9),
        title: "", subtitle: "", dateStart: "", dateEnd: "", location: "", description: ""
      };
      return { ...prev, [category]: [...(prev[category] as any[]), newItem] };
    });
  };

  const deleteItem = (category: keyof ResumeData, index: number) => {
    setData(prev => {
      const arr = [...(prev[category] as any[])];
      arr.splice(index, 1);
      return { ...prev, [category]: arr };
    });
  };


  const addCustomSection = () => {
    const id = "custom-" + Date.now();
    setData(prev => ({
      ...prev,
      customSections: [...(prev.customSections || []), { id, title: "New Section", items: [] }],
      settings: { ...prev.settings, sectionOrder: [...prev.settings.sectionOrder, id] }
    }));
    setActiveEditorSection(id);
  };

  const deleteCustomSection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setData(prev => ({
      ...prev,
      customSections: (prev.customSections || []).filter(c => c.id !== id),
      settings: { ...prev.settings, sectionOrder: prev.settings.sectionOrder.filter(s => s !== id) }
    }));
    if (activeEditorSection === id) setActiveEditorSection("personal");
  };

  const updateCustomSectionTitle = (id: string, title: string) => {
    setData(prev => ({
      ...prev,
      customSections: (prev.customSections || []).map(c => c.id === id ? { ...c, title } : c)
    }));
  };

  const addCustomItem = (sectionId: string) => {
    setData(prev => ({
      ...prev,
      customSections: (prev.customSections || []).map(c => c.id === sectionId ? {
        ...c, items: [...c.items, { id: "item-" + Date.now(), title: "", company: "", location: "", date: "", description: "", subtitle: "", dateStart: "", dateEnd: "" }]
      } : c)
    }));
  };

  const updateCustomItem = (sectionId: string, index: number, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      customSections: (prev.customSections || []).map(c => {
        if (c.id !== sectionId) return c;
        const newItems = [...c.items];
        newItems[index] = { ...newItems[index], [field]: value };
        return { ...c, items: newItems };
      })
    }));
  };

  const deleteCustomItem = (sectionId: string, index: number) => {
    setData(prev => ({
      ...prev,
      customSections: (prev.customSections || []).map(c => {
        if (c.id !== sectionId) return c;
        const newItems = [...c.items];
        newItems.splice(index, 1);
        return { ...c, items: newItems };
      })
    }));
  };

  const reorderItem = (category: keyof ResumeData, index: number, dir: -1 | 1) => {
    setData(prev => ({ ...prev, [category]: moveItem(prev[category] as any[], index, dir) }));
  };

  // --- Render Editor ---
    const renderItemEditor = (category: keyof ResumeData, item: ResumeItem, index: number, isSkill = false) => {
    return (
      <Reorder.Item 
        key={item.id} 
        value={item}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, height: 0 }}
        className="p-4 border border-border rounded-xl bg-surface mb-4 shadow-sm relative group cursor-grab active:cursor-grabbing bg-white dark:bg-neutral-900"
      >
        <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onPointerDown={(e) => e.stopPropagation()} onClick={() => deleteItem(category, index)} className="p-1.5 text-red-400 hover:text-red-500 rounded hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer">✕</button>
        </div>
        
        {isSkill ? (
          <div className="grid gap-3 pt-2" onPointerDown={(e) => e.stopPropagation()}>
            <div>
              <label className="text-xs font-bold text-ink-muted mb-1 block">Category</label>
              <input value={(item as any).category} onChange={e => updateItem(category, index, "category" as any, e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted mb-1 block">Skills (Comma separated)</label>
              <textarea value={(item as any).skills} onChange={e => updateItem(category, index, "skills" as any, e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 h-20 resize-none" />
            </div>
          </div>
        ) : (
          <div className="grid gap-3 pt-2" onPointerDown={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-ink-muted mb-1 block">Title</label>
                <input value={item.title} onChange={e => updateItem(category, index, "title", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
              </div>
              <div>
                <label className="text-xs font-bold text-ink-muted mb-1 block">Subtitle / Company</label>
                <input value={item.subtitle} onChange={e => updateItem(category, index, "subtitle", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-ink-muted mb-1 block">Start Date</label>
                <input value={item.dateStart} onChange={e => updateItem(category, index, "dateStart", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
              </div>
              <div>
                <label className="text-xs font-bold text-ink-muted mb-1 block">End Date</label>
                <input value={item.dateEnd} onChange={e => updateItem(category, index, "dateEnd", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
              </div>
              <div>
                <label className="text-xs font-bold text-ink-muted mb-1 block">Location</label>
                <input value={item.location} onChange={e => updateItem(category, index, "location", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted mb-1 block">Description</label>
              <textarea value={item.description} onChange={e => updateItem(category, index, "description", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 h-24 resize-none" />
              <label className="flex items-center gap-2 mt-2 cursor-pointer w-max">
                <input type="checkbox" checked={item.isBulleted || false} onChange={e => updateItem(category, index, "isBulleted", e.target.checked)} className="w-3.5 h-3.5 rounded border-border text-accent focus:ring-accent" />
                <span className="text-[11px] font-medium text-ink-muted">Format new lines as bullet points</span>
              </label>
            </div>
          </div>
        )}
      </Reorder.Item>
    );
  };

  const EditorContent = () => (
    <div className="space-y-6">
      {/* Accordion Menu */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["personal", "experience", "education", "skills", "projects"].map(sec => (
          <button 
            key={sec}
            onClick={() => setActiveEditorSection(sec)}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold capitalize transition-all ${activeEditorSection === sec ? "bg-accent text-white" : "bg-surface border border-border text-ink-muted hover:text-ink"}`}
          >
            {sec}
          </button>
        ))}

        {(data.customSections || []).map(sec => (
          <div key={sec.id} className="relative group inline-flex">
            <button 
              onClick={() => setActiveEditorSection(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${activeEditorSection === sec.id ? "bg-accent text-white pr-8" : "bg-surface border border-border text-ink-muted hover:text-ink pr-8"}`}
            >
              {sec.title}
            </button>
            <button
              onClick={(e) => deleteCustomSection(sec.id, e)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:bg-red-500/20 rounded"
              title="Delete Section"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
            </button>
          </div>
        ))}
        <button onClick={addCustomSection} className="px-3 py-1.5 rounded-lg text-sm font-bold text-accent border border-dashed border-accent hover:bg-accent/10 transition-colors">
          + Add Section
        </button>

      </div>

      {activeEditorSection === "personal" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-ink-muted mb-1 block">Full Name</label>
              <input value={data.personal.fullName} onChange={e => updatePersonal("fullName", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted mb-1 block">Job Title</label>
              <input value={data.personal.jobTitle} onChange={e => updatePersonal("jobTitle", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted mb-1 block">Email</label>
              <input value={data.personal.email} onChange={e => updatePersonal("email", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted mb-1 block">Phone</label>
              <input value={data.personal.phone} onChange={e => updatePersonal("phone", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted mb-1 block">Location</label>
              <input value={data.personal.location} onChange={e => updatePersonal("location", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted mb-1 block">Website</label>
              <input value={data.personal.website} onChange={e => updatePersonal("website", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted mb-1 block">LinkedIn</label>
              <input value={data.personal.linkedin} onChange={e => updatePersonal("linkedin", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-muted mb-1 block">GitHub (Optional)</label>
              <input value={data.personal.github || ""} onChange={e => updatePersonal("github", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" placeholder="github.com/..." />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-bold text-ink-muted mb-1 block">Upload Profile Photo (Optional)</label>
              <div className="flex gap-2 items-center">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        updatePersonal("photoUrl", event.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      updatePersonal("photoUrl", "");
                    }
                  }} 
                  className="flex-1 bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-1.5 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-accent/10 file:text-accent hover:file:bg-accent/20 cursor-pointer" 
                />
                {data.personal.photoUrl && (
                  <button 
                    onClick={() => updatePersonal("photoUrl", "")}
                    className="px-3 py-1.5 bg-red-500/10 text-red-500 font-bold rounded-lg text-xs hover:bg-red-500/20 transition-colors shrink-0"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-ink-muted mb-1 block">Professional Summary</label>
            <textarea value={data.personal.summary} onChange={e => updatePersonal("summary", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 h-24 resize-none" />
          </div>
        </div>
      )}

      {["experience", "education", "projects"].includes(activeEditorSection) && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          <Reorder.Group axis="y" values={data[activeEditorSection as keyof ResumeData] as any[]} onReorder={(newOrder) => setData(prev => ({ ...prev, [activeEditorSection]: newOrder }))} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {(data[activeEditorSection as keyof ResumeData] as any[]).map((item: any, idx: number) => renderItemEditor(activeEditorSection as any, item, idx))}
            </AnimatePresence>
          </Reorder.Group>
          <button onClick={() => addItem(activeEditorSection as any)} className="w-full py-3 border-2 border-dashed border-border rounded-xl text-ink-muted font-bold hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2">
            <span>+ Add {activeEditorSection.charAt(0).toUpperCase() + activeEditorSection.slice(1)}</span>
          </button>
        </div>
      )}

      {activeEditorSection === "skills" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          <Reorder.Group axis="y" values={data.skills} onReorder={(newOrder) => setData(prev => ({ ...prev, skills: newOrder }))} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {data.skills.map((item: any, idx: number) => renderItemEditor("skills", item, idx, true))}
            </AnimatePresence>
          </Reorder.Group>
          <button onClick={() => addItem("skills")} className="w-full py-3 border-2 border-dashed border-border rounded-xl text-ink-muted font-bold hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2">
            <span>+ Add Skill Category</span>
          </button>
        </div>
      )}

      {activeEditorSection.startsWith("custom-") && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          {(() => {
            const customSec = (data.customSections || []).find(c => c.id === activeEditorSection);
            if (!customSec) return null;
            return (
              <>
                <div className="flex flex-col gap-2 mb-6">
                  <label className="text-xs font-bold text-ink-muted uppercase tracking-wider">Section Name</label>
                  <input
                    value={customSec.title}
                    onChange={(e) => updateCustomSectionTitle(customSec.id, e.target.value)}
                    className="text-lg font-bold bg-surface dark:bg-neutral-800 border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40"
                    placeholder="e.g. Patents, Publications, Certifications"
                  />
                </div>

                <div className="space-y-4">
                  <Reorder.Group axis="y" values={customSec.items} onReorder={(newItems) => setData(prev => ({ ...prev, customSections: (prev.customSections || []).map(c => c.id === customSec.id ? { ...c, items: newItems } : c) }))} className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {customSec.items.map((item, index) => (
                    <Reorder.Item key={item.id} value={item} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="relative p-5 bg-surface-elevated/40 border border-border/60 rounded-xl shadow-sm backdrop-blur-sm group cursor-grab active:cursor-grabbing bg-white dark:bg-neutral-900">
                      <button onClick={() => deleteCustomItem(customSec.id, index)} className="absolute top-4 right-4 p-2 text-ink-muted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md opacity-0 group-hover:opacity-100 transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
                      </button>
                      <div className="grid gap-4" onPointerDown={(e) => e.stopPropagation()}>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-ink-muted mb-1 block">Title / Name</label>
                            <input value={item.title} onChange={e => updateCustomItem(customSec.id, index, "title", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-ink-muted mb-1 block">Subtitle / Organization</label>
                            <input value={item.subtitle} onChange={e => updateCustomItem(customSec.id, index, "subtitle", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-bold text-ink-muted mb-1 block">Start Date</label>
                            <input value={item.dateStart} onChange={e => updateCustomItem(customSec.id, index, "dateStart", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-ink-muted mb-1 block">End Date / Location</label>
                            <input value={item.location} onChange={e => updateCustomItem(customSec.id, index, "location", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-ink-muted mb-1 block">Description</label>
                          <textarea value={item.description} onChange={e => updateCustomItem(customSec.id, index, "description", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 h-24 resize-none" />
                          <label className="flex items-center gap-2 mt-2 cursor-pointer w-max">
                            <input type="checkbox" checked={item.isBulleted || false} onChange={e => updateCustomItem(customSec.id, index, "isBulleted", e.target.checked)} className="w-3.5 h-3.5 rounded border-border text-accent focus:ring-accent" />
                            <span className="text-[11px] font-medium text-ink-muted">Format new lines as bullet points</span>
                          </label>
                        </div>
                      </div>
                    </Reorder.Item>
                  ))}
                  </AnimatePresence>
                  </Reorder.Group>
                  
                  <button onClick={() => addCustomItem(customSec.id)} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-dashed border-border text-ink-muted hover:border-accent hover:text-accent hover:bg-accent/5 transition-all font-medium">
                    + Add Item
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}

    </div>
  );

  const EditorDesign = () => (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h3 className="text-sm font-bold text-ink mb-1">Choose Template</h3>
        <p className="text-[11px] text-ink-secondary mb-4">Select the foundational layout for your resume.</p>
        <div className="grid grid-cols-4 gap-3 w-full max-w-2xl">
          {[
            { id: "executive", name: "Executive ATS", img: "/templates/executive.png" },
            { id: "creative", name: "Creative Dual", img: "/templates/creative.png" },
            { id: "classic", name: "Traditional Classic", img: "/templates/classic.png" },
            { id: "elegant", name: "Elegant Header", img: "/templates/elegant.png" }
          ].map(tpl => (
            <button
              key={tpl.id}
              onClick={() => updateSetting("template", tpl.id)}
              className={`group relative aspect-[1/1.414] w-full rounded-xl overflow-hidden border-[3px] transition-all ${data.settings.template === tpl.id ? "border-ink shadow-lg scale-[1.02]" : "border-transparent hover:border-border hover:shadow-md bg-neutral-100"}`}
            >
              <img 
                src={tpl.img} 
                alt={tpl.name} 
                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90" 
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x424/e5e7eb/9ca3af?text=' + tpl.name.replace(/ /g, '+') }} 
              />
              {data.settings.template === tpl.id && (
                <div className="absolute top-2 right-2 bg-ink text-white rounded-full p-1 shadow-sm">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"></path></svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-ink mb-3">Accent Color</h3>
        <div className="flex flex-wrap gap-2">
          {["#2563eb", "#0f172a", "#16a34a", "#dc2626", "#9333ea", "#ea580c", "#000000"].map(color => (
            <button
              key={color}
              onClick={() => updateSetting("primaryColor", color)}
              className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${data.settings.primaryColor === color ? "border-ink scale-110 shadow-md" : "border-transparent"}`}
              style={{ backgroundColor: color }}
            />
          ))}
          <div className="relative">
            <input 
              type="color" 
              value={data.settings.primaryColor || "#2563eb"} 
              onChange={(e) => updateSetting("primaryColor", e.target.value)}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-surface hover:bg-surface-elevated transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-ink mb-2">Section Order</h3>
        <p className="text-[11px] text-ink-muted mb-3">Drag and drop to reorder how sections appear.</p>
        <Reorder.Group 
          axis="y" 
          values={data.settings.sectionOrder} 
          onReorder={(newOrder) => updateSetting("sectionOrder", newOrder)}
          className="space-y-2"
        >
          {data.settings.sectionOrder.map((sec) => (
            <Reorder.Item 
              key={sec} 
              value={sec}
              className="flex items-center justify-between p-3 bg-surface-elevated/40 border border-border/60 rounded-xl shadow-sm cursor-grab active:cursor-grabbing transition-colors hover:bg-surface-elevated relative z-10 bg-white dark:bg-neutral-900"
            >
              <span className="text-xs font-bold capitalize text-ink tracking-wider">{sec}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-muted">
                <circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/>
                <circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>
              </svg>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      <div>
        <h3 className="text-sm font-bold text-ink mb-2">Layout Density</h3>
        <p className="text-[11px] text-ink-muted mb-3">Optimize space to fit more content on a single page.</p>
        <div className="p-4 bg-surface-elevated/40 border border-border/60 rounded-xl relative z-10 bg-white dark:bg-neutral-900">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm font-bold text-ink">Spacing Multiplier</div>
            <div className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-md">
              {data.settings.layoutSpacing ? data.settings.layoutSpacing.toFixed(1) + 'x' : '1.0x'}
            </div>
          </div>
          <input 
            type="range" 
            min="0.5" 
            max="1.5" 
            step="0.1"
            value={data.settings.layoutSpacing ?? 1.0}
            onChange={(e) => updateSetting("layoutSpacing", parseFloat(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-[10px] text-ink-muted mt-2 font-medium">
            <span>Compact (0.5x)</span>
            <span>Normal (1.0x)</span>
            <span>Spacious (1.5x)</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-[82vh] min-h-[880px] bg-surface-elevated/40 dark:bg-neutral-900/40 rounded-3xl border border-border overflow-hidden shadow-2xl font-sans relative print:h-auto print:min-h-0 print:overflow-visible print:border-none print:shadow-none print:bg-white">
      
      {/* Global Toggle Header */}
      <div className="flex-none p-4 sm:p-5 border-b border-border/50 bg-gradient-to-b from-surface to-surface/80 flex items-center justify-between sticky top-0 z-50">
        <div className="flex flex-col">
          <h2 className="font-bold text-ink text-lg">Resume Builder</h2>
        </div>
        
        {/* The Toggle */}
        <div className="bg-surface-elevated/80 p-1 rounded-xl border border-border/50 shadow-inner flex relative">
          <button 
            onClick={() => setViewMode("edit")} 
            className={`relative px-6 py-2 text-xs font-bold rounded-lg transition-colors z-10 ${viewMode === "edit" ? "text-ink" : "text-ink-muted hover:text-ink"}`}
          >
            Edit Content
            {viewMode === "edit" && (
              <motion.div layoutId="viewModeToggle" className="absolute inset-0 bg-surface shadow-sm border border-border/50 rounded-lg -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
            )}
          </button>
          <button 
            onClick={() => { setPreviewData(data); setViewMode("preview"); }} 
            className={`relative px-6 py-2 text-xs font-bold rounded-lg transition-colors z-10 ${viewMode === "preview" ? "text-surface" : "text-ink-muted hover:text-ink"}`}
          >
            View Resume
            {viewMode === "preview" && (
              <motion.div layoutId="viewModeToggle" className="absolute inset-0 bg-ink shadow-md rounded-lg -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
            )}
          </button>
        </div>

        <button onClick={handleDownloadPdf} disabled={isBuildingPdf} className="px-4 py-2 bg-ink text-surface font-bold rounded-lg text-xs hover:bg-ink-secondary transition-colors disabled:opacity-50 flex items-center gap-2">
          {isBuildingPdf ? "Generating..." : "Download PDF"}
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden flex flex-row">
        
        {/* Pane 1: Editor */}
        <div className={`absolute inset-0 bg-surface/50 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${viewMode === "edit" ? "translate-x-0 z-40" : "-translate-x-full z-0 pointer-events-none opacity-0"}`}>
          <div className="p-3 border-b border-border/50 bg-surface/80 flex justify-center gap-2">
            <button 
              onClick={() => setActiveTab("content")} 
              className={`relative px-6 py-1.5 text-xs font-bold rounded-lg transition-colors z-10 ${activeTab === "content" ? "text-ink" : "text-ink-muted hover:text-ink"}`}
            >
              Content
              {activeTab === "content" && (
                <motion.div layoutId="tabToggle" className="absolute inset-0 bg-surface border border-border shadow-sm rounded-lg -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
            </button>
            <button 
              onClick={() => setActiveTab("design")} 
              className={`relative px-6 py-1.5 text-xs font-bold rounded-lg transition-colors z-10 ${activeTab === "design" ? "text-ink" : "text-ink-muted hover:text-ink"}`}
            >
              Design & Templates
              {activeTab === "design" && (
                <motion.div layoutId="tabToggle" className="absolute inset-0 bg-surface border border-border shadow-sm rounded-lg -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
              )}
            </button>
          </div>
          
          <div className="flex-1 overflow-auto p-4 sm:p-8 custom-scrollbar">
            <div className="max-w-3xl mx-auto space-y-8 pb-32">
              {activeTab === "content" ? EditorContent() : EditorDesign()}
              
              <div className="flex gap-4 mt-12 pt-8 border-t border-border/40">
                <button onClick={handleDownloadJson} className="flex-1 py-3 bg-surface border border-border/60 rounded-xl text-xs font-bold hover:bg-surface-elevated transition-colors text-ink">Export Source (JSON)</button>
                <label className="flex-1 py-3 bg-surface border border-border/60 rounded-xl text-xs font-bold hover:bg-surface-elevated transition-colors text-ink text-center cursor-pointer">
                  Import Source
                  <input type="file" accept=".json" onChange={handleUploadJson} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Pane 2: PDF Preview */}
        <div className={`absolute inset-0 bg-neutral-100 dark:bg-neutral-950 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${viewMode === "preview" ? "translate-x-0 z-40" : "translate-x-full z-0 pointer-events-none opacity-0"}`}>
          <ReactPDFViewer data={previewData} />
        </div>
      </div>
    </div>
  );
}
