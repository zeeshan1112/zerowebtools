import {
  PDFDocument,
  PDFName,
  PDFHexString,
  PDFString,
  PDFDict,
  PDFArray,
  PDFRawStream,
  PDFRef
} from "pdf-lib";

// ========== MD5 and RC4 Helper Classes/Functions ==========

/**
 * Minimal MD5 implementation for PDF key derivation
 */
export function md5(data: Uint8Array | string): Uint8Array {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;

  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
  ];

  const K = new Uint32Array([
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
    0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
    0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
    0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
    0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
    0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
    0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
    0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
    0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
  ]);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  const msgLen = bytes.length;
  const msgBitLen = msgLen * 8;
  const msgLenPadded = ((msgLen + 9 + 63) & ~63);
  const msg = new Uint8Array(msgLenPadded);
  msg.set(bytes);
  msg[msgLen] = 0x80;

  const dataView = new DataView(msg.buffer);
  dataView.setUint32(msgLenPadded - 8, msgBitLen, true);
  dataView.setUint32(msgLenPadded - 4, 0, true);

  for (let offset = 0; offset < msgLenPadded; offset += 64) {
    const chunk = new Uint32Array(msg.buffer, offset, 16);

    let a = a0, b = b0, c = c0, d = d0;

    for (let i = 0; i < 64; i++) {
      let f, g;

      if (i < 16) {
        f = (b & c) | ((~b) & d);
        g = i;
      } else if (i < 32) {
        f = (d & b) | ((~d) & c);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        f = b ^ c ^ d;
        g = (3 * i + 5) % 16;
      } else {
        f = c ^ (b | (~d));
        g = (7 * i) % 16;
      }

      f = (f + a + K[i] + chunk[g]) >>> 0;
      a = d;
      d = c;
      c = b;
      b = (b + ((f << S[i]) | (f >>> (32 - S[i])))) >>> 0;
    }

    a0 = (a0 + a) >>> 0;
    b0 = (b0 + b) >>> 0;
    c0 = (c0 + c) >>> 0;
    d0 = (d0 + d) >>> 0;
  }

  const result = new Uint8Array(16);
  const view = new DataView(result.buffer);
  view.setUint32(0, a0, true);
  view.setUint32(4, b0, true);
  view.setUint32(8, c0, true);
  view.setUint32(12, d0, true);

  return result;
}

/**
 * Symmetric RC4 implementation
 */
export class RC4 {
  private s: Uint8Array;
  private i: number;
  private j: number;

  constructor(key: Uint8Array) {
    this.s = new Uint8Array(256);
    this.i = 0;
    this.j = 0;

    for (let i = 0; i < 256; i++) {
      this.s[i] = i;
    }

    let j = 0;
    for (let i = 0; i < 256; i++) {
      j = (j + this.s[i] + key[i % key.length]) & 0xFF;
      [this.s[i], this.s[j]] = [this.s[j], this.s[i]];
    }
  }

  process(data: Uint8Array): Uint8Array {
    const result = new Uint8Array(data.length);
    for (let k = 0; k < data.length; k++) {
      this.i = (this.i + 1) & 0xFF;
      this.j = (this.j + this.s[this.i]) & 0xFF;
      [this.s[this.i], this.s[this.j]] = [this.s[this.j], this.s[this.i]];
      const t = (this.s[this.i] + this.s[this.j]) & 0xFF;
      result[k] = data[k] ^ this.s[t];
    }
    return result;
  }
}

export function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// ========== Web Crypto Helpers ==========

export function concat(...arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

export async function sha256(data: Uint8Array): Promise<Uint8Array> {
  const hash = await crypto.subtle.digest('SHA-256', data as any);
  return new Uint8Array(hash);
}

export async function sha384(data: Uint8Array): Promise<Uint8Array> {
  const hash = await crypto.subtle.digest('SHA-384', data as any);
  return new Uint8Array(hash);
}

export async function sha512(data: Uint8Array): Promise<Uint8Array> {
  const hash = await crypto.subtle.digest('SHA-512', data as any);
  return new Uint8Array(hash);
}

export async function aes128CbcEncrypt(data: Uint8Array, key: Uint8Array, iv: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey('raw', key as any, 'AES-CBC', false, ['encrypt']);
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: iv as any }, cryptoKey, data as any);
  return new Uint8Array(encrypted).slice(0, data.byteLength);
}

