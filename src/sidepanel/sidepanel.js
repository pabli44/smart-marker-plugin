
// @ts-check

// Lógica para el panel lateral de SmartMarker
console.log('Panel lateral cargado');

document.addEventListener('DOMContentLoaded', async () => {
  const searchInput = document.getElementById('sidepanelSearchInput');
  const searchBtn = document.getElementById('sidepanelSearchBtn');
  const resultsContainer = document.getElementById('sidepanelResults');

  let bookmarks = [];
  let tags = new Set();

  try {
    console.log('Cargando bookmarks en panel lateral...');
    bookmarks = await loadBookmarks();
    console.log('Bookmarks cargados:', bookmarks.length);
    
    displayResults(bookmarks, resultsContainer);
    console.log('Resultados mostrados');
  } catch (error) {
    console.error('Error al cargar marcadores:', error);
    if (resultsContainer) {
      resultsContainer.innerHTML = '<div class="error">Error: ' + (error.message || String(error)) + '</div>';
    }
  }

  // Configurar eventos
  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    const selectedTag = tagFilter.value;
    filterAndDisplayResults(query, selectedTag, bookmarks, resultsContainer);
  });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    const selectedTag = tagFilter.value;
    filterAndDisplayResults(query, selectedTag, bookmarks, resultsContainer);
  });

  tagFilter.addEventListener('change', () => {
    const query = searchInput.value.trim();
    const selectedTag = tagFilter.value;
    filterAndDisplayResults(query, selectedTag, bookmarks, resultsContainer);
  });
});

async function loadBookmarks() {
  console.log('Cargando marcadores en panel lateral...');
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getTree((bookmarksTree) => {
      console.log('Resultado de getTree:', bookmarksTree);
      if (chrome.runtime.lastError) {
        console.error('Error de Chrome API:', chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
        return;
      }
      
      if (!bookmarksTree || bookmarksTree.length === 0) {
        console.warn('No se encontraron marcadores');
        resolve([]);
        return;
      }
      
      const bookmarks = extractBookmarks(bookmarksTree);
      console.log('Bookmarks extraídos:', bookmarks.length);
      resolve(bookmarks);
    });
  });
}

function extractBookmarks(bookmarksTree) {
  const bookmarks = [];

  function traverse(node, path = '') {
    const currentPath = path ? `${path}/${node.title}` : node.title;
    
    if (node.url) {
      bookmarks.push({
        id: node.id,
        title: node.title,
        url: node.url,
        tags: node.tags || [],
        folderPath: currentPath
      });
    }

    if (node.children) {
      node.children.forEach(child => traverse(child, currentPath));
    }
  }

  bookmarksTree.forEach(node => traverse(node, ''));
  return bookmarks;
}

function extractTags(bookmarks) {
  const tags = new Set();
  bookmarks.forEach(bookmark => {
    bookmark.tags.forEach(tag => tags.add(tag));
  });
  return tags;
}

function populateTagFilter(tags, tagFilter) {
  tags.forEach(tag => {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    tagFilter.appendChild(option);
  });
}

function filterAndDisplayResults(query, selectedTag, bookmarks, resultsContainer) {
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesQuery = query === '' || 
      bookmark.title.toLowerCase().includes(query.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(query.toLowerCase());

    return matchesQuery;
  });

  displayResults(filteredBookmarks, resultsContainer);
}

function displayResults(bookmarks, container) {
  console.log('Mostrando resultados en panel lateral:', bookmarks.length);
  
  if (!container) {
    console.error('Container no encontrado en panel lateral');
    return;
  }
  
  if (bookmarks.length === 0) {
    container.innerHTML = '<div class="no-results">No se encontraron marcadores. 
      <br><br>💡 <strong>Tip:</strong> Guarda marcadores en Chrome para usarlos con SmartMarker.
      <br><br><small>Puedes organizar tus marcadores en carpetas para mejor gestión</small></div>';
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

      // Extraer la carpeta del bookmark
      const folderPath = bookmark.folderPath || 'Sin carpeta';
      const folderName = folderPath.split('/').pop() || 'Sin carpeta';

      const title = document.createElement('div');
      title.className = 'result-title';
      title.textContent = bookmark.title || 'Sin título';

      const url = document.createElement('div');
      url.className = 'result-url';
      url.textContent = bookmark.url || 'Sin URL';

      const folder = document.createElement('div');
      folder.className = 'result-folder';
      folder.textContent = folderName;
      folder.title = folderPath; // Tooltip con la ruta completa

      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'result-tags';

      if (bookmark.tags && bookmark.tags.length > 0) {
        bookmark.tags.forEach(tag => {
          const tagElement = document.createElement('span');
          tagElement.className = 'tag';
          tagElement.textContent = tag;
          tagsContainer.appendChild(tagElement);
        });
      }

      resultItem.appendChild(title);
      resultItem.appendChild(url);
      resultItem.appendChild(folder);
      resultItem.appendChild(tagsContainer);
      container.appendChild(resultItem);
    } catch (error) {
      console.error('Error al procesar bookmark:', error);
    }
  });
}