"use client";

import React, { createContext, useContext } from "react";

interface WorkspaceTranslationContextType {
  t: (key: string, defaultValue?: string) => string;
}

const WorkspaceTranslationContext = createContext<WorkspaceTranslationContextType | null>(null);

interface WorkspaceTranslationProviderProps {
  children: React.ReactNode;
  dictionary: Record<string, string>;
}

export function WorkspaceTranslationProvider({
  children,
  dictionary,
}: WorkspaceTranslationProviderProps) {
  const t = (key: string, defaultValue?: string): string => {
    return dictionary?.[key] ?? defaultValue ?? key;
  };

  return (
    <WorkspaceTranslationContext.Provider value={{ t }}>
      {children}
    </WorkspaceTranslationContext.Provider>
  );
}

export function useWorkspaceTranslation() {
  const context = useContext(WorkspaceTranslationContext);
  if (!context) {
    // Fallback: If context is not rendered (like in standard English route), return default value
    return (key: string, defaultValue?: string): string => defaultValue ?? key;
  }
  return context.t;
}
