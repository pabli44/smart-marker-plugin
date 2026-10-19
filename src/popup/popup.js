// ============================================
// SMARTMARKER PLUGIN - POPUP.JS (MODULE VERSION)
// ============================================

import { fetchBookmarks, createSearchIndex, searchBookmarks } from '../shared/bookmarks.js';

console.log('🚀 SmartMarker Popup starting...');

// Global variable to store bookmarks
let bookmarks = [];
let fuseIndex = null;

document.addEventListener('DOMContentLoaded', async () => {
  console.log('📄 DOM loaded, initializing extension...');

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const resultsContainer = document.getElementById('results');

  if (!searchInput) {
    console.error('❌ CRITICAL ERROR: searchInput not found in DOM');
    return;
  }

  if (!searchBtn) {
    console.error('❌ CRITICAL ERROR: searchBtn not found in DOM');
    return;
  }

  if (!resultsContainer) {
    console.error('❌ CRITICAL ERROR: resultsContainer not found in DOM');
    return;
  }

  console.log('✅ All DOM elements found correctly');

  try {
    console.log('📥 Attempting to load bookmarks from browser...');
    bookmarks = await fetchBookmarks();

    console.log('✅ Bookmarks loaded:', bookmarks.length);
    console.log('📋 First bookmark:', JSON.stringify(bookmarks[0], null, 2));

    if (bookmarks.length === 0) {
      resultsContainer.innerHTML = `
        <div class="no-results">
          <h3>📌 No bookmarks found</h3>
          <p>✨ Tip: Save bookmarks in your browser to use with SmartMarker</p>
          <p><small>Organize your bookmarks in folders for better management</small></p>
        </div>
      `;
      console.warn('⚠️ No bookmarks saved in browser');
      return;
    }

    fuseIndex = createSearchIndex(bookmarks);
    displayResults(bookmarks, resultsContainer);
    console.log('🎯 Bookmarks displayed in interface');
  } catch (error) {
    console.error('❌ FATAL ERROR loading bookmarks:', error);
    resultsContainer.innerHTML = `
      <div class="error">
        <h3>❌ Error loading bookmarks</h3>
        <p>${error.message || 'Unknown error'}</p>
        <p><small>Check console (F12) for details</small></p>
      </div>
    `;
  }

  const handleSearch = () => {
    const query = searchInput.value;
    console.log('🔎 Search performed:', query.trim() || '(empty)');

    const results = fuseIndex
      ? searchBookmarks(fuseIndex, query)
      : [];

    displayResults(results, resultsContainer);
  };

  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('input', handleSearch);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  console.log('✅ Search events set up correctly');
});

/**
 * Display results in the popup interface
 */
function displayResults(bookmarks, container) {
  console.log('🖼 displayResults() - Showing', bookmarks.length, 'bookmarks');

  if (!container) {
    console.error('❌ Container not found');
    return;
  }

  container.innerHTML = '';

  if (bookmarks.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <h3>🔍 No results found</h3>
        <p>Try a different search term</p>
      </div>
    `;
    return;
  }

  bookmarks.forEach(bookmark => {
    try {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      resultItem.onclick = () => {
        console.log('🌐 Opening URL:', bookmark.url);
        chrome.tabs.create({ url: bookmark.url });
      };

      const titleEl = document.createElement('div');
      titleEl.className = 'result-title';
      titleEl.textContent = bookmark.title || 'No title';

      const urlEl = document.createElement('div');
      urlEl.className = 'result-url';
      urlEl.textContent = bookmark.url;

      const folderEl = document.createElement('div');
      folderEl.className = 'result-folder';
      folderEl.textContent = bookmark.folderName || 'No folder';
      folderEl.title = bookmark.folderPath || 'No folder';

      resultItem.appendChild(titleEl);
      resultItem.appendChild(urlEl);
      resultItem.appendChild(folderEl);

      container.appendChild(resultItem);
    } catch (error) {
      console.error('❌ Error creating bookmark element:', error);
    }
  });
}

console.log('✅ popup.js loaded successfully');