export async function aes256CbcDecryptNoPad(ciphertext: Uint8Array, key: Uint8Array, iv: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey('raw', key as any, 'AES-CBC', false, ['encrypt', 'decrypt']);
  const lastBlock = ciphertext.slice(ciphertext.length - 16);
  
  const xored = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    xored[i] = lastBlock[i] ^ 0x10;
  }

  const zeroIV = new Uint8Array(16);
  const encResult = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: zeroIV as any }, cryptoKey, xored as any);
  const cFake = new Uint8Array(encResult).slice(0, 16);
  const extended = concat(ciphertext, cFake);

  const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: iv as any }, cryptoKey, extended as any);
  return new Uint8Array(decrypted).slice(0, ciphertext.length);
}

export async function aes256EcbDecryptBlock(block: Uint8Array, key: Uint8Array): Promise<Uint8Array> {
  const zeroIV = new Uint8Array(16);
  return aes256CbcDecryptNoPad(block, key, zeroIV);
}

export async function importAES256DecryptKey(key: Uint8Array): Promise<CryptoKey> {
  return await crypto.subtle.importKey('raw', key as any, 'AES-CBC', false, ['encrypt', 'decrypt']);
}

export async function aes256CbcDecryptWithKey(data: Uint8Array, cryptoKey: CryptoKey, iv: Uint8Array): Promise<Uint8Array> {
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: iv as any }, cryptoKey, data as any);
  return new Uint8Array(decrypted);
}

export async function computeHash2B(password: Uint8Array, salt: Uint8Array, userKey: Uint8Array): Promise<Uint8Array> {
  const input = concat(password, salt, userKey);
  let K = await sha256(input);

  let i = 0;
  let E: Uint8Array;

  while (true) {
    const block = concat(password, K, userKey);
    const K1 = new Uint8Array(block.length * 64);
    for (let j = 0; j < 64; j++) {
      K1.set(block, j * block.length);
    }

    const aesKey = K.slice(0, 16);
    const aesIV = K.slice(16, 32);
    E = await aes128CbcEncrypt(K1, aesKey, aesIV);

    let byteSum = 0;
    for (let j = 0; j < 16; j++) {
      byteSum += E[j];
    }
    const hashSelect = byteSum % 3;

    if (hashSelect === 0) {
      K = await sha256(E);
    } else if (hashSelect === 1) {
      K = await sha384(E);
    } else {
      K = await sha512(E);
    }

    i++;
    if (i >= 64 && E[E.length - 1] <= i - 32) {
      break;
    }
  }

  return K.slice(0, 32);
}

// ========== PDF Encryption Helpers & Parsers ==========

const PADDING = new Uint8Array([
  0x28, 0xBF, 0x4E, 0x5E, 0x4E, 0x75, 0x8A, 0x41,
  0x64, 0x00, 0x4E, 0x56, 0xFF, 0xFA, 0x01, 0x08,
  0x2E, 0x2E, 0x00, 0xB6, 0xD0, 0x68, 0x3E, 0x80,
  0x2F, 0x0C, 0xA9, 0xFE, 0x64, 0x53, 0x69, 0x7A
]);

const BATCH_SIZE = 100;

interface EncryptParams {
  version: number;
  revision: number;
  ownerKey: Uint8Array;
  userKey: Uint8Array;
  permissions: number;
  fileId: Uint8Array;
  encryptRef: PDFRef | PDFDict;
  encryptDict: PDFDict;
  ownerEncryptKey?: Uint8Array;
  userEncryptKey?: Uint8Array;
  perms?: Uint8Array;
  encryptMetadata?: boolean;
  algorithm?: 'AES-256' | 'AES-128' | 'RC4';
  cfm?: 'V2' | 'AESV2' | 'AESV3' | 'None';
  keyLength: number;
}

function arraysEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function extractBytes(pdfObj: any): Uint8Array | null {
  if (!pdfObj) return null;
  if (pdfObj instanceof PDFHexString) {
    return hexToBytes(pdfObj.asString());
  }
  if (pdfObj instanceof PDFString) {
    return pdfObj.asBytes();
  }
  const str = pdfObj.toString();
  if (str.startsWith('<') && str.endsWith('>')) {
    return hexToBytes(str.slice(1, -1));
  }
  return null;
}

function saslPrepPassword(password: string): Uint8Array {
  const bytes = new TextEncoder().encode(password);
  return bytes.length > 127 ? bytes.slice(0, 127) : bytes;
}

function readEncryptParams(context: any): EncryptParams | null {
  const trailer = context.trailerInfo;
  const encryptRef = trailer.Encrypt;
  if (!encryptRef) return null;

  let encryptDict: PDFDict;
  if (encryptRef instanceof PDFRef) {
    encryptDict = context.lookup(encryptRef) as PDFDict;
  } else if (encryptRef instanceof PDFDict) {
    encryptDict = encryptRef;
  } else {
    return null;
  }

  if (!encryptDict || !(encryptDict instanceof PDFDict)) {
    return null;
  }

  const V = encryptDict.get(PDFName.of('V')) as any;
  const R = encryptDict.get(PDFName.of('R')) as any;
  const Length = encryptDict.get(PDFName.of('Length')) as any;
  const P = encryptDict.get(PDFName.of('P')) as any;
  const O = encryptDict.get(PDFName.of('O'));
  const U = encryptDict.get(PDFName.of('U'));

  const version = V ? (typeof V.asNumber === 'function' ? V.asNumber() : Number(V.toString())) : 0;
  const revision = R ? (typeof R.asNumber === 'function' ? R.asNumber() : Number(R.toString())) : 0;
  const permissions = P ? (typeof P.asNumber === 'function' ? P.asNumber() : Number(P.toString())) : 0;

  const ownerKey = extractBytes(O);
  const userKey = extractBytes(U);

  if (!ownerKey || !userKey) {
    throw new Error('Could not read /O or /U values from encryption dictionary');
  }

  let fileId = new Uint8Array(0);
  const idArray = trailer.ID;
  if (idArray) {
    if (Array.isArray(idArray) && idArray.length > 0) {
      fileId = (extractBytes(idArray[0]) as any) || new Uint8Array(0);
    } else if (idArray instanceof PDFArray) {
      const firstId = idArray.lookup(0);
      fileId = (extractBytes(firstId) as any) || new Uint8Array(0);
    }
  }

  const params: EncryptParams = {
    version,
    revision,
    ownerKey,
    userKey,
    permissions,
    fileId,
    encryptRef,
    encryptDict,
    keyLength: 16 // default standard key length
  };

  // Determine Crypt Filter Method (CFM) for V=4 or V=5
  let cfm: 'V2' | 'AESV2' | 'AESV3' | 'None' = 'V2';
  const CF = encryptDict.get(PDFName.of('CF'));
  if (CF instanceof PDFDict) {
    const StdCF = CF.get(PDFName.of('StdCF'));
    if (StdCF instanceof PDFDict) {
      const CFM = StdCF.get(PDFName.of('CFM'));
      if (CFM) {
        const val = CFM.toString().replace('/', '');
        if (val === 'AESV2') cfm = 'AESV2';
        else if (val === 'AESV3') cfm = 'AESV3';
        else if (val === 'V2') cfm = 'V2';
        else if (val === 'None') cfm = 'None';
      }
    }
  }
  params.cfm = cfm;

  const EncryptMetadata = encryptDict.get(PDFName.of('EncryptMetadata'));
  if (EncryptMetadata) {
    params.encryptMetadata = EncryptMetadata.toString() !== 'false';
  } else {
    params.encryptMetadata = true;
  }

  if (version === 5 && revision === 6) {
    const OE = encryptDict.get(PDFName.of('OE'));
    const UE = encryptDict.get(PDFName.of('UE'));
    const Perms = encryptDict.get(PDFName.of('Perms'));

    params.ownerEncryptKey = extractBytes(OE) || undefined;
    params.userEncryptKey = extractBytes(UE) || undefined;
    params.perms = extractBytes(Perms) || undefined;

    if (!params.ownerEncryptKey || !params.userEncryptKey || !params.perms) {
      throw new Error('Missing /OE, /UE, or /Perms in AES-256 encryption dictionary');
    }

    params.algorithm = 'AES-256';
    params.keyLength = 32;
  } else if (version === 4 && revision === 4) {
    // AES-128 or RC4-128 with crypt filters
    const LengthVal = Length ? (typeof Length.asNumber === 'function' ? Length.asNumber() : Number(Length.toString())) : 128;
    params.keyLength = LengthVal / 8;
    params.algorithm = cfm === 'AESV2' ? 'AES-128' : 'RC4';
  } else if (version <= 3 && revision <= 4) {
    // Standard RC4 (V=1-2, R=2-3)
    let keyLengthBits = Length ? (typeof Length.asNumber === 'function' ? Length.asNumber() : Number(Length.toString())) : 40;
    if (revision >= 3 && !Length) keyLengthBits = 128;
    params.keyLength = keyLengthBits / 8;
    params.algorithm = 'RC4';
  } else {
    throw new Error(
      `Unsupported encryption: V=${version}, R=${revision}. ` +
      `Supported: RC4 (V=1-2, R=2-3), AES-128 (V=4, R=4), and AES-256 (V=5, R=6).`
    );
  }

  return params;
}

