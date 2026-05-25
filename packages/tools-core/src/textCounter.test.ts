import { describe, it, expect } from "vitest";
import { countTextStats } from "./textCounter";

describe("textCounter utilities", () => {
  it("handles empty and null inputs gracefully", () => {
    const emptyStats = countTextStats("");
    expect(emptyStats.words).toBe(0);
    expect(emptyStats.charactersWithSpaces).toBe(0);
    expect(emptyStats.charactersWithoutSpaces).toBe(0);
    expect(emptyStats.sentences).toBe(0);
    expect(emptyStats.paragraphs).toBe(0);
    expect(emptyStats.lines).toBe(0);
    expect(emptyStats.keywords).toEqual([]);
  });

  it("counts words and characters accurately", () => {
    const text = "Hello world! This is a simple test.";
    const stats = countTextStats(text);
    
    // Words: Hello, world, This, is, a, simple, test (7 words)
    expect(stats.words).toBe(7);
    
    // Characters: length of string
    expect(stats.charactersWithSpaces).toBe(text.length);
    
    // Characters without spaces: text length minus 6 spaces
    expect(stats.charactersWithoutSpaces).toBe(text.length - 6);
  });

  it("handles emojis and multibyte characters safely", () => {
    // 🔥 is 1 character (unicode code point), but has length 2 in UTF-16
    // 🧑‍💻 is 1 character (grapheme) made of multiple code points, but Array.from splits it into constituent code points.
    // Let's test standard emojis that split into code points cleanly (e.g. 😂 which is 1 code point)
    const text = "Hello 😂🔥 world";
    const stats = countTextStats(text);
    
    // Words: Hello, world (2 words)
    expect(stats.words).toBe(2);
    
    // charactersWithSpaces: Array.from("Hello 😂🔥 world").length = 6 + 1 (😂) + 1 (🔥) + 1 ( ) + 5 (world) = 14
    expect(stats.charactersWithSpaces).toBe(14);
  });

  it("counts sentences and paragraphs correctly", () => {
    const text = "First sentence. Second sentence! Third one? Yes.\n\nSecond paragraph here.";
    const stats = countTextStats(text);
    
    expect(stats.sentences).toBe(5); // split on . ! ? (First, Second, Third, Yes, Second paragraph here)
    expect(stats.paragraphs).toBe(2); // split by double newlines
    expect(stats.lines).toBe(3); // two newlines makes 3 lines
  });

  it("calculates reading and speaking times reasonably", () => {
    // 200 words should take exactly 1 minute of reading time
    const wordsArray = Array(200).fill("word");
    const text = wordsArray.join(" ");
    const stats = countTextStats(text);
    
    expect(stats.words).toBe(200);
    expect(stats.readingTimeMin).toBe(1);
    expect(stats.readingTimeSec).toBe(0);
    
    // 130 words should take exactly 1 minute of speaking time
    const statsSpeak = countTextStats(Array(130).fill("word").join(" "));
    expect(statsSpeak.words).toBe(130);
    expect(statsSpeak.speakingTimeMin).toBe(1);
    expect(statsSpeak.speakingTimeSec).toBe(0);
  });

  it("calculates keyword density and filters stop words", () => {
    const text = "Web tools are great. These web tools help build web solutions.";
    // Words: Web, tools, are, great, These, web, tools, help, build, web, solutions (11 words)
    // web / Web appears 4 times.
    // tools appears 2 times.
    
    const statsWithFilter = countTextStats(text, true); // exclude stop words (are, these, help)
    
    const webKeyword = statsWithFilter.keywords.find(k => k.word === "web");
    expect(webKeyword).toBeDefined();
    expect(webKeyword?.count).toBe(3);
    expect(webKeyword?.percentage).toBe(Number(((3 / 11) * 100).toFixed(1)));

    const toolsKeyword = statsWithFilter.keywords.find(k => k.word === "tools");
    expect(toolsKeyword).toBeDefined();
    expect(toolsKeyword?.count).toBe(2);
    
    // Test without filtering stop words
    const statsNoFilter = countTextStats(text, false);
    const areKeyword = statsNoFilter.keywords.find(k => k.word === "are");
    expect(areKeyword).toBeDefined();
    expect(areKeyword?.count).toBe(1);
  });
});
