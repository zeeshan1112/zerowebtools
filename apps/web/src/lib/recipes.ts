export interface RecipeStep {
  title: string;
  description: string;
  toolId?: string; // Optional direct tool association
}

export interface ChainingRecipe {
  slug: string;
  title: string;
  metaDescription: string;
  description: string;
  toolChain: string[]; // Tool IDs in this chain
  steps: RecipeStep[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const RECIPES: ChainingRecipe[] = [
  {
    slug: "merge-and-compress-pdf",
    title: "How to Merge and Compress PDF Files Offline in One Go",
    metaDescription: "Learn how to combine multiple PDF files and immediately compress the file size without download-upload loops. 100% private and offline.",
    description: "Combining and shrinking PDF documents usually requires uploading files to separate web converters, downloading a combined file, renaming it, and uploading it again to compress. ZeroWebTools simplifies this with a connected visual pipeline. Perform both operations inside a single browser tab, with zero server uploads.",
    toolChain: ["pdf-merge", "pdf-compress"],
    steps: [
      {
        title: "Step 1: Merge Your PDFs",
        description: "Open the Merge PDF tool, upload your documents, rearrange page order visually, and click Merge.",
        toolId: "pdf-merge"
      },
      {
        title: "Step 2: Microchain to Compress",
        description: "Once merged, instead of downloading, click the inline 'Compress' button to automatically pass the merged document directly to the Compressor workspace.",
        toolId: "pdf-compress"
      },
      {
        title: "Step 3: Choose Compression & Download",
        description: "Select your desired compression level (Balanced, Extreme, or Lossless) and save your optimized PDF to your device."
      }
    ],
    faqs: [
      {
        question: "Do my files get uploaded to the server during this pipeline?",
        answer: "No. The files are merged and compressed entirely within your browser memory using local libraries. No data is sent online."
      },
      {
        question: "Can I also password-protect the merged file?",
        answer: "Yes, you can continue chaining by passing the compressed output into the 'Protect PDF' tool to lock it with a password before saving."
      }
    ]
  },
  {
    slug: "format-json-and-base64-encode",
    title: "How to Beautify and Base64-Encode JSON Data Securely",
    metaDescription: "Validate, format, and encode JSON payloads to Base64 in one click. Complete local browser privacy for sensitive coder credentials.",
    description: "Developers frequently need to format raw JSON response payloads and encode them to Base64 for query parameters or configuration scripts. ZeroWebTools connects these steps, enabling you to beautify raw JSON, validate syntax, and instantly Base64-encode the result entirely client-side.",
    toolChain: ["json-formatter", "base64-encoder"],
    steps: [
      {
        title: "Step 1: Beautify Raw JSON",
        description: "Paste your raw or minified JSON data into the Formatter. The tool highlights keys, values, and flags any syntax errors instantly.",
        toolId: "json-formatter"
      },
      {
        title: "Step 2: Chain to Base64 Encoder",
        description: "Click the 'Base64 Encode' button in the output header to instantly transfer the clean, formatted JSON straight into the Base64 encoder workspace.",
        toolId: "base64-encoder"
      },
      {
        title: "Step 3: Copy Encoded Output",
        description: "The Base64 encoded string is generated instantly in the output block. Copy it to your clipboard with a single click."
      }
    ],
    faqs: [
      {
        question: "Is it safe to format credentials or keys?",
        answer: "Yes. All formatting and Base64 encoding are executed locally on your machine, ensuring complete privacy for credentials, session tokens, and keys."
      },
      {
        question: "Can I also minify the JSON before encoding it?",
        answer: "Yes, you can toggle the 'Minify' button in the JSON Formatter workspace before passing it into the Base64 encoder."
      }
    ]
  },
  {
    slug: "heic-to-jpg-and-resize",
    title: "How to Convert HEIC to JPG and Bulk Resize iPhone Images",
    metaDescription: "Convert Apple HEIC photos to JPG format and resize the dimensions in batch. Fast, local browser execution with complete privacy.",
    description: "iPhone HEIC photos are high quality but incompatible with many web portals and are often too large to share. ZeroWebTools combines conversion and resizing in a single browser workflow. Convert Apple photos to JPG and resize their width/height in batch without uploading a single pixel.",
    toolChain: ["heic-to-jpg", "bulk-image-resizer"],
    steps: [
      {
        title: "Step 1: Upload and Convert HEIC Photos",
        description: "Drop your HEIC files into the converter. Select JPG or PNG output, choose quality settings, and convert.",
        toolId: "heic-to-jpg"
      },
      {
        title: "Step 2: Chain to Image Resizer",
        description: "Once converted, select 'Bulk Resize' to send the newly generated JPEGs straight into the Bulk Image Resizer workspace.",
        toolId: "bulk-image-resizer"
      },
      {
        title: "Step 3: Scale and Compress Dimensions",
        description: "Set width, height, or scale percentage. Compress to your desired file weight and download the batch as a clean ZIP."
      }
    ],
    faqs: [
      {
        question: "Are my personal photographs uploaded to your server?",
        answer: "No. The image decoding (HEIC) and scaling/compression are processed locally on your device's GPU/CPU. Your photos remain fully secure."
      },
      {
        question: "Which format is best for web performance?",
        answer: "Converting HEIC to WEBP or compressed JPG and scaling down dimensions is highly recommended for faster page loads and SEO."
      }
    ]
  },
  {
    slug: "password-generate-and-hash",
    title: "How to Generate Secure Passwords and Calculate Hash Checksums",
    metaDescription: "Generate cryptographically secure passwords and calculate their SHA-256 hashes locally. Secure browser utility for database setup.",
    description: "System administrators and developers frequently need to generate random, high-entropy passwords and calculate their cryptographic hash checksums (like SHA-256 or MD5) for database credentials or user configurations. This recipe guides you through doing this instantly in your browser without network transfers.",
    toolChain: ["password-generator", "file-hasher"],
    steps: [
      {
        title: "Step 1: Create a Secure Password",
        description: "Use the Password Generator to create a strong, random password. Customize length, numbers, and symbols to achieve high entropy.",
        toolId: "password-generator"
      },
      {
        title: "Step 2: Chain to Hash Generator",
        description: "Select 'Calculate Hash' to instantly pass the generated password string directly into the File and String Hasher workspace.",
        toolId: "file-hasher"
      },
      {
        title: "Step 3: Select Algorithm & Copy Digest",
        description: "Choose your cryptographic digest (SHA-256, SHA-512, or MD5) to generate the hash instantly. Copy the value to your clipboard."
      }
    ],
    faqs: [
      {
        question: "Is the password generator secure against online trackers?",
        answer: "Yes, the generation uses the browser's native CSPRNG (Web Crypto API) locally in-memory, ensuring no key values are leaked online."
      },
      {
        question: "Can I hash files with this tool?",
        answer: "Yes, the File Hasher supports hashing both raw text strings (like passwords) and physical files uploaded locally."
      }
    ]
  }
];
