import fs from "fs";
import path from "path";

const KEYWORDS = [
  "json to typescript",
  "json to go",
  "json to python",
  "convert heic to png",
  "convert heic to webp",
  "compress pdf 100kb",
  "compress pdf 200kb",
  "merge pdf online",
  "bypass cors api",
  "test localhost api"
];

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID;
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET;
const REDDIT_USERNAME = process.env.REDDIT_USERNAME;
const REDDIT_PASSWORD = process.env.REDDIT_PASSWORD;

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
  if (qLower.includes("json")) {
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
  console.log(`Monitoring keywords: ${KEYWORDS.join(", ")}\n`);

  const redditToken = await getRedditAccessToken();
  if (redditToken) {
    console.log("✅ Authenticated with Reddit API successfully.");
  } else {
    console.log("ℹ️ Reddit API keys not configured. Skipping Reddit scan (OAuth required).");
  }

  let totalHits = 0;

  for (const query of KEYWORDS) {
    console.log(`\nScanning for: "${query}"...`);
    const hnResults = await searchHackerNews(query);
    const redditResults = redditToken ? await searchReddit(redditToken, query) : [];
    
    const combined = [...hnResults, ...redditResults];
    totalHits += combined.length;

    if (combined.length === 0) {
      console.log("  No matches found in the last week.");
      continue;
    }

    combined.forEach(hit => {
      console.log(`\n📌 [${hit.platform}] - ${hit.title}`);
      console.log(`   Link: ${hit.url}`);
      console.log(`   Date: ${hit.created.toLocaleString()}`);
      console.log(`   Snippet: "${hit.text}"`);
      console.log(`   Suggested Organic Reply:`);
      console.log(`     "${generateDraftReply(query)}"`);
      console.log("   ---------------------------------------");
    });
  }

  console.log("\n=========================================");
  console.log(`Scan Complete. Found ${totalHits} active threads.`);
  console.log("=========================================");
}

startSocialListening();
