const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../apps/web/src/locales');
const toolsFile = path.join(__dirname, '../apps/web/src/lib/tools.ts');

// Read categories to get all live tools
const toolsContent = fs.readFileSync(toolsFile, 'utf8');
// Simple extraction of tool IDs from tools.ts
const toolIdRegex = /id:\s*"([^"]+)"/g;
const allToolIds = [];
let match;
while ((match = toolIdRegex.exec(toolsContent)) !== null) {
  if (!allToolIds.includes(match[1])) {
    allToolIds.push(match[1]);
  }
}

console.log(`Total live tools found in tools.ts: ${allToolIds.length}`);

const locales = ['es', 'de', 'fr', 'pt', 'ja', 'zh', 'hi', 'it', 'ar'];

locales.forEach(loc => {
  const filePath = path.join(localesDir, `${loc}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`Locale file not found: ${loc}.json`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const commonKeys = Object.keys(data.common || {});
  const articleKeys = Object.keys(data.articles || {});
  const translatedToolKeys = Object.keys(data).filter(k => k !== 'common' && k !== 'articles');

  console.log(`Locale: ${loc}`);
  console.log(`  - Common keys: ${commonKeys.length}`);
  console.log(`  - Articles translated: ${articleKeys.length} / ${allToolIds.length}`);
  console.log(`  - Workspace translations: ${translatedToolKeys.length} / ${allToolIds.length}`);

  const missingArticles = allToolIds.filter(id => !articleKeys.includes(id));
  const missingWorkspaces = allToolIds.filter(id => !translatedToolKeys.includes(id.replace(/-/g, '_')));

  if (missingArticles.length > 0) {
    console.log(`    Missing articles: ${missingArticles.slice(0, 5).join(', ')}... (+${missingArticles.length - 5} more)`);
  }
  if (missingWorkspaces.length > 0) {
    console.log(`    Missing workspaces: ${missingWorkspaces.slice(0, 5).join(', ')}... (+${missingWorkspaces.length - 5} more)`);
  }
});
