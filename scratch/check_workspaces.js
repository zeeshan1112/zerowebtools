const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '../apps/web/src/locales');
const data = JSON.parse(fs.readFileSync(path.join(localesDir, 'es.json'), 'utf8'));
const translatedKeys = Object.keys(data).filter(k => k !== 'common' && k !== 'articles');

console.log('Translated workspace keys in es.json:', translatedKeys);
if (translatedKeys.length > 0) {
  console.log('Sample key (', translatedKeys[0], '):', JSON.stringify(data[translatedKeys[0]], null, 2));
}
