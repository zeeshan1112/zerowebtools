const fs = require('fs');
const path = require('path');

const EN_JSON_PATH = '/Users/zee/zeeshanahmad-io/zeelancebox/apps/web/src/locales/en.json';
const LOCALES_DIR = '/Users/zee/zeeshanahmad-io/zeelancebox/apps/web/src/locales';
const ARTICLES_DIR = '/Users/zee/zeeshanahmad-io/zeelancebox/apps/web/src/lib/articles';
const SEO_DATA_FILE = '/Users/zee/zeeshanahmad-io/zeelancebox/apps/web/src/lib/programmatic-seo-data.ts';
const SEO_OUTPUT_FILE = '/Users/zee/zeeshanahmad-io/zeelancebox/apps/web/src/lib/programmatic-seo-data-localized.ts';
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

const cacheTimer = setInterval(saveCache, 5000);

// Load UI keys
function loadUiKeys() {
  if (!fs.existsSync(EN_JSON_PATH)) {
    throw new Error(`EN JSON file not found: ${EN_JSON_PATH}`);
  }
  return JSON.parse(fs.readFileSync(EN_JSON_PATH, 'utf8'));
}

// Load articles dynamically
function loadArticles() {
  const domainFiles = fs.readdirSync(ARTICLES_DIR).filter(file => file.endsWith('.ts') && file !== 'index.ts');
  const articles = [];

  for (const file of domainFiles) {
    const filePath = path.join(ARTICLES_DIR, file);
    let code = fs.readFileSync(filePath, 'utf8');

    // Strip TS types and exports to allow clean eval in JS
    code = code.replace(/^import\s+[^;]+;/gm, '');
    code = code.replace(/:\s*HowToArticle\[\s*\]/g, '');
    code = code.replace(/export\s+const\s+(\w+)\s*=/g, 'global.$1 =');

    try {
      eval(code);
      const varName = file.replace('.ts', '').toUpperCase() + '_ARTICLES';
      const fileArticles = global[varName];
      if (fileArticles) {
        articles.push(...fileArticles);
      }
    } catch (e) {
      console.error(`Failed to evaluate file ${file}:`, e);
    }
  }
  return articles;
}

// Load programmatic SEO data
function loadProgrammaticData() {
  if (!fs.existsSync(SEO_DATA_FILE)) {
    return {};
  }
  let code = fs.readFileSync(SEO_DATA_FILE, 'utf8');
  code = code.replace(/^import\s+[\s\S]*?;/gm, '');
  code = code.replace('export const PROGRAMMATIC_SEO_DATA: Record<string, SubQuery[]> =', 'global.PROGRAMMATIC_SEO_DATA =');
  
  eval(code);
  return global.PROGRAMMATIC_SEO_DATA || {};
}

// Translate API fetch
let rateLimitResetTime = 0;
async function translateText(text, targetLang) {
  if (!text || typeof text !== 'string') return text || '';
  if (text.trim().startsWith('{') && text.trim().endsWith('}')) return text; // variable placeholders
  const cacheKey = `${targetLang}:${text}`;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

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
      await new Promise(r => setTimeout(r, Math.random() * 100)); // jitter
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
        rateLimitResetTime = Date.now() + 15000;
        await new Promise(r => setTimeout(r, 15000));
      } else {
        await new Promise(r => setTimeout(r, delay));
        delay *= 2.5;
      }
    }
  }

  console.error(`Failed to translate text to ${targetLang} after ${maxAttempts} attempts. Falling back to English.`);
  return text;
}