// ========== Password Verification ==========

function padPassword(password: string): Uint8Array {
  const pwdBytes = new TextEncoder().encode(password);
  const padded = new Uint8Array(32);
  if (pwdBytes.length >= 32) {
    padded.set(pwdBytes.slice(0, 32));
  } else {
    padded.set(pwdBytes);
    padded.set(PADDING.slice(0, 32 - pwdBytes.length), pwdBytes.length);
  }
  return padded;
}

function computeEncryptionKey(
  password: string,
  ownerKey: Uint8Array,
  permissions: number,
  fileId: Uint8Array,
  revision: number,
  keyLength: number,
  encryptMetadata: boolean
): Uint8Array {
  const paddedPwd = padPassword(password);
  const addMetadataBytes = (revision >= 4 && !encryptMetadata);
  const hashInput = new Uint8Array(
    paddedPwd.length +
    ownerKey.length +
    4 + // permissions
    fileId.length +
    (addMetadataBytes ? 4 : 0)
  );

  let offset = 0;
  hashInput.set(paddedPwd, offset);
  offset += paddedPwd.length;

  hashInput.set(ownerKey, offset);
  offset += ownerKey.length;

  hashInput[offset++] = permissions & 0xFF;
  hashInput[offset++] = (permissions >> 8) & 0xFF;
  hashInput[offset++] = (permissions >> 16) & 0xFF;
  hashInput[offset++] = (permissions >> 24) & 0xFF;

  hashInput.set(fileId, offset);
  offset += fileId.length;

  if (addMetadataBytes) {
    hashInput[offset++] = 0xFF;
    hashInput[offset++] = 0xFF;
    hashInput[offset++] = 0xFF;
    hashInput[offset++] = 0xFF;
  }

  let hash = md5(hashInput);

  if (revision >= 3) {
    const n = keyLength;
    for (let i = 0; i < 50; i++) {
      hash = md5(hash.slice(0, n));
    }
  }

  return hash.slice(0, keyLength);
}

function validateUserPasswordStandard(password: string, encryptParams: EncryptParams): Uint8Array | null {
  const { ownerKey, userKey, permissions, fileId, revision, keyLength, encryptMetadata } = encryptParams;
  const encryptionKey = computeEncryptionKey(
    password,
    ownerKey,
    permissions,
    fileId,
    revision,
    keyLength,
    encryptMetadata ?? true
  );

  if (revision === 2) {
    const rc4 = new RC4(encryptionKey);
    const computed = rc4.process(new Uint8Array(PADDING));
    if (arraysEqual(computed, userKey)) {
      return encryptionKey;
    }
  } else {
    const hashInput = new Uint8Array(PADDING.length + fileId.length);
    hashInput.set(PADDING);
    hashInput.set(fileId, PADDING.length);
    const hash = md5(hashInput);

    let result = new RC4(encryptionKey).process(hash);
    for (let i = 1; i <= 19; i++) {
      const iterKey = new Uint8Array(encryptionKey.length);
      for (let j = 0; j < encryptionKey.length; j++) {
        iterKey[j] = encryptionKey[j] ^ i;
      }
      result = new RC4(iterKey).process(result);
    }

    if (arraysEqual(result.slice(0, 16), userKey.slice(0, 16))) {
      return encryptionKey;
    }
  }

  return null;
}

