// ============================================
// SMARTMARKER PLUGIN - POPUP.JS (ENGLISH VERSION)
// ============================================

console.log('🚀 SmartMarker Popup starting...');

// Global variable to store bookmarks
globalThis.smartMarkerBookmarks = [];

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('📄 DOM loaded, initializing extension...');
  
  // Get DOM elements
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const resultsContainer = document.getElementById('results');
  
  // Basic verification
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
  
  // Load bookmarks
  try {
    console.log('📥 Attempting to load bookmarks from browser...');
    const bookmarks = await loadBookmarks();
    
    // Save to global variable
    globalThis.smartMarkerBookmarks = bookmarks;
    
    console.log('✅ Bookmarks loaded:', bookmarks.length);
    console.log('📋 First bookmark:', JSON.stringify(bookmarks[0], null, 2));
    
    // Show results
    if (bookmarks.length === 0) {
      resultsContainer.innerHTML = `
        <div class="no-results">
          <h3>📌 No bookmarks found</h3>
          <p>✨ Tip: Save bookmarks in your browser to use with SmartMarker</p>
          <p><small>Organize your bookmarks in folders for better management</small></p>
        </div>
      `;
      console.warn('⚠️ No bookmarks saved in browser');
    } else {
      displayResults(bookmarks, resultsContainer);
      console.log('🎯 Bookmarks displayed in interface');
    }
    
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
  
  // Set up search events
  if (searchBtn && searchInput) {
    console.log('🔍 Setting up search events...');
    
    const handleSearch = () => {
      const query = searchInput.value.trim();
      console.log('🔎 Search performed:', query || '(empty)');
      
      // Use global variable
      const bookmarks = globalThis.smartMarkerBookmarks || [];
      filterAndDisplayResults(query, bookmarks, resultsContainer);
    };
    
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
    
    console.log('✅ Search events set up correctly');
  }
});

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * Load all bookmarks from browser
 */
async function loadBookmarks() {
  console.log('📥 loadBookmarks() - Starting...');
  
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getTree((bookmarksTree) => {
      console.log('📊 chrome.bookmarks.getTree() - Response received');
      
      // Check for errors
      if (chrome.runtime.lastError) {
        console.error('❌ chrome.runtime.lastError:', chrome.runtime.lastError);
        reject(new Error('Could not access bookmarks: ' + chrome.runtime.lastError.message));
        return;
      }
      
      // Check if tree is empty
      if (!bookmarksTree || bookmarksTree.length === 0) {
        console.warn('⚠️ bookmarksTree is empty');
        resolve([]);
        return;
      }
      
      console.log('🔍 Processing bookmark tree...');
      const bookmarks = extractBookmarks(bookmarksTree);
      console.log('✅ extractBookmarks() completed:', bookmarks.length, 'bookmarks');
      
      resolve(bookmarks);
    });
  });
}

/**
 * Extract bookmarks from browser tree
 */
function extractBookmarks(bookmarksTree) {
  console.log('🌳 extractBookmarks() - Starting...');
  const bookmarks = [];
  let totalNodes = 0;
  let bookmarkCount = 0;
  
  function traverse(node, path = '') {
    totalNodes++;
    const currentPath = path ? `${path}/${node.title}` : node.title;
    
    // If it's a bookmark (has URL)
    if (node.url) {
      bookmarkCount++;
      bookmarks.push({
        id: node.id,
        title: node.title || 'No title',
        url: node.url,
        tags: node.tags || [],
        folderPath: currentPath
      });
    }
    
    // Traverse children
    if (node.children) {
      node.children.forEach(child => traverse(child, currentPath));
    }
  }
  
  // Traverse entire tree
  bookmarksTree.forEach(node => traverse(node, ''));
  
  console.log(`✅ Complete traversal: ${totalNodes} nodes, ${bookmarkCount} bookmarks`);
  console.log('📝 First bookmarks:', bookmarks.slice(0, 3));
  
  return bookmarks;
}

/**
 * Filter and display results
 */
