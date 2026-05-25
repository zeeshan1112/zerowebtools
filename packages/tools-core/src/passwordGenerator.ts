/**
 * Client-side Password Generator & Strength Calculator.
 */

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export interface PasswordStats {
  entropy: number;
  strength: "Very Weak" | "Weak" | "Reasonable" | "Strong" | "Very Strong";
}

export function generatePassword(options: PasswordOptions): string {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let charPool = "";
  let mandatoryChars = "";

  if (options.includeUppercase) {
    charPool += uppercaseChars;
    mandatoryChars += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
  }
  if (options.includeLowercase) {
    charPool += lowercaseChars;
    mandatoryChars += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
  }
  if (options.includeNumbers) {
    charPool += numberChars;
    mandatoryChars += numberChars[Math.floor(Math.random() * numberChars.length)];
  }
  if (options.includeSymbols) {
    charPool += symbolChars;
    mandatoryChars += symbolChars[Math.floor(Math.random() * symbolChars.length)];
  }

  if (!charPool) return "";

  let password = mandatoryChars;
  const remainingLength = options.length - mandatoryChars.length;

  for (let i = 0; i < remainingLength; i++) {
    password += charPool[Math.floor(Math.random() * charPool.length)];
  }

  // Shuffle characters to ensure mandatory characters are not always at the start
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

export function calculatePasswordStrength(password: string): PasswordStats {
  const length = password.length;
  if (length === 0) {
    return { entropy: 0, strength: "Very Weak" };
  }

  let poolSize = 0;
  if (/[a-z]/.test(password)) poolSize += 26;
  if (/[A-Z]/.test(password)) poolSize += 26;
  if (/[0-9]/.test(password)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

  // Entropy = L * log2(PoolSize)
  const entropy = length * Math.log2(poolSize || 1);

  let strength: PasswordStats["strength"] = "Very Weak";
  if (entropy >= 128) strength = "Very Strong";
  else if (entropy >= 60) strength = "Strong";
  else if (entropy >= 36) strength = "Reasonable";
  else if (entropy >= 28) strength = "Weak";

  return { entropy, strength };
}
