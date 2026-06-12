"use client";

import React, { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { ResumeDocument } from "./ResumePDFTemplates";
import { ResumeData } from "./resume-types";

interface Props {
  data: ResumeData;
  className?: string;
  showToolbar?: boolean;
}

const ReactPDFViewer = ({ data, className = "absolute inset-0", showToolbar = true }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={className}>
      <PDFViewer style={{ width: "100%", height: "100%", border: "none" }} showToolbar={showToolbar}>
        <ResumeDocument data={data} />
      </PDFViewer>
    </div>
  );
};

export default React.memo(ReactPDFViewer);
