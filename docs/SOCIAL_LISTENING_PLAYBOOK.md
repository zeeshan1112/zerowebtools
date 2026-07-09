# ZeroWebTools — Social Listening Playbook

The **Social Listening Monitor** is a personal traffic-scouting script designed to monitor active developer questions and discussions on the web (Hacker News, GitHub Issues, and Reddit) regarding format conversions, PDF operations, API tests, and developer utility needs.

It matches users in real-time who are experiencing frictions that ZeroWebTools solves, drafting organic, value-first replies recommending your local-first tools.

---

## 1. How to Run the Script

Run the script directly from your terminal using:
```bash
npx tsx scripts/social-listening.mjs
```

To run with your local `.env` credentials loaded (required for Reddit API access), use:
```bash
node --env-file=.env scripts/social-listening.mjs
```

---

## 2. API Configuration (`.env` Setup)

Create or edit a `.env` file in the root of the project to add credentials for Reddit (required to bypass Cloudflare crawler blocks) and GitHub (optional, to increase API rate limits).

### A. Reddit API Registration Steps
To register for Reddit API access:
1. Visit [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps) while logged into your Reddit account.
2. Scroll to the bottom and click **Create App** or **Create another app**.
3. **Register Request**: If prompted by Reddit's Developer registration screen:
   * Select **I'm a Developer**.
   * Select **I want to register to use the Reddit API**.
   * Choose **Hobbyist / Personal Use** (approvals are granted instantly).
4. Fill out the application fields:
   * **Name**: `ZeroWebTools Listener`
   * **App Type**: Choose **script** (personal script).
   * **Description**: `Personal read-only monitor for utility tool threads.`
   * **Redirect URI**: `http://localhost:8080` (required, standard placeholder).
5. Click **Create app**.
6. Copy the credentials:
   * **Client ID**: The string of text directly under the application name (e.g. `jK3aLs9X1_aBcD`).
   * **Client Secret**: The string next to the label **secret** (e.g. `zXyWvUtSrQpOnMlKjIhGfEdC`).

Add these credentials to your `.env` file:
```env
REDDIT_CLIENT_ID="your_client_id"
REDDIT_CLIENT_SECRET="your_client_secret"
REDDIT_USERNAME="your_reddit_username"
REDDIT_PASSWORD="your_reddit_password"
```

### B. GitHub Search API Token (Optional)
By default, the GitHub search endpoint allows 60 queries/hour. To scale this and query many keywords without rate limits, create a Personal Access Token (classic) on GitHub with read-only permissions and add it:
```env
GITHUB_TOKEN="your_github_personal_access_token"
```

---

## 3. Dynamic Keyword Sync
The script does **not** rely on hardcoded keywords. It automatically imports `PROGRAMMATIC_SEO_DATA` from your database:
* It reads every search slug generated for your 55+ tools.
* Cleans the slugs (removes `-online`, `-free`, and replaces dashes with spaces) to create natural search terms.
* Automatically syncs whenever you write a new tool or programmatic page, ensuring zero manual updates are needed!

---

## 4. Best Practices for Organic Posting (Zero-Ban Rules)

Hacker News, Reddit, and GitHub are strictly moderated developer platforms. To drive high-converting traffic and protect your domain reputation, follow these rules:

1. **Never Auto-Post**: The script only outputs drafts; you should copy, edit, and post replies manually. Automatic posting bots are banned instantly by platform algorithms.
2. **Context-Check**: Only reply if the user is **actively looking for a solution** or complaining about an existing tool. If the keyword was just mentioned in passing, skip it.
3. **Leading with Value**: Always explain *why* ZeroWebTools is better:
   * **Local-first / Privacy**: *“It runs entirely in your browser memory so your files are never uploaded to a server.”*
   * **Free**: *“No signup, no limits, and no watermarks.”*
4. **Natural Tone**: Adjust the drafted reply to sound like a fellow developer offering a helpful bookmark rather than a copy-pasted advertisement.
