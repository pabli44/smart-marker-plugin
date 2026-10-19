// @ts-check

// SmartMarker Side Panel Logic
import { fetchBookmarks, createSearchIndex, searchBookmarks } from '../shared/bookmarks.js';

console.log('Side panel loaded');

document.addEventListener('DOMContentLoaded', async () => {
  const searchInput = document.getElementById('sidepanelSearchInput');
  const searchBtn = document.getElementById('sidepanelSearchBtn');
  const resultsContainer = document.getElementById('sidepanelResults');

  let bookmarks = [];
  let fuseIndex = null;

  try {
    console.log('Loading bookmarks in side panel...');
    bookmarks = await fetchBookmarks();
    console.log('Bookmarks loaded:', bookmarks.length);

    fuseIndex = createSearchIndex(bookmarks);
    displayResults(bookmarks, resultsContainer);
    console.log('Results displayed');
  } catch (error) {
    console.error('Error loading bookmarks:', error);
    if (resultsContainer) {
      resultsContainer.innerHTML = '<div class="error">Error: ' + (error.message || String(error)) + '</div>';
    }
  }

  const handleSearch = () => {
    const query = searchInput ? searchInput.value : '';
    const results = fuseIndex
      ? searchBookmarks(fuseIndex, query)
      : [];
    displayResults(results, resultsContainer);
  };

  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
  }

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
});

/**
 * Display results in the side panel interface
 */
function displayResults(bookmarks, container) {
  console.log('Displaying results in side panel:', bookmarks.length);

  if (!container) {
    console.error('Container not found in side panel');
    return;
  }

  if (bookmarks.length === 0) {
    container.innerHTML = '<div class="no-results">No bookmarks found.' +
      '<br><br>💡 <strong>Tip:</strong> Save bookmarks in Chrome to use with SmartMarker.' +
      '<br><br><small>You can organize your bookmarks in folders for better management</small></div>';
    return;
  }

  container.innerHTML = '';
  bookmarks.forEach(bookmark => {
    try {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      resultItem.onclick = () => {
        chrome.tabs.create({ url: bookmark.url });
      };

      const title = document.createElement('div');
      title.className = 'result-title';
      title.textContent = bookmark.title || 'No title';

      const url = document.createElement('div');
      url.className = 'result-url';
      url.textContent = bookmark.url || 'No URL';

      const folder = document.createElement('div');
      folder.className = 'result-folder';
      folder.textContent = bookmark.folderName || 'No folder';
      folder.title = bookmark.folderPath || 'No folder';

      resultItem.appendChild(title);
      resultItem.appendChild(url);
      resultItem.appendChild(folder);
      container.appendChild(resultItem);
    } catch (error) {
      console.error('Error processing bookmark:', error);
    }
  });
}
