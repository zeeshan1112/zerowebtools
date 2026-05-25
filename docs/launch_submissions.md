# Launch Checklist: AlternativeTo & Product Hunt Submissions

These two directory listings generate high-authority backlinks (DA 80+) and drive initial traffic spikes. Complete them after the site is live and stable.

---

## 1. AlternativeTo Listing

**URL**: https://alternativeto.net
**Purpose**: High-DA backlink + appears in search results for "iLovePDF alternative", "Smallpdf alternative", etc.
**Target audience**: Privacy-conscious users looking for alternatives to cloud-based tools

### Submission Steps

1. Create an account at https://alternativeto.net
2. Click "Add Application" at the top
3. Fill in the application form:

| Field | Value |
|-------|-------|
| **Name** | ZeroWebTools |
| **Description** | Free, private browser-based tools for PDF editing, image conversion, JSON formatting, and financial modeling. No server uploads — everything runs locally on your device. |
| **Category** | Productivity, File Manager, Developer Tools |
| **License** | Open Source (MIT) |
| **Platform** | Web-based (browser) |
| **Website** | https://zerowebtools.com |
| **GitHub** | https://github.com/zeeshan1112/zerowebtools |
| **Tags** | pdf, privacy, offline, client-side, browser-based, open-source, no-upload |

4. Add as an alternative to these existing listings (this is the key SEO move):
   - **iLovePDF** — position as "private, no-upload alternative"
   - **Smallpdf** — position as "free, no-signup alternative"
   - **TinyWow** — position as "open-source, offline alternative"
   - **CyberChef** — position as "simpler UI, focused on common tasks"
   - **PDF24** — position as "no Java required, runs in any modern browser"
   - **Sejda** — position as "free with no page limits"

5. Upload the logo from `apps/web/public/logo.png` as the app icon
6. After approval, ask 2-3 people to leave reviews confirming it works

### Key Messaging

> "ZeroWebTools processes everything in your browser. Your PDFs, photos, and data never leave your device. No signup, no server uploads, no file limits — unlike iLovePDF and Smallpdf which process files on remote servers."

---

## 2. Product Hunt Launch

**URL**: https://www.producthunt.com
**Purpose**: Traffic spike (5K-20K visits in 24h), 20-50 backlinks from aggregator sites, social signals
**Timing**: Launch on a Tuesday or Wednesday (highest engagement days). Coordinate the launch with a dev.to article for maximum reach.

### Pre-Launch Checklist

- [ ] Site is live and stable at zerowebtools.com
- [ ] All live tools work without errors
- [ ] Mobile experience is polished
- [ ] README is updated with live demo link
- [ ] GitHub repo is public
- [ ] Prepare 3-5 social media posts (Twitter/X, LinkedIn)

### Listing Details

| Field | Value |
|-------|-------|
| **Name** | ZeroWebTools |
| **Tagline** | Free web tools that never upload your files |
| **Description** | See below |
| **Topics** | Developer Tools, Privacy, Open Source, Productivity |
| **Website** | https://zerowebtools.com |
| **GitHub** | https://github.com/zeeshan1112/zerowebtools |
| **Pricing** | Free |

### Description (copy-paste ready)

> **ZeroWebTools** is a free, open-source suite of browser-based tools that run 100% client-side. Your files never leave your device.
>
> **16 tools live now:**
> - PDF Suite: Merge, Split, Compress, Rotate, Protect, Unlock, Organize, Watermark, Page Numbers, PDF↔JPG
> - Developer: JSON Formatter with tree view, Case Converter
> - Creative: HEIC to JPG/PNG converter
> - Finance: SaaS MRR Projections, Equity Vesting Modeler
>
> **Why ZeroWebTools?**
> - Zero server uploads — your files stay on your computer
> - Zero signup — use immediately, no account needed
> - Zero tracking — no analytics on your file content
> - Open source — full code available on GitHub
>
> Unlike iLovePDF, Smallpdf, and similar tools, ZeroWebTools processes everything locally using WebAssembly and browser APIs. Your bank statements, legal documents, and tax returns never touch a remote server.

### Launch Day Execution

1. **Post at 12:01 AM PST** — Product Hunt resets daily rankings at midnight Pacific
2. **First comments matter** — Have 3-5 people ready to comment in the first hour (genuine questions or feedback, not "congrats on launch")
3. **Cross-post** — Share the Product Hunt link on Twitter/X, LinkedIn, Reddit (r/SideProject, r/webdev, r/privacy)
4. **Respond to every comment** within the first 6 hours — this boosts ranking
5. **Pin a comment** with a brief demo or screenshot of your favorite tool

### Assets Needed

- [ ] Hero image: 1270x760px — screenshot of homepage showing tool grid
- [ ] Thumbnail: 240x240px — logo (already have `logo.png`)
- [ ] Gallery: 3-5 screenshots of individual tools (PDF merge workspace, JSON formatter, HEIC converter)

---

## Expected Outcomes

| Platform | Backlinks Generated | Traffic Spike | Long-term Value |
|----------|-------------------|--------------|----------------|
| AlternativeTo | 1-3 (DA 80+) | 100-500 visits/month | Appears in "alternative to" search results |
| Product Hunt | 20-50 (aggregator sites auto-scrape PH) | 5K-20K visits in 24h | Backlinks persist, PH listing ranks for brand searches |

