import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

test.describe("ZeroWebTools Suite E2E Tests", () => {
  const dummyPdfPath = path.join(__dirname, "..", "fixtures", "dummy.pdf");
  const tempProtectedPath = path.join(__dirname, "..", "fixtures", "temp-protected.pdf");

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
    await expect(page.locator("text=temp-protected.pdf")).toBeVisible();

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

    expect(unlockDownload.suggestedFilename()).toBe("temp-protected-unlocked.pdf");
  });
});
