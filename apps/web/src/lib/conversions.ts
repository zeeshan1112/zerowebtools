export interface ConversionPairing {
  slug: string;
  title: string;
  metaDescription: string;
  description: string;
  fromFormat: string;
  toFormat: string;
  toolId: string; // The tool workspace that performs this conversion
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const CONVERSIONS: ConversionPairing[] = [
  {
    slug: "png-to-pdf",
    title: "Convert PNG to PDF Online Free & Private",
    metaDescription: "Convert PNG images to PDF documents instantly. 100% local, browser-based conversion with no server uploads for complete data privacy.",
    description: "Need to turn PNG graphics, screenshots, or receipts into a clean PDF document? ZeroWebTools handles the entire conversion client-side in your browser. Drop your files, set page parameters, and compile a PDF in milliseconds on your own processor.",
    fromFormat: "PNG",
    toFormat: "PDF",
    toolId: "jpg-to-pdf",
    faqs: [
      {
        question: "Is my PNG photo uploaded to any server?",
        answer: "No. The conversion is processed entirely in your browser memory using local JS and canvas libraries. Your images never leave your computer."
      },
      {
        question: "Can I combine multiple PNG files into one PDF?",
        answer: "Yes, our converter allows batch uploads. You can combine multiple PNG or JPG images into a single consolidated PDF document."
      }
    ]
  },
  {
    slug: "webp-to-pdf",
    title: "Convert WEBP to PDF Online Free & Private",
    metaDescription: "Convert modern WEBP images to PDF documents. Private, local browser-based converter with zero wait times and no signup.",
    description: "WEBP is standard for web graphics, but PDF is required for printing and contracts. ZeroWebTools converts WEBP files to standard PDF layouts locally. Drop your files, arrange sequences, and download your document instantly.",
    fromFormat: "WEBP",
    toFormat: "PDF",
    toolId: "jpg-to-pdf",
    faqs: [
      {
        question: "Does the tool support other image formats?",
        answer: "Yes, the workspace handles JPG, PNG, WEBP, and SVG formats, allowing you to combine them all into a single PDF document."
      },
      {
        question: "Is there a file size limit for converting WEBP?",
        answer: "Since the processing is done locally on your machine, there are no artificial file limits. You are only limited by your device's memory."
      }
    ]
  },
  {
    slug: "pdf-to-png",
    title: "Convert PDF to PNG Images Online Free & Private",
    metaDescription: "Convert PDF pages to high-resolution PNG images. Free in-browser batch converter with zero server tracking and absolute privacy.",
    description: "Need to extract pages from a PDF as separate PNG image files? ZeroWebTools renders PDF pages onto canvas objects locally and saves them as high-quality PNGs, preserving visual clarity without server uploads.",
    fromFormat: "PDF",
    toFormat: "PNG",
    toolId: "pdf-to-jpg",
    faqs: [
      {
        question: "Why should I convert PDF to PNG instead of JPG?",
        answer: "PNG is a lossless image format. It preserves sharp edges, text clarity, and transparency, making it ideal for converting text-heavy PDF pages."
      },
      {
        question: "How are the images downloaded?",
        answer: "You can download converted PNG pages individually, or download all pages at once packaged inside a single ZIP file, rendered completely in your browser."
      }
    ]
  },
  {
    slug: "jpg-to-png",
    title: "Convert JPG to PNG Images Online Free & Private",
    metaDescription: "Convert JPG photos to PNG format instantly. 100% client-side batch converter with no server uploads and complete privacy.",
    description: "Switch JPG images to PNG format instantly inside your browser. Useful for transparency layers or lossless compression. No file uploads or signup required.",
    fromFormat: "JPG",
    toFormat: "PNG",
    toolId: "bulk-image-resizer",
    faqs: [
      {
        question: "Can I convert multiple JPG photos in batch?",
        answer: "Yes, the resizer and converter handles multiple files simultaneously, allowing you to convert and resize dozens of photos at once."
      },
      {
        question: "Are my photos kept secure?",
        answer: "Absolutely. All processing occurs locally on your machine, ensuring complete privacy for personal photos and screenshots."
      }
    ]
  },
  {
    slug: "png-to-jpg",
    title: "Convert PNG to JPG Photos Online Free & Private",
    metaDescription: "Convert PNG images to standard JPG format in batch. Free browser-based converter with local execution for total file privacy.",
    description: "Convert PNG graphics to standard JPG formats in batch to save disk space or ensure web compatibility. All processing is executed client-side on your processor.",
    fromFormat: "PNG",
    toFormat: "JPG",
    toolId: "bulk-image-resizer",
    faqs: [
      {
        question: "Will converting PNG to JPG reduce image quality?",
        answer: "JPG is a lossy format, but you can adjust the output quality slider (e.g., to 90%) to compress the file size with virtually no visible difference."
      },
      {
        question: "Does this converter support offline usage?",
        answer: "Yes. Once the page is loaded, the conversion script runs completely offline in your browser's local sandbox."
      }
    ]
  }
];