function validateOwnerPasswordStandard(password: string, encryptParams: EncryptParams): Uint8Array | null {
  const { ownerKey, revision, keyLength } = encryptParams;
  const paddedOwner = padPassword(password);
  let hash = md5(paddedOwner);

  if (revision >= 3) {
    for (let i = 0; i < 50; i++) {
      hash = md5(hash);
    }
  }

  const ownerDecryptKey = hash.slice(0, keyLength);
  let recoveredUserPwd: Uint8Array;

  if (revision === 2) {
    const rc4 = new RC4(ownerDecryptKey);
    recoveredUserPwd = rc4.process(new Uint8Array(ownerKey));
  } else {
    let result: any = new Uint8Array(ownerKey);
    for (let i = 19; i >= 0; i--) {
      const iterKey = new Uint8Array(ownerDecryptKey.length);
      for (let j = 0; j < ownerDecryptKey.length; j++) {
        iterKey[j] = ownerDecryptKey[j] ^ i;
      }
      result = new RC4(iterKey).process(result);
    }
    recoveredUserPwd = result;
  }

  return validateUserPasswordStandard(
    Array.from(recoveredUserPwd).map(b => String.fromCharCode(b)).join(''),
    encryptParams
  );
}

// ========== AES-256 Password Validation ==========

async function validateUserPasswordAES256(password: Uint8Array, encryptParams: EncryptParams): Promise<Uint8Array | null> {
  const { userKey, userEncryptKey } = encryptParams;
  if (!userEncryptKey) return null;

  const validationSalt = userKey.slice(32, 40);
  const hash = await computeHash2B(password, validationSalt, new Uint8Array(0));

  if (!arraysEqual(hash, userKey.slice(0, 32))) {
    return null;
  }

  const keySalt = userKey.slice(40, 48);
  const ueKey = await computeHash2B(password, keySalt, new Uint8Array(0));
  const zeroIV = new Uint8Array(16);
  const fileKey = await aes256CbcDecryptNoPad(userEncryptKey, ueKey, zeroIV);

  return fileKey;
}

async function validateOwnerPasswordAES256(password: Uint8Array, encryptParams: EncryptParams): Promise<Uint8Array | null> {
  const { ownerKey, userKey, ownerEncryptKey } = encryptParams;
  if (!ownerEncryptKey) return null;

  const validationSalt = ownerKey.slice(32, 40);
  const hash = await computeHash2B(password, validationSalt, userKey);

  if (!arraysEqual(hash, ownerKey.slice(0, 32))) {
    return null;
  }

  const keySalt = ownerKey.slice(40, 48);
  const oeKey = await computeHash2B(password, keySalt, userKey);
  const zeroIV = new Uint8Array(16);
  const fileKey = await aes256CbcDecryptNoPad(ownerEncryptKey, oeKey, zeroIV);

  return fileKey;
}

// ========== Decryption Implementations ==========

function decryptObjectRC4(data: Uint8Array, objectNum: number, generationNum: number, encryptionKey: Uint8Array): Uint8Array {
  const keyInput = new Uint8Array(encryptionKey.length + 5);
  keyInput.set(encryptionKey);
  keyInput[encryptionKey.length] = objectNum & 0xFF;
  keyInput[encryptionKey.length + 1] = (objectNum >> 8) & 0xFF;
  keyInput[encryptionKey.length + 2] = (objectNum >> 16) & 0xFF;
  keyInput[encryptionKey.length + 3] = generationNum & 0xFF;
  keyInput[encryptionKey.length + 4] = (generationNum >> 8) & 0xFF;

  const objectKey = md5(keyInput);
  const rc4 = new RC4(objectKey.slice(0, Math.min(encryptionKey.length + 5, 16)));
  return rc4.process(data);
}

