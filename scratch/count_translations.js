const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, '../apps/web/src/lib/i18n.ts');
const content = fs.readFileSync(i18nPath, 'utf8');

const regex = /^  "([^"]+)":\s*\{/gm;
let match;
const keys = [];
while ((match = regex.exec(content)) !== null) {
  if (match[1] !== 'common' && match[1] !== 'articles' && !['es', 'de', 'fr', 'pt', 'ja', 'zh', 'hi', 'it', 'ar'].includes(match[1])) {
    keys.push(match[1]);
  }
}

console.log(`Number of tools in TOOL_TRANSLATIONS: ${keys.length}`);
console.log(`Tool keys:`, keys);
