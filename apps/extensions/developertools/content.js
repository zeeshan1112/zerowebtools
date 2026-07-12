// Add indicator to HTML tag so the web app can synchronously check if extension is installed
document.documentElement.setAttribute('data-zerowebtools-companion', 'true');

const ARTICLE_DOMAINS = [
  'nytimes.com',
  'washingtonpost.com',
  'wsj.com',
  'bloomberg.com',
  'ft.com',
  'thetimes.co.uk',
  'medium.com',
  'towardsdatascience.com',
  'theatlantic.com',
  'newyorker.com',
  'wired.com',
  'economist.com',
  'hbr.org',
  'businessinsider.com',
  'forbes.com',
  'latimes.com',
  'reuters.com'
];

function isArticleDomain() {
  const hostname = window.location.hostname;
  return ARTICLE_DOMAINS.some(domain => hostname.includes(domain));
}

function injectFloatingButton() {
  if (document.getElementById('zwt-floating-container')) return;

  const container = document.createElement('div');
  container.id = 'zwt-floating-container';
  Object.assign(container.style, {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: '2147483647',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  });

  const btn = document.createElement('button');
  btn.id = 'zwt-floating-button';
  btn.innerHTML = '⚡ Read (ZeroWebTools)';
  Object.assign(btn.style, {
    padding: '12px 20px',
    backgroundColor: 'hsl(252, 60%, 50%)',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: '600',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.2s, background-color 0.2s',
  });

  btn.onmouseover = () => btn.style.transform = 'scale(1.05)';
  btn.onmouseout = () => btn.style.transform = 'scale(1)';

  btn.addEventListener('click', () => {
    openReaderMode();
  });

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  Object.assign(closeBtn.style, {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  });
  
  closeBtn.addEventListener('click', () => {
    container.remove();
  });

  container.appendChild(btn);
  container.appendChild(closeBtn);
  document.body.appendChild(container);
}

function openReaderMode() {
  const targetUrl = window.location.href;
  
  const baseUrl = 'https://zerowebtools.com';
  const scraperUrl = `${baseUrl}/tools/web-scraper?url=${encodeURIComponent(targetUrl)}`;
  window.open(scraperUrl, '_blank');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'RENDER_READER_OVERLAY') {
    renderReaderOverlay(request.content, request.title);
    sendResponse({ status: 'ok' });
  }
});

// Relay messages from the page to the background script
window.addEventListener('message', (event) => {
  if (event.source !== window || !event.data || event.data.type !== 'ZWT_PROXY_FETCH') {
    return;
  }
  
  chrome.runtime.sendMessage({
    action: "PROXY_FETCH",
    url: event.data.url,
    method: event.data.method,
    headers: event.data.headers,
    body: event.data.body,
    spoofGooglebot: event.data.spoofGooglebot
  }, (response) => {
    window.postMessage({ type: 'ZWT_PROXY_FETCH_RESPONSE', id: event.data.id, response }, '*');
  });
});

function renderReaderOverlay(contentHtml, titleText) {
  if (document.getElementById('zerowebtools-reader-overlay')) {
    document.getElementById('zerowebtools-reader-overlay').remove();
  }

  const overlay = document.createElement('div');
  overlay.id = 'zerowebtools-reader-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'hsl(0, 0%, 10%)',
    color: 'hsl(0, 0%, 90%)',
    zIndex: '2147483647',
    overflowY: 'auto',
    padding: '40px 20px',
    boxSizing: 'border-box',
    fontFamily: 'Inter, "Georgia", serif',
    lineHeight: '1.6'
  });

  const container = document.createElement('div');
  Object.assign(container.style, {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'hsl(0, 0%, 15%)',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    position: 'relative'
  });

  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕ Close';
  Object.assign(closeBtn.style, {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    color: 'hsl(0, 0%, 60%)',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  });
  closeBtn.addEventListener('click', () => overlay.remove());
  closeBtn.onmouseover = () => closeBtn.style.color = 'white';
  closeBtn.onmouseout = () => closeBtn.style.color = 'hsl(0, 0%, 60%)';

  const title = document.createElement('h1');
  title.innerText = titleText || 'Article View';
  Object.assign(title.style, {
    fontSize: '32px',
    marginBottom: '20px',
    color: 'white',
    fontFamily: 'Inter, system-ui, sans-serif'
  });

  const content = document.createElement('div');
  content.innerHTML = contentHtml || '<p>No content available.</p>';
  Object.assign(content.style, {
    fontSize: '18px',
    color: 'hsl(0, 0%, 85%)',
  });
  
  // Basic styling for content paragraphs/images
  const style = document.createElement('style');
  style.textContent = `
    #zerowebtools-reader-overlay p { margin-bottom: 20px; line-height: 1.8; }
    #zerowebtools-reader-overlay a { color: hsl(252, 80%, 70%); text-decoration: none; }
    #zerowebtools-reader-overlay a:hover { text-decoration: underline; }
    #zerowebtools-reader-overlay img { max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; }
    #zerowebtools-reader-overlay h2, #zerowebtools-reader-overlay h3 { color: white; margin-top: 40px; margin-bottom: 16px; fontFamily: 'Inter', sans-serif; }
  `;

  container.appendChild(closeBtn);
  container.appendChild(title);
  container.appendChild(content);
  overlay.appendChild(style);
  overlay.appendChild(container);
  
  document.body.appendChild(overlay);
  
  // Prevent body scroll
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  
  // Restore on close
  closeBtn.addEventListener('click', () => {
    document.body.style.overflow = originalOverflow;
  });
}

// Check if we should inject floating button
if (isArticleDomain()) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFloatingButton);
  } else {
    injectFloatingButton();
  }
}
