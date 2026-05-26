"use client";

import { useRouter } from "next/navigation";
import { setSharedFile } from "@/lib/fileBuffer";

interface MicroChainLinksProps {
  blob: Blob;
  filename: string;
  currentToolId: string;
}

interface ChainOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  bgClass: string;
  hoverClass: string;
}

export default function MicroChainLinks({
  blob,
  filename,
  currentToolId,
}: MicroChainLinksProps) {
  const router = useRouter();

  const options: ChainOption[] = [
    {
      id: "pdf-compress",
      name: "Compress PDF",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l3-3m-3 3l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgClass: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
      hoverClass: "hover:bg-blue-500/25",
    },
    {
      id: "pdf-watermark",
      name: "Add Watermark",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      bgClass: "bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400",
      hoverClass: "hover:bg-pink-500/25",
    },
    {
      id: "pdf-sign",
      name: "Sign PDF",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      ),
      bgClass: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      hoverClass: "hover:bg-emerald-500/25",
    },
    {
      id: "pdf-protect",
      name: "Protect PDF",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      bgClass: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400",
      hoverClass: "hover:bg-amber-500/25",
    },
    {
      id: "pdf-organize",
      name: "Organize PDF",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25A2.25 2.25 0 0113.5 8.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      ),
      bgClass: "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400",
      hoverClass: "hover:bg-purple-500/25",
    },
  ];

  const filteredOptions = options.filter((opt) => opt.id !== currentToolId);

  const handleNavigate = (toolId: string) => {
    setSharedFile(blob, filename);
    router.push(`/tools/${toolId}`);
  };

  return (
    <div className="rounded-2xl border border-border bg-surface-elevated/40 p-5 mt-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
        <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
          🔗 In-Memory Workflow Chaining (Instant & Private)
        </h4>
      </div>
      <p className="text-xs text-ink-muted leading-relaxed">
        Continue processing this finalized PDF directly in another tool without downloading and re-uploading. Your file remains securely cached in browser memory.
      </p>
      <div className="flex flex-wrap gap-2.5 pt-1">
        {filteredOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleNavigate(opt.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wide rounded-xl border transition-all active:scale-[0.98] cursor-pointer ${opt.bgClass} ${opt.hoverClass}`}
          >
            {opt.icon}
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
}
