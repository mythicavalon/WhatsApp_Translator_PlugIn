/**
 * WhatsApp Flag Translator - Chrome Content Script
 * Uses shared core logic with Chrome-specific API bindings
 */

// Import shared core (will be injected by build process or copied)
// For now, we'll include it directly in the manifest

class WhatsAppTranslator extends WhatsAppTranslatorCore {
  constructor() {
    // Pass Chrome API to the core
    super(chrome);
    this.init();
  }
}

// Initialize the translator when the page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.whatsappTranslator = new WhatsAppTranslator();
  });
} else {
  window.whatsappTranslator = new WhatsAppTranslator();
}

// Handle navigation changes in WhatsApp Web SPA
let currentUrl = location.href;
new MutationObserver(() => {
  if (location.href !== currentUrl) {
    currentUrl = location.href;
    // Reinitialize on navigation
    setTimeout(() => {
      window.whatsappTranslator = new WhatsAppTranslator();
    }, 1000);
  }
}).observe(document, { subtree: true, childList: true });

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'apiKeyUpdated') {
    // Reload API key when updated from popup
    if (window.whatsappTranslator) {
      window.whatsappTranslator.loadApiKey();
    }
  }
});