function decryptStringsRC4(obj: any, objectNum: number, generationNum: number, encryptionKey: Uint8Array) {
  if (!obj) return;
  if (obj instanceof PDFString) {
    const originalBytes = obj.asBytes();
    const decrypted = decryptObjectRC4(originalBytes, objectNum, generationNum, encryptionKey);
    (obj as any).value = Array.from(decrypted).map(b => String.fromCharCode(b)).join('');
  } else if (obj instanceof PDFHexString) {
    const originalBytes = obj.asBytes();
    const decrypted = decryptObjectRC4(originalBytes, objectNum, generationNum, encryptionKey);
    (obj as any).value = bytesToHex(decrypted);
  } else if (obj instanceof PDFDict) {
    for (const [key, value] of obj.entries()) {
      const keyName = key.asString();
      if (keyName !== '/Length' && keyName !== '/Filter' && keyName !== '/DecodeParms') {
        decryptStringsRC4(value, objectNum, generationNum, encryptionKey);
      }
    }
  } else if (obj instanceof PDFArray) {
    for (const element of obj.asArray()) {
      decryptStringsRC4(element, objectNum, generationNum, encryptionKey);
    }
  }
}

async function decryptObjectAES(
  data: Uint8Array,
  objectNum: number,
  generationNum: number,
  encryptionKey: Uint8Array,
  isStream: boolean
): Promise<Uint8Array> {
  const salt = new Uint8Array([0x73, 0x41, 0x6c, 0x54]); // 4-byte "sAlT"

  const keyInput = new Uint8Array(encryptionKey.length + 5 + salt.length);
  keyInput.set(encryptionKey);
  keyInput[encryptionKey.length] = objectNum & 0xFF;
  keyInput[encryptionKey.length + 1] = (objectNum >> 8) & 0xFF;
  keyInput[encryptionKey.length + 2] = (objectNum >> 16) & 0xFF;
  keyInput[encryptionKey.length + 3] = generationNum & 0xFF;
  keyInput[encryptionKey.length + 4] = (generationNum >> 8) & 0xFF;
  keyInput.set(salt, encryptionKey.length + 5);

  const objectKey = md5(keyInput);
  const finalKey = objectKey.slice(0, 16);

  const iv = data.slice(0, 16);
  const ciphertext = data.slice(16);

  if (ciphertext.length === 0) {
    return new Uint8Array(0);
  }

  if (ciphertext.length % 16 !== 0) {
    return data;
  }

  const cryptoKey = await crypto.subtle.importKey('raw', finalKey as any, 'AES-CBC', false, ['decrypt']);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: iv as any }, cryptoKey, ciphertext as any);
  return new Uint8Array(decrypted);
}

async function decryptAES256Blob(data: Uint8Array, cryptoKey: CryptoKey): Promise<Uint8Array> {
  const iv = data.slice(0, 16);
  const ciphertext = data.slice(16);

  if (ciphertext.length === 0) {
    return new Uint8Array(0);
  }

  if (ciphertext.length % 16 !== 0) {
    return data;
  }

  try {
    const decrypted = await aes256CbcDecryptWithKey(ciphertext, cryptoKey, iv);
    return decrypted;
  } catch {
    return data;
  }
}

// ========== Traversal & Collection ==========

function collectStringsFromObject(obj: any, objectNum: number, generationNum: number, items: any[]) {
  if (!obj) return;
  if (obj instanceof PDFString) {
    const bytes = obj.asBytes();
    if (bytes.length >= 16) {
      items.push({ obj, bytes, type: 'string', objectNum, generationNum });
    }
  } else if (obj instanceof PDFHexString) {
    const bytes = obj.asBytes();
    if (bytes.length >= 16) {
      items.push({ obj, bytes, type: 'hex', objectNum, generationNum });
    }
  } else if (obj instanceof PDFDict) {
    for (const [key, value] of obj.entries()) {
      const keyName = key.asString();
      if (keyName !== '/Length' && keyName !== '/Filter' && keyName !== '/DecodeParms') {
        collectStringsFromObject(value, objectNum, generationNum, items);
      }
    }
  } else if (obj instanceof PDFArray) {
    for (const element of obj.asArray()) {
      collectStringsFromObject(element, objectNum, generationNum, items);
    }
  }
}

