// Service worker básico para SmartMarker Plugin
// Solo maneja inicialización y logging

chrome.runtime.onInstalled.addListener(() => {
  console.log('🎉 SmartMarker Plugin instalado correctamente');
  console.log('📌 Versión: 1.0');
  console.log('🔍 Búsqueda rápida de marcadores');
  console.log('📁 Muestra la carpeta de cada marcador');
  
  // Configurar valores por defecto
  chrome.storage.local.set({
    bookmarksCache: [],
    lastSync: Date.now()
  });
});

// Manejo de errores global
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ERROR') {
    console.error('Error en SmartMarker:', request.message);
  }
});

console.log('🚀 Service worker de SmartMarker iniciado');
