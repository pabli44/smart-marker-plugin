/**
 * SmartMarker - Shared bookmark utilities
 * Pure functions without DOM dependencies.
 */

/**
 * Fetch all bookmarks from Chrome and flatten them.
 * @returns {Promise<Array<{
 *   id: string,
 *   title: string,
 *   url: string,
 *   folderPath: string,
 *   folderName: string
 * }>>}
 */
export async function fetchBookmarks() {
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getTree((bookmarksTree) => {
      if (chrome.runtime.lastError) {
        reject(new Error('Could not access bookmarks: ' + chrome.runtime.lastError.message));
        return;
      }

      if (!bookmarksTree || bookmarksTree.length === 0) {
        resolve([]);
        return;
      }

      resolve(flattenBookmarks(bookmarksTree));
    });
  });
}

/**
 * Flatten the Chrome bookmark tree into a plain array.
 * @param {Array<chrome.bookmarks.BookmarkTreeNode>} bookmarksTree
 * @returns {Array<{id: string, title: string, url: string, folderPath: string, folderName: string}>}
 */
export function flattenBookmarks(bookmarksTree) {
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
 * Create a Fuse.js search index from a flat bookmark list.
 * @param {Array<{id: string, title: string, url: string, folderPath: string}>} bookmarks
 * @returns {Fuse}
 */
export function createSearchIndex(bookmarks) {
  // Fuse.js is loaded as a global script before the module.
  const Fuse = window.Fuse;

  if (!Fuse) {
    throw new Error('Fuse.js is not loaded. Make sure ../vendor/fuse.min.js is included before this module.');
  }

  return new Fuse(bookmarks, {
    keys: ['title', 'url', 'folderPath'],
    threshold: 0.25,
    includeScore: true,
    ignoreLocation: false,
    minMatchCharLength: 2,
    distance: 100
  });
}

/**
 * Search bookmarks using a Fuse instance.
 * Returns all bookmarks when the query is empty.
 * @param {Fuse} fuse
 * @param {string} query
 * @returns {Array<Object>}
 */
export function searchBookmarks(fuse, query) {
  const normalizedQuery = (query || '').trim();

  if (!normalizedQuery) {
    // Fuse keeps the original list in .getCollection() when available.
    return typeof fuse.getCollection === 'function'
      ? fuse.getCollection()
      : [];
  }

  return fuse.search(normalizedQuery).map(result => result.item);
}
