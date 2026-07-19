// ============================================
// SMARTMARKER PLUGIN - POPUP.JS (VERSIÓN FUNCIONAL COMPLETA)
// ============================================

console.log('🚀 SmartMarker Popup iniciando...');

// Variable global para almacenar marcadores
globalThis.smartMarkerBookmarks = [];

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
  console.log('📄 DOM cargado, inicializando extensión...');
  
  // Obtener elementos del DOM
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const resultsContainer = document.getElementById('results');
  
  // Verificación básica
  if (!searchInput) {
    console.error('❌ ERROR CRÍTICO: searchInput no encontrado en el DOM');
    return;
  }
  
  if (!searchBtn) {
    console.error('❌ ERROR CRÍTICO: searchBtn no encontrado en el DOM');
    return;
  }
  
  if (!resultsContainer) {
    console.error('❌ ERROR CRÍTICO: resultsContainer no encontrado en el DOM');
    return;
  }
  
  console.log('✅ Todos los elementos del DOM encontrados correctamente');
  
  // Cargar marcadores
  try {
    console.log('📥 Intentando cargar marcadores desde Chrome...');
    const bookmarks = await loadBookmarks();
    
    // Guardar en variable global
    globalThis.smartMarkerBookmarks = bookmarks;
    
    console.log('✅ Marcadores cargados:', bookmarks.length);
    console.log('📋 Primer marcador:', JSON.stringify(bookmarks[0], null, 2));
    
    // Mostrar resultados
    if (bookmarks.length === 0) {
      resultsContainer.innerHTML = `
        <div class="no-results">
          <h3>📌 No se encontraron marcadores</h3>
          <p>✨ Tip: Guarda marcadores en Chrome para usarlos con SmartMarker</p>
          <p><small>Organiza tus marcadores en carpetas para mejor gestión</small></p>
        </div>
      `;
      console.warn('⚠️ No hay marcadores guardados en Chrome');
    } else {
      displayResults(bookmarks, resultsContainer);
      console.log('🎯 Marcadores mostrados en la interfaz');
    }
    
  } catch (error) {
    console.error('❌ ERROR FATAL al cargar marcadores:', error);
    resultsContainer.innerHTML = `
      <div class="error">
        <h3>❌ Error al cargar marcadores</h3>
        <p>${error.message || 'Error desconocido'}</p>
        <p><small>Verifica la consola (F12) para más detalles</small></p>
      </div>
    `;
  }
  
  // Configurar eventos de búsqueda
  if (searchBtn && searchInput) {
    console.log('🔍 Configurando eventos de búsqueda...');
    
    const handleSearch = () => {
      const query = searchInput.value.trim();
      console.log('🔎 Búsqueda realizada:', query || '(vacío)');
      
      // Usar la variable global
      const bookmarks = globalThis.smartMarkerBookmarks || [];
      filterAndDisplayResults(query, bookmarks, resultsContainer);
    };
    
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') handleSearch();
    });
    
    console.log('✅ Eventos de búsqueda configurados correctamente');
  }
});

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * Carga todos los marcadores desde Chrome
 */
async function loadBookmarks() {
  console.log('📥 loadBookmarks() - Iniciando...');
  
  return new Promise((resolve, reject) => {
    chrome.bookmarks.getTree((bookmarksTree) => {
      console.log('📊 chrome.bookmarks.getTree() - Respuesta recibida');
      
      // Verificar errores
      if (chrome.runtime.lastError) {
        console.error('❌ chrome.runtime.lastError:', chrome.runtime.lastError);
        reject(new Error('No se pudo acceder a los marcadores: ' + chrome.runtime.lastError.message));
        return;
      }
      
      // Verificar que el árbol no esté vacío
      if (!bookmarksTree || bookmarksTree.length === 0) {
        console.warn('⚠️ bookmarksTree está vacío');
        resolve([]);
        return;
      }
      
      console.log('🔍 Procesando árbol de marcadores...');
      const bookmarks = extractBookmarks(bookmarksTree);
      console.log('✅ extractBookmarks() completado:', bookmarks.length, 'marcadores');
      
      resolve(bookmarks);
    });
  });
}

