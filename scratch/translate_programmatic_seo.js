const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../apps/web/src/lib/programmatic-seo-data.ts');
const OUTPUT_FILE = path.join(__dirname, '../apps/web/src/lib/programmatic-seo-data-localized.ts');
const CACHE_PATH = '/Users/zee/.gemini/antigravity/brain/686e5862-d1dd-4893-8ba7-1273b6738c99/scratch/translation_cache.json';

const TARGET_LOCALES = ['es', 'de', 'fr', 'pt', 'ja', 'zh', 'hi', 'it', 'ar'];

// Load cache
let cache = {};
if (fs.existsSync(CACHE_PATH)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
    console.log(`Loaded cache with ${Object.keys(cache).length} entries.`);
  } catch (e) {
    cache = {};
  }
}

let cacheDirty = false;
function saveCache() {
  if (!cacheDirty) return;
  try {
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), 'utf8');
    cacheDirty = false;
    console.log(`[Cache] Autosaved cache file (${Object.keys(cache).length} entries)`);
  } catch (e) {
    console.error('Failed to save cache:', e);
  }
}

// Save cache every 5 seconds if dirty
const cacheTimer = setInterval(saveCache, 5000);

// Load English SEO data
function loadProgrammaticData() {
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error(`Data file not found: ${DATA_FILE}`);
  }
  let code = fs.readFileSync(DATA_FILE, 'utf8');
  code = code.replace(/import\s+[\s\S]*?;/g, '');
  code = code.replace('export const PROGRAMMATIC_SEO_DATA: Record<string, SubQuery[]> =', 'global.PROGRAMMATIC_SEO_DATA =');
  
  eval(code);
  return global.PROGRAMMATIC_SEO_DATA;
}

// Global translation function with retry and delay
let rateLimitResetTime = 0;
async function translateText(text, targetLang) {
  if (!text || typeof text !== 'string') return text || '';
  const cacheKey = `${targetLang}:${text}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  // Handle active rate limit cooling off
  if (Date.now() < rateLimitResetTime) {
    const waitMs = rateLimitResetTime - Date.now();
    await new Promise(r => setTimeout(r, waitMs));
  }

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  
  let attempts = 0;
  const maxAttempts = 4;
  let delay = 1500;

  while (attempts < maxAttempts) {
    try {
      // Small random sleep to jitter requests
      await new Promise(r => setTimeout(r, Math.random() * 200));

      const res = await fetch(url);
      if (res.status === 429 || res.status === 503) {
        throw new Error(`Rate limited: HTTP ${res.status}`);
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await res.json();
      const result = json[0].map(item => item[0]).join('');
      cache[cacheKey] = result;
      cacheDirty = true;
      return result;
    } catch (err) {
      attempts++;
      console.warn(`[Attempt ${attempts}/${maxAttempts}] Error translating to ${targetLang}: ${err.message}. Text: "${text.slice(0, 30)}..."`);
      if (err.message.includes('Rate limited') || err.message.includes('HTTP 429')) {
        // Pause all requests for 15 seconds, increase backoff
        rateLimitResetTime = Date.now() + 15000;
        await new Promise(r => setTimeout(r, 15000));
      } else {
        await new Promise(r => setTimeout(r, delay));
        delay *= 2.5; // exponential backoff
      }
    }
  }

  console.error(`Failed to translate text to ${targetLang} after ${maxAttempts} attempts. Falling back to English.`);
  return text; // Fallback to English
}

async function run() {
  const programmaticData = loadProgrammaticData();
  const toolIds = Object.keys(programmaticData);
  console.log(`Loaded ${toolIds.length} tools from programmatic data.`);

  // 1. Gather all tasks that need translation
  const tasks = [];
  for (const toolId of toolIds) {
    const queries = programmaticData[toolId] || [];
    for (const q of queries) {
      for (const lang of TARGET_LOCALES) {
        tasks.push({ type: 'title', toolId, slug: q.slug, lang, text: q.title });
        tasks.push({ type: 'meta', toolId, slug: q.slug, lang, text: q.metaDescription });
        if (q.articleIntro) {
          tasks.push({ type: 'intro_heading', toolId, slug: q.slug, lang, text: q.articleIntro.heading });
          q.articleIntro.paragraphs.forEach((p, idx) => {
            tasks.push({ type: 'intro_p', toolId, slug: q.slug, lang, text: p, paragraphIndex: idx });
          });
        }
      }
    }
  }

  console.log(`Total translation tasks collected: ${tasks.length}`);
  
  // Filter out tasks already cached
  const pendingTasks = tasks.filter(t => !cache[`${t.lang}:${t.text}`]);
  console.log(`Pending translation tasks to fetch: ${pendingTasks.length} (${(tasks.length - pendingTasks.length)} already cached)`);

  // 2. Run promise pool on pending tasks
  const CONCURRENCY_LIMIT = 8;
  let completedCount = 0;
  
  const worker = async (task) => {
    await translateText(task.text, task.lang);
    completedCount++;
    if (completedCount % 50 === 0 || completedCount === pendingTasks.length) {
      console.log(`Progress: ${completedCount}/${pendingTasks.length} pending tasks translated (${(completedCount / pendingTasks.length * 100).toFixed(1)}%)`);
      saveCache();
    }
  };

  // Proper promise pool helper
  async function runPool(tasksList, limit) {
    const active = [];
    for (let i = 0; i < tasksList.length; i++) {
      const p = worker(tasksList[i]).then(() => {
        active.splice(active.indexOf(p), 1);
      });
      active.push(p);
      if (active.length >= limit) {
        await Promise.race(active);
      }
    }
    await Promise.all(active);
  }

  if (pendingTasks.length > 0) {
    console.log(`Starting translation pool with concurrency=${CONCURRENCY_LIMIT}...`);
    await runPool(pendingTasks, CONCURRENCY_LIMIT);
  }
  
  clearInterval(cacheTimer);
  saveCache();
  console.log('All translations fetched/cached successfully. Rebuilding final localized file...');

  // 3. Rebuild the final localized structure
  const localizedData = {};
  for (const lang of TARGET_LOCALES) {
    localizedData[lang] = {};
  }

  for (const toolId of toolIds) {
    const queries = programmaticData[toolId] || [];
    for (const lang of TARGET_LOCALES) {
      localizedData[lang][toolId] = [];
      for (const q of queries) {
        const cacheKeyTitle = `${lang}:${q.title}`;
        const cacheKeyMeta = `${lang}:${q.metaDescription}`;
        const translatedQuery = {
          slug: q.slug,
          title: cache[cacheKeyTitle] || q.title,
          metaDescription: cache[cacheKeyMeta] || q.metaDescription,
        };

        if (q.articleIntro) {
          const cacheKeyHeading = `${lang}:${q.articleIntro.heading}`;
          translatedQuery.articleIntro = {
            heading: cache[cacheKeyHeading] || q.articleIntro.heading,
            paragraphs: q.articleIntro.paragraphs.map(p => {
              const cacheKeyP = `${lang}:${p}`;
              return cache[cacheKeyP] || p;
            })
          };
        }
        localizedData[lang][toolId].push(translatedQuery);
      }
    }
  }

  const fileContent = `import { SubQuery } from "./tools";

export const LOCALIZED_PROGRAMMATIC_SEO_DATA: Record<string, Record<string, SubQuery[]>> = ${JSON.stringify(localizedData, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf8');
  console.log(`Successfully generated localized output file: ${OUTPUT_FILE}`);
  process.exit(0);
}

run().catch(err => {
  clearInterval(cacheTimer);
  console.error('Fatal error in runner:', err);
  process.exit(1);
});