function collectEncryptedItems(context: any, encryptRefNum: number | null, encryptMetadata: boolean) {
  const streamItems: any[] = [];
  const stringItems: any[] = [];
  const indirectObjects = context.enumerateIndirectObjects();

  for (const [ref, obj] of indirectObjects) {
    const objectNum = ref.objectNumber;
    const generationNum = ref.generationNumber || 0;

    if (encryptRefNum !== null && objectNum === encryptRefNum) {
      continue;
    }

    if (obj instanceof PDFDict && !(obj instanceof PDFRawStream)) {
      const type = obj.get(PDFName.of('Type'));
      if (type && type.toString() === '/Sig') continue;
    }

    if (obj instanceof PDFRawStream && obj.dict) {
      const type = obj.dict.get(PDFName.of('Type'));
      if (type) {
        const typeName = type.toString();
        if (typeName === '/XRef' || typeName === '/Sig') continue;
        if (typeName === '/Metadata' && !encryptMetadata) continue;
      }
    }

    if (obj instanceof PDFRawStream) {
      const streamData = (obj.contents as any);
      if (streamData.length >= 16) {
        streamItems.push({ ref, obj, data: streamData, objectNum, generationNum });
      }
      if (obj.dict) {
        collectStringsFromObject(obj.dict, objectNum, generationNum, stringItems);
      }
    }

    if (!(obj instanceof PDFRawStream)) {
      collectStringsFromObject(obj, objectNum, generationNum, stringItems);
    }
  }

  return { streamItems, stringItems };
}

// ========== Decrypt Processors ==========

async function decryptAllAES256(streamItems: any[], stringItems: any[], cryptoKey: CryptoKey) {
  for (let i = 0; i < streamItems.length; i += BATCH_SIZE) {
    const batch = streamItems.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(item => decryptAES256Blob(item.data, cryptoKey))
    );
    for (let j = 0; j < batch.length; j++) {
      (batch[j].obj as any).contents = results[j];
    }
  }

  for (let i = 0; i < stringItems.length; i += BATCH_SIZE) {
    const batch = stringItems.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(item => decryptAES256Blob(item.bytes, cryptoKey))
    );
    for (let j = 0; j < batch.length; j++) {
      const item = batch[j];
      const decrypted = results[j];
      if (item.type === 'string') {
        (item.obj as any).value = Array.from(decrypted).map(b => String.fromCharCode(b)).join('');
      } else {
        (item.obj as any).value = bytesToHex(decrypted);
      }
    }
  }
}

async function decryptAllAES128(streamItems: any[], stringItems: any[], encryptionKey: Uint8Array) {
  for (let i = 0; i < streamItems.length; i += BATCH_SIZE) {
    const batch = streamItems.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(item => decryptObjectAES(item.data, item.objectNum, item.generationNum, encryptionKey, true))
    );
    for (let j = 0; j < batch.length; j++) {
      (batch[j].obj as any).contents = results[j];
    }
  }

  for (let i = 0; i < stringItems.length; i += BATCH_SIZE) {
    const batch = stringItems.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(item => decryptObjectAES(item.bytes, item.objectNum, item.generationNum, encryptionKey, false))
    );
    for (let j = 0; j < batch.length; j++) {
      const item = batch[j];
      const decrypted = results[j];
      if (item.type === 'string') {
        (item.obj as any).value = Array.from(decrypted).map(b => String.fromCharCode(b)).join('');
      } else {
        (item.obj as any).value = bytesToHex(decrypted);
      }
    }
  }
}

function decryptAllRC4(context: any, encryptionKey: Uint8Array, encryptRefNum: number | null) {
  const indirectObjects = context.enumerateIndirectObjects();

  for (const [ref, obj] of indirectObjects) {
    const objectNum = ref.objectNumber;
    const generationNum = ref.generationNumber || 0;

    if (encryptRefNum !== null && objectNum === encryptRefNum) {
      continue;
    }

    if (obj instanceof PDFDict && !(obj instanceof PDFRawStream)) {
      const type = obj.get(PDFName.of('Type'));
      if (type && type.toString() === '/Sig') continue;
    }

    if (obj instanceof PDFRawStream && obj.dict) {
      const type = obj.dict.get(PDFName.of('Type'));
      if (type) {
        const typeName = type.toString();
        if (typeName === '/XRef' || typeName === '/Sig') continue;
      }
    }

    if (obj instanceof PDFRawStream) {
      const streamData = (obj.contents as any);
      const decrypted = decryptObjectRC4(streamData, objectNum, generationNum, encryptionKey);
      (obj as any).contents = decrypted;

      if (obj.dict) {
        decryptStringsRC4(obj.dict, objectNum, generationNum, encryptionKey);
      }
    }

    if (!(obj instanceof PDFRawStream)) {
      decryptStringsRC4(obj, objectNum, generationNum, encryptionKey);
    }
  }
}

