const fs = require('fs');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');

const html = fs.readFileSync('scratch/freedium.html', 'utf8');
const doc = new JSDOM(html).window.document;
const reader = new Readability(doc);
const article = reader.parse();

console.log(article.content ? article.content.length : 'No content');
