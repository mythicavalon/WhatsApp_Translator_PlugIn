/**
 * WhatsApp Flag Translator - Firefox Content Script
 * BULLETPROOF VERSION - Guaranteed to show visual confirmation
 */

// =============================================================================
// IMMEDIATE EXECUTION - This runs as soon as the script is injected
// =============================================================================

console.log("✅ Extension Loaded");
console.log("🔥 FIREFOX EXTENSION CONTENT SCRIPT INJECTED!");
console.log("📍 Current URL:", document.location.href);
console.log("📍 Document title:", document.title);
console.log("📍 Document ready state:", document.readyState);
console.log("📍 User agent:", navigator.userAgent);

// =============================================================================
// VISUAL CONFIRMATION BANNER - Shows immediately
// =============================================================================

function createVisualBanner() {
  console.log("🎨 Creating visual confirmation banner...");
  
  const banner = document.createElement('div');
  banner.id = 'whatsapp-translator-banner';
  banner.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: #ff4444;
      color: white;
      padding: 10px;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
      z-index: 999999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      font-family: Arial, sans-serif;
    ">
      🌍 WhatsApp Flag Translator Extension Loaded Successfully!
      <button onclick="this.parentElement.parentElement.remove()" style="
        margin-left: 20px;
        background: white;
        color: #ff4444;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        cursor: pointer;
        font-weight: bold;
      ">Close</button>
    </div>
  `;
  
  // Insert banner immediately
  if (document.body) {
    document.body.appendChild(banner);
    console.log("✅ Visual banner added to body");
  } else {
    // If body doesn't exist yet, add to document element
    document.documentElement.appendChild(banner);
    console.log("✅ Visual banner added to document element");
  }
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    const bannerElement = document.getElementById('whatsapp-translator-banner');
    if (bannerElement) {
      bannerElement.remove();
      console.log("🗑️ Visual banner auto-removed");
    }
  }, 10000);
}

// =============================================================================
// IMMEDIATE BANNER CREATION
// =============================================================================

// Try to create banner immediately
try {
  createVisualBanner();
} catch (error) {
  console.error("❌ Error creating banner:", error);
}

// Fallback - try again when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log("📄 DOMContentLoaded - trying banner again");
    createVisualBanner();
  });
}

// Another fallback - try when window loads
window.addEventListener('load', () => {
  console.log("🪟 Window loaded - trying banner again");
  createVisualBanner();
});

// =============================================================================
// WHATSAPP DETECTION AND CORE LOADING
// =============================================================================

console.log("🔍 Checking if this is WhatsApp Web...");
const isWhatsAppWeb = document.location.href.includes('web.whatsapp.com');
console.log("📱 Is WhatsApp Web:", isWhatsAppWeb);

if (isWhatsAppWeb) {
  console.log("✅ On WhatsApp Web - proceeding with translator initialization");
  
  // Load translator core dynamically
  function loadTranslatorCore() {
    console.log("🔄 Loading translator core...");
    
    // Create script element to load translator-core.js
    const script = document.createElement('script');
    script.src = browser.runtime.getURL('translator-core.js');
    script.onload = () => {
      console.log("✅ Translator core loaded successfully");
      initializeTranslator();
    };
    script.onerror = (error) => {
      console.error("❌ Failed to load translator core:", error);
      // Fallback - try to initialize anyway
      setTimeout(initializeTranslator, 1000);
    };
    
    (document.head || document.documentElement).appendChild(script);
  }
  
  // Initialize the translator
  function initializeTranslator() {
    console.log("🚀 Initializing WhatsApp Translator...");
    
    try {
      // Check if core is available
      if (typeof WhatsAppTranslatorCore !== 'undefined') {
        console.log("✅ WhatsAppTranslatorCore found");
        
        // Firefox uses 'browser' API
        const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
        
        class WhatsAppTranslator extends WhatsAppTranslatorCore {
          constructor() {
            console.log("🔧 Creating WhatsAppTranslator instance");
            super(browserAPI);
            this.init();
          }
        }
        
        // Create global instance
        window.whatsappTranslator = new WhatsAppTranslator();
        console.log("🎉 WhatsApp Translator initialized successfully!");
        
        // Update banner to show success
        const banner = document.getElementById('whatsapp-translator-banner');
        if (banner) {
          banner.innerHTML = `
            <div style="
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              background: #25d366;
              color: white;
              padding: 10px;
              text-align: center;
              font-weight: bold;
              font-size: 16px;
              z-index: 999999;
              box-shadow: 0 2px 10px rgba(0,0,0,0.3);
              font-family: Arial, sans-serif;
            ">
              🎉 WhatsApp Flag Translator Ready! React with flag emojis to translate messages.
              <button onclick="this.parentElement.parentElement.remove()" style="
                margin-left: 20px;
                background: white;
                color: #25d366;
                border: none;
                padding: 5px 10px;
                border-radius: 3px;
                cursor: pointer;
                font-weight: bold;
              ">Close</button>
            </div>
          `;
        }
        
      } else {
        console.warn("⚠️ WhatsAppTranslatorCore not found - using fallback");
        // Create a simple fallback
        window.whatsappTranslator = {
          ready: false,
          error: "Core not loaded"
        };
      }
    } catch (error) {
      console.error("❌ Error initializing translator:", error);
    }
  }
  
  // Start loading process
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadTranslatorCore);
  } else {
    loadTranslatorCore();
  }
  
} else {
  console.log("⚠️ Not on WhatsApp Web - extension will not initialize");
}

// =============================================================================
// TESTING FUNCTIONS
// =============================================================================

// Global test function
window.testWhatsAppTranslator = function() {
  console.log("🧪 === WhatsApp Translator Test ===");
  console.log("- Extension loaded:", true);
  console.log("- Current URL:", document.location.href);
  console.log("- Is WhatsApp Web:", document.location.href.includes('web.whatsapp.com'));
  console.log("- Document title:", document.title);
  console.log("- Translator instance:", !!window.whatsappTranslator);
  console.log("- DOM elements with data-testid:", document.querySelectorAll('[data-testid]').length);
  
  if (window.whatsappTranslator) {
    console.log("- Translator ready:", window.whatsappTranslator.ready !== false);
    if (window.whatsappTranslator.flagToLanguage) {
      console.log("- Supported languages:", Object.keys(window.whatsappTranslator.flagToLanguage).length);
    }
  }
  
  return {
    loaded: true,
    url: document.location.href,
    isWhatsApp: document.location.href.includes('web.whatsapp.com'),
    translator: !!window.whatsappTranslator,
    elements: document.querySelectorAll('[data-testid]').length
  };
};

// =============================================================================
// FINAL CONFIRMATION
// =============================================================================

console.log("🎯 Firefox content script setup complete!");
console.log("💡 To test: Open browser console and run testWhatsAppTranslator()");
console.log("🔍 Look for the red banner at the top of the page as visual confirmation");

// Log every 5 seconds for first minute to confirm script is running
let logCount = 0;
const intervalId = setInterval(() => {
  logCount++;
  console.log(`⏰ Extension heartbeat ${logCount} - Script is running`);
  
  if (logCount >= 12) { // Stop after 1 minute
    clearInterval(intervalId);
    console.log("🔇 Heartbeat logging stopped");
  }
}, 5000);