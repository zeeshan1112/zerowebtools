export function parseMediumPost(postData: any): string {
  const post = postData?.data?.post;
  if (!post) throw new Error("Invalid Medium post data");

  const paragraphs = post.content?.bodyModel?.paragraphs || [];
  
  let html = `<h1>${post.title}</h1>\n`;
  if (post.previewContent?.subtitle) {
    html += `<h2 class="text-xl text-neutral-500 mb-6">${post.previewContent.subtitle}</h2>\n`;
  }
  
  // Author & Date
  html += `<div class="flex items-center gap-4 mb-8 text-sm">`;
  if (post.creator) {
    html += `<div class="font-bold">${post.creator.name}</div>`;
  }
  if (post.firstPublishedAt) {
    html += `<div class="text-neutral-500">${new Date(post.firstPublishedAt).toLocaleDateString()}</div>`;
  }
  html += `</div>\n`;

  let inList = false;
  let listType = '';

  for (const p of paragraphs) {
    // Handle list closures
    if (inList && p.type !== 'ULI' && p.type !== 'OLI') {
      html += `</${listType}>\n`;
      inList = false;
    }

    const text = applyMarkups(p.text, p.markups);
    const type = p.type;

    switch (type) {
      case 'P':
        html += `<p>${text}</p>\n`;
        break;
      case 'H3':
        html += `<h2>${text}</h2>\n`;
        break;
      case 'H4':
        html += `<h3>${text}</h3>\n`;
        break;
      case 'BQ':
        html += `<blockquote>${text}</blockquote>\n`;
        break;
      case 'PQ':
        html += `<blockquote class="text-2xl font-serif italic text-center my-8 text-neutral-600 dark:text-neutral-400 border-l-4 border-ink dark:border-white pl-4">${text}</blockquote>\n`;
        break;
      case 'IMG':
        const imgId = p.metadata?.id;
        if (imgId) {
           const imgSrc = `https://miro.medium.com/v2/resize:fit:1400/${imgId}`;
           html += `<figure><img src="${imgSrc}" alt="${p.metadata?.alt || ''}" class="w-full rounded-xl" />`;
           if (text) html += `<figcaption class="text-center text-sm text-neutral-500 mt-2">${text}</figcaption>`;
           html += `</figure>\n`;
        }
        break;
      case 'ULI':
        if (!inList) { html += `<ul>\n`; inList = true; listType = 'ul'; }
        html += `<li>${text}</li>\n`;
        break;
      case 'OLI':
        if (!inList) { html += `<ol>\n`; inList = true; listType = 'ol'; }
        html += `<li>${text}</li>\n`;
        break;
      case 'PRE':
        html += `<pre class="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-xl overflow-x-auto text-sm"><code>${text}</code></pre>\n`;
        break;
      case 'MIXTAPE_EMBED':
        html += `<div class="border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl my-4 bg-neutral-50 dark:bg-neutral-900/50"><a href="${p.mixtapeMetadata?.href}" target="_blank" rel="noopener noreferrer" class="font-bold no-underline hover:underline text-ink dark:text-white">${text || 'Embedded Link'}</a></div>\n`;
        break;
      case 'IFRAME':
        html += `<div class="my-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl text-center text-sm text-neutral-500"><a href="${p.iframe?.mediaResource?.iframeSrc || '#'}" target="_blank" rel="noopener noreferrer" class="underline">View Embedded Media</a></div>\n`;
        break;
      default:
        html += `<p>${text}</p>\n`;
    }
  }

  if (inList) {
    html += `</${listType}>\n`;
  }

  return html;
}

function applyMarkups(text: string, markups: any[]): string {
  if (!text) return "";
  if (!markups || markups.length === 0) return text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');
  
  // Create an array of events
  let events: { index: number, type: 'open' | 'close', tag: string, priority: number }[] = [];
  
  markups.forEach((m, i) => {
    let openTag = '';
    let closeTag = '';
    
    switch (m.type) {
      case 'STRONG': openTag = '<strong>'; closeTag = '</strong>'; break;
      case 'EM': openTag = '<em>'; closeTag = '</em>'; break;
      case 'CODE': openTag = '<code class="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm">'; closeTag = '</code>'; break;
      case 'A': 
        const href = m.href || (m.userId ? `https://medium.com/u/${m.userId}` : '#');
        openTag = `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">`; 
        closeTag = '</a>'; 
        break;
    }
    
    if (openTag) {
      // Priority helps properly nest tags if they start at the same time.
      events.push({ index: m.start, type: 'open', tag: openTag, priority: i });
      events.push({ index: m.end, type: 'close', tag: closeTag, priority: i });
    }
  });
  
  events.sort((a, b) => {
    if (a.index !== b.index) return a.index - b.index;
    if (a.type === b.type) {
      if (a.type === 'open') return a.priority - b.priority;
      return b.priority - a.priority; // Close tags in reverse priority
    }
    return a.type === 'close' ? -1 : 1; // Close before open at same index
  });
  
  let result = '';
  let lastIndex = 0;
  
  for (const event of events) {
    if (event.index > lastIndex) {
      // Escape HTML before adding the raw text segment
      const segment = text.substring(lastIndex, event.index);
      result += segment.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      lastIndex = event.index;
    }
    result += event.tag;
  }
  
  if (lastIndex < text.length) {
    const segment = text.substring(lastIndex);
    result += segment.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  
  return result.replace(/\n/g, '<br/>');
}
