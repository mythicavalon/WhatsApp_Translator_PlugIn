/**
 * WhatsApp Flag Translator - Core Logic
 * Enhanced with user settings and improved flag detection
 */

class WhatsAppTranslatorCore {
  constructor(browserAPI) {
    this.browserAPI = browserAPI; // chrome or browser API
    this.settings = {
      duration: 120,
      bubbleSize: 100,
      autoHide: true,
      showFlag: true,
      compressText: true,
      cacheTranslations: true,
      debugMode: true // Temporarily enable to diagnose reaction detection
    };
    
    this.flagToLanguage = {
      '🇺🇸': 'en-US', '🇬🇧': 'en-GB', '🇪🇸': 'es', '🇫🇷': 'fr', '🇩🇪': 'de',
      '🇮🇹': 'it', '🇵🇹': 'pt', '🇷🇺': 'ru', '🇯🇵': 'ja', '🇰🇷': 'ko',
      '🇨🇳': 'zh', '🇳🇱': 'nl', '🇸🇪': 'sv', '🇳🇴': 'no', '🇩🇰': 'da',
      '🇫🇮': 'fi', '🇵🇱': 'pl', '🇨🇿': 'cs', '🇸🇰': 'sk', '🇭🇺': 'hu',
      '🇬🇷': 'el', '🇹🇷': 'tr', '🇧🇷': 'pt-BR', '🇦🇷': 'es', '🇲🇽': 'es',
      '🇮🇳': 'hi', '🇹🇭': 'th', '🇻🇳': 'vi', '🇮🇩': 'id', '🇲🇾': 'ms',
      '🇵🇭': 'tl', '🇸🇦': 'ar', '🇦🇪': 'ar', '🇪🇬': 'ar', '🇮🇱': 'he',
      '🇺🇦': 'uk', '🇷🇴': 'ro', '🇧🇬': 'bg', '🇭🇷': 'hr', '🇸🇮': 'sl',
      '🇱🇹': 'lt', '🇱🇻': 'lv', '🇪🇪': 'et'
    };
    
    this.translationCache = new Map();
    this.activeTranslations = new Map();
    this.observer = null;
    this.reactionObserver = null;
    this.isInitialized = false;
  }

  async init() {
    if (this.isInitialized) return;
    
    this.logImportant('🔧 Starting WhatsApp Flag Translator initialization...');
    try {
      await this.loadSettings();
      this.logImportant('✅ Configuration loaded');
      
      this.setupMutationObserver();
      this.logImportant('✅ Mutation observer setup');
      
      this.setupMessageObserver();
      this.logImportant('✅ Message observer setup');
      
      this.setupMessageListener();
      this.logImportant('✅ Message listener setup');
      
      this.isInitialized = true;
      this.logImportant('🎉 WhatsApp Flag Translator fully initialized and ready!');
      
      // Add visual confirmation if debug mode is enabled
      if (this.settings.debugMode) {
        this.showInitializationMessage();
      }
    } catch (error) {
      console.error('❌ Error during initialization:', error);
    }
  }

