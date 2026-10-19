// Service worker for SmartMarker Plugin
// Maintains a flattened cache of Chrome bookmarks in chrome.storage.local.

const CACHE_KEY = 'bookmarksCache';

/**
 * Flatten the Chrome bookmark tree into a plain array.
 * @param {Array<chrome.bookmarks.BookmarkTreeNode>} bookmarksTree
 * @returns {Array<{id: string, title: string, url: string, folderPath: string, folderName: string}>}
 */
function flattenBookmarks(bookmarksTree) {
  const bookmarks = [];

  function traverse(node, path = '') {
    const currentPath = path ? `${path}/${node.title}` : node.title;

    if (node.url) {
      const folderPath = currentPath;
      const folderName = folderPath.split('/').pop() || 'No folder';

      bookmarks.push({
        id: node.id,
        title: node.title || 'No title',
        url: node.url,
        folderPath,
        folderName
      });
    }

    if (node.children) {
      node.children.forEach(child => traverse(child, currentPath));
    }
  }

  bookmarksTree.forEach(node => traverse(node, ''));
  return bookmarks;
}

/**
 * Reload the bookmark tree and persist the flattened cache.
 */
function refreshCache() {
  chrome.bookmarks.getTree((bookmarksTree) => {
    if (chrome.runtime.lastError) {
      console.error('SmartMarker: error loading bookmarks:', chrome.runtime.lastError);
      return;
    }

    const bookmarks = flattenBookmarks(bookmarksTree);
    chrome.storage.local.set({ [CACHE_KEY]: bookmarks }, () => {
      if (chrome.runtime.lastError) {
        console.error('SmartMarker: error saving bookmarks cache:', chrome.runtime.lastError);
        return;
      }

      console.log('SmartMarker: bookmarks cache refreshed:', bookmarks.length);
    });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  console.log('🎉 SmartMarker Plugin installed successfully');
  console.log('📌 Version: 1.0');
  console.log('🔍 Quick bookmark search');
  console.log('📁 Shows folder for each bookmark');

  refreshCache();
});

chrome.runtime.onStartup.addListener(refreshCache);

chrome.bookmarks.onCreated.addListener(refreshCache);
chrome.bookmarks.onRemoved.addListener(refreshCache);
chrome.bookmarks.onChanged.addListener(refreshCache);
chrome.bookmarks.onMoved.addListener(refreshCache);

// Global error handler from popup/sidepanel content.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ERROR') {
    console.error('SmartMarker error:', request.message);
  }
});

console.log('🚀 SmartMarker service worker started');
