"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Reorder } from "framer-motion";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";

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
  const [previewData, setPreviewData] = useState<ResumeData>(DEFAULT_RESUME);
  const [activeTab, setActiveTab] = useState<"content" | "design">("content");
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
  const updatePersonal = (field: keyof ResumeData["personal"], value: string) => {
    setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const updateSetting = (field: keyof ResumeData["settings"], value: any) => {
    setData(prev => ({ ...prev, settings: { ...prev.settings, [field]: value } }));
  };

  const updateItem = (category: keyof ResumeData, index: number, field: keyof ResumeItem, value: string) => {
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

  const reorderItem = (category: keyof ResumeData, index: number, dir: -1 | 1) => {
    setData(prev => ({ ...prev, [category]: moveItem(prev[category] as any[], index, dir) }));
  };

  // --- Render Editor ---
  const renderItemEditor = (category: keyof ResumeData, item: ResumeItem, index: number, isSkill = false) => {
    return (
      <div key={item.id} className="p-4 border border-border rounded-xl bg-surface mb-4 shadow-sm relative group">
        <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => reorderItem(category, index, -1)} disabled={index === 0} className="p-1.5 text-ink-muted hover:text-ink disabled:opacity-30 rounded hover:bg-surface-elevated">↑</button>
          <button onClick={() => reorderItem(category, index, 1)} disabled={index === (data[category] as any[]).length - 1} className="p-1.5 text-ink-muted hover:text-ink disabled:opacity-30 rounded hover:bg-surface-elevated">↓</button>
          <button onClick={() => deleteItem(category, index)} className="p-1.5 text-red-400 hover:text-red-500 rounded hover:bg-red-50 dark:hover:bg-red-500/10">✕</button>
        </div>
        
        {isSkill ? (
          <div className="grid gap-3 pt-2">
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
          <div className="grid gap-3 pt-2">
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
              <label className="text-xs font-bold text-ink-muted mb-1 block">Description (Supports bullets)</label>
              <textarea value={item.description} onChange={e => updateItem(category, index, "description", e.target.value)} className="w-full bg-surface dark:bg-neutral-800 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 h-24 resize-none" />
            </div>
          </div>
        )}
      </div>
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
          {(data[activeEditorSection as keyof ResumeData] as any[]).map((item: any, idx: number) => renderItemEditor(activeEditorSection as any, item, idx))}
          <button onClick={() => addItem(activeEditorSection as any)} className="w-full py-3 border-2 border-dashed border-border rounded-xl text-ink-muted font-bold hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2">
            <span>+ Add {activeEditorSection.charAt(0).toUpperCase() + activeEditorSection.slice(1)}</span>
          </button>
        </div>
      )}

      {activeEditorSection === "skills" && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
          {data.skills.map((item: any, idx: number) => renderItemEditor("skills", item, idx, true))}
          <button onClick={() => addItem("skills")} className="w-full py-3 border-2 border-dashed border-border rounded-xl text-ink-muted font-bold hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2">
            <span>+ Add Skill Category</span>
          </button>
        </div>
      )}
    </div>
  );

  const EditorDesign = () => (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h3 className="text-sm font-bold text-ink mb-1">Choose Template</h3>
        <p className="text-[11px] text-ink-secondary mb-4">Select the foundational layout for your resume.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "executive", name: "Executive ATS", desc: "Single column, clean" },
            { id: "creative", name: "Creative Dual", desc: "Two columns, modern" },
            { id: "classic", name: "Traditional Classic", desc: "Serif font, elegant" },
            { id: "elegant", name: "Elegant Header", desc: "Modern serif, bold header" }
          ].map(tpl => (
            <button
              key={tpl.id}
              onClick={() => updateSetting("template", tpl.id)}
              className={`p-3 rounded-xl border-2 transition-all flex flex-col items-start gap-1 ${data.settings.template === tpl.id ? "border-accent bg-accent/5 ring-1 ring-accent/20" : "border-border/60 bg-surface hover:border-accent/50"}`}
            >
              <div className="font-bold text-ink text-xs">{tpl.name}</div>
              <div className="text-[10px] text-ink-muted leading-tight">{tpl.desc}</div>
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
              value={data.settings.primaryColor}
              onChange={e => updateSetting("primaryColor", e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-ink/30 flex items-center justify-center bg-surface-elevated/50 hover:bg-surface-elevated transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
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
    <div className="flex flex-col h-full bg-surface-elevated/40 dark:bg-neutral-900/40 rounded-3xl border border-border overflow-hidden shadow-2xl font-sans relative min-h-[850px] print:h-auto print:min-h-0 print:overflow-visible print:border-none print:shadow-none print:bg-white">
      
      {/* Top Pane: Editor */}
      <div className="w-full shrink-0 flex flex-col border-b border-border/50 bg-surface/80 backdrop-blur-xl z-40 relative max-h-[50vh] lg:max-h-[60vh] transition-all duration-300 print:hidden">
        <div className="p-4 sm:p-5 border-b border-border/50 bg-gradient-to-b from-surface to-surface/80 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-ink text-lg">Resume Builder</h2>
            <button 
              onClick={() => setPreviewData(data)}
              className="px-4 py-2 bg-accent text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm flex items-center gap-2 border border-accent/20"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Refresh Preview
            </button>
          </div>
          <div className="bg-surface-elevated/40 p-1 rounded-xl border border-border/50 inline-flex shadow-inner">
            <button onClick={() => setActiveTab("content")} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === "content" ? "bg-surface shadow-sm text-accent" : "text-ink-muted hover:text-ink"}`}>Content</button>
            <button onClick={() => setActiveTab("design")} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === "design" ? "bg-surface shadow-sm text-accent" : "text-ink-muted hover:text-ink"}`}>Design & Templates</button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-5 custom-scrollbar flex flex-col justify-between">
          <div className="space-y-6">
            {activeTab === "content" ? EditorContent() : EditorDesign()}
          </div>
          
          <div className="flex gap-2 mt-8 pt-4 border-t border-border/40">
            <button onClick={handleDownloadJson} className="flex-1 py-2.5 bg-surface border border-border rounded-lg text-xs font-bold hover:bg-surface-elevated transition-colors">Export JSON</button>
            <label className="flex-1 py-2.5 bg-surface border border-border rounded-lg text-xs font-bold hover:bg-surface-elevated transition-colors text-center cursor-pointer">
              Import JSON
              <input type="file" accept=".json" onChange={handleUploadJson} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Bottom Pane: PDF Preview */}
      <div className="flex-1 flex flex-col bg-neutral-100 dark:bg-neutral-950 relative overflow-hidden min-h-[1200px] print:h-auto print:overflow-visible print:bg-white">
        
        {/* PDF Viewer */}
        <div className="flex-1 w-full h-full relative z-0">
          <ReactPDFViewer data={previewData} />
        </div>
      </div>
    </div>
  );
}
