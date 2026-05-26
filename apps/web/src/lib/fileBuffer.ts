let sharedFileBlob: Blob | null = null;
let sharedFileName: string = "";

/**
 * Stores a file in browser memory to pass it to another tool page
 * without requiring the user to download and re-upload.
 */
export function setSharedFile(blob: Blob, name: string) {
  sharedFileBlob = blob;
  sharedFileName = name;
}

/**
 * Retrieves the shared file from memory (converting Blob back to File)
 * and clears the buffer so it can only be consumed once.
 */
export function getSharedFile(): File | null {
  if (!sharedFileBlob) return null;
  const file = new File([sharedFileBlob], sharedFileName, {
    type: sharedFileBlob.type,
  });
  sharedFileBlob = null;
  sharedFileName = "";
  return file;
}

/**
 * Checks if there is currently a file in the transfer buffer.
 */
export function hasSharedFile(): boolean {
  return sharedFileBlob !== null;
}