async function run() {
  console.log('Loading source data...');
  const baseEn = loadUiKeys();
  const articles = loadArticles();
  const programmaticData = loadProgrammaticData();

  console.log(`Loaded UI dictionary from en.json.`);
  console.log(`Loaded ${articles.length} articles.`);
  console.log(`Loaded programmatic SEO data for ${Object.keys(programmaticData).length} tools.`);

  // 1. Gather all translation tasks
  const tasks = [];

  // Gather UI tasks dynamically (all keys of all sections in en.json)
  for (const section in baseEn) {
    for (const key in baseEn[section]) {
      const val = baseEn[section][key];
      if (typeof val === 'string') {
        for (const lang of TARGET_LOCALES) {
          tasks.push({ type: 'ui', section, key, lang, text: val });
        }
      }
    }
  }

  // Gather article tasks
  for (const article of articles) {
    const toolId = article.toolId;
    for (const lang of TARGET_LOCALES) {
      tasks.push({ type: 'article_title', toolId, lang, text: article.title });
      tasks.push({ type: 'article_desc', toolId, lang, text: article.metaDescription });
      
      article.sections.forEach((sec, sIdx) => {
        tasks.push({ type: 'article_sec_heading', toolId, lang, text: sec.heading, sIdx });
        if (sec.paragraphs) {
          sec.paragraphs.forEach((p, pIdx) => {
            tasks.push({ type: 'article_sec_p', toolId, lang, text: p, sIdx, pIdx });
          });
        }
        if (sec.listItems) {
          sec.listItems.forEach((li, liIdx) => {
            tasks.push({ type: 'article_sec_li', toolId, lang, text: li, sIdx, liIdx });
          });
        }
      });

      if (article.faqs) {
        article.faqs.forEach((faq, fIdx) => {
          tasks.push({ type: 'article_faq_q', toolId, lang, text: faq.question, fIdx });
          tasks.push({ type: 'article_faq_a', toolId, lang, text: faq.answer, fIdx });
        });
      }
    }
  }

  // Gather programmatic SEO tasks
  for (const toolId in programmaticData) {
    for (const q of programmaticData[toolId]) {
      for (const lang of TARGET_LOCALES) {
        tasks.push({ type: 'seo_title', toolId, slug: q.slug, lang, text: q.title });
        tasks.push({ type: 'seo_meta', toolId, slug: q.slug, lang, text: q.metaDescription });
        if (q.articleIntro) {
          tasks.push({ type: 'seo_intro_heading', toolId, slug: q.slug, lang, text: q.articleIntro.heading });
          q.articleIntro.paragraphs.forEach((p, pIdx) => {
            tasks.push({ type: 'seo_intro_p', toolId, slug: q.slug, lang, text: p, pIdx });
          });
        }
      }
    }
  }

  console.log(`Total translation tasks collected: ${tasks.length}`);

  // Filter pending tasks
  const pendingTasks = tasks.filter(t => !cache[`${t.lang}:${t.text}`]);
  console.log(`Pending translation tasks to fetch: ${pendingTasks.length} (${(tasks.length - pendingTasks.length)} already cached)`);

  // 2. Process translation pool
  const CONCURRENCY_LIMIT = 8;
  let completedCount = 0;

  const worker = async (task) => {
    await translateText(task.text, task.lang);
    completedCount++;
    if (completedCount % 100 === 0 || completedCount === pendingTasks.length) {
      console.log(`Progress: ${completedCount}/${pendingTasks.length} pending tasks translated (${(completedCount / pendingTasks.length * 100).toFixed(1)}%)`);
      saveCache();
    }
  };

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
  console.log('All translations fetched/cached successfully. Compiling localized dictionary files...');

  // 3. Rebuild and save locales JSON dictionaries (UI + Articles)
  const outputs = {};
  for (const lang of TARGET_LOCALES) {
    outputs[lang] = { articles: {} };
    // Initialize empty root sections
    for (const section in baseEn) {
      outputs[lang][section] = {};
    }
  }

  // Populate UI key translations
  for (const section in baseEn) {
    for (const key in baseEn[section]) {
      const val = baseEn[section][key];
      for (const lang of TARGET_LOCALES) {
        outputs[lang][section][key] = cache[`${lang}:${val}`] || val;
      }
    }
  }

  // Populate Article translations
  for (const article of articles) {
    const toolId = article.toolId;
    for (const lang of TARGET_LOCALES) {
      const translated = {
        title: cache[`${lang}:${article.title}`] || article.title,
        metaDescription: cache[`${lang}:${article.metaDescription}`] || article.metaDescription,
        sections: [],
        faqs: []
      };

      article.sections.forEach(sec => {
        const transSec = {
          heading: cache[`${lang}:${sec.heading}`] || sec.heading,
          level: sec.level || 'h2'
        };
        if (sec.paragraphs) {
          transSec.paragraphs = sec.paragraphs.map(p => cache[`${lang}:${p}`] || p);
        }
        if (sec.listItems) {
          transSec.listItems = sec.listItems.map(li => cache[`${lang}:${li}`] || li);
        }
        translated.sections.push(transSec);
      });

      if (article.faqs) {
        article.faqs.forEach(faq => {
          translated.faqs.push({
            question: cache[`${lang}:${faq.question}`] || faq.question,
            answer: cache[`${lang}:${faq.answer}`] || faq.answer
          });
        });
      }

      outputs[lang].articles[toolId] = translated;
    }
  }

  // Save each locale dictionary file
  for (const lang of TARGET_LOCALES) {
    const outputPath = path.join(LOCALES_DIR, `${lang}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(outputs[lang], null, 2), 'utf8');
    console.log(`Saved localized UI & Articles file: ${outputPath}`);
  }

  // 4. Rebuild and save localized Programmatic SEO file
  console.log('Compiling localized programmatic SEO data file...');
  const localizedSeoData = {};
  for (const lang of TARGET_LOCALES) {
    localizedSeoData[lang] = {};
  }

  for (const toolId in programmaticData) {
    const queries = programmaticData[toolId] || [];
    for (const lang of TARGET_LOCALES) {
      localizedSeoData[lang][toolId] = [];
      for (const q of queries) {
        const translatedQuery = {
          slug: q.slug,
          title: cache[`${lang}:${q.title}`] || q.title,
          metaDescription: cache[`${lang}:${q.metaDescription}`] || q.metaDescription,
        };

        if (q.articleIntro) {
          translatedQuery.articleIntro = {
            heading: cache[`${lang}:${q.articleIntro.heading}`] || q.articleIntro.heading,
            paragraphs: q.articleIntro.paragraphs.map(p => cache[`${lang}:${p}`] || p)
          };
        }
        localizedSeoData[lang][toolId].push(translatedQuery);
      }
    }
  }

  const seoFileContent = `import { SubQuery } from "./tools";

export const LOCALIZED_PROGRAMMATIC_SEO_DATA: Record<string, Record<string, SubQuery[]>> = ${JSON.stringify(localizedSeoData, null, 2)};
`;

  fs.writeFileSync(SEO_OUTPUT_FILE, seoFileContent, 'utf8');
  console.log(`Successfully generated localized programmatic file: ${SEO_OUTPUT_FILE}`);
  console.log('All translations successfully orchestrating and generated!');
  process.exit(0);
}

run().catch(err => {
  clearInterval(cacheTimer);
  console.error('Fatal error in runner:', err);
  process.exit(1);
});
