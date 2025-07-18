/**
 * WhatsApp Flag Translator - Firefox Content Script
 * Uses shared core logic with Firefox-specific API bindings
 */

// Firefox uses 'browser' API instead of 'chrome'
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

class WhatsAppTranslator extends WhatsAppTranslatorCore {
  constructor() {
    // Pass Firefox/WebExtensions API to the core
    super(browserAPI);
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
browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'apiKeyUpdated') {
    // Reload API key when updated from popup
    if (window.whatsappTranslator) {
      window.whatsappTranslator.loadApiKey();
    }
  }
});