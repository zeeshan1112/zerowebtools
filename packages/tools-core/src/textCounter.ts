/**
 * Interface representing text statistics.
 */
export interface TextStats {
  words: number;
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMin: number;
  readingTimeSec: number;
  speakingTimeMin: number;
  speakingTimeSec: number;
  keywords: Array<{ word: string; count: number; percentage: number }>;
}

/**
 * Common English stop words to filter out for keyword density analysis.
 */
export const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "with", 
  "is", "are", "was", "were", "it", "this", "that", "of", "from", "by", 
  "as", "i", "you", "he", "she", "they", "we", "us", "them", "my", "your", 
  "his", "her", "their", "our", "its", "me", "him", "about", "into", "over", 
  "after", "before", "between", "under", "through", "during", "without",
  "has", "have", "had", "be", "been", "do", "does", "did", "can", "will", "would", "should"
]);

/**
 * Counts statistics for a given text block.
 * Uses Unicode-aware character counting for emojis and multibyte sequences.
 */
export function countTextStats(text: string, excludeStopWords: boolean = true): TextStats {
  if (!text) {
    return {
      words: 0,
      charactersWithSpaces: 0,
      charactersWithoutSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTimeMin: 0,
      readingTimeSec: 0,
      speakingTimeMin: 0,
      speakingTimeSec: 0,
      keywords: [],
    };
  }

  // Unicode-safe character counting (splits correctly by code points rather than UTF-16 code units)
  const charArray = Array.from(text);
  const charactersWithSpaces = charArray.length;
  // Characters without any space chars (\s includes spaces, tabs, newlines)
  const charactersWithoutSpaces = charArray.filter((c) => !/\s/.test(c)).length;

  // Word extraction: splits on word boundaries while supporting foreign letters and apostrophes
  const words = text
    .match(/[a-zA-Z0-9\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u0400-\u04FF\u0370-\u03FF']+/g) || [];
  const wordsCount = words.length;

  // Sentences: split on period, exclamation, or question mark, ignoring trailing spaces
  const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0).length;

  // Paragraphs: split on double newlines
  const paragraphs = text
    .split(/\n\s*\r?\n/)
    .filter((p) => p.trim().length > 0).length;

  // Lines: split on standard newline characters
  const lines = text.split(/\r\n|\r|\n/).length;

  // Reading time (~200 Words Per Minute)
  const readingTimeTotalSec = Math.round((wordsCount / 200) * 60);
  const readingTimeMin = Math.floor(readingTimeTotalSec / 60);
  const readingTimeSec = readingTimeTotalSec % 60;

  // Speaking time (~130 Words Per Minute)
  const speakingTimeTotalSec = Math.round((wordsCount / 130) * 60);
  const speakingTimeMin = Math.floor(speakingTimeTotalSec / 60);
  const speakingTimeSec = speakingTimeTotalSec % 60;

  // Keyword Density analysis
  const keywordMap: Record<string, number> = {};
  words.forEach((w) => {
    const lower = w.toLowerCase();
    // Only analyze words longer than 1 character to skip noise/punctuation artifacts
    if (lower.length > 1) {
      if (excludeStopWords && STOP_WORDS.has(lower)) {
        return;
      }
      keywordMap[lower] = (keywordMap[lower] || 0) + 1;
    }
  });

  const keywords = Object.entries(keywordMap)
    .map(([word, count]) => ({
      word,
      count,
      percentage: Number(((count / (wordsCount || 1)) * 100).toFixed(1)),
    }))
    // Sort by count descending, then alphabetically by word
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    // Return top 10 keywords
    .slice(0, 10);

  return {
    words: wordsCount,
    charactersWithSpaces,
    charactersWithoutSpaces,
    sentences,
    paragraphs,
    lines,
    readingTimeMin,
    readingTimeSec,
    speakingTimeMin,
    speakingTimeSec,
    keywords,
  };
}
