/**
 * WhatsApp Flag Translator - Core Logic
 * Shared between Chrome and Firefox extensions
 */

class WhatsAppTranslatorCore {
  constructor(browserAPI) {
    this.browserAPI = browserAPI; // chrome or browser API
    this.deepLApiKey = null;
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
  }

  async init() {
    await this.loadApiKey();
    this.setupMutationObserver();
    this.setupMessageObserver();
    console.log('WhatsApp Flag Translator initialized');
  }

  async loadApiKey() {
    try {
      const result = await this.browserAPI.storage.sync.get(['deepLApiKey']);
      this.deepLApiKey = result.deepLApiKey;
      if (!this.deepLApiKey) {
        console.warn('DeepL API key not found. Please set it in the extension popup.');
      }
    } catch (error) {
      console.error('Error loading API key:', error);
    }
  }

  setupMutationObserver() {
    // Observer for new messages and reactions
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.checkForReactions(node);
            }
          });
        }
      });
    });

    // Start observing when the chat container is available
    this.waitForChatContainer();
  }

  waitForChatContainer() {
    const checkForContainer = () => {
      const chatContainer = document.querySelector('[data-testid="conversation-panel-messages"]') ||
                           document.querySelector('#main') ||
                           document.querySelector('[role="main"]');
      
      if (chatContainer) {
        this.observer.observe(chatContainer, {
          childList: true,
          subtree: true
        });
        console.log('Started observing chat container');
      } else {
        setTimeout(checkForContainer, 1000);
      }
    };
    checkForContainer();
  }

  setupMessageObserver() {
    // Additional observer for reaction changes on existing messages
    const reactionObserver = new MutationObserver((mutations) => {
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
    reactionObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'data-testid']
    });
  }

  checkForReactions(element) {
    // Look for reaction elements in the added/modified nodes
    const reactions = element.querySelectorAll ? 
      element.querySelectorAll('[data-testid*="reaction"], .message-reaction, [title*="reacted"]') : 
      [];
    
    reactions.forEach(reaction => this.processReaction(reaction));

    // Also check if the element itself is a reaction
    if (element.getAttribute && (
      element.getAttribute('data-testid')?.includes('reaction') ||
      element.classList?.contains('message-reaction') ||
      element.title?.includes('reacted')
    )) {
      this.processReaction(element);
    }
  }

  processReaction(reactionElement) {
    try {
      // Find flag emojis in the reaction
      const reactionText = reactionElement.textContent || reactionElement.innerText || '';
      const flagEmojis = this.extractFlagEmojis(reactionText);
      
      if (flagEmojis.length === 0) return;

      // Find the associated message
      const messageContainer = reactionElement.closest('[data-testid="msg-container"]') ||
                              reactionElement.closest('.message-in') ||
                              reactionElement.closest('.message-out') ||
                              reactionElement.closest('[role="row"]');

      if (!messageContainer) return;

      // Extract message text
      const messageText = this.extractMessageText(messageContainer);
      if (!messageText || messageText.length < 2) return;

      // Get unique message ID
      const messageId = this.getMessageId(messageContainer);
      
      // Process each flag emoji
      flagEmojis.forEach(flagEmoji => {
        const targetLanguage = this.flagToLanguage[flagEmoji];
        if (targetLanguage) {
          this.translateMessage(messageContainer, messageText, targetLanguage, flagEmoji, messageId);
        }
      });
    } catch (error) {
      console.error('Error processing reaction:', error);
    }
  }

  extractFlagEmojis(text) {
    const flagRegex = /[\u{1F1E6}-\u{1F1FF}][\u{1F1E6}-\u{1F1FF}]/gu;
    return text.match(flagRegex) || [];
  }

  extractMessageText(messageContainer) {
    // Try multiple selectors to find message text
    const textSelectors = [
      '[data-testid="msg-text"]',
      '.message-text',
      '.selectable-text',
      '[role="row"] span',
      '.copyable-text span'
    ];

    for (const selector of textSelectors) {
      const textElement = messageContainer.querySelector(selector);
      if (textElement) {
        return textElement.textContent?.trim() || textElement.innerText?.trim();
      }
    }

    // Fallback: get text from the entire container but filter out unwanted elements
    const clonedContainer = messageContainer.cloneNode(true);
    
    // Remove reaction elements, timestamps, etc.
    const unwantedSelectors = [
      '[data-testid*="reaction"]',
      '.message-reaction',
      '[data-testid="msg-time"]',
      '.message-datetime',
      '[data-testid="msg-dblcheck"]',
      '.message-status'
    ];
    
    unwantedSelectors.forEach(selector => {
      const elements = clonedContainer.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    return clonedContainer.textContent?.trim() || clonedContainer.innerText?.trim();
  }

  getMessageId(messageContainer) {
    // Try to get a unique identifier for the message
    const dataId = messageContainer.getAttribute('data-id') ||
                  messageContainer.getAttribute('data-testid') ||
                  messageContainer.id;
    
    if (dataId) return dataId;

    // Fallback: create ID based on message content and position
    const messageText = this.extractMessageText(messageContainer);
    const timestamp = messageContainer.querySelector('[data-testid="msg-time"]')?.textContent || '';
    return btoa(messageText.substring(0, 50) + timestamp).replace(/[^a-zA-Z0-9]/g, '');
  }

  async translateMessage(messageContainer, messageText, targetLanguage, flagEmoji, messageId) {
    if (!this.deepLApiKey) {
      this.showError(messageContainer, 'DeepL API key not configured');
      return;
    }

    const cacheKey = `${messageText}-${targetLanguage}`;
    
    // Check cache first
    if (this.translationCache.has(cacheKey)) {
      const cachedTranslation = this.translationCache.get(cacheKey);
      this.displayTranslation(messageContainer, cachedTranslation, flagEmoji, messageId);
      return;
    }

    // Show loading indicator
    this.showLoadingIndicator(messageContainer, flagEmoji, messageId);

    try {
      const translation = await this.callDeepLAPI(messageText, targetLanguage);
      const compressedTranslation = this.compressText(translation);
      
      // Cache the result
      this.translationCache.set(cacheKey, compressedTranslation);
      
      // Display translation
      this.displayTranslation(messageContainer, compressedTranslation, flagEmoji, messageId);
    } catch (error) {
      console.error('Translation error:', error);
      this.showError(messageContainer, 'Translation failed');
    }
  }

  async callDeepLAPI(text, targetLanguage) {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${this.deepLApiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        target_lang: targetLanguage.split('-')[0].toUpperCase()
      })
    });

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status}`);
    }

    const data = await response.json();
    return data.translations[0].text;
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
    loadingDiv.innerHTML = `
      <div class="flag-translation-header">
        <span class="flag-emoji">${flagEmoji}</span>
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

    // Create translation element
    const translationDiv = document.createElement('div');
    translationDiv.className = 'flag-translation';
    translationDiv.innerHTML = `
      <div class="flag-translation-header">
        <span class="flag-emoji">${flagEmoji}</span>
        <span class="translation-status">Translation</span>
        <button class="close-translation" aria-label="Close translation">×</button>
      </div>
      <div class="translation-content">${translation}</div>
    `;

    // Add close button functionality
    const closeBtn = translationDiv.querySelector('.close-translation');
    closeBtn.addEventListener('click', () => {
      translationDiv.remove();
      this.activeTranslations.delete(messageId);
    });

    // Insert translation after the message
    messageContainer.appendChild(translationDiv);

    // Store active translation
    this.activeTranslations.set(messageId, translationDiv);

    // Auto-hide after 120 seconds
    setTimeout(() => {
      if (translationDiv.parentNode) {
        translationDiv.classList.add('fade-out');
        setTimeout(() => {
          translationDiv.remove();
          this.activeTranslations.delete(messageId);
        }, 300);
      }
    }, 120000);
  }

  showError(messageContainer, errorMessage) {
    const existingTranslation = messageContainer.querySelector('.flag-translation');
    if (existingTranslation) {
      existingTranslation.remove();
    }

    const errorDiv = document.createElement('div');
    errorDiv.className = 'flag-translation error';
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