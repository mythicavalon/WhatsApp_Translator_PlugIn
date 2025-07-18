/**
 * WhatsApp Flag Translator - Firefox Content Script
 * Enhanced version with immediate logging and better error handling
 */

// Immediate logging to confirm script injection
console.log('🔥 Firefox Extension Script Injected!');
console.log('📍 Current URL:', window.location.href);
console.log('📍 Document ready state:', document.readyState);

// Firefox uses 'browser' API instead of 'chrome'
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

// Log API availability
console.log('🔧 Browser API available:', typeof browserAPI);
console.log('🔧 Storage API available:', typeof browserAPI.storage);

class WhatsAppTranslator extends WhatsAppTranslatorCore {
  constructor() {
    console.log('🚀 WhatsAppTranslator constructor called');
    try {
      // Pass Firefox/WebExtensions API to the core
      super(browserAPI);
      console.log('✅ WhatsAppTranslatorCore initialized successfully');
      this.init();
    } catch (error) {
      console.error('❌ Error in WhatsAppTranslator constructor:', error);
    }
  }
}

// Function to initialize the translator
function initializeTranslator() {
  console.log('🔄 Initializing WhatsApp Translator...');
  try {
    window.whatsappTranslator = new WhatsAppTranslator();
    console.log('✅ WhatsApp Translator Extension Loaded');
  } catch (error) {
    console.error('❌ Failed to initialize WhatsApp Translator:', error);
  }
}

// Enhanced initialization with multiple fallbacks
function safeInitialize() {
  console.log('🔍 Checking if WhatsApp Web is loaded...');
  
  // Check if we're on WhatsApp Web
  if (!window.location.href.includes('web.whatsapp.com')) {
    console.log('⚠️ Not on WhatsApp Web, skipping initialization');
    return;
  }
  
  console.log('✅ On WhatsApp Web, proceeding with initialization');
  
  // Initialize immediately if document is ready
  if (document.readyState === 'complete') {
    console.log('📄 Document already complete, initializing now');
    initializeTranslator();
  } else if (document.readyState === 'interactive') {
    console.log('📄 Document interactive, initializing now');
    initializeTranslator();
  } else {
    console.log('📄 Document still loading, waiting for DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', () => {
      console.log('📄 DOMContentLoaded fired, initializing now');
      initializeTranslator();
    });
  }
}

// Start initialization
safeInitialize();

// Additional safety net - try again after a short delay
setTimeout(() => {
  if (!window.whatsappTranslator) {
    console.log('🔄 Translator not found, attempting backup initialization...');
    initializeTranslator();
  } else {
    console.log('✅ Translator already initialized');
  }
}, 2000);

// Handle navigation changes in WhatsApp Web SPA
let currentUrl = location.href;
const navigationObserver = new MutationObserver(() => {
  if (location.href !== currentUrl) {
    console.log('🔄 Navigation detected:', currentUrl, '->', location.href);
    currentUrl = location.href;
    // Reinitialize on navigation
    setTimeout(() => {
      console.log('🔄 Reinitializing after navigation...');
      initializeTranslator();
    }, 1000);
  }
});

// Start observing navigation changes
try {
  navigationObserver.observe(document, { subtree: true, childList: true });
  console.log('👀 Navigation observer started');
} catch (error) {
  console.error('❌ Failed to start navigation observer:', error);
}

// Handle messages from popup
try {
  browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('📨 Message received from popup:', request);
    if (request.action === 'apiKeyUpdated') {
      // Reload API key when updated from popup
      if (window.whatsappTranslator) {
        console.log('🔄 Reloading API key...');
        window.whatsappTranslator.loadApiKey();
      }
    }
  });
  console.log('📨 Message listener registered');
} catch (error) {
  console.error('❌ Failed to register message listener:', error);
}

// Debug function to test extension
window.testWhatsAppTranslator = function() {
  console.log('🧪 Testing WhatsApp Translator...');
  console.log('- Extension loaded:', !!window.whatsappTranslator);
  console.log('- Current URL:', window.location.href);
  console.log('- Document ready state:', document.readyState);
  console.log('- WhatsApp elements found:', document.querySelectorAll('[data-testid]').length);
  
  if (window.whatsappTranslator) {
    console.log('- API Key loaded:', !!window.whatsappTranslator.deepLApiKey);
    console.log('- Supported languages:', Object.keys(window.whatsappTranslator.flagToLanguage).length);
  }
};

console.log('🎯 Firefox content script setup complete!');
console.log('💡 To test: Open browser console and run testWhatsAppTranslator()');