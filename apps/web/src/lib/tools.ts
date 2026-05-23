export type ToolStatus = "live" | "coming-soon";

export interface Tool {
  id: string;
  title: string;
  description: string;
  status: ToolStatus;
  metaDescription: string;
}

export interface ToolCategory {
  slug: string;
  title: string;
  description: string;
  tools: Tool[];
}

export const CATEGORIES: ToolCategory[] = [
  {
    slug: "mortgage-loan",
    title: "Mortgage & Loan",
    description: "Calculate payments, compare rates, and plan your home financing with precision.",
    tools: [
      {
        id: "mortgage-calculator",
        title: "Mortgage Calculator",
        description: "Estimate monthly mortgage payments with taxes, insurance, and amortization schedule.",
        status: "live",
        metaDescription:
          "Free mortgage calculator. Estimate monthly payments, total interest, and amortization schedule for any home loan.",
      },
      {
        id: "loan-calculator",
        title: "Loan Calculator",
        description: "Calculate monthly payments and total interest for personal, auto, and student loans.",
        status: "coming-soon",
        metaDescription:
          "Free loan payment calculator. Compute monthly payments and total interest for personal, auto, and student loans.",
      },
      {
        id: "refinance-calculator",
        title: "Refinance Calculator",
        description: "See if refinancing your mortgage saves money. Compare current and new loan terms side by side.",
        status: "coming-soon",
        metaDescription:
          "Free refinance calculator. Compare your current mortgage against new terms to see potential savings on monthly payments and total interest.",
      },
      {
        id: "compound-interest-calculator",
        title: "Compound Interest Calculator",
        description: "Project investment growth over time with regular contributions and compounding periods.",
        status: "coming-soon",
        metaDescription:
          "Free compound interest calculator. Project savings growth with contributions, compounding frequency, and detailed year-by-year breakdowns.",
      },
      {
        id: "auto-loan-calculator",
        title: "Auto Loan Calculator",
        description: "Estimate car payments with down payment, trade-in value, sales tax, and loan term options.",
        status: "coming-soon",
        metaDescription:
          "Free auto loan calculator. Estimate monthly car payments including down payment, trade-in, sales tax, and loan term.",
      },
      {
        id: "apr-calculator",
        title: "APR Calculator",
        description: "Determine the true annual percentage rate of a loan including fees and closing costs.",
        status: "coming-soon",
        metaDescription:
          "Free APR calculator. Calculate the true annual percentage rate of a loan by including fees, closing costs, and other charges.",
      },
    ],
  },
  {
    slug: "investment-tax",
    title: "Investment & Tax",
    description: "Plan your financial future with ROI, tax, and savings calculators.",
    tools: [
      {
        id: "investment-calculator",
        title: "Investment Calculator",
        description: "Project investment returns with initial deposit, monthly contributions, and varied return rates.",
        status: "coming-soon",
        metaDescription:
          "Free investment calculator. Project portfolio growth with initial deposits, recurring contributions, and customizable return rates.",
      },
      {
        id: "savings-calculator",
        title: "Savings Calculator",
        description: "See how your savings grow over time with regular deposits and compound interest.",
        status: "coming-soon",
        metaDescription:
          "Free savings calculator. Visualize how regular deposits and compound interest grow your savings over any time period.",
      },
      {
        id: "salary-calculator",
        title: "Salary Calculator",
        description: "Convert between hourly, daily, weekly, biweekly, monthly, and annual salary figures.",
        status: "coming-soon",
        metaDescription:
          "Free salary calculator. Convert hourly wage to annual salary or vice versa. Compare earnings across different pay periods.",
      },
      {
        id: "income-tax-calculator",
        title: "Income Tax Calculator",
        description: "Estimate your federal income tax bracket, effective rate, and take-home pay.",
        status: "coming-soon",
        metaDescription:
          "Free income tax calculator. Estimate your federal tax bracket, effective rate, deductions, and take-home pay for any income.",
      },
      {
        id: "roi-calculator",
        title: "ROI Calculator",
        description: "Calculate return on investment with gains, costs, and holding period for any asset.",
        status: "coming-soon",
        metaDescription:
          "Free ROI calculator. Determine return on investment percentage with detailed gains, costs, and annualized rate of return.",
      },
      {
        id: "inflation-calculator",
        title: "Inflation Calculator",
        description: "See how inflation affects purchasing power over time using historical CPI data.",
        status: "coming-soon",
        metaDescription:
          "Free inflation calculator. Adjust any dollar amount for inflation using historical Consumer Price Index data from 1913 to present.",
      },
    ],
  },
  {
    slug: "health-fitness",
    title: "Health & Fitness",
    description: "Track your health metrics with BMI, calorie, and macro calculators.",
    tools: [
      {
        id: "bmi-calculator",
        title: "BMI Calculator",
        description: "Calculate your Body Mass Index instantly and understand your weight category.",
        status: "coming-soon",
        metaDescription:
          "Free BMI calculator. Calculate your Body Mass Index instantly and see which weight category you fall into based on WHO guidelines.",
      },
      {
        id: "calorie-calculator",
        title: "Calorie Calculator",
        description: "Estimate daily calorie needs based on age, weight, height, and activity level.",
        status: "coming-soon",
        metaDescription:
          "Free calorie calculator. Estimate your daily caloric needs based on age, weight, height, gender, and activity level using the Mifflin-St Jeor equation.",
      },
      {
        id: "macro-calculator",
        title: "Macro Calculator",
        description: "Calculate your protein, carb, and fat targets for any fitness goal.",
        status: "coming-soon",
        metaDescription:
          "Free macro calculator. Determine your ideal protein, carbohydrate, and fat intake based on your TDEE and fitness goals.",
      },
      {
        id: "body-fat-calculator",
        title: "Body Fat Calculator",
        description: "Estimate body fat percentage using the US Navy method with tape measurements.",
        status: "coming-soon",
        metaDescription:
          "Free body fat calculator. Estimate your body fat percentage using the US Navy tape measure method with waist, neck, and height inputs.",
      },
      {
        id: "ideal-weight-calculator",
        title: "Ideal Weight Calculator",
        description: "Find your ideal weight range using multiple scientific formulas and BMI guidelines.",
        status: "coming-soon",
        metaDescription:
          "Free ideal weight calculator. Find your healthy weight range using Devine, Robinson, Miller, and Hamwi formulas alongside BMI guidelines.",
      },
      {
        id: "tdee-calculator",
        title: "TDEE Calculator",
        description: "Calculate your Total Daily Energy Expenditure to plan nutrition and training.",
        status: "coming-soon",
        metaDescription:
          "Free TDEE calculator. Compute your Total Daily Energy Expenditure based on BMR and activity level for precise nutrition planning.",
      },
    ],
  },
  {
    slug: "math-percentage",
    title: "Math & Percentage",
    description: "Everyday math tools from percentages to fractions and beyond.",
    tools: [
      {
        id: "percentage-calculator",
        title: "Percentage Calculator",
        description: "Calculate percentages, percentage change, and percentage of a number instantly.",
        status: "coming-soon",
        metaDescription:
          "Free percentage calculator. Find what percent of a number is, percentage increase or decrease, and percentage difference between two values.",
      },
      {
        id: "fraction-calculator",
        title: "Fraction Calculator",
        description: "Add, subtract, multiply, and divide fractions with step-by-step solutions.",
        status: "coming-soon",
        metaDescription:
          "Free fraction calculator. Add, subtract, multiply, and divide fractions and mixed numbers with detailed step-by-step solutions.",
      },
      {
        id: "age-calculator",
        title: "Age Calculator",
        description: "Calculate exact age in years, months, and days from any birthdate.",
        status: "coming-soon",
        metaDescription:
          "Free age calculator. Calculate your exact age in years, months, and days from your date of birth with next birthday countdown.",
      },
      {
        id: "time-calculator",
        title: "Time Calculator",
        description: "Add and subtract hours, minutes, and seconds. Convert between time units.",
        status: "coming-soon",
        metaDescription:
          "Free time calculator. Add or subtract time durations in hours, minutes, and seconds. Convert between time units instantly.",
      },
      {
        id: "square-footage-calculator",
        title: "Square Footage Calculator",
        description: "Calculate area for rooms, properties, and land in square feet, meters, and acres.",
        status: "coming-soon",
        metaDescription:
          "Free square footage calculator. Measure area for rooms, properties, and land plots in square feet, square meters, and acres.",
      },
    ],
  },
  {
    slug: "pdf-tools",
    title: "PDF Tools",
    description: "Merge, split, compress, rotate, convert, and secure PDFs — all in your browser.",
    tools: [
      { id: "pdf-merge", title: "Merge PDF", description: "Combine multiple PDFs into a single document in any order.", status: "live", metaDescription: "Free online PDF merger. Combine PDF files in any order. All processing in your browser." },
      { id: "pdf-split", title: "Split PDF", description: "Extract or remove individual pages from PDF documents.", status: "live", metaDescription: "Free online PDF splitter. Extract specific pages or split ranges from PDF files. All in your browser." },
      { id: "pdf-compress", title: "Compress PDF", description: "Reduce PDF file size by removing unused objects and optimizing streams.", status: "live", metaDescription: "Free online PDF compressor. Reduce file size while preserving quality. Fully client-side." },
      { id: "pdf-rotate", title: "Rotate PDF", description: "Rotate individual pages or entire PDFs by 90, 180, or 270 degrees.", status: "live", metaDescription: "Free online PDF rotation tool. Rotate pages clockwise or counterclockwise by 90, 180, or 270 degrees." },
      { id: "pdf-to-jpg", title: "PDF to JPG", description: "Convert each PDF page to a high-resolution JPG image.", status: "live", metaDescription: "Free online PDF to JPG converter. Render PDF pages as high-quality JPEG images. Batch conversion supported." },
      { id: "jpg-to-pdf", title: "JPG to PDF", description: "Convert multiple JPG images into a single PDF document.", status: "live", metaDescription: "Free online JPG to PDF converter. Combine images into a PDF with adjustable page size and margins." },
      { id: "pdf-protect", title: "Protect PDF", description: "Add password encryption to PDF files to prevent unauthorized access.", status: "live", metaDescription: "Free online PDF protection tool. Add password encryption and set permissions for printing and editing." },
      { id: "pdf-watermark", title: "Add Watermark", description: "Stamp text or image watermarks onto PDF pages.", status: "live", metaDescription: "Free online PDF watermark tool. Add text watermarks to PDF pages with customizable font, size, and opacity." },
      { id: "pdf-page-numbers", title: "Add Page Numbers", description: "Insert page numbers into PDF documents with custom position and formatting.", status: "live", metaDescription: "Free online page numbering tool. Add page numbers to PDFs with custom position, font, size, and starting number." },
      { id: "pdf-organize", title: "Organize PDF", description: "Reorder, delete, or extract pages from PDF documents.", status: "live", metaDescription: "Free online PDF organizer. Drag and drop pages to reorder, delete, or extract them. All in your browser." },
      { id: "pdf-unlock", title: "Unlock PDF", description: "Remove password protection from PDF files (requires you to know the password).", status: "live", metaDescription: "Free online PDF unlocker. Remove password encryption from PDFs. Must have the password to unlock. All in your browser." },
    ],
  },
  {
    slug: "image-tools",
    title: "Image Tools",
    description: "Convert, resize, and compress images right in your browser. No uploads needed.",
    tools: [
      {
        id: "heic-to-jpg",
        title: "HEIC to JPG / PNG",
        description: "Convert Apple HEIC photos to JPG or PNG format instantly. Batch upload supported.",
        status: "live",
        metaDescription:
          "Free online HEIC to JPG and HEIC to PNG converter. Instantly convert Apple HEIC photos to standard formats. Batch upload, bulk download. All processing in your browser.",
      },
      {
        id: "bulk-image-resizer",
        title: "Bulk Image Resizer & Compressor",
        description: "Resize, compress, and convert multiple images at once. Download as ZIP.",
        status: "coming-soon",
        metaDescription:
          "Free bulk image resizer and compressor. Resize multiple images, compress by quality, batch convert to WebP or JPEG. All in your browser.",
      },
    ],
  },
  {
    slug: "converters",
    title: "Unit Converters",
    description: "Quickly convert between measurement systems and data formats.",
    tools: [
      {
        id: "json-formatter",
        title: "JSON Formatter",
        description: "Validate, beautify, and minify JSON data with real-time error detection.",
        status: "live",
        metaDescription:
          "Free online JSON formatter. Validate, beautify, and minify JSON data instantly with no data leaving your browser.",
      },
      {
        id: "case-converter",
        title: "Case Converter",
        description: "Transform text between camelCase, snake_case, kebab-case, and more.",
        status: "live",
        metaDescription:
          "Free online case converter. Transform text between camelCase, snake_case, kebab-case, PascalCase, and CONSTANT_CASE instantly.",
      },
      {
        id: "base64-encoder",
        title: "Base64 Encoder / Decoder",
        description: "Encode text or files to Base64 and decode Base64 back to readable format.",
        status: "coming-soon",
        metaDescription:
          "Free online Base64 encoder and decoder. Convert text and files to and from Base64 format instantly.",
      },
      {
        id: "celsius-fahrenheit",
        title: "Celsius to Fahrenheit",
        description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly.",
        status: "coming-soon",
        metaDescription:
          "Free temperature converter. Instantly convert between Celsius, Fahrenheit, and Kelvin with precise results and common reference points.",
      },
      {
        id: "unit-converter",
        title: "Unit Converter",
        description: "Convert between length, weight, volume, speed, and dozens of other unit types.",
        status: "coming-soon",
        metaDescription:
          "Free online unit converter. Convert between length, weight, volume, speed, area, and dozens of other measurement types instantly.",
      },
      {
        id: "color-converter",
        title: "Color Converter",
        description: "Convert between HEX, RGB, HSL, and named colors with live preview swatches.",
        status: "coming-soon",
        metaDescription:
          "Free color converter. Convert between HEX, RGB, HSL, and CMYK color formats with live preview swatches and copy-to-clipboard support.",
      },
    ],
  },
];

export const ALL_TOOLS: Tool[] = CATEGORIES.flatMap((c) => c.tools);

export const CATEGORY_TAG_STYLES: Record<string, string> = {
  "mortgage-loan": "bg-emerald-50 text-emerald-800",
  "investment-tax": "bg-blue-50 text-blue-800",
  "health-fitness": "bg-rose-50 text-rose-800",
  "math-percentage": "bg-amber-50 text-amber-800",
  "pdf-tools": "bg-red-50 text-red-800",
  "image-tools": "bg-sky-50 text-sky-800",
  converters: "bg-violet-50 text-violet-800",
};

export function getToolById(id: string): Tool | undefined {
  return ALL_TOOLS.find((t) => t.id === id);
}

export function getCategoryForTool(toolId: string): ToolCategory | undefined {
  return CATEGORIES.find((c) => c.tools.some((t) => t.id === toolId));
}