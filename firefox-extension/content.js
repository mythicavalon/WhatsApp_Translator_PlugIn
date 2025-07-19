/**
 * WhatsApp Flag Translator - Firefox Content Script
 * BULLETPROOF VERSION - Guaranteed to show visual confirmation
 */

// =============================================================================
// IMMEDIATE EXECUTION - This runs as soon as the script is injected
// =============================================================================

// IMMEDIATE LOGGING - This should appear first
console.log("✅ Extension Loaded");
console.log("🔥 FIREFOX EXTENSION CONTENT SCRIPT INJECTED!");
console.log("📍 Current URL:", document.location.href);
console.log("📍 Document title:", document.title);
console.log("📍 Document ready state:", document.readyState);
console.log("📍 User agent:", navigator.userAgent);

// Add to window for debugging
window.WHATSAPP_TRANSLATOR_LOADED = true;
console.log("🔧 Set window.WHATSAPP_TRANSLATOR_LOADED = true");

// =============================================================================
// VISUAL CONFIRMATION BANNER - Shows immediately
// =============================================================================

function createVisualBanner() {
  console.log("🎨 Creating visual confirmation banner...");
  
  const banner = document.createElement('div');
  banner.id = 'whatsapp-translator-banner';
  
  const bannerContent = document.createElement('div');
  bannerContent.style.cssText = `
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
  `;
  
  const text = document.createTextNode('🌍 WhatsApp Flag Translator Extension Loaded Successfully!');
  bannerContent.appendChild(text);
  
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.cssText = `
    margin-left: 20px;
    background: white;
    color: #ff4444;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
  `;
  
  // Add event listener instead of inline onclick
  closeButton.addEventListener('click', () => {
    banner.remove();
  });
  
  bannerContent.appendChild(closeButton);
  banner.appendChild(bannerContent);
  
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
  
  // Translator core is now loaded directly via manifest
  
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
          // Clear existing content
          banner.innerHTML = '';
          
          const successContent = document.createElement('div');
          successContent.style.cssText = `
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
          `;
          
          const successText = document.createTextNode('🎉 WhatsApp Flag Translator Ready! React with flag emojis to translate messages.');
          successContent.appendChild(successText);
          
          const successCloseButton = document.createElement('button');
          successCloseButton.textContent = 'Close';
          successCloseButton.style.cssText = `
            margin-left: 20px;
            background: white;
            color: #25d366;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            font-weight: bold;
          `;
          
          // Add event listener instead of inline onclick
          successCloseButton.addEventListener('click', () => {
            banner.remove();
          });
          
          successContent.appendChild(successCloseButton);
          banner.appendChild(successContent);
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
  
  // Start initialization process
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTranslator);
  } else {
    initializeTranslator();
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
  
  // Add global test functions
  window.testWhatsAppTranslator = function() {
    console.log("🧪 Testing WhatsApp Translator...");
    
    if (window.whatsappTranslator) {
      console.log("✅ Translator instance found:", window.whatsappTranslator);
      
      // Test flag emoji extraction
      const testText = "🇯🇵🇩🇪🇫🇷";
      const flags = testText.match(/[\u{1F1E6}-\u{1F1FF}]{2}/gu) || [];
      console.log("🏳️ Flag test - Input:", testText, "Flags found:", flags);
      
      // Test reaction detection on current page
      console.log("🔍 Scanning page for reactions...");
      const reactions = document.querySelectorAll('[data-testid*="reaction"], .message-reaction, [title*="reacted"]');
      console.log("🎭 Found reactions on page:", reactions.length);
      reactions.forEach((reaction, i) => {
        console.log(`  Reaction ${i+1}:`, reaction, "Text:", reaction.textContent);
      });
      
      // Test message containers
      const messages = document.querySelectorAll('[data-testid="msg-container"]');
      console.log("💬 Found message containers:", messages.length);
      
    } else {
      console.log("❌ Translator instance not found");
    }
  };
  
  window.manualReactionTest = function() {
    console.log("🔧 Manual reaction test...");
    if (window.whatsappTranslator && window.whatsappTranslator.checkForReactions) {
      // Test on entire document
      window.whatsappTranslator.checkForReactions(document.body);
    }
  };

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