  setupMessageListener() {
    // Listen for messages from popup
    if (this.browserAPI && this.browserAPI.runtime && this.browserAPI.runtime.onMessage) {
      this.browserAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
        this.handleMessage(request, sender, sendResponse);
      });
    }
  }

  async handleMessage(request, sender, sendResponse) {
    switch (request.action) {
      case 'ping':
        sendResponse({ status: 'active' });
        break;
              case 'apiKeyUpdated':
          // No longer needed - using LibreTranslate (no API key required)
          this.log('🔑 LibreTranslate - no API key needed');
          break;
      case 'settingsUpdated':
        if (request.data) {
          this.settings = { ...this.settings, ...request.data };
        } else {
          await this.loadSettings();
        }
        this.log('⚙️ Settings updated:', this.settings);
        break;
    }
  }

  async loadSettings() {
    try {
      const result = await this.browserAPI.storage.sync.get(['translatorSettings']);
      if (result.translatorSettings) {
        this.settings = { ...this.settings, ...result.translatorSettings };
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }

  log(message, ...args) {
    if (this.settings.debugMode) {
      console.log(message, ...args);
    }
  }

  // Always log important messages regardless of debug mode
  logImportant(message, ...args) {
    console.log(message, ...args);
  }

  showInitializationMessage() {
    // Create a temporary visual indicator
    const indicator = document.createElement('div');
    indicator.textContent = '🌍 WhatsApp Translator Loaded';
    indicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #25d366;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      font-weight: bold;
      z-index: 999999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideInRight 0.5s ease-out;
    `;
    
    // Add animation keyframes
    if (!document.getElementById('translator-animations')) {
      const style = document.createElement('style');
      style.id = 'translator-animations';
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(indicator);
    
    // Remove after 3 seconds
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.remove();
      }
    }, 3000);
  }



  setupMutationObserver() {
    this.log('🔧 Setting up optimized mutation observer...');
    
    // Simple, reliable mutation observer - no throttling for now
    this.observer = new MutationObserver((mutations) => {
      if (this.settings.debugMode) {
        this.logImportant(`👀 Mutation observer triggered with ${mutations.length} mutations`);
      }
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (this.settings.debugMode) {
                this.logImportant('➕ New element added:', node.tagName, node.className?.substring(0, 30));
              }
              this.checkForReactions(node);
            }
          });
        }
      });
    });

    // Start observing when the chat container is available
    this.waitForChatContainer();
    
    // Add immediate debug logging
    console.log('🔧 Mutation observer setup completed');
  }



  waitForChatContainer() {
    let retryCount = 0;
    const maxRetries = 10; // Limit retries to prevent infinite loop
    
    const checkForContainer = () => {
      retryCount++;
      
      if (retryCount === 1) {
        this.logImportant('🔍 Looking for WhatsApp chat container...');
      }
      
              // Try multiple selectors since WhatsApp structure changes
        const selectors = ['#main', '#app', '[data-testid="conversation-panel-messages"]', '[role="main"]'];
        let chatContainer = null;
        
        for (const selector of selectors) {
          chatContainer = document.querySelector(selector);
          if (chatContainer) {
            this.logImportant(`✅ Found chat container using selector: ${selector}`);
            break;
          }
        }
      
      // Log what we found for debugging
      if (chatContainer) {
        this.logImportant(`✅ Found chat container: ${chatContainer.tagName} with classes: ${chatContainer.className.substring(0, 50)}...`);
      } else {
        // Check if page is fully loaded
        const allDivs = document.querySelectorAll('div[id]');
        this.logImportant(`🔍 Page has ${allDivs.length} divs with IDs. Looking for #main...`);
        allDivs.forEach(div => {
          if (div.id) {
            this.logImportant(`Found div with ID: ${div.id}`);
          }
        });
      }
      
      if (chatContainer) {
        this.observer.observe(chatContainer, {
          childList: true,
          subtree: true
        });
        this.logImportant('👀 Started observing chat container:', chatContainer.tagName);
        this.logImportant('🎯 Mutation observer is now active and waiting for reactions!');
        
        // Also check existing messages for reactions
        this.scanExistingMessages(chatContainer);
      } else if (retryCount < maxRetries) {
        if (retryCount <= 3) {
          this.logImportant(`⏳ Chat container not found (attempt ${retryCount}), retrying...`);
        }
        setTimeout(checkForContainer, 2000); // Increased delay to reduce spam
      } else {
        this.logImportant('❌ Failed to find chat container after 10 attempts. Extension may not work properly.');
      }
    };
    
    checkForContainer();
  }

  scanExistingMessages(container) {
    // Check existing messages for reactions
    const messages = container.querySelectorAll('[data-testid="msg-container"]');
    messages.forEach(message => {
      this.checkForReactions(message);
    });
  }

  setupMessageObserver() {
    // Additional observer for reaction changes on existing messages
    this.reactionObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
          const target = mutation.target;
          if (target.closest && target.closest('[data-testid="msg-container"]')) {
            this.checkForReactions(target);
          }
        }
      });
    });

    // Observe the entire document for reaction changes
    this.reactionObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'data-testid', 'title', 'aria-label']
    });
  }

  checkForReactions(element) {
    // Only log detailed info if debug mode is enabled
    if (this.settings.debugMode) {
      this.log('🔍 Checking for reactions in element:', element.tagName, element.className?.substring(0, 50));
    }
    
    // Multiple strategies to find reactions
    const reactionSelectors = [
      '[data-testid*="reaction"]',
      '.message-reaction',
      '[title*="reacted"]',
      '[aria-label*="reacted"]',
      '[aria-label*="reaction"]',  // NEW: For "reaction 🇯🇵" pattern
      '[data-testid="reactions"]',
      '.reactions-container',
      '[data-testid="emoji-reactions"]',
      'button[aria-label*="reaction"]',  // NEW: Button elements with reaction aria-label
      'button.xo0jvv6[aria-label*="reaction"]',  // NEW: Specific button class we see in logs
      // Add more comprehensive selectors
      'span[aria-label*="reaction"]',
      'div[aria-label*="reaction"]',
      'button[title*="reaction"]',
      'span[title*="reaction"]',
      '[aria-label*="🇯🇵"]', '[aria-label*="🇩🇪"]', '[aria-label*="🇪🇸"]', '[aria-label*="🇫🇷"]',
      '[aria-label*="🇮🇹"]', '[aria-label*="🇷🇺"]', '[aria-label*="🇺🇸"]', '[aria-label*="🇬🇧"]'
    ];
    
    let reactions = [];
    
    // Check if element itself is a reaction
    if (this.isReactionElement(element)) {
      console.log('✅ Element itself is a reaction');
      reactions.push(element);
    }
    
    // Search within the element (optimized)
    reactionSelectors.forEach(selector => {
      try {
        const found = element.querySelectorAll ? element.querySelectorAll(selector) : [];
        if (found.length > 0) {
          if (this.settings.debugMode) {
            this.log(`🎯 Found ${found.length} reactions with selector: ${selector}`);
          }
          reactions.push(...found);
        }
      } catch (e) {
        if (this.settings.debugMode) {
          this.log('❌ Error with selector:', selector, e.message);
        }
      }
    });
    
    // Optimized flag emoji detection - only check if no reactions found yet
    if (reactions.length === 0) {
      const flagRegex = /[\u{1F1E6}-\u{1F1FF}]{2}/u;
      const potentialElements = element.querySelectorAll ? 
        element.querySelectorAll('button[aria-label*="🇯🇵"], button[aria-label*="🇩🇪"], span[aria-label*="🇯🇵"], span[aria-label*="🇩🇪"]') : [];
      
      Array.from(potentialElements).forEach((el) => {
        const ariaLabel = el.getAttribute('aria-label') || '';
        if (flagRegex.test(ariaLabel)) {
          if (this.settings.debugMode) {
            this.log(`🚩 Found flag element: ${ariaLabel}`);
          }
          reactions.push(el);
        }
      });
    }
    
    if (this.settings.debugMode && reactions.length > 0) {
      this.log(`📊 Total reactions found: ${reactions.length}`);
    }
    
    // Process each reaction found
    reactions.forEach(reaction => {
      if (this.settings.debugMode) {
        this.log('🔄 Processing reaction:', reaction.tagName);
      }
      this.processReaction(reaction);
    });
  }

  isReactionElement(element) {
    if (!element.getAttribute && !element.classList) return false;
    
    const testId = element.getAttribute('data-testid') || '';
    const className = element.className || '';
    const title = element.getAttribute('title') || '';
    const ariaLabel = element.getAttribute('aria-label') || '';
    
    // Check for current WhatsApp reaction patterns
    return testId.includes('reaction') ||
           className.includes('reaction') ||
           title.includes('reacted') ||
           ariaLabel.includes('reacted') ||
           ariaLabel.includes('reaction') ||  // NEW: Check for "reaction 🇯🇵" pattern
           (element.tagName === 'BUTTON' && ariaLabel.match(/reaction\s+[\u{1F1E6}-\u{1F1FF}]{2}/u)); // NEW: Button with flag
  }

  processReaction(reactionElement) {
    try {
      // Find flag emojis in the reaction
      const reactionText = this.getElementText(reactionElement);
      const flagEmojis = this.extractFlagEmojis(reactionText);
      
      if (this.settings.debugMode) {
        this.log('🎭 Processing reaction:', reactionText, 'Flags:', flagEmojis);
      }
      
      if (flagEmojis.length === 0) {
        if (this.settings.debugMode) {
          this.log('❌ No flag emojis found in reaction');
        }
        return;
      }

      // Find the associated message with multiple strategies
      const messageContainer = this.findMessageContainer(reactionElement);
      
      if (!messageContainer) {
        if (this.settings.debugMode) {
          this.log('❌ No message container found');
        }
        return;
      }

      // Extract message text
      const messageText = this.extractMessageText(messageContainer);
      
      if (this.settings.debugMode) {
        this.log('💬 Message text:', messageText?.substring(0, 50) + '...');
      }
      
      if (!messageText || messageText.length < 2) {
        if (this.settings.debugMode) {
          this.log('❌ No valid message text found');
        }
        return;
      }

      // Get unique message ID
      const messageId = this.getMessageId(messageContainer);
      
      if (this.settings.debugMode) {
        this.log('🎯 Flag reaction detected!', {
          flags: flagEmojis,
          messagePreview: messageText.substring(0, 30) + '...',
          messageId: messageId?.substring(0, 10) + '...'
        });
      }
      
      // Process each flag emoji
      flagEmojis.forEach(flagEmoji => {
        const targetLanguage = this.flagToLanguage[flagEmoji];
        if (targetLanguage) {
          this.log(`🔄 Translating to ${targetLanguage} (${flagEmoji})`);
          this.translateMessage(messageContainer, messageText, targetLanguage, flagEmoji, messageId);
        }
      });
    } catch (error) {
      console.error('Error processing reaction:', error);
    }
  }

  getElementText(element) {
    // First try aria-label for reaction buttons
    const ariaLabel = element.getAttribute('aria-label') || '';
    if (ariaLabel.includes('reaction')) {
      return ariaLabel;
    }
    
    // Fallback to text content
    return element.textContent || element.innerText || element.innerHTML || '';
  }

  findMessageContainer(reactionElement) {
    // Try multiple strategies to find the message container
    const strategies = [
      () => reactionElement.closest('[data-testid="msg-container"]'),
      () => reactionElement.closest('.message-in'),
      () => reactionElement.closest('.message-out'),
      () => reactionElement.closest('[role="row"]'),
      () => reactionElement.closest('[data-testid="msg"]'),
      () => reactionElement.parentElement?.closest('[data-testid="msg-container"]'),
      () => reactionElement.parentElement?.parentElement?.closest('[data-testid="msg-container"]')
    ];
    
    for (const strategy of strategies) {
      try {
        const container = strategy();
        if (container) return container;
      } catch (error) {
        // Continue to next strategy
      }
    }
    
    return null;
  }

  extractFlagEmojis(text) {
    // Unicode ranges for flag emojis
    const flagRegex = /[\u{1F1E6}-\u{1F1FF}]{2}/gu;
    return text.match(flagRegex) || [];
  }

  extractMessageText(messageContainer) {
    // Try multiple selectors to find message text
    const textSelectors = [
      '[data-testid="msg-text"]',
      '.message-text',
      '.selectable-text',
      '[data-testid="conversation-text"]',
      '.copyable-text span'
    ];
    
    for (const selector of textSelectors) {
      const textElement = messageContainer.querySelector(selector);
      if (textElement && textElement.textContent?.trim()) {
        return textElement.textContent.trim();
      }
    }
    
    // Fallback: get all text content but filter out reaction text
    const allText = messageContainer.textContent || '';
    const flagRegex = /[\u{1F1E6}-\u{1F1FF}]{2}/gu;
    return allText.replace(flagRegex, '').trim();
  }

  getMessageId(messageContainer) {
    // Try to get a unique identifier for the message
    return messageContainer.getAttribute('data-id') ||
           messageContainer.getAttribute('id') ||
           messageContainer.querySelector('[data-id]')?.getAttribute('data-id') ||
           `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async translateMessage(messageContainer, messageText, targetLanguage, flagEmoji, messageId) {
    // Check cache first if enabled
    const cacheKey = `${messageText}-${targetLanguage}`;
    if (this.settings.cacheTranslations && this.translationCache.has(cacheKey)) {
      const cachedTranslation = this.translationCache.get(cacheKey);
      this.displayTranslation(messageContainer, cachedTranslation, flagEmoji, messageId);
      this.log('📦 Used cached translation');
      return;
    }

    // Check if we already have an active translation for this message
    if (this.activeTranslations.has(messageId)) {
      this.log('⏭️ Translation already active for this message');
      return;
    }

    // LibreTranslate is free - no API key needed!

    try {
      this.showLoadingIndicator(messageContainer, flagEmoji, messageId);

      let textToTranslate = messageText;
      if (this.settings.compressText) {
        textToTranslate = this.compressText(messageText);
      }

      const translation = await this.callLibreTranslateAPI(textToTranslate, targetLanguage);
      
      // Cache the translation if enabled
      if (this.settings.cacheTranslations) {
        this.translationCache.set(cacheKey, translation);
      }

      this.displayTranslation(messageContainer, translation, flagEmoji, messageId);
    } catch (error) {
      console.error('Translation error:', error);
      this.showError(messageContainer, `Translation failed: ${error.message}`);
    }
  }



  async callLibreTranslateAPI(text, targetLanguage) {
    // Convert flag language codes to LibreTranslate format
    const langMap = {
      'en-US': 'en', 'en-GB': 'en', 'es': 'es', 'fr': 'fr', 'de': 'de',
      'it': 'it', 'pt': 'pt', 'pt-BR': 'pt', 'ru': 'ru', 'ja': 'ja', 
      'ko': 'ko', 'zh': 'zh', 'nl': 'nl', 'sv': 'sv', 'no': 'no', 
      'da': 'da', 'fi': 'fi', 'pl': 'pl', 'cs': 'cs', 'sk': 'sk', 
      'hu': 'hu', 'el': 'el', 'tr': 'tr', 'hi': 'hi', 'th': 'th', 
      'vi': 'vi', 'id': 'id', 'ms': 'ms', 'tl': 'tl', 'ar': 'ar', 
      'he': 'he', 'uk': 'uk', 'ro': 'ro', 'bg': 'bg', 'hr': 'hr', 
      'sl': 'sl', 'lt': 'lt', 'lv': 'lv', 'et': 'et'
    };

    const targetLang = langMap[targetLanguage] || targetLanguage.split('-')[0];

    // Try multiple LibreTranslate instances for reliability
    const instances = [
      'https://libretranslate.de/translate',
      'https://translate.terraprint.co/translate',
      'https://libretranslate.com/translate'
    ];

    let lastError;
    for (const instance of instances) {
      try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(instance, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text.substring(0, 500), // Limit text length to prevent overload
            source: 'auto',
            target: targetLang,
            format: 'text'
          }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`LibreTranslate API error: ${response.status}`);
        }

        const data = await response.json();
        return data.translatedText;
      } catch (error) {
        if (this.settings.debugMode) {
          this.log(`Failed to translate with ${instance}:`, error.message);
        }
        lastError = error;
        continue; // Try next instance
      }
    }

    throw new Error(`All LibreTranslate instances failed. Last error: ${lastError.message}`);
  }

  compressText(text) {
    // Simple compression: remove redundant words and phrases while preserving meaning
    return text
      .replace(/\b(very|really|quite|rather|pretty|somewhat|fairly)\s+/gi, '')
      .replace(/\b(I think that|I believe that|it seems that|it appears that)\s+/gi, '')
      .replace(/\b(in order to|so as to)\b/gi, 'to')
      .replace(/\b(due to the fact that|owing to the fact that)\b/gi, 'because')
      .replace(/\s+/g, ' ')
      .trim();
  }

  showLoadingIndicator(messageContainer, flagEmoji, messageId) {
    const existingTranslation = messageContainer.querySelector('.flag-translation');
    if (existingTranslation) {
      existingTranslation.remove();
    }

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'flag-translation loading';
    loadingDiv.style.fontSize = `${this.settings.bubbleSize}%`;
    
    const flagDisplay = this.settings.showFlag ? `<span class="flag-emoji">${flagEmoji}</span>` : '';
    
    loadingDiv.innerHTML = `
      <div class="flag-translation-header">
        ${flagDisplay}
        <span class="translation-status">Translating...</span>
      </div>
      <div class="translation-content">
        <div class="loading-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;

    messageContainer.appendChild(loadingDiv);
  }

  displayTranslation(messageContainer, translation, flagEmoji, messageId) {
    // Remove any existing translation or loading indicator
    const existingTranslation = messageContainer.querySelector('.flag-translation');
    if (existingTranslation) {
      existingTranslation.remove();
    }

    // Create translation element that looks like a WhatsApp message bubble
    const translationDiv = document.createElement('div');
    translationDiv.className = 'flag-translation';
    translationDiv.style.fontSize = `${this.settings.bubbleSize}%`;
    
    const flagDisplay = this.settings.showFlag ? `<span class="flag-emoji">${flagEmoji}</span>` : '';
    
    translationDiv.innerHTML = `
      <div class="flag-translation-header">
        ${flagDisplay}
        <span class="translation-status">Auto-translated</span>
        <button class="close-translation" aria-label="Close translation">×</button>
      </div>
      <div class="translation-content">${translation}</div>
    `;

    // Add close button functionality
    const closeBtn = translationDiv.querySelector('.close-translation');
    closeBtn.addEventListener('click', () => {
      translationDiv.classList.add('fade-out');
      setTimeout(() => {
        translationDiv.remove();
        this.activeTranslations.delete(messageId);
      }, 300);
    });

    // Insert translation after the message with slight delay for smooth appearance
    setTimeout(() => {
      messageContainer.appendChild(translationDiv);
    }, 100);

    // Store active translation
    this.activeTranslations.set(messageId, translationDiv);

    // Auto-hide after configured duration if enabled
    if (this.settings.autoHide) {
      setTimeout(() => {
        if (translationDiv.parentNode) {
          translationDiv.classList.add('fade-out');
          setTimeout(() => {
            if (translationDiv.parentNode) {
              translationDiv.remove();
              this.activeTranslations.delete(messageId);
            }
          }, 300);
        }
      }, this.settings.duration * 1000);
    }

    // Log successful translation
    this.log('✅ Translation displayed:', {
      flag: flagEmoji,
      original: messageContainer.textContent?.substring(0, 50) + '...',
      translated: translation.substring(0, 50) + '...'
    });
  }

  showError(messageContainer, errorMessage) {
    const existingTranslation = messageContainer.querySelector('.flag-translation');
    if (existingTranslation) {
      existingTranslation.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'flag-translation error';
    errorDiv.style.fontSize = `${this.settings.bubbleSize}%`;
    errorDiv.innerHTML = `
      <div class="flag-translation-header">
        <span class="translation-status">Error</span>
        <button class="close-translation" aria-label="Close error">×</button>
      </div>
      <div class="translation-content">${errorMessage}</div>
    `;

    const closeBtn = errorDiv.querySelector('.close-translation');
    closeBtn.addEventListener('click', () => errorDiv.remove());

    messageContainer.appendChild(errorDiv);

    // Auto-hide error after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }
}