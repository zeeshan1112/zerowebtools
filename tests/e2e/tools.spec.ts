import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("ZeroWebTools Suite E2E Tests", () => {
  const dummyPdfPath = path.join(__dirname, "..", "fixtures", "dummy.pdf");
  const tempProtectedPath = path.join(__dirname, "..", "fixtures", `temp-protected-${Math.floor(Math.random() * 1000000)}.pdf`);

  test.afterAll(() => {
    // Clean up temporary protected PDF file if it was created
    if (fs.existsSync(tempProtectedPath)) {
      fs.unlinkSync(tempProtectedPath);
    }
  });

  test("1. JSON Formatter - Formatting & Validation", async ({ page }) => {
    await page.goto("/tools/json-formatter");

    // Check header
    await expect(page.locator("h1")).toContainText("JSON Formatter");

    // Target the editor textarea
    const textarea = page.locator("textarea");
    await expect(textarea).toBeVisible();

    // Test INVALID JSON input
    await textarea.fill('{"invalid": json');
    await expect(page.locator(".text-red-500")).toBeVisible();
    await expect(page.locator(".text-red-500")).not.toBeEmpty();

    // Test VALID JSON input
    await textarea.fill('{"key1": "value1", "nested": {"num": 100}}');
    await expect(page.locator(".text-red-500")).not.toBeVisible();
    
    // Check tree view renders the keys and values
    await expect(page.locator(".overflow-auto").getByText("key1:")).toBeVisible();
    await expect(page.locator(".overflow-auto").getByText('"value1"')).toBeVisible();
    await expect(page.locator(".overflow-auto").getByText("nested:")).toBeVisible();
  });

  test("2. SaaS MRR Projections - Math & Visual Calculation", async ({ page }) => {
    await page.goto("/tools/saas-mrr");

    // Check headings
    await expect(page.locator("h1")).toContainText("SaaS MRR Projections");

    // Initial Month 12 MRR check
    const initialMonth12Mrr = page.locator("output").first();
    await expect(initialMonth12Mrr).toBeVisible();
    const initialText = await initialMonth12Mrr.innerText();

    // Locate starting MRR range input and change its value
    const mrrSlider = page.locator("#initial-mrr");
    await mrrSlider.fill("50000"); // Change starting MRR to $50,000

    // Month 12 MRR should update
    await expect(initialMonth12Mrr).not.toHaveText(initialText);
    await expect(initialMonth12Mrr).toContainText("$85,517"); // Formula output check: $50000 * (1 + 0.08 - 0.03)^11 ... approx $85,517 (compounded monthly)
  });

  test("3. PDF Merge - Combining Documents", async ({ page }) => {
    await page.goto("/tools/pdf-merge");

    // Check page
    await expect(page.locator("h1")).toContainText("Merge PDF");

    // Input file loader
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles([dummyPdfPath, dummyPdfPath]);

    // Check list of uploaded files appears
    await expect(page.locator("text=dummy.pdf").first()).toBeVisible();

    // Click Merge button
    await page.click('button:has-text("Merge")');

    // Wait for the processing overlay to finish and download button to appear
    const downloadButton = page.locator('button:has-text("Download")').first();
    await expect(downloadButton).toBeVisible({ timeout: 6000 });

    // Catch download event
    const downloadPromise = page.waitForEvent("download");
    await downloadButton.click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toBe("merged.pdf");
  });

  test("4. PDF Protect & Unlock Flow", async ({ page }) => {
    // --- Phase 4a: Protect PDF ---
    await page.goto("/tools/pdf-protect");
    await expect(page.locator("h1")).toContainText("Protect PDF");

    // Upload dummy PDF
    await page.setInputFiles('input[type="file"]', dummyPdfPath);
    await expect(page.locator("text=dummy.pdf")).toBeVisible();

    // Type password
    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill("supersecure123");

    // Click encrypt and download protected PDF
    const protectDownloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Protect PDF")');
    const protectDownload = await protectDownloadPromise;

    // Save download to temp path
    await protectDownload.saveAs(tempProtectedPath);
    expect(fs.existsSync(tempProtectedPath)).toBe(true);

    // --- Phase 4b: Unlock PDF (Wrong Password) ---
    await page.goto("/tools/pdf-unlock");
    await expect(page.locator("h1")).toContainText("Unlock PDF");

    // Upload newly protected PDF
    await page.setInputFiles('input[type="file"]', tempProtectedPath);
    await expect(page.locator(`text=${path.basename(tempProtectedPath)}`)).toBeVisible();

    // Enter WRONG password
    const unlockPasswordInput = page.locator('input[type="password"]');
    await unlockPasswordInput.fill("wrongpassword");

    // Click Unlock - should show error, no download triggered
    await page.click('button:has-text("Unlock PDF")');
    const errorText = page.locator(".text-red-500");
    await expect(errorText).toBeVisible();
    await expect(errorText).toContainText("password");

    // --- Phase 4c: Unlock PDF (Correct Password) ---
    await unlockPasswordInput.fill("supersecure123");

    const unlockDownloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Unlock PDF")');
    const unlockDownload = await unlockDownloadPromise;

    const expectedUnlockFilename = `${path.basename(tempProtectedPath, ".pdf")}-unlocked.pdf`;
    expect(unlockDownload.suggestedFilename()).toBe(expectedUnlockFilename);
  });

  test("5. PDF Split", async ({ page }) => {
    await page.goto("/tools/pdf-split");
    await expect(page.locator("h1")).toContainText("Split PDF");
    await page.setInputFiles('input[type="file"]', dummyPdfPath);
    await expect(page.locator("text=dummy.pdf").first()).toBeVisible();

    // Fill in range value
    await page.locator('input[placeholder*="e.g."]').fill("1");

    const downloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Extract Pages")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("split.zip");
  });

  test("6. PDF Compress", async ({ page }) => {
    await page.goto("/tools/pdf-compress");
    await expect(page.locator("h1")).toContainText("Compress PDF");
    await page.setInputFiles('input[type="file"]', dummyPdfPath);
    await expect(page.locator("text=dummy.pdf").first()).toBeVisible();

    const downloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Compress PDF")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("dummy-compressed.pdf");
  });

  test("7. PDF Rotate", async ({ page }) => {
    await page.goto("/tools/pdf-rotate");
    await expect(page.locator("h1")).toContainText("Rotate PDF");
    await page.setInputFiles('input[type="file"]', dummyPdfPath);
    await expect(page.locator("text=dummy.pdf").first()).toBeVisible();

    const downloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Rotate PDF")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("dummy-rotated.pdf");
  });

  test("8. PDF to JPG Converter", async ({ page }) => {
    await page.goto("/tools/pdf-to-jpg");
    await expect(page.locator("h1")).toContainText("PDF to JPG");
    await page.setInputFiles('input[type="file"]', dummyPdfPath);

    const convertButton = page.locator('button:has-text("Convert")');
    await expect(convertButton).toContainText("pages to JPG");

    const downloadPromise = page.waitForEvent("download");
    await convertButton.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("document.zip");
  });

  test("9. JPG to PDF Converter", async ({ page }) => {
    const dummyJpgPath = path.join(__dirname, "..", "fixtures", "dummy.jpg");
    await page.goto("/tools/jpg-to-pdf");
    await expect(page.locator("h1")).toContainText("JPG to PDF");
    await page.setInputFiles('input[type="file"]', dummyJpgPath);
    await expect(page.locator("text=dummy.jpg").first()).toBeVisible();

    const downloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Create PDF")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("document.pdf");
  });

  test("10. PDF Watermark", async ({ page }) => {
    await page.goto("/tools/pdf-watermark");
    await expect(page.locator("h1")).toContainText("Add Watermark");
    await page.setInputFiles('input[type="file"]', dummyPdfPath);
    await expect(page.locator("text=dummy.pdf").first()).toBeVisible();

    await page.locator('input[value="CONFIDENTIAL"]').fill("TEST-WATERMARK");

    const downloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Add Watermark")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("dummy-watermarked.pdf");
  });

  test("11. PDF Page Numbers", async ({ page }) => {
    await page.goto("/tools/pdf-page-numbers");
    await expect(page.locator("h1")).toContainText("Add Page Numbers");
    await page.setInputFiles('input[type="file"]', dummyPdfPath);
    await expect(page.locator("text=dummy.pdf").first()).toBeVisible();

    const downloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Add Page Numbers")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("dummy-numbered.pdf");
  });

  test("12. PDF Organize", async ({ page }) => {
    await page.goto("/tools/pdf-organize");
    await expect(page.locator("h1")).toContainText("Organize PDF");
    await page.setInputFiles('input[type="file"]', dummyPdfPath);
    await expect(page.locator("text=dummy.pdf").first()).toBeVisible();

    await page.locator('input[placeholder*="e.g."]').fill("1");

    const downloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Organize PDF")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("dummy-organized.pdf");
  });

  test("13. Case Converter - Interactive", async ({ page }) => {
    await page.goto("/tools/case-converter");
    await expect(page.locator("h1")).toContainText("Case Converter");

    const input = page.locator("#text-input");
    await input.fill("Hello World");

    // Check case results update dynamically
    await expect(page.locator("text=helloWorld")).toBeVisible();
    await expect(page.locator("text=hello_world")).toBeVisible();
    await expect(page.locator("text=hello-world")).toBeVisible();
  });

  test("14. HEIC Photo Converter - Graceful Error Path", async ({ page }) => {
    const dummyHeicPath = path.join(__dirname, "..", "fixtures", "dummy.heic");
    await page.goto("/tools/heic-to-jpg");
    await expect(page.locator("h1")).toContainText("HEIC Photo Converter");
    await page.setInputFiles('input[type="file"]', dummyHeicPath);
    await expect(page.locator("text=dummy.heic").first()).toBeVisible();

    await page.click('button:has-text("Convert 1 file")');
    // Ensure it shows an error message since our HEIC is a mock file
    await expect(page.locator(".text-red-500")).toBeVisible();
  });

  test("15. Startup Equity Vesting Modeler - Math Validation", async ({ page }) => {
    await page.goto("/tools/startup-equity");
    await expect(page.locator("h1")).toContainText("Equity Vesting Modeler");

    const estValue = page.locator("output").nth(1);
    await expect(estValue).toBeVisible();
    const initialText = await estValue.innerText();

    const valuationSlider = page.locator("#company-valuation");
    await valuationSlider.fill("30000000");

    await expect(estValue).not.toHaveText(initialText);
    await expect(estValue).toContainText("$600,000"); // 200,000 shares / 10M outstanding * $30M valuation = $600,000
  });

  test("16. Base64 Cipher Modeler - Interactive & File Upload", async ({ page }) => {
    const dummyJpgPath = path.join(__dirname, "..", "fixtures", "dummy.jpg");
    await page.goto("/tools/base64-encoder");
    await expect(page.locator("h1")).toContainText("Base64 Cipher Modeler");

    // Test text encoding
    const textInput = page.locator("textarea#text-input");
    await textInput.fill("hello");
    await expect(page.locator("text=aGVsbG8=")).toBeVisible();

    // Test text decoding
    await page.click('button:has-text("Base64 to Text")');
    await textInput.fill("WmVyb1dlYlRvb2xz");
    await expect(page.locator("pre")).toHaveText("ZeroWebTools");

    // Test file encoding
    await page.click('button:has-text("File to Base64")');
    await page.setInputFiles('input[type="file"]', dummyJpgPath);
    await page.click('button:has-text("Encode File to Base64")');

    // Wait for simulated processing overlay to disappear
    await expect(page.locator("text=Encoding your file...")).not.toBeVisible({ timeout: 5000 });
    // Check if the result textarea contains Base64 Data URL prefix
    const outputArea = page.locator("pre.whitespace-pre-wrap");
    await expect(outputArea).toContainText("data:image/jpeg;base64");
  });

  test("17. Word Counter Pro - Real-Time Analysis & Case Transform & File Load", async ({ page }) => {
    const dummyTextFixturePath = path.join(__dirname, "..", "fixtures", "dummy-text.txt");
    
    // Create a temporary text file for the upload test if it doesn't exist
    if (!fs.existsSync(dummyTextFixturePath)) {
      fs.writeFileSync(dummyTextFixturePath, "Hello world. This is a local text file load test.");
    }

    await page.goto("/tools/word-counter");
    await expect(page.locator("h1")).toContainText("Word Counter Pro");

    // Target the main textarea
    const textarea = page.locator("textarea#word-counter-input");
    await expect(textarea).toBeVisible();

    // Type text into editor
    await textarea.fill("ZeroWebTools is awesome. ZeroWebTools is private.");

    // Check stats metrics cards
    await expect(page.locator("#stat-words")).toHaveText("6");
    await expect(page.locator("#stat-chars")).toHaveText("49");
    await expect(page.locator("#stat-sentences")).toHaveText("2");
    await expect(page.locator("#stat-paragraphs")).toHaveText("1");
    await expect(page.locator("#stat-lines")).toHaveText("1");

    // Check case conversions
    await page.click('button:has-text("UPPERCASE")');
    await expect(textarea).toHaveValue("ZEROWEBTOOLS IS AWESOME. ZEROWEBTOOLS IS PRIVATE.");

    await page.click('button:has-text("lowercase")');
    await expect(textarea).toHaveValue("zerowebtools is awesome. zerowebtools is private.");

    // Check file upload loading
    const fileInput = page.locator("input#word-counter-file-input");
    await fileInput.setInputFiles(dummyTextFixturePath);

    // Wait for the loading overlay to finish
    await expect(page.locator("text=Reading dummy-text.txt...")).not.toBeVisible({ timeout: 5000 });
    
    // Verify file content is loaded in textarea
    await expect(textarea).toHaveValue("Hello world. This is a local text file load test.");
    
    // Clean up temporary text file
    if (fs.existsSync(dummyTextFixturePath)) {
      fs.unlinkSync(dummyTextFixturePath);
    }
  });

  test("18. Side-by-Side Diff Checker - Interactive comparison & View Switcher & Swap", async ({ page }) => {
    await page.goto("/tools/diff-checker");
    await expect(page.locator("h1")).toContainText("Side-by-Side Diff Checker");

    // Load example comparison
    await page.click('button:has-text("Load Example")');

    const originalInput = page.locator("textarea#original-text-input");
    const modifiedInput = page.locator("textarea#modified-text-input");

    await expect(originalInput).toHaveValue(/ZeroWebTools is a collection of high-traffic web tools\./);
    await expect(modifiedInput).toHaveValue(/ZeroWebTools is a premium suite of high-traffic tools\./);

    // Trigger Comparison
    await page.click('button:has-text("Compare Differences")');

    // Wait for the processing overlay to finish
    await expect(page.locator("text=Comparing source files...")).not.toBeVisible({ timeout: 5000 });

    // Assert that we are in the diff results tab
    await expect(page.locator("text=additions").first()).toBeVisible();
    await expect(page.locator("text=deletions").first()).toBeVisible();
    await expect(page.locator("text=unchanged").first()).toBeVisible();

    // Verify Split View is shown by default
    await expect(page.locator("text=Original (Left)").first()).toBeVisible();
    await expect(page.locator("text=Modified (Right)").first()).toBeVisible();

    // Toggle to Unified View
    await page.click('button:has-text("Unified")');
    await expect(page.locator("text=Unified Diff View")).toBeVisible();

    // Go back to Edit
    await page.click('button:has-text("Back to Edit")');
    await expect(originalInput).toBeVisible();

    // Test Swap Panes
    await page.click('button:has-text("Swap Panes")');
    await expect(originalInput).toHaveValue(/ZeroWebTools is a premium suite of high-traffic tools\./);
    await expect(modifiedInput).toHaveValue(/ZeroWebTools is a collection of high-traffic web tools\./);
  });

  test("19. JWT Debugger & Decoder - Interactive Verification", async ({ page }) => {
    await page.goto("/tools/jwt-debugger");
    await expect(page.locator("h1")).toContainText("JWT Debugger & Decoder");

    // Load example JWT
    await page.click('button:has-text("Load Example")');

    // Confirm segments decoded correctly
    await expect(page.locator("text=Valid Signature Format")).toBeVisible();
    await expect(page.locator("text=Alice Vance")).toBeVisible();
    expect(await page.locator("pre").first().innerText()).toContain("HS256");
  });

  test("20. URL Encoder & Parameter Grid Editor", async ({ page }) => {
    await page.goto("/tools/url-encoder");
    await expect(page.locator("h1")).toContainText("URL Encoder/Decoder & Parameter Grid");

    // Load Example URL
    await page.click('button:has-text("Load Example URL")');

    // Verify grid editor displays keys and values
    const queryInputKey = page.locator('input[value="next.js frameworks"]');
    await expect(queryInputKey).toBeVisible();

    // Verify base URL path input
    const baseInput = page.locator("input#url-base-input");
    await expect(baseInput).toHaveValue("https://zerowebtools.com/search");

    // Modify base URL path and verify input string reassembles
    await baseInput.fill("https://example.com/api");
    const mainInput = page.locator("textarea#url-input");
    await expect(mainInput).toHaveValue(/https:\/\/example.com\/api/);
  });

  test("21. Universal Text Cleaner - Clean, Sort, and Search-and-Replace", async ({ page }) => {
    await page.goto("/tools/text-cleaner");
    await expect(page.locator("h1")).toContainText("Universal Text Cleaner");

    const inputArea = page.locator("textarea#text-cleaner-input");
    await expect(inputArea).toBeVisible();

    // Load Example
    await page.click('button:has-text("Load Example Text")');
    await expect(inputArea).toHaveValue(/Apples/);

    // Fill with a clean unsorted list for sorting validation
    await inputArea.fill("cherry\nbanana\napple");

    // Sort lines alphabetically ascending
    await page.selectOption("select#sort-criteria", "alpha");
    await page.selectOption("select#sort-direction", "asc");
    await page.click('button:has-text("Sort Lines")');

    // Expected alphabetical ordering
    const sortedVal = await inputArea.inputValue();
    expect(sortedVal).toBe("apple\nbanana\ncherry");

    // Test Find & Replace with a controlled string
    await inputArea.fill("I love Apples");
    const findField = page.locator("input#find-input");
    const replaceField = page.locator("input#replace-input");
    await findField.fill("Apples");
    await replaceField.fill("Blueberries");

    await page.click('button:has-text("Replace All Matches")');
    await expect(inputArea).toHaveValue("I love Blueberries");
  });

  test("22. PDF Sign - Visual signature placement and save", async ({ page }) => {
    await page.goto("/tools/pdf-sign");
    await expect(page.locator("h1")).toContainText("Sign PDF");

    // Upload dummy PDF
    await page.setInputFiles('input[type="file"]', dummyPdfPath);
    await expect(page.locator("text=dummy.pdf").first()).toBeVisible();

    // Select Type tab
    await page.click('button:has-text("Type")');
    await page.fill('input[placeholder*="Enter your name"]', "Zeeshan");
    await page.click('button:has-text("Generate Signature")');

    // Signature image element should be rendered
    const placedSignature = page.locator('img[alt="Placed Signature"]');
    await expect(placedSignature).toBeVisible();

    // Save document and verify download
    const downloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Save Signed PDF")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("dummy-signed.pdf");
  });

  test("23. PDF Crop & Page Resize - Visual margins crop and page resize", async ({ page }) => {
    await page.goto("/tools/pdf-crop");
    await expect(page.locator("h1")).toContainText("PDF Crop & Page Resize");

    // Upload dummy PDF
    await page.setInputFiles('input[type="file"]', dummyPdfPath);
    await expect(page.locator("text=dummy.pdf").first()).toBeVisible();

    // Test cropping mode
    const downloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Apply Crop & Download")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("dummy-cropped.pdf");

    // Switch to page resize mode
    await page.click('button:has-text("Page Resize")');
    await page.selectOption("select#resize-page-size", "Letter");
    
    const resizeDownloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Apply Crop & Download")');
    const resizeDownload = await resizeDownloadPromise;
    expect(resizeDownload.suggestedFilename()).toBe("dummy-resized.pdf");
  });

  test("24. PDF to Text Extractor - Layout-preserving text extraction", async ({ page }) => {
    await page.goto("/tools/pdf-to-text");
    await expect(page.locator("h1")).toContainText("PDF to Text Extractor");

    // Upload dummy PDF
    await page.setInputFiles('input[type="file"]', dummyPdfPath);
    // Click Extract
    await page.click('button:has-text("Extract Text")');

    // Wait for the processing overlay to finish
    await expect(page.locator("text=Extracting PDF text...")).not.toBeVisible({ timeout: 5000 });

    // Verify stats appear
    await expect(page.locator("text=Pages").first()).toBeVisible();
    
    // Verify pre block has extracted text
    const textOutput = page.locator("pre");
    await expect(textOutput).toBeVisible();
    await expect(textOutput).toContainText("Page 1");

    // Verify download of text file
    const downloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Download .txt")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("dummy-extracted.txt");
  });

  test("25. Bulk Image Resizer - Sizing and format compress", async ({ page }) => {
    const dummyJpgPath = path.join(__dirname, "..", "fixtures", "dummy.jpg");
    await page.goto("/tools/bulk-image-resizer");
    await expect(page.locator("h1")).toContainText("Bulk Image Resizer");

    // Upload image
    await page.setInputFiles('input[type="file"]', dummyJpgPath);
    await expect(page.locator("text=dummy.jpg").first()).toBeVisible();

    // Resize
    const downloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Resize & Save")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("dummy-resized.jpg");
  });

  test("26. Visual Image Cropper - Crop presets and shapes", async ({ page }) => {
    const dummyJpgPath = path.join(__dirname, "..", "fixtures", "dummy.jpg");
    await page.goto("/tools/image-cropper");
    await expect(page.locator("h1")).toContainText("Visual Image Cropper");

    // Upload image
    await page.setInputFiles('input[type="file"]', dummyJpgPath);

    // Crop presets
    await page.click('button:has-text("Square")');

    // Crop & save
    const downloadPromise = page.waitForEvent("download");
    await page.click('button:has-text("Crop & Save")');
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("dummy-cropped.jpg");
  });

  test("27. SVG Minifier - Strip namespaces and precision", async ({ page }) => {
    await page.goto("/tools/svg-minifier");
    await expect(page.locator("h1")).toContainText("SVG Minifier");

    const inputArea = page.locator('textarea[placeholder*="Paste your raw"]');
    await inputArea.fill('<svg sodipodi:docname="test.svg"><circle cx="10.1234" cy="20.5678" r="5" /><!-- comment --></svg>');

    // Minify
    await page.click('button:has-text("Optimize SVG")');

    // Verify output area contains minified SVG code
    const outputArea = page.locator('textarea[placeholder*="Your optimized"]');
    await expect(outputArea).toHaveValue('<svg><circle cx="10.12" cy="20.57" r="5" /></svg>');
  });

  test("28. Mortgage & Loan Amortization - Schedule and payment", async ({ page }) => {
    await page.goto("/tools/mortgage-calculator");
    await expect(page.locator("h1")).toContainText("Mortgage & Loan Amortization Schedule");

    // Verify monthly payment
    await expect(page.locator("text=$1,520.06").first()).toBeVisible();

    // Adjust principal and verify payment changes
    const input = page.locator("#mortgage-principal-input");
    await input.fill("400000");
    await expect(page.locator("text=$2,026.74").first()).toBeVisible();
  });

  test("29. Startup Cap Table Modeler - Dilution round", async ({ page }) => {
    await page.goto("/tools/cap-table");
    await expect(page.locator("h1")).toContainText("Startup Capitalization Table Modeler");

    // Add a shareholder
    await page.fill("#stakeholder-name", "Investor C");
    await page.fill("#stakeholder-shares", "2000000");
    await page.click('button:has-text("Add Shareholder")');

    // Verify addition
    await expect(page.locator("text=Investor C").first()).toBeVisible();
  });

  test("30. SaaS CAC & LTV Retention Modeler - Metrics and curve", async ({ page }) => {
    await page.goto("/tools/saas-ltv");
    await expect(page.locator("h1")).toContainText("SaaS CAC & LTV Retention Modeler");

    // Verify LTV payback outputs
    await expect(page.locator("text=$1,143").first()).toBeVisible();
    await expect(page.locator("text=7.6x").first()).toBeVisible();
    await expect(page.locator("text=3.8 Mo").first()).toBeVisible();
  });

  test("31. Break-Even Point Calculator - Expenses and intersection", async ({ page }) => {
    await page.goto("/tools/break-even");
    await expect(page.locator("h1")).toContainText("Break-Even Point Calculator");

    // Verify break even quantity and sales values
    await expect(page.locator("text=500").first()).toBeVisible();
    await expect(page.locator("text=$25,000").first()).toBeVisible();
  });

  test("32. Regex Tester - Match highlights", async ({ page }) => {
    await page.goto("/tools/regex-tester");
    await expect(page.locator("h1")).toContainText("Interactive Regex Tester");
    // Verify default email matcher highlights zerowebtools.com
    await expect(page.locator("mark").first()).toContainText("support@zerowebtools.com");
    // Load example and check matches
    await page.click('button:has-text("Load Examples")');
    await expect(page.locator("mark").first()).toContainText("123-456-7890");
  });

  test("33. SQL Formatter & Beautifier - Query Formatting", async ({ page }) => {
    await page.goto("/tools/sql-formatter");
    await expect(page.locator("h1")).toContainText("SQL Formatter & Beautifier");
    // Load example
    await page.click('button:has-text("Load Example")');
    // Format SQL
    await page.click('button:has-text("Format SQL")');
    // Verify output has capitalized keywords like SELECT
    const outputArea = page.locator('textarea[placeholder="Your beautified SQL will appear here..."]');
    await expect(outputArea).toHaveValue(/SELECT/);
  });

  test("34. Client-Side File Hasher - Hashing Local Files", async ({ page }) => {
    await page.goto("/tools/file-hasher");
    await expect(page.locator("h1")).toContainText("Client-Side File Hasher");

    // Upload a simulated file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: "test.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("hello world"),
    });

    // Verify detail card
    await expect(page.locator("text=test.txt").first()).toBeVisible();

    // Click generate hashes
    await page.click('button:has-text("Generate Hashes")');

    // MD5 for 'hello world' is 5eb63bbbe01eeed093cb22bb8f5acdc3
    await expect(page.locator("text=5eb63bbbe01eeed093cb22bb8f5acdc3").first()).toBeVisible();
  });

  test("35. Password Strength Meter & Generator", async ({ page }) => {
    await page.goto("/tools/password-generator");
    await expect(page.locator("h1")).toContainText("Password Strength Meter & Generator");

    // Wait for hydration to complete and password to generate (placeholder text is gone)
    const pwdLocator = page.locator("span.font-mono.text-base");
    await expect(pwdLocator).not.toHaveText("Select at least one constraint...");

    // Get value of generated password
    const pwdValue = await pwdLocator.innerText();
    expect(pwdValue.length).toBe(16);

    // Modify length
    const slider = page.locator("#password-length");
    await slider.fill("24");

    // Verify updated password length
    const updatedPwdValue = await page.locator("span.font-mono.text-base").innerText();
    expect(updatedPwdValue.length).toBe(24);
  });

  test("36. Voice Dictator & Reader - TTS and dictation fallback", async ({ page }) => {
    await page.goto("/tools/voice-dictator");
    await expect(page.locator("h1")).toContainText("Voice Dictator & Reader");
    // Verify text area defaultValue
    await expect(page.locator("textarea")).toHaveValue(/dictate text here/);
    // Verify clear action
    await page.click("button:has-text('Clear')");
    await expect(page.locator("textarea")).toHaveValue("");
  });

  test("37. Markdown to HTML Converter - live conversions and preview", async ({ page }) => {
    await page.goto("/tools/markdown-converter");
    await expect(page.locator("h1")).toContainText("Markdown ↔ HTML Converter");
    
    // Check markdown to HTML conversion
    const sourceTextarea = page.locator('textarea[placeholder="Type Markdown here..."]');
    await sourceTextarea.fill("# Hello world\n\nThis is a **test** link: [Google](https://google.com)");
    
    const outputTextarea = page.locator('textarea[placeholder="Converted text will appear here..."]');
    await expect(outputTextarea).toHaveValue(/<h1>Hello world<\/h1>/);
    await expect(outputTextarea).toHaveValue(/<strong>test<\/strong>/);
    await expect(outputTextarea).toHaveValue(/<a href="https:\/\/google.com"/);

    // Switch mode to HTML to Markdown
    await page.click("button:has-text('HTML → Markdown')");
    
    const htmlSourceTextarea = page.locator('textarea[placeholder="Type HTML here..."]');
    await htmlSourceTextarea.fill("<h1>Hello world</h1>\n<p>This is a <strong>test</strong>.</p>");
    
    const mdOutputTextarea = page.locator('textarea[placeholder="Converted text will appear here..."]');
    await expect(mdOutputTextarea).toHaveValue(/# Hello world/);
    await expect(mdOutputTextarea).toHaveValue(/\*\*test\*\*/);
  });

  test("38. List Shuffler & Random Picker - Draw Winners", async ({ page }) => {
    await page.goto("/tools/random-picker");
    await expect(page.locator("h1")).toContainText("List Shuffler & Random Picker");
    
    // Draw winners
    await page.click("button:has-text('Draw Winners')");
    // Winner card should be visible
    await expect(page.locator("text=Drawn Winner").first()).toBeVisible();
    
    // Reset list
    await page.click("button:has-text('Load Example List')");
    const linesTextarea = page.locator('textarea[placeholder="Enter names, emails, or raffle options, one per line..."]');
    await expect(linesTextarea).toHaveValue(/Alice/);
  });
});


