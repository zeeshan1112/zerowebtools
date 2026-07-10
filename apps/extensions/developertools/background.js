chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "zwt-reader-mode",
    title: "ZeroWebTools: Open in Reader Mode",
    contexts: ["page", "link"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "zwt-reader-mode") {
    const targetUrl = info.linkUrl || info.pageUrl || tab?.url;
    if (targetUrl) {
      const isDev = !('update_url' in chrome.runtime.getManifest());
      const baseUrl = isDev ? 'http://localhost:3000' : 'https://www.zerowebtools.com';
      const scraperUrl = `${baseUrl}/tools/web-scraper?url=${encodeURIComponent(targetUrl)}`;
      chrome.tabs.create({ url: scraperUrl });
    }
  }
});

const messageHandler = (request, sender, sendResponse) => {
  if (request.action === "PING") {
    sendResponse({ status: "PONG", version: chrome.runtime.getManifest().version });
    return true;
  }

  if (request.action === "PROXY_FETCH") {
    const targetUrl = request.url;
    const method = request.method || "GET";
    const headers = request.headers || {};
    
    // Set up headers to optionally spoof Googlebot
    const fetchHeaders = new Headers(headers);
    if (request.spoofGooglebot) {
      fetchHeaders.set("User-Agent", "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)");
      fetchHeaders.set("Referer", "https://www.google.com/");
    }

    fetch(targetUrl, {
      method: method,
      headers: fetchHeaders,
      body: request.body
    })
    .then(response => {
      const responseHeaders = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      return response.text().then(text => {
        sendResponse({
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          body: text
        });
      });
    })
    .catch(error => {
      sendResponse({ error: error.message || String(error) });
    });
    
    return true; // Indicates async response
  }
};

chrome.runtime.onMessageExternal.addListener(messageHandler);
chrome.runtime.onMessage.addListener(messageHandler);