---

**Note**: Complete these AFTER the site is deployed and all tools are stable. A broken product on launch day wastes the backlink opportunity permanently.

---

## 3. AdSense — When & How to Introduce Ads

### Don't Enable Ads on Day One

AdSense requires **traffic and content maturity** to generate meaningful revenue. Launching with ads too early hurts you three ways:

1. **Google reviews new AdSense accounts manually** — sites with <30 days of live traffic and minimal content often get rejected or get limited ad serving. Get approved first, then scale.
2. **Ads kill first impressions** — your Product Hunt and AlternativeTo launch traffic will bounce if the first thing they see is a leaderboard ad above the tool. Users on launch day are evaluating whether to bookmark or share your site. Ads send the wrong signal.
3. **Core Web Vitals risk** — AdSense scripts add network requests and layout shifts. Your site currently scores well on Lighthouse because ad slots render as skeleton placeholders (zero CLS). Enabling real ads changes that equation.

### Timeline

| Phase | When | What | Why |
|-------|------|------|-----|
| **Phase 0: Pre-launch** | Now | Keep current skeletons as-is. AdSense script in layout uses placeholder ID — no real ads load. | Placeholder slots reserve layout space with zero CLS. No revenue, no risk. |
| **Phase 1: Apply for AdSense** | 2-3 weeks after site is live & indexed | Apply for AdSense at https://www.google.com/adsense. Use real domain. Site needs: original content, working tools, privacy policy, terms page, navigation. | Google requires a live, navigable site with real content before approval. Our 16 tool pages + privacy/terms meet this threshold. |
| **Phase 2: Soft launch ads** | 1 week after AdSense approval | Replace placeholder `ca-pub-XXXXXXXXXXXXXXXX` with real publisher ID. Enable ONLY the sidebar rectangle ad on tool pages. Keep leaderboard and anchor slots as skeletons. | Sidebar ads generate revenue without disrupting the primary workspace area. One ad unit per page is the minimum viable test. |
| **Phase 3: Full ad rollout** | After 1 month of soft launch data | Enable leaderboard ad below workspace and in article blocks. Monitor CLS and LCP in Lighthouse after each ad unit activation. | Roll out incrementally so you can measure which ad unit, if any, causes Core Web Vitals regression. |
| **Phase 4: Optimize** | Ongoing after full rollout | Analyze which tools/pages generate highest RPM. Adjust ad positions per page. Consider auto-ads if manual placements underperform. | AdSense RPM varies wildly by tool category. Financial tools will earn 5-10x more than image converters. |

### Current Ad Placement Architecture

The site already has the right skeleton structure. These slots are live but render as empty placeholders:

| Slot Location | Type | Size | File | Status |
|---------------|------|------|------|--------|
| Tool sidebar (right rail) | Rectangle | 300×250 | `ToolSidebar.tsx` line 55 | Skeleton only |
| Below workspace | Leaderboard | 728×90 | `[toolId]/page.tsx` line 770 | Skeleton only |
| Below article block | Leaderboard | 728×90 | `ArticleBlock.tsx` line 137 | Skeleton only |
| Homepage (not placed yet) | — | — | — | No ad slots on homepage yet |

### When to Add the Real Publisher ID

In `apps/web/src/app/layout.tsx`, line 56:

```typescript
const ADSENSE_CLIENT_ID = "ca-pub-XXXXXXXXXXXXXXXX"; // Replace after AdSense approval
```

After Google approves your account, replace this with the real `ca-pub-` ID from your AdSense dashboard. Then update `AdLayoutSlot.tsx` to render actual `<ins class="adsbygoogle">` units instead of skeletons.

### Homepage Ads — Delay Indefinitely

The homepage is your storefront. Do not place ads on it. Every user lands there first. An ad on the homepage tells visitors "this site exists to show me ads." The tool pages where users spend 3-10 minutes working are where ads belong — users are already engaged, and sidebar placements feel natural there.

### Revenue Expectations (Realistic)

| Traffic Level | Monthly Pageviews | Estimated RPM | Monthly Revenue |
|---------------|------------------|---------------|-----------------|
| Launch month | 5K-20K | $1-3 | $5-60 |
| Month 3 (post-indexing) | 20K-50K | $2-5 | $40-250 |
| Month 6 (if SEO works) | 50K-200K | $3-8 | $150-1,600 |
| Financial tool pages | — | $8-25 | 3-5x higher RPM than PDF tools |

These are conservative estimates for a new domain. The real unlock comes when financial tools (MRR modeler, equity vesting, mortgage calculator) go live — those pages command $15-30 CPC from fintech advertisers.

### AdSense Approval Checklist

Before applying, confirm:
- [ ] Site is live at zerowebtools.com (not localhost)
- [ ] All 16 tool pages return 200 status
- [ ] Privacy policy page exists and mentions cookies/analytics (it does)
- [ ] Terms of service page exists (it does)
- [ ] Site has navigation (sidebar + header links)
- [ ] Google Analytics is tracking (G-L9Z1RQWNJV)
- [ ] Site is indexed in Google Search Console
- [ ] No "under construction" or placeholder content
- [ ] At least 2 weeks of live traffic data