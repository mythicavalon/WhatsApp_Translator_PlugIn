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

// DOM Inspector for WhatsApp Web
function inspectWhatsAppDOM() {
  console.log('🔍 === WhatsApp DOM Inspection ===');
  
  // Check for common WhatsApp elements
  const elements = {
    'Main container': document.querySelector('#main'),
    'App container': document.querySelector('#app'),
    'Chat container': document.querySelector('[data-testid="conversation-panel-messages"]'),
    'Message containers': document.querySelectorAll('[data-testid="msg-container"]'),
    'Messages with reactions': document.querySelectorAll('[data-testid*="reaction"]'),
    'All data-testid elements': document.querySelectorAll('[data-testid]'),
    'Reaction elements': document.querySelectorAll('.message-reaction, [title*="reacted"]'),
    'Text elements': document.querySelectorAll('.selectable-text, [data-testid="msg-text"]')
  };
  
  Object.entries(elements).forEach(([name, element]) => {
    if (element instanceof NodeList) {
      console.log(`📊 ${name}:`, element.length, 'found');
      if (element.length > 0) {
        console.log('   Sample:', element[0]);
      }
    } else {
      console.log(`📊 ${name}:`, element ? '✅ Found' : '❌ Not found');
      if (element) {
        console.log('   Element:', element);
      }
    }
  });
  
  // Check if WhatsApp is fully loaded
  const isLoaded = document.querySelector('[data-testid="msg-container"]') || 
                   document.querySelector('.message-in') || 
                   document.querySelector('.message-out');
  console.log('📱 WhatsApp fully loaded:', isLoaded ? '✅ Yes' : '❌ No');
  
  return elements;
}

// Test reaction detection
function testReactionDetection() {
  console.log('🧪 === Testing Reaction Detection ===');
  
  // Look for existing reactions
  const reactions = document.querySelectorAll('[data-testid*="reaction"], .message-reaction, [title*="reacted"]');
  console.log('🎭 Found reactions:', reactions.length);
  
  reactions.forEach((reaction, index) => {
    console.log(`   Reaction ${index + 1}:`, {
      element: reaction,
      text: reaction.textContent,
      innerHTML: reaction.innerHTML,
      attributes: Array.from(reaction.attributes).map(attr => `${attr.name}="${attr.value}"`).join(' ')
    });
  });
  
  // Test flag emoji extraction
  const testTexts = ['🇫🇷', '🇯🇵🇩🇪', 'Hello 🇺🇸 World', '👍🇪🇸❤️'];
  testTexts.forEach(text => {
    const flags = text.match(/[\u{1F1E6}-\u{1F1FF}][\u{1F1E6}-\u{1F1FF}]/gu) || [];
    console.log(`🏳️ "${text}" → flags:`, flags);
  });
}

// Enhanced test function
window.testWhatsAppTranslator = function() {
  console.log('🧪 === Comprehensive WhatsApp Translator Test ===');
  
  // Basic status
  console.log('- Extension loaded:', !!window.whatsappTranslator);
  console.log('- Current URL:', window.location.href);
  console.log('- Document ready state:', document.readyState);
  
  // DOM inspection
  const domElements = inspectWhatsAppDOM();
  
  // Reaction detection test
  testReactionDetection();
  
  // Extension status
  if (window.whatsappTranslator) {
    console.log('- API Key loaded:', !!window.whatsappTranslator.deepLApiKey);
    console.log('- Supported languages:', Object.keys(window.whatsappTranslator.flagToLanguage).length);
    console.log('- Active translations:', window.whatsappTranslator.activeTranslations.size);
    console.log('- Cache size:', window.whatsappTranslator.translationCache.size);
  }
  
  // Manual test trigger
  console.log('💡 To manually test: Run simulateReaction()');
  return domElements;
};

// Simulate a reaction for testing
window.simulateReaction = function(flagEmoji = '🇫🇷') {
  console.log('🎭 Simulating reaction with', flagEmoji);
  
  // Find a message to test with
  const messageContainer = document.querySelector('[data-testid="msg-container"]') || 
                          document.querySelector('.message-in') || 
                          document.querySelector('.message-out');
  
  if (!messageContainer) {
    console.log('❌ No message container found to test with');
    return;
  }
  
  // Get message text
  const messageText = messageContainer.textContent || 'Hello, this is a test message';
  console.log('📝 Testing with message:', messageText.substring(0, 50) + '...');
  
  // Try to trigger translation directly
  if (window.whatsappTranslator) {
    const messageId = 'test-' + Date.now();
    window.whatsappTranslator.translateMessage(messageContainer, messageText, 'fr', flagEmoji, messageId);
  } else {
    console.log('❌ Translator not initialized');
  }
};

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
    
    // Run DOM inspection after initialization
    setTimeout(() => {
      inspectWhatsAppDOM();
      testReactionDetection();
    }, 2000);
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
  
  // Wait for WhatsApp to load
  const waitForWhatsApp = () => {
    const isReady = document.querySelector('#main') || 
                   document.querySelector('[data-testid="conversation-panel-messages"]') ||
                   document.querySelector('[data-testid]');
    
    if (isReady) {
      console.log('📱 WhatsApp elements detected, initializing...');
      initializeTranslator();
    } else {
      console.log('⏳ Waiting for WhatsApp to load...');
      setTimeout(waitForWhatsApp, 1000);
    }
  };
  
  // Initialize immediately if document is ready
  if (document.readyState === 'complete') {
    console.log('📄 Document already complete, checking WhatsApp...');
    waitForWhatsApp();
  } else if (document.readyState === 'interactive') {
    console.log('📄 Document interactive, checking WhatsApp...');
    waitForWhatsApp();
  } else {
    console.log('📄 Document still loading, waiting for DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', () => {
      console.log('📄 DOMContentLoaded fired, checking WhatsApp...');
      waitForWhatsApp();
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
}, 5000);

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

console.log('🎯 Firefox content script setup complete!');
console.log('💡 To test: Open browser console and run testWhatsAppTranslator()');
console.log('🎭 To simulate: Run simulateReaction("🇫🇷")');