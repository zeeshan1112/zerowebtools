"use client";

import React, { useState, useEffect, useRef } from "react";
import { useWorkspaceTranslation } from "./WorkspaceTranslationContext";

type KeyValue = { id: string; key: string; value: string; active: boolean };

const COMMON_HEADER_KEYS = [
  "Accept", "Authorization", "Cache-Control", "Content-Type", "User-Agent", "Origin", "Referer", "X-Requested-With", "Access-Control-Allow-Origin"
];

const COMMON_HEADER_VALUES = [
  "application/json", "application/xml", "text/html", "multipart/form-data", "application/x-www-form-urlencoded", "Bearer <token>", "no-cache", "*/*"
];

// Custom Autocomplete Input for premium styling
function AutocompleteInput({ 
  value, 
  onChange, 
  options, 
  placeholder,
  className
}: { 
  value: string; 
  onChange: (val: string) => void; 
  options: string[]; 
  placeholder: string;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    if (val) {
      setFilteredOptions(options.filter(opt => opt.toLowerCase().includes(val.toLowerCase())));
    } else {
      setFilteredOptions(options);
    }
    setIsOpen(true);
  };

  return (
    <div className="relative flex-1" ref={wrapperRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onFocus={() => {
          setFilteredOptions(value ? options.filter(opt => opt.toLowerCase().includes(value.toLowerCase())) : options);
          setIsOpen(true);
        }}
        className={className}
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 top-full mt-1.5 w-full max-h-48 overflow-y-auto bg-surface-elevated border border-border shadow-2xl rounded-xl py-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {filteredOptions.map((opt) => (
            <div 
              key={opt} 
              className="px-4 py-2 text-sm font-mono text-ink hover:bg-accent/10 hover:text-accent cursor-pointer transition-colors"
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CustomSelect({
  value,
  onChange,
  options,
  className = "",
  buttonClassName = "px-4 py-2"
}: {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
  className?: string;
  buttonClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value) || options[0];

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-full flex items-center justify-between bg-surface dark:bg-neutral-800 border border-border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all text-ink shadow-sm hover:border-accent/30 ${buttonClassName}`}
      >
        <span>{selectedOption?.label}</span>
        <svg className={`w-4 h-4 ml-2 shrink-0 text-ink-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-1.5 min-w-full w-max max-h-60 overflow-y-auto bg-surface-elevated border border-border shadow-2xl rounded-xl py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between gap-4 ${value === opt.value ? 'bg-accent/10 text-accent font-bold' : 'text-ink hover:bg-surface'}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
              {value === opt.value && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ApiClientWorkspace() {
  const t = useWorkspaceTranslation();

  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState<KeyValue[]>([{ id: "h1", key: "Accept", value: "application/json", active: true }]);
  const [queryParams, setQueryParams] = useState<KeyValue[]>([]);
  const [body, setBody] = useState("");
  const [activeTab, setActiveTab] = useState<"params" | "auth" | "headers" | "body">("headers");
  const [activeResponseTab, setActiveResponseTab] = useState<"body" | "headers">("body");
  
  // Auth feature
  const [authMode, setAuthMode] = useState<"none" | "bearer" | "basic">("none");
  const [bearerToken, setBearerToken] = useState("");
  const [basicUser, setBasicUser] = useState("");
  const [basicPass, setBasicPass] = useState("");

  const [extensionInstalled, setExtensionInstalled] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("/extensions");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // History Feature
  const [history, setHistory] = useState<{url: string, method: string, status: number, timeMs: number, date: number}[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const [response, setResponse] = useState<{
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: string;
    timeMs: number;
  } | null>(null);

  // Check if extension is installed on mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const isInstalled = document.documentElement.hasAttribute("data-zerowebtools-companion");
      setExtensionInstalled(isInstalled);
      
      const ua = navigator.userAgent;
      const isChromium = /Chrome|Chromium|CriOS/i.test(ua);
      if (isChromium) {
        setDownloadUrl("https://chromewebstore.google.com/detail/pffdmcdnddpbnlmfdemhkldjloccpcfj?utm_source=item-share-cb");
      }
      
      const savedHistory = localStorage.getItem('zwt_apiclient_history');
      if (savedHistory) {
        try { setHistory(JSON.parse(savedHistory)); } catch(e) {}
      }
    }
  }, []);

  const proxyFetchViaExtension = (targetUrl: string, customOptions?: { method?: string; headers?: Record<string, string>; body?: string }) => {
    const messageId = Math.random().toString(36).substring(2, 15);
    window.postMessage({
      type: 'ZWT_PROXY_FETCH',
      id: messageId,
      url: targetUrl,
      method: customOptions?.method || "GET",
      headers: customOptions?.headers || {},
      body: customOptions?.body,
      spoofGooglebot: false
    }, '*');
    
    return new Promise((resolve, reject) => {
      const handleResponse = (event: MessageEvent) => {
        if (event.source !== window || !event.data || event.data.type !== 'ZWT_PROXY_FETCH_RESPONSE' || event.data.id !== messageId) {
          return;
        }
        window.removeEventListener('message', handleResponse);
        if (event.data.response.error) {
          reject(new Error(event.data.response.error));
        } else {
          resolve(event.data.response);
        }
      };
      window.addEventListener('message', handleResponse);
    });
  };

  const syncUrlWithParams = (newParams: KeyValue[], currentUrl: string) => {
    try {
      const urlObj = new URL(currentUrl.startsWith("http") ? currentUrl : `https://${currentUrl}`);
      urlObj.search = "";
      newParams.forEach(p => {
        if (p.active && p.key) {
          urlObj.searchParams.append(p.key, p.value);
        }
      });
      setUrl(urlObj.toString());
    } catch (e) {
      // invalid URL, skip sync
    }
  };

  const handleParamChange = (id: string, field: "key" | "value" | "active", val: string | boolean) => {
    const newParams = queryParams.map(p => p.id === id ? { ...p, [field]: val } : p);
    setQueryParams(newParams);
    syncUrlWithParams(newParams, url);
  };

  const handleHeaderChange = (id: string, field: "key" | "value" | "active", val: string | boolean) => {
    setHeaders(headers.map(h => h.id === id ? { ...h, [field]: val } : h));
  };

  const addRow = (type: "params" | "headers") => {
    const newRow = { id: Math.random().toString(), key: "", value: "", active: true };
    if (type === "params") setQueryParams([...queryParams, newRow]);
    else setHeaders([...headers, newRow]);
  };

  const removeRow = (id: string, type: "params" | "headers") => {
    if (type === "params") {
      const newParams = queryParams.filter(p => p.id !== id);
      setQueryParams(newParams);
      syncUrlWithParams(newParams, url);
    } else {
      setHeaders(headers.filter(h => h.id !== id));
    }
  };
  
  const clearWorkspace = () => {
    setUrl("");
    setMethod("GET");
    setQueryParams([]);
    setHeaders([]);
    setBody("");
    setAuthMode("none");
    setBearerToken("");
    setBasicUser("");
    setBasicPass("");
    setResponse(null);
    setError(null);
  };
  
  const loadHistoryItem = (item: typeof history[0]) => {
    setUrl(item.url);
    setMethod(item.method);
    setShowHistory(false);
  };

  const sendRequest = async () => {
    if (!url) return;
    setIsSending(true);
    setError(null);
    setResponse(null);
    const startTime = Date.now();

    let targetUrl = url;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl;
    }

    if (!extensionInstalled) {
      setError(t("api_client.missing_extension_desc", "Extension required to bypass CORS."));
      setIsSending(false);
      return;
    }

    const reqHeaders: Record<string, string> = {};
    headers.forEach(h => {
      if (h.active && h.key) {
        reqHeaders[h.key] = h.value;
      }
    });
    
    // Inject Auth
    if (authMode === "bearer" && bearerToken) {
      reqHeaders["Authorization"] = `Bearer ${bearerToken}`;
    } else if (authMode === "basic" && (basicUser || basicPass)) {
      reqHeaders["Authorization"] = `Basic ${btoa(`${basicUser}:${basicPass}`)}`;
    }

    try {
      const res: any = await proxyFetchViaExtension(targetUrl, {
        method,
        headers: reqHeaders,
        body: (method !== "GET" && method !== "HEAD" && body) ? body : undefined
      });
      
      const timeMs = Date.now() - startTime;
      
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: res.headers || {},
        body: res.body || "",
        timeMs
      });
      
      // Save to history
      const newHistory = [{
        url: targetUrl,
        method,
        status: res.status,
        timeMs,
        date: Date.now()
      }, ...history.filter(h => h.url !== targetUrl || h.method !== method)].slice(0, 20);
      setHistory(newHistory);
      localStorage.setItem('zwt_apiclient_history', JSON.stringify(newHistory));
      
    } catch (e: any) {
      setError(t("api_client.error_fetch", "Request failed. Check URL or network."));
    } finally {
      setIsSending(false);
    }
  };

  const renderKeyValueEditor = (items: KeyValue[], type: "params" | "headers") => (
    <div className="flex flex-col gap-3 h-full">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-3 group/row relative">
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={item.active}
              onChange={(e) => type === "params" ? handleParamChange(item.id, "active", e.target.checked) : handleHeaderChange(item.id, "active", e.target.checked)}
              className="peer sr-only"
            />
            <div className="w-5 h-5 rounded border-2 border-border peer-checked:bg-accent peer-checked:border-accent transition-colors flex items-center justify-center bg-surface">
               <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
            </div>
          </label>
          
          {type === "headers" ? (
            <>
              <AutocompleteInput 
                value={item.key}
                onChange={(val) => handleHeaderChange(item.id, "key", val)}
                options={COMMON_HEADER_KEYS}
                placeholder={t("api_client.key_placeholder", "Key")}
                className="w-full px-4 py-2 bg-surface dark:bg-neutral-800/50 border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all text-ink placeholder-ink-muted/40 shadow-sm"
              />
              <AutocompleteInput 
                value={item.value}
                onChange={(val) => handleHeaderChange(item.id, "value", val)}
                options={COMMON_HEADER_VALUES}
                placeholder={t("api_client.value_placeholder", "Value")}
                className="w-full px-4 py-2 bg-surface dark:bg-neutral-800/50 border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all text-ink placeholder-ink-muted/40 shadow-sm"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder={t("api_client.key_placeholder", "Key")}
                value={item.key}
                onChange={(e) => handleParamChange(item.id, "key", e.target.value)}
                className="flex-1 px-4 py-2 bg-surface dark:bg-neutral-800/50 border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all text-ink placeholder-ink-muted/40 shadow-sm"
              />
              <input
                type="text"
                placeholder={t("api_client.value_placeholder", "Value")}
                value={item.value}
                onChange={(e) => handleParamChange(item.id, "value", e.target.value)}
                className="flex-1 px-4 py-2 bg-surface dark:bg-neutral-800/50 border border-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all text-ink placeholder-ink-muted/40 shadow-sm"
              />
            </>
          )}
          <button onClick={() => removeRow(item.id, type)} className="text-ink-muted hover:text-red-500 opacity-0 group-hover/row:opacity-100 transition-all p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      ))}
      {items.length === 0 && (
        <div className="text-sm font-medium text-ink-muted/60 italic px-2 py-4 border-2 border-dashed border-border/50 rounded-xl text-center">
          No {type === "params" ? "query parameters" : "headers"} defined.
        </div>
      )}
      <button onClick={() => addRow(type)} className="text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-accent transition-colors self-start mt-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-accent/5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
        {t("api_client.add_row", "Add Row")}
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-surface-elevated/40 dark:bg-neutral-900/40 rounded-3xl border border-border overflow-hidden shadow-2xl min-h-[850px] font-sans relative">
      
      {/* Sleek Top Bar */}
      <div className="p-4 sm:p-5 border-b border-border bg-gradient-to-b from-surface to-surface/80 backdrop-blur-xl flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 items-center z-50 relative shadow-sm">
        
        {/* Method Selector */}
        <CustomSelect
          value={method}
          onChange={setMethod}
          options={[
            { label: "GET", value: "GET" },
            { label: "POST", value: "POST" },
            { label: "PUT", value: "PUT" },
            { label: "PATCH", value: "PATCH" },
            { label: "DELETE", value: "DELETE" },
            { label: "HEAD", value: "HEAD" },
            { label: "OPTIONS", value: "OPTIONS" }
          ]}
          className="w-full sm:w-36 font-mono font-bold"
          buttonClassName="px-5 py-3"
        />
        
        {/* URL Input */}
        <div className="flex-1 w-full relative group/url">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendRequest()}
            placeholder={t("api_client.url_placeholder", "https://api.example.com/v1/users")}
            className="w-full px-5 py-3 pr-12 bg-surface dark:bg-neutral-800 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/40 font-mono text-sm text-ink shadow-sm transition-all hover:border-accent/30 placeholder-ink-muted/40"
          />
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-ink-muted hover:text-accent transition-colors"
            title="Request History"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </button>
          
          {/* History Dropdown */}
          {showHistory && (
            <div className="absolute top-full right-0 mt-2 w-80 max-h-64 overflow-y-auto bg-surface-elevated border border-border shadow-2xl rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-border/50 text-xs font-bold text-ink-muted uppercase tracking-wider mb-1">Recent Requests</div>
              {history.length === 0 ? (
                <div className="px-4 py-4 text-sm text-ink-muted italic">No history yet.</div>
              ) : (
                history.map((item, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => loadHistoryItem(item)}
                    className="w-full text-left px-4 py-2.5 hover:bg-surface flex items-start gap-3 transition-colors border-l-2 border-transparent hover:border-accent"
                  >
                    <span className={`text-[10px] font-bold mt-0.5 w-10 shrink-0 ${item.method === 'GET' ? 'text-green-500' : item.method === 'POST' ? 'text-blue-500' : item.method === 'DELETE' ? 'text-red-500' : 'text-orange-500'}`}>
                      {item.method}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-mono text-ink truncate">{item.url}</div>
                      <div className="flex gap-2 text-[10px] font-mono text-ink-secondary mt-1">
                        <span className={item.status >= 200 && item.status < 300 ? 'text-green-500' : 'text-red-500'}>{item.status}</span>
                        <span>•</span>
                        <span>{item.timeMs}ms</span>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        
        {/* Actions: Clear, cURL & Send */}
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={() => {
              let curl = `curl -X ${method} "${url}"`;
              headers.forEach(h => { if (h.active && h.key) curl += ` -H "${h.key}: ${h.value}"`; });
              if (authMode === "bearer" && bearerToken) curl += ` -H "Authorization: Bearer ${bearerToken}"`;
              else if (authMode === "basic" && (basicUser || basicPass)) curl += ` -H "Authorization: Basic ${btoa(`${basicUser}:${basicPass}`)}"`;
              if (method !== "GET" && method !== "HEAD" && body) curl += ` -d '${body.replace(/'/g, "'\\''")}'`;
              navigator.clipboard.writeText(curl);
            }}
            title="Copy as cURL"
            className="px-4 py-3 bg-surface border border-border text-ink-muted hover:text-accent font-bold rounded-xl hover:bg-surface-elevated transition-all duration-200 flex items-center justify-center shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
          </button>

          <button
            onClick={clearWorkspace}
            title="Clear Request"
            className="px-4 py-3 bg-surface border border-border text-ink-muted hover:text-red-500 font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 flex items-center justify-center shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
          </button>
          
          <button
            onClick={sendRequest}
            disabled={!url || isSending}
            className="relative overflow-hidden px-8 py-3 bg-ink dark:bg-white text-surface dark:text-ink font-bold rounded-xl hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] flex-1 sm:flex-none shadow-md hover:shadow-lg active:scale-95 group"
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-surface/30 dark:border-ink/30 border-t-surface dark:border-t-ink rounded-full animate-spin" />
            ) : (
              <span className="relative z-10 flex items-center gap-2 tracking-wider text-[11px] uppercase">
                {t("api_client.send_btn", "SEND")}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content Vertical Split */}
      <div className="flex flex-col flex-1 overflow-hidden relative">
        
        {/* Missing Extension Overlay */}
        {!extensionInstalled && (
          <div className="absolute inset-0 bg-surface/60 dark:bg-neutral-900/70 backdrop-blur-md z-30 flex items-center justify-center p-6 text-center animate-in fade-in duration-300">
            <div className="max-w-md w-full bg-surface-elevated p-8 rounded-2xl shadow-2xl border border-border flex flex-col items-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-ink">
                {t("api_client.missing_extension_title", "Extension Required")}
              </h3>
              <p className="text-sm text-ink-secondary mb-8 leading-relaxed">
                {t("api_client.missing_extension_desc", "This tool requires the ZeroWebTools companion extension to securely bypass browser CORS restrictions and execute raw HTTP requests locally.")}
              </p>
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-ink dark:bg-white text-surface dark:text-ink font-bold rounded-xl hover:opacity-90 transition-all shadow-md active:scale-95 text-xs uppercase tracking-wider">
                {t("api_client.download_extension", "Install Companion Extension")}
              </a>
            </div>
          </div>
        )}

        {/* Request Pane */}
        <div className="w-full flex flex-col border-b border-border/50 bg-surface/80 backdrop-blur-xl z-40 relative shrink-0 shadow-sm transition-all duration-300">
          <div className="flex px-4 py-3 gap-2 border-b border-border/50 overflow-x-auto shrink-0 items-center justify-start bg-gradient-to-r from-transparent via-surface-elevated/20 to-transparent">
            <div className="bg-surface-elevated/40 p-1.5 rounded-xl border border-border/50 inline-flex gap-1 shadow-inner max-w-full">
            {["params", "auth", "headers", "body"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)} 
                className={`px-4 sm:px-6 py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all duration-300 shrink-0 ${activeTab === tab ? 'bg-surface shadow-sm text-accent border border-border' : 'text-ink-muted hover:text-ink hover:bg-surface-elevated/50 border border-transparent'}`}
              >
                {tab === "params" ? "Query Params" : tab === "auth" ? "Authorization" : tab === "headers" ? "Headers" : "Body"}
              </button>
            ))}
            </div>
          </div>
          
          <div className="min-h-[250px] max-h-[500px] overflow-auto p-6 sm:p-8 bg-surface-elevated/10 flex flex-col transition-all duration-300 custom-scrollbar">
            {activeTab === "params" && renderKeyValueEditor(queryParams, "params")}
            {activeTab === "headers" && renderKeyValueEditor(headers, "headers")}
            
            {activeTab === "auth" && (
              <div className="flex flex-col max-w-2xl h-full">
                <div className="mb-6 flex items-center gap-4">
                  <label className="text-sm font-bold text-ink w-24">Type</label>
                  <CustomSelect
                    value={authMode}
                    onChange={(val) => setAuthMode(val as any)}
                    options={[
                      { label: "No Auth", value: "none" },
                      { label: "Bearer Token", value: "bearer" },
                      { label: "Basic Auth", value: "basic" }
                    ]}
                    className="w-48 z-20"
                    buttonClassName="px-4 py-2.5"
                  />
                </div>
                
                {authMode === "bearer" && (
                  <div className="p-5 border border-border rounded-xl bg-surface">
                    <p className="text-xs text-ink-muted mb-4">The Authorization header will be automatically generated when you send the request.</p>
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-bold text-ink w-24">Token</label>
                      <input
                        type="password"
                        placeholder="Token"
                        value={bearerToken}
                        onChange={(e) => setBearerToken(e.target.value)}
                        className="flex-1 px-4 py-2 bg-surface dark:bg-neutral-800/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all text-ink placeholder-ink-muted/40 shadow-sm"
                      />
                    </div>
                  </div>
                )}
                
                {authMode === "basic" && (
                  <div className="p-5 border border-border rounded-xl bg-surface flex flex-col gap-4">
                    <p className="text-xs text-ink-muted">The Authorization header will be automatically generated using Base64 encoding.</p>
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-bold text-ink w-24">Username</label>
                      <input
                        type="text"
                        placeholder="Username"
                        value={basicUser}
                        onChange={(e) => setBasicUser(e.target.value)}
                        className="flex-1 px-4 py-2 bg-surface dark:bg-neutral-800/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all text-ink placeholder-ink-muted/40 shadow-sm"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-bold text-ink w-24">Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        value={basicPass}
                        onChange={(e) => setBasicPass(e.target.value)}
                        className="flex-1 px-4 py-2 bg-surface dark:bg-neutral-800/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all text-ink placeholder-ink-muted/40 shadow-sm"
                      />
                    </div>
                  </div>
                )}
                
                {authMode === "none" && (
                  <div className="text-sm text-ink-muted/70 italic text-center py-8">
                    This request does not use any authorization.
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "body" && (
              <div className="flex-1 flex flex-col relative group">
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='{
  "key": "value"
}'
                  className="w-full flex-1 bg-surface dark:bg-neutral-800/50 border border-border rounded-xl p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 resize-none transition-all shadow-sm text-ink"
                />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-2 py-1 bg-ink/5 dark:bg-white/10 rounded text-[10px] font-bold text-ink-muted uppercase tracking-wider pointer-events-none">
                    RAW
                  </span>
                  <button 
                    onClick={() => {
                      try {
                        setBody(JSON.stringify(JSON.parse(body), null, 2));
                      } catch(e) {} // ignore invalid json
                    }}
                    className="px-2 py-1 bg-surface border border-border rounded text-[10px] font-bold text-ink hover:text-accent uppercase tracking-wider shadow-sm transition-colors"
                  >
                    Beautify
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Response Pane */}
        <div className="w-full flex flex-col bg-surface-elevated/20 flex-1 overflow-hidden min-h-[400px] z-10 relative">
          
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-sm border-b border-red-200 dark:border-red-800/50 flex items-center gap-3 font-medium">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          {!response && !error && (
            <div className="flex-1 flex flex-col items-center justify-center text-ink-muted/50 p-8 text-center animate-pulse">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <h4 className="text-base font-bold text-ink-muted mb-1 tracking-tight">Response</h4>
              <p className="text-xs max-w-[250px] text-balance">Hit send to inspect the response.</p>
            </div>
          )}

          {response && (
            <div className="flex flex-col h-full animate-in fade-in duration-300">
              {/* Response Meta Dashboard */}
              <div className="flex flex-wrap items-center gap-3 px-5 py-3 border-b border-border bg-surface-elevated/40 shrink-0">
                <span className="text-xs font-bold text-ink-muted uppercase tracking-widest mr-2">Status</span>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-md font-mono font-bold text-xs tracking-wide ${response.status >= 200 && response.status < 300 ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20' : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20'}`}>
                  <div className={`w-2 h-2 rounded-full ${response.status >= 200 && response.status < 300 ? 'bg-green-500' : 'bg-red-500'}`} />
                  {response.status} {response.statusText}
                </div>
                
                <span className="text-xs font-bold text-ink-muted uppercase tracking-widest mx-2">Time</span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface border border-border text-ink-secondary font-mono text-xs">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  {response.timeMs}ms
                </div>
                
                <span className="text-xs font-bold text-ink-muted uppercase tracking-widest mx-2">Size</span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface border border-border text-ink-secondary font-mono text-xs">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                  {(new Blob([response.body]).size / 1024).toFixed(2)} KB
                </div>
              </div>

              {/* Response Tabs */}
              <div className="flex px-5 py-3 gap-2 bg-surface-elevated/40 border-b border-border/50 shrink-0 items-center shadow-sm z-10 relative">
                <div className="bg-surface p-1 rounded-lg border border-border/50 inline-flex gap-1 shadow-inner">
                <button onClick={() => setActiveResponseTab("body")} className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all duration-200 ${activeResponseTab === 'body' ? 'bg-surface-elevated shadow-sm text-accent border border-border/50' : 'text-ink-muted hover:text-ink border border-transparent hover:bg-surface-elevated/30'}`}>
                  Body
                </button>
                <button onClick={() => setActiveResponseTab("headers")} className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all duration-200 ${activeResponseTab === 'headers' ? 'bg-surface-elevated shadow-sm text-accent border border-border/50' : 'text-ink-muted hover:text-ink border border-transparent hover:bg-surface-elevated/30'}`}>
                  Headers
                  <span className="ml-2 bg-ink/5 dark:bg-white/10 text-ink-secondary px-1.5 py-0.5 rounded text-[9px] font-mono">{Object.keys(response.headers).length}</span>
                </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto bg-surface relative group custom-scrollbar">
                {activeResponseTab === "body" && (
                  <pre className="p-6 font-mono text-[13px] leading-relaxed text-ink whitespace-pre-wrap break-words selection:bg-accent/20">
                    {(() => {
                      try {
                        return JSON.stringify(JSON.parse(response.body), null, 2);
                      } catch {
                        return response.body || "// No response body returned from server.";
                      }
                    })()}
                  </pre>
                )}
                {activeResponseTab === "headers" && (
                  <div className="p-6 font-mono text-[13px] leading-relaxed text-ink selection:bg-accent/20">
                    {Object.entries(response.headers || {}).length === 0 && (
                      <span className="text-ink-muted italic">// No headers returned</span>
                    )}
                    {Object.entries(response.headers || {}).map(([key, value]) => (
                      <div key={key} className="flex gap-4 mb-2 hover:bg-surface-elevated px-3 py-1.5 rounded-lg transition-colors -mx-3">
                        <span className="font-bold text-ink w-1/3 shrink-0 break-words">{key}:</span>
                        <span className="text-ink-secondary break-words">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Copy Button Helper */}
                <button 
                  onClick={() => navigator.clipboard.writeText(activeResponseTab === 'body' ? response.body : JSON.stringify(response.headers, null, 2))}
                  className="absolute top-4 right-4 p-2 bg-surface-elevated border border-border shadow-sm hover:shadow text-ink rounded-lg opacity-0 group-hover:opacity-100 transition-all z-20"
                  title="Copy to clipboard"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
