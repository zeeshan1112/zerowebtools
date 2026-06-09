const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, '../apps/web/src/app/tools/[toolId]/page.tsx');
const content = fs.readFileSync(pagePath, 'utf8');

const regex = /^  "([^"]+)":\s*\{/gm;
let match;
const keys = [];
while ((match = regex.exec(content)) !== null) {
  keys.push(match[1]);
}

console.log(`Number of articles in page.tsx: ${keys.length}`);
console.log(`Article keys:`, keys);
