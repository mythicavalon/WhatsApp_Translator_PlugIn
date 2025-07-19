/**
 * WhatsApp Flag Translator - Content Script v4.0.0
 * Clean architecture with enhanced initialization and debugging
 * CSP-compliant with comprehensive error handling
 */

// =============================================================================
// IMMEDIATE EXECUTION - This runs as soon as the script is injected
// =============================================================================

console.log('🚀 WhatsApp Flag Translator v4.0.0 Content Script Loading...');
console.log('✨ Clean architecture with enhanced reliability');

// =============================================================================
// VISUAL CONFIRMATION BANNER
// =============================================================================

function showLoadingBanner() {
  console.log('📢 Creating visual loading banner...');
  
  // Remove any existing banners
  const existingBanners = document.querySelectorAll('#whatsapp-translator-banner');
  existingBanners.forEach(banner => banner.remove());
  
  const banner = document.createElement('div');
  banner.id = 'whatsapp-translator-banner';
  banner.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #25D366, #128C7E);
    color: white;
    padding: 15px 20px;
    border-radius: 12px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 8px 32px rgba(37, 211, 102, 0.3);
    z-index: 999999;
    max-width: 350px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    animation: slideIn 0.5s ease-out;
  `;
  
  // Add animation keyframes
  if (!document.getElementById('translator-animations')) {
    const style = document.createElement('style');
    style.id = 'translator-animations';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  const bannerContent = document.createElement('div');
  bannerContent.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="font-size: 24px;">🎯</div>
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">
          WhatsApp Flag Translator v4.0.0
        </div>
        <div style="font-size: 12px; opacity: 0.9;">
          ✅ Loaded successfully! React with flag emojis to translate messages.
        </div>
      </div>
    </div>
  `;
  
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '✕';
  closeButton.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    opacity: 0.7;
    transition: opacity 0.2s;
  `;
  
  closeButton.addEventListener('mouseenter', () => {
    closeButton.style.opacity = '1';
    closeButton.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
  });
  
  closeButton.addEventListener('mouseleave', () => {
    closeButton.style.opacity = '0.7';
    closeButton.style.backgroundColor = 'transparent';
  });
  
  // Add event listener instead of inline onclick
  closeButton.addEventListener('click', () => {
    banner.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => banner.remove(), 300);
  });
  
  bannerContent.appendChild(closeButton);
  banner.appendChild(bannerContent);
  
  // Insert banner safely
  const insertBanner = () => {
    if (document.body) {
      document.body.appendChild(banner);
      console.log('✅ Visual banner added to body');
    } else if (document.documentElement) {
      document.documentElement.appendChild(banner);
      console.log('✅ Visual banner added to document element');
    } else {
      console.log('⚠️ Cannot add banner - no body or document element');
      return;
    }
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
      const bannerElement = document.getElementById('whatsapp-translator-banner');
      if (bannerElement) {
        bannerElement.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
          if (bannerElement.parentNode) {
            bannerElement.remove();
          }
        }, 500);
      }
    }, 8000);
  };
  
  // Try to insert immediately, or wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertBanner);
  } else {
    insertBanner();
  }
}

// =============================================================================
// CORE INITIALIZATION
// =============================================================================

let translatorCore = null;
let initializationAttempts = 0;
const maxInitAttempts = 10;

async function initializeTranslator() {
  if (translatorCore && translatorCore.isInitialized) {
    console.log('✅ Translator already initialized');
    return;
  }
  
  initializationAttempts++;
  console.log(`🔧 Initialization attempt ${initializationAttempts}/${maxInitAttempts}`);
  
  try {
    // Detect browser API
    const browserAPI = (typeof browser !== 'undefined') ? browser : chrome;
    
    if (!browserAPI) {
      throw new Error('Browser API not available');
    }
    
    // Check if WhatsAppTranslatorCore is available
    if (typeof WhatsAppTranslatorCore === 'undefined') {
      throw new Error('WhatsAppTranslatorCore class not loaded');
    }
    
    // Initialize the core
    translatorCore = new WhatsAppTranslatorCore(browserAPI);
    await translatorCore.init();
    
    console.log('🎉 WhatsApp Flag Translator v4.0.0 fully initialized!');
    
    // Show success banner
    showLoadingBanner();
    
    // Expose debugging functions globally
    window.findAllFlags = () => translatorCore.findAllFlags();
    window.debugReactionElement = (element) => translatorCore.debugReactionElement(element);
    window.translatorCore = translatorCore; // For advanced debugging
    
    console.log('🛠️ Debug functions available: findAllFlags(), debugReactionElement(element)');
    
  } catch (error) {
    console.error(`❌ Initialization attempt ${initializationAttempts} failed:`, error);
    
    if (initializationAttempts < maxInitAttempts) {
      const delay = Math.min(1000 * initializationAttempts, 5000); // Progressive delay
      console.log(`⏳ Retrying in ${delay}ms...`);
      setTimeout(initializeTranslator, delay);
    } else {
      console.error('💥 All initialization attempts failed. Extension may not work properly.');
      
      // Show error banner
      showErrorBanner();
    }
  }
}

function showErrorBanner() {
  const banner = document.createElement('div');
  banner.id = 'whatsapp-translator-error-banner';
  banner.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #ff4757, #ff3838);
    color: white;
    padding: 15px 20px;
    border-radius: 12px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 8px 32px rgba(255, 71, 87, 0.3);
    z-index: 999999;
    max-width: 350px;
  `;
  
  banner.innerHTML = `
    <div style="display: flex; align-items: center; gap: 12px;">
      <div style="font-size: 24px;">⚠️</div>
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">
          WhatsApp Flag Translator v4.0.0
        </div>
        <div style="font-size: 12px; opacity: 0.9;">
          ❌ Failed to initialize. Please refresh the page.
        </div>
      </div>
    </div>
  `;
  
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '✕';
  closeButton.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    opacity: 0.7;
  `;
  
  closeButton.addEventListener('click', () => banner.remove());
  banner.appendChild(closeButton);
  
  if (document.body) {
    document.body.appendChild(banner);
  }
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (banner.parentNode) {
      banner.remove();
    }
  }, 10000);
}

// =============================================================================
// ENHANCED DOM READINESS CHECK
// =============================================================================

function waitForDOM() {
  return new Promise((resolve) => {
    if (document.readyState === 'complete' || 
        (document.readyState === 'interactive' && document.body)) {
      resolve();
    } else {
      const checkReady = () => {
        if (document.readyState === 'complete' || 
            (document.readyState === 'interactive' && document.body)) {
          resolve();
        } else {
          setTimeout(checkReady, 100);
        }
      };
      checkReady();
    }
  });
}

// =============================================================================
// WHATSAPP SPECIFIC READINESS CHECK
// =============================================================================

function waitForWhatsApp() {
  return new Promise((resolve) => {
    const checkWhatsApp = () => {
      // Look for WhatsApp-specific elements
      const whatsappIndicators = [
        '[data-testid="conversation-panel"]',
        '#main',
        '[data-testid="chat-list"]',
        '.app-wrapper-web'
      ];
      
      const found = whatsappIndicators.some(selector => 
        document.querySelector(selector)
      );
      
      if (found) {
        console.log('✅ WhatsApp Web interface detected');
        resolve();
      } else {
        console.log('⏳ Waiting for WhatsApp Web interface...');
        setTimeout(checkWhatsApp, 1000);
      }
    };
    
    checkWhatsApp();
  });
}

// =============================================================================
// MAIN INITIALIZATION SEQUENCE
// =============================================================================

async function main() {
  try {
    console.log('🔍 Waiting for DOM readiness...');
    await waitForDOM();
    
    console.log('🔍 Waiting for WhatsApp Web interface...');
    await waitForWhatsApp();
    
    console.log('🚀 Starting translator initialization...');
    await initializeTranslator();
    
  } catch (error) {
    console.error('💥 Main initialization sequence failed:', error);
  }
}

// =============================================================================
// ERROR HANDLING AND RECOVERY
// =============================================================================

window.addEventListener('error', (event) => {
  if (event.error && event.error.message && 
      event.error.message.includes('WhatsApp') || 
      event.error.message.includes('Translator')) {
    console.error('🚨 WhatsApp Translator error:', event.error);
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && 
      (event.reason.message.includes('WhatsApp') || 
       event.reason.message.includes('Translator'))) {
    console.error('🚨 WhatsApp Translator unhandled rejection:', event.reason);
  }
});

// =============================================================================
// MANUAL RESTART FUNCTION
// =============================================================================

window.restartTranslator = async () => {
  console.log('🔄 Manual translator restart requested...');
  
  if (translatorCore) {
    try {
      if (translatorCore.observer) {
        translatorCore.observer.disconnect();
      }
      if (translatorCore.reactionObserver) {
        translatorCore.reactionObserver.disconnect();
      }
    } catch (error) {
      console.log('⚠️ Error during cleanup:', error.message);
    }
  }
  
  translatorCore = null;
  initializationAttempts = 0;
  
  await initializeTranslator();
};

// =============================================================================
// START THE EXTENSION
// =============================================================================

console.log('⚡ Starting WhatsApp Flag Translator v4.0.0...');
main();