function filterAndDisplayResults(query, bookmarks, resultsContainer) {
  console.log('🔍 filterAndDisplayResults() - Query:', query, '| Total bookmarks:', bookmarks.length);
  
  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const queryLower = query.toLowerCase();
    const titleMatch = bookmark.title.toLowerCase().includes(queryLower);
    const urlMatch = bookmark.url.toLowerCase().includes(queryLower);
    
    return query === '' || titleMatch || urlMatch;
  });
  
  console.log('📊 Filtered results:', filteredBookmarks.length, 'of', bookmarks.length);
  displayResults(filteredBookmarks, resultsContainer);
}

/**
 * Muestra los resultados en la interfaz
 */
function displayResults(bookmarks, container) {
  console.log('🖼 displayResults() - Showing', bookmarks.length, 'bookmarks');
  
  // Validation
  if (!container) {
    console.error('❌ Container not found');
    return;
  }
  
  // Clear results
  container.innerHTML = '';
  
  // If no results
  if (bookmarks.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <h3>🔍 No results found</h3>
        <p>Try a different search term</p>
      </div>
    `;
    return;
  }
  
  // Show each bookmark
  bookmarks.forEach(bookmark => {
    try {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      resultItem.onclick = () => {
        console.log('🌐 Opening URL:', bookmark.url);
        chrome.tabs.create({ url: bookmark.url });
      };
      resultItem.style.cursor = 'pointer';
      resultItem.style.transition = 'all 0.2s';
      resultItem.addEventListener('mouseenter', () => {
        resultItem.style.backgroundColor = '#f8f9fa';
        resultItem.style.transform = 'translateX(5px)';
      });
      resultItem.addEventListener('mouseleave', () => {
        resultItem.style.backgroundColor = '';
        resultItem.style.transform = '';
      });

      // Extract folder
      const folderName = (bookmark.folderPath || 'No folder').split('/').pop();

      // Create elements
      const titleEl = document.createElement('div');
      titleEl.className = 'result-title';
      titleEl.textContent = bookmark.title || 'No title';
      titleEl.style.fontWeight = '600';
      titleEl.style.marginBottom = '4px';

      const urlEl = document.createElement('div');
      urlEl.className = 'result-url';
      urlEl.textContent = bookmark.url;
      urlEl.style.fontSize = '12px';
      urlEl.style.color = '#666';
      urlEl.style.marginBottom = '6px';
      urlEl.style.wordBreak = 'break-all';

      const folderEl = document.createElement('div');
      folderEl.className = 'result-folder';
      folderEl.textContent = folderName;
      folderEl.title = bookmark.folderPath || 'No folder';
      folderEl.style.fontSize = '11px';
      folderEl.style.color = '#2980b9';
      folderEl.style.backgroundColor = '#e3f2fd';
      folderEl.style.padding = '4px 8px';
      folderEl.style.borderRadius = '4px';
      folderEl.style.display = 'inline-block';
      folderEl.style.marginBottom = '6px';

      const tagsEl = document.createElement('div');
      tagsEl.className = 'result-tags';
      tagsEl.style.display = 'flex';
      tagsEl.style.gap = '4px';
      tagsEl.style.flexWrap = 'wrap';

      // Add tags if they exist
      if (bookmark.tags && bookmark.tags.length > 0) {
        bookmark.tags.forEach(tag => {
          const tagEl = document.createElement('span');
          tagEl.className = 'tag';
          tagEl.textContent = tag;
          tagEl.style.backgroundColor = '#e3f2fd';
          tagEl.style.color = '#1976d2';
          tagEl.style.padding = '2px 6px';
          tagEl.style.borderRadius = '10px';
          tagEl.style.fontSize = '10px';
          tagEl.style.fontWeight = '500';
          tagsEl.appendChild(tagEl);
        });
      }

      // Add elements to result
      resultItem.appendChild(titleEl);
      resultItem.appendChild(urlEl);
      resultItem.appendChild(folderEl);
      resultItem.appendChild(tagsEl);
      
      container.appendChild(resultItem);
      
    } catch (error) {
      console.error('❌ Error creating bookmark element:', error);
    }
  });
}

console.log('✅ popup.js cargado correctamente');