/**
 * Extrae marcadores del árbol de Chrome
 */
function extractBookmarks(bookmarksTree) {
  console.log('🌳 extractBookmarks() - Iniciando...');
  const bookmarks = [];
  let totalNodes = 0;
  let bookmarkCount = 0;
  
  function traverse(node, path = '') {
    totalNodes++;
    const currentPath = path ? `${path}/${node.title}` : node.title;
    
    // Si es un marcador (tiene URL)
    if (node.url) {
      bookmarkCount++;
      bookmarks.push({
        id: node.id,
        title: node.title || 'Sin título',
        url: node.url,
        tags: node.tags || [],
        folderPath: currentPath
      });
    }
    
    // Recorrer hijos
    if (node.children) {
      node.children.forEach(child => traverse(child, currentPath));
    }
  }
  
  // Recorrer todo el árbol
  bookmarksTree.forEach(node => traverse(node, ''));
  
  console.log(`✅ Recorrido completo: ${totalNodes} nodos, ${bookmarkCount} marcadores`);
  console.log('📝 Primeros marcadores:', bookmarks.slice(0, 3));
  
  return bookmarks;
}

/**
 * Filtra y muestra resultados
 */
function filterAndDisplayResults(query, bookmarks, resultsContainer) {
  console.log('🔍 filterAndDisplayResults() - Query:', query, '| Total bookmarks:', bookmarks.length);
  
  // Filtrar marcadores
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const queryLower = query.toLowerCase();
    const titleMatch = bookmark.title.toLowerCase().includes(queryLower);
    const urlMatch = bookmark.url.toLowerCase().includes(queryLower);
    
    return query === '' || titleMatch || urlMatch;
  });
  
  console.log('📊 Resultados filtrados:', filteredBookmarks.length, 'de', bookmarks.length);
  displayResults(filteredBookmarks, resultsContainer);
}

/**
 * Muestra los resultados en la interfaz
 */
function displayResults(bookmarks, container) {
  console.log('🖼 displayResults() - Mostrando', bookmarks.length, 'marcadores');
  
  // Validación
  if (!container) {
    console.error('❌ Container no encontrado');
    return;
  }
  
  // Limpiar resultados
  container.innerHTML = '';
  
  // Si no hay resultados
  if (bookmarks.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <h3>🔍 No se encontraron resultados</h3>
        <p>Prueba con otro término de búsqueda</p>
      </div>
    `;
    return;
  }
  
  // Mostrar cada marcador
  bookmarks.forEach(bookmark => {
    try {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      resultItem.onclick = () => {
        console.log('🌐 Abriendo URL:', bookmark.url);
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

      // Extraer carpeta
      const folderName = (bookmark.folderPath || 'Sin carpeta').split('/').pop();

      // Crear elementos
      const titleEl = document.createElement('div');
      titleEl.className = 'result-title';
      titleEl.textContent = bookmark.title || 'Sin título';
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
      folderEl.title = bookmark.folderPath || 'Sin carpeta';
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

      // Añadir tags si existen
      if (bookmark.tags && bookmark.tags.length > 0) {
        bookmark.tags.forEach(tag => {
          const tagEl = document.createElement('span');
          tagEl.className = 'tag';
          tagEl.textContent = tag;
          tagEl.style.backgroundColor = '#e3f2fd';
          tagEl.textContent = tag;
          tagEl.style.color = '#1976d2';
          tagEl.style.padding = '2px 6px';
          tagEl.style.borderRadius = '10px';
          tagEl.style.fontSize = '10px';
          tagEl.style.fontWeight = '500';
          tagsEl.appendChild(tagEl);
        });
      }

      // Añadir elementos al resultado
      resultItem.appendChild(titleEl);
      resultItem.appendChild(urlEl);
      resultItem.appendChild(folderEl);
      resultItem.appendChild(tagsEl);
      
      container.appendChild(resultItem);
      
    } catch (error) {
      console.error('❌ Error al crear elemento de marcador:', error);
    }
  });
}

console.log('✅ popup.js cargado correctamente');
