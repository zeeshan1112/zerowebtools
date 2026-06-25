import { describe, it, expect } from "vitest";
import { isEncrypted, decryptPDF } from "./pdfDecrypt";
import * as fs from "fs";
import * as path from "path";

describe("PDF Decrypter Utilities", () => {
  it("should successfully decrypt V=4 R=4 AES-128 test PDF from scratch folder", async () => {
    const scratchPath = path.join(__dirname, "../../../scratch/XXXXXXX9029_K3EZEIPD_A_2026.pdf");
    if (fs.existsSync(scratchPath)) {
      const pdfBytes = fs.readFileSync(scratchPath);
      const decrypted = await decryptPDF(new Uint8Array(pdfBytes), "64624140991");
      expect(decrypted).toBeInstanceOf(Uint8Array);
      expect(decrypted.length).toBeGreaterThan(0);
      
      const checkEncrypt = await isEncrypted(decrypted);
      expect(checkEncrypt.encrypted).toBe(false);
    }
  });

  it("should return encrypted false for standard unencrypted PDF", async () => {
    // A minimal valid unencrypted PDF structure
    const pdfBytes = new TextEncoder().encode(`%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [] /Count 0 >>
endobj
trailer
<< /Root 1 0 R >>
%%EOF`);

    const result = await isEncrypted(pdfBytes);
    expect(result.encrypted).toBe(false);
  });

  it("should throw an error when decrypting an unencrypted PDF", async () => {
    const pdfBytes = new TextEncoder().encode(`%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
trailer
<< /Root 1 0 R >>
%%EOF`);

    await expect(decryptPDF(pdfBytes, "password")).rejects.toThrow(
      "This PDF is not encrypted"
    );
  });
});
