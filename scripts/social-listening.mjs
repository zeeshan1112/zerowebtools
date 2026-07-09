import fs from "fs";
import path from "path";
import { PROGRAMMATIC_SEO_DATA } from "/Users/zee/zeeshanahmad-io/zerowebtools/apps/web/src/lib/programmatic-seo-data.ts";

// Compile dynamic keywords list from all programmatic search slugs
const KEYWORDS = [];
for (const [_, queries] of Object.entries(PROGRAMMATIC_SEO_DATA)) {
  for (const q of queries) {
    const cleanQuery = q.slug
      .replace(/-online$/, "")
      .replace(/-free$/, "")
      .replace(/-/g, " ");
    KEYWORDS.push(cleanQuery);
  }
}

// Deduplicate
const UNIQUE_KEYWORDS = Array.from(new Set(KEYWORDS));

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDDIT_USERNAME = process.env.REDDIT_USERNAME;
const REDDIT_PASSWORD = process.env.REDDIT_PASSWORD;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional, to increase rate limits

// Rate-limiting helper to avoid hitting API thresholds
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function searchHackerNews(query) {
  const url = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(query)}&tags=comment&numericFilters=created_at_i>${Math.floor(Date.now() / 1000) - 86400 * 7}`; // past 7 days
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.hits || []).map(hit => ({
      platform: "Hacker News",
      title: `Comment by ${hit.author} on "${hit.story_title || "Thread"}"`,
      url: `https://news.ycombinator.com/item?id=${hit.story_id || hit.parent_id}`,
      text: hit.comment_text ? hit.comment_text.replace(/<[^>]*>/g, "").slice(0, 200) + "..." : "No snippet",
      created: new Date(hit.created_at_i * 1000)
    }));
  } catch (_) {
    return [];
  }
}

async function searchGitHub(query) {
  // Search open issues and discussions on GitHub mentioning the query
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}+type:issue+state:open&sort=created&order=desc&per_page=5`;
  const headers = {
    "User-Agent": "ZeroWebToolsSocialListener/1.0",
    "Accept": "application/vnd.github.v3+json"
  };
  if (GITHUB_TOKEN) {
    headers["Authorization"] = `token ${GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).map(item => ({
      platform: "GitHub Issues",
      title: `Issue: "${item.title}" in ${item.repository_url.replace("https://api.github.com/repos/", "")}`,
      url: item.html_url,
      text: item.body ? item.body.slice(0, 200) + "..." : "No body text",
      created: new Date(item.created_at)
    }));
  } catch (_) {
    return [];
  }
}

async function getRedditAccessToken() {
  if (!REDDIT_CLIENT_ID || !REDDIT_CLIENT_SECRET || !REDDIT_USERNAME || !REDDIT_PASSWORD) {
    return null;
  }
  const url = "https://www.reddit.com/api/v1/access_token";
  const auth = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString("base64");
  
  const body = new URLSearchParams({
    grant_type: "password",
    username: REDDIT_USERNAME,
    password: REDDIT_PASSWORD
  });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "ZeroWebToolsSocialListener/1.0"
      },
      body
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token || null;
  } catch (_) {
    return null;
  }
}

async function searchReddit(token, query) {
  const url = `https://oauth.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=new&t=week&limit=10`;
  try {
    const res = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "User-Agent": "ZeroWebToolsSocialListener/1.0"
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    const children = data?.data?.children || [];
    return children.map(child => ({
      platform: "Reddit",
      title: child.data.title || `Post in r/${child.data.subreddit}`,
      url: `https://reddit.com${child.data.permalink}`,
      text: child.data.selftext ? child.data.selftext.slice(0, 200) + "..." : "No body text",
      created: new Date(child.data.created_utc * 1000)
    }));
  } catch (_) {
    return [];
  }
}

function generateDraftReply(q) {
  const qLower = q.toLowerCase();
  if (qLower.includes("json") || qLower.includes("typescript") || qLower.includes("go struct")) {
    return `Hey! If you are looking to format JSON or convert it to TypeScript/Go/Python locally, I built a 100% private web utility: https://zerowebtools.com/tools/json-formatter. Everything runs locally on your browser CPU, so your API structures and secrets never leave your device.`;
  }
  if (qLower.includes("heic")) {
    return `Hey! Converting HEIC images locally in your browser is super fast and keeps your photos secure. I built a free converter tool for this: https://zerowebtools.com/tools/heic-to-jpg. No file size limits or watermarks since it runs entirely on WebAssembly inside your browser memory.`;
  }
  if (qLower.includes("pdf")) {
    return `Hey! If you want to merge or compress PDFs securely, check out this 100% local editor: https://zerowebtools.com/tools/pdf-merge. No cloud uploads mean your confidential documents stay private.`;
  }
  return `Hey! I built a collection of free, private developer utilities including CORS bypassers and code converters here: https://zerowebtools.com. Hope it helps!`;
}

async function startSocialListening() {
  console.log("=========================================");
  console.log("   ZeroWebTools Social Listening Monitor ");
  console.log("=========================================");
  console.log(`Dynamically compiled ${UNIQUE_KEYWORDS.length} active keywords from database.\n`);

  const redditToken = await getRedditAccessToken();
  if (redditToken) {
    console.log("✅ Authenticated with Reddit API successfully.");
  } else {
    console.log("ℹ️ Reddit API keys not configured. Skipping Reddit scan (OAuth required).");
  }

  let totalHits = 0;

  for (let i = 0; i < UNIQUE_KEYWORDS.length; i++) {
    const query = UNIQUE_KEYWORDS[i];
    console.log(`[${i + 1}/${UNIQUE_KEYWORDS.length}] Scanning for: "${query}"...`);
    
    const hnResults = await searchHackerNews(query);
    const gitHubResults = await searchGitHub(query);
    const redditResults = redditToken ? await searchReddit(redditToken, query) : [];
    
    const combined = [...hnResults, ...gitHubResults, ...redditResults];
    totalHits += combined.length;

    if (combined.length > 0) {
      combined.forEach(hit => {
        console.log(`\n  📌 [${hit.platform}] - ${hit.title}`);
        console.log(`     Link: ${hit.url}`);
        console.log(`     Date: ${hit.created.toLocaleString()}`);
        console.log(`     Snippet: "${hit.text.trim()}"`);
        console.log(`     Suggested Organic Reply:`);
        console.log(`       "${generateDraftReply(query)}"`);
        console.log("     ---------------------------------------");
      });
    }

    // Defensive rate-limiting delay between keywords
    await sleep(400);
  }

  console.log("\n=========================================");
  console.log(`Scan Complete. Found ${totalHits} active threads.`);
  console.log("=========================================");
}

startSocialListening();
