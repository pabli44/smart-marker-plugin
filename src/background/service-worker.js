// Basic service worker for SmartMarker Plugin
// Handles initialization and logging only

chrome.runtime.onInstalled.addListener(() => {
  console.log('🎉 SmartMarker Plugin installed successfully');
  console.log('📌 Version: 1.0');
  console.log('🔍 Quick bookmark search');
  console.log('📁 Shows folder for each bookmark');
  
  // Configure default values
  chrome.storage.local.set({
    bookmarksCache: [],
    lastSync: Date.now()
  });
});

// Manejo de errores global
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ERROR') {
    console.error('SmartMarker error:', request.message);
  }
});

console.log('🚀 SmartMarker service worker started');
