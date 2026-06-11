"use client";

import React, { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { ResumeDocument } from "./ResumePDFTemplates";
import { ResumeData } from "./resume-types";

interface Props {
  data: ResumeData;
}

const ReactPDFViewer = ({ data }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0">
      <PDFViewer style={{ width: "100%", height: "100%", border: "none" }} showToolbar={true}>
        <ResumeDocument data={data} />
      </PDFViewer>
    </div>
  );
};

export default React.memo(ReactPDFViewer);
