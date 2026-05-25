export interface DiffLine {
  lineNum: number;
  content: string;
  type: "removed" | "added" | "unchanged";
}

export interface DiffRow {
  left?: DiffLine;
  right?: DiffLine;
}

export interface DiffToken {
  type: "added" | "removed" | "unchanged";
  value: string;
}

/**
 * Computes line-by-line diff rows using the LCS DP algorithm.
 */
export function computeLineDiff(original: string, modified: string): DiffRow[] {
  const leftLines = original.split(/\r?\n/);
  const rightLines = modified.split(/\r?\n/);

  const m = leftLines.length;
  const n = rightLines.length;

  // Safeguard cap to prevent quadratic DP complexity blowing up in browser
  if (m > 3000 || n > 3000) {
    throw new Error("Input text is too long. Please limit text blocks to 3,000 lines.");
  }

  // LCS Dynamic Programming Table
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (leftLines[i - 1] === rightLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrace path to align line listings
  const rawRows: DiffRow[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && leftLines[i - 1] === rightLines[j - 1]) {
      rawRows.unshift({
        left: { lineNum: i, content: leftLines[i - 1], type: "unchanged" },
        right: { lineNum: j, content: rightLines[j - 1], type: "unchanged" },
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      rawRows.unshift({
        right: { lineNum: j, content: rightLines[j - 1], type: "added" },
      });
      j--;
    } else {
      rawRows.unshift({
        left: { lineNum: i, content: leftLines[i - 1], type: "removed" },
      });
      i--;
    }
  }

  // Post-process to align adjacent additions/deletions on the same row (modified row pairing)
  return alignDiffRows(rawRows);
}

/**
 * Pairs up adjacent left-deletions and right-insertions on the same row for horizontal side-by-side comparison.
 */
function alignDiffRows(rows: DiffRow[]): DiffRow[] {
  const aligned: DiffRow[] = [];
  let i = 0;

  while (i < rows.length) {
    const current = rows[i];
    const next = rows[i + 1];

    if (
      current.left &&
      current.left.type === "removed" &&
      !current.right &&
      next &&
      next.right &&
      next.right.type === "added" &&
      !next.left
    ) {
      // Combine adjacent deletions and insertions as a single aligned modified row
      aligned.push({
        left: current.left,
        right: next.right,
      });
      i += 2;
    } else {
      aligned.push(current);
      i += 1;
    }
  }

  return aligned;
}

/**
 * Performs fine-grained token-level diffing between two strings to highlight character/word-level changes.
 */
export function diffWords(leftText: string, rightText: string): { left: DiffToken[]; right: DiffToken[] } {
  // Tokenize preserving alphanumeric words, spaces, and individual punctuation marks
  const tokenize = (text: string) => {
    return text.match(/[a-zA-Z0-9\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u0400-\u04FF\u0370-\u03FF']+|[^\w\d\s]|\s+/g) || [];
  };

  const leftTokens = tokenize(leftText);
  const rightTokens = tokenize(rightText);

  const m = leftTokens.length;
  const n = rightTokens.length;

  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (leftTokens[i - 1] === rightTokens[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const leftResult: DiffToken[] = [];
  const rightResult: DiffToken[] = [];

  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && leftTokens[i - 1] === rightTokens[j - 1]) {
      const val = leftTokens[i - 1];
      leftResult.unshift({ type: "unchanged", value: val });
      rightResult.unshift({ type: "unchanged", value: val });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      rightResult.unshift({ type: "added", value: rightTokens[j - 1] });
      j--;
    } else {
      leftResult.unshift({ type: "removed", value: leftTokens[i - 1] });
      i--;
    }
  }

  return { left: leftResult, right: rightResult };
}