// ========== Main Public API ==========

/**
 * Checks if a PDF is password protected
 */
export async function isEncrypted(pdfBytes: Uint8Array): Promise<{
  encrypted: boolean;
  algorithm?: 'AES-256' | 'AES-128' | 'RC4';
  version?: number;
  revision?: number;
  keyLength?: number;
}> {
  try {
    const pdfDoc = await PDFDocument.load(pdfBytes, {
      ignoreEncryption: true,
      updateMetadata: false
    });
    const encryptParams = readEncryptParams(pdfDoc.context);
    if (!encryptParams) {
      return { encrypted: false };
    }
    return {
      encrypted: true,
      algorithm: encryptParams.algorithm,
      version: encryptParams.version,
      revision: encryptParams.revision,
      keyLength: encryptParams.keyLength * 8
    };
  } catch {
    return { encrypted: false };
  }
}

/**
 * Decrypts a password-protected PDF in-browser using standard Web Crypto APIs
 */
export async function decryptPDF(pdfBytes: Uint8Array, password: string): Promise<Uint8Array> {
  try {
    const pdfDoc = await PDFDocument.load(pdfBytes, {
      ignoreEncryption: true,
      updateMetadata: false
    });

    const context = pdfDoc.context;
    const encryptParams = readEncryptParams(context);

    if (!encryptParams) {
      throw new Error('This PDF is not encrypted. No /Encrypt dictionary found.');
    }

    const encryptRefNum = (encryptParams.encryptRef instanceof PDFRef)
      ? encryptParams.encryptRef.objectNumber
      : null;

    if (encryptParams.algorithm === 'AES-256') {
      const pwdBytes = saslPrepPassword(password);
      let fileKey = await validateUserPasswordAES256(pwdBytes, encryptParams);
      if (!fileKey) {
        fileKey = await validateOwnerPasswordAES256(pwdBytes, encryptParams);
      }

      if (!fileKey) {
        throw new Error('Incorrect password. The provided password does not match the user or owner password.');
      }

      const cryptoKey = await importAES256DecryptKey(fileKey);
      const { streamItems, stringItems } = collectEncryptedItems(
        context, encryptRefNum, encryptParams.encryptMetadata ?? true
      );
      await decryptAllAES256(streamItems, stringItems, cryptoKey);
    } else if (encryptParams.algorithm === 'AES-128') {
      let encryptionKey = validateUserPasswordStandard(password, encryptParams);
      if (!encryptionKey) {
        encryptionKey = validateOwnerPasswordStandard(password, encryptParams);
      }

      if (!encryptionKey) {
        throw new Error('Incorrect password. The provided password does not match the user or owner password.');
      }

      const { streamItems, stringItems } = collectEncryptedItems(
        context, encryptRefNum, encryptParams.encryptMetadata ?? true
      );
      await decryptAllAES128(streamItems, stringItems, encryptionKey);
    } else {
      let encryptionKey = validateUserPasswordStandard(password, encryptParams);
      if (!encryptionKey) {
        encryptionKey = validateOwnerPasswordStandard(password, encryptParams);
      }

      if (!encryptionKey) {
        throw new Error('Incorrect password. The provided password does not match the user or owner password.');
      }

      decryptAllRC4(context, encryptionKey, encryptRefNum);
    }

    // Remove the encryption dictionary to save it unlocked
    context.trailerInfo.Encrypt = undefined;
    if (encryptRefNum !== null) {
      context.delete(PDFRef.of(encryptRefNum));
    }

    return await pdfDoc.save();
  } catch (error: any) {
    throw new Error(error.message || 'Could not decrypt PDF file');
  }
}
