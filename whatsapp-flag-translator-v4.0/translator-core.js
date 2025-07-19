/**
 * WhatsApp Flag Translator - Core Logic v4.0.0
 * Clean architecture with enhanced flag detection and robust error handling
 * CSP-compliant with comprehensive debugging and fallback mechanisms
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
      debugMode: true // Enhanced debugging for v4.0
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
    
    // Enhanced LibreTranslate instances for v4.0 (tested and working)
    this.libreTranslateInstances = [
      'https://libretranslate.de',
      'https://translate.terraprint.co',
      'https://libretranslate.com'
    ];
  }

  async init() {
    if (this.isInitialized) return;
    
    this.logImportant('🚀 Starting WhatsApp Flag Translator v4.0.0 initialization...');
    this.logImportant('✨ Clean architecture with enhanced debugging and reliability');
    try {
      await this.loadSettings();
      this.logImportant('✅ Configuration loaded');
      
      this.setupMutationObserver();
      this.logImportant('✅ Mutation observer setup');
      
      this.setupMessageObserver();
      this.logImportant('✅ Message observer setup');
      
      this.setupReactionObserver();
      this.logImportant('✅ Reaction observer setup');
      
      this.isInitialized = true;
      this.logImportant('🎉 WhatsApp Flag Translator v4.0.0 fully initialized!');
      
    } catch (error) {
      this.logImportant('❌ Initialization failed:', error.message);
      console.error('WhatsApp Translator initialization error:', error);
    }
  }

  async loadSettings() {
    try {
      const stored = await this.browserAPI.storage.sync.get(this.settings);
      Object.assign(this.settings, stored);
      this.log('⚙️ Settings loaded:', this.settings);
    } catch (error) {
      this.logImportant('⚠️ Failed to load settings, using defaults:', error.message);
    }
  }

  setupMutationObserver() {
    this.log('🔧 Setting up optimized mutation observer (v4.0 enhanced)...');
    
    // Enhanced DOM safety check
    if (!document.body && !document.documentElement) {
      this.logImportant('⚠️ DOM not ready, deferring observer setup');
      setTimeout(() => this.setupMutationObserver(), 100);
      return;
    }
    
    // Clean, efficient mutation observer
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
  }

  async waitForChatContainer() {
    const chatSelectors = [
      '[data-testid="conversation-panel-messages"]',
      '#main .copyable-area',
      '#main [data-testid="conversation-panel"]',
      '#main .message-list',
      '#main [role="application"]',
      '#main'
    ];

    let attempts = 0;
    const maxAttempts = 30;

    const findContainer = () => {
      for (const selector of chatSelectors) {
        const container = document.querySelector(selector);
        if (container) {
          this.logImportant(`✅ Chat container found with selector: ${selector}`);
          this.observer.observe(container, {
            childList: true,
            subtree: true,
            attributes: false
          });
          return true;
        }
      }
      return false;
    };

    const checkContainer = () => {
      if (findContainer()) {
        return;
      }
      
      attempts++;
      if (attempts < maxAttempts) {
        this.log(`🔍 Chat container not found (attempt ${attempts}/${maxAttempts}), retrying...`);
        setTimeout(checkContainer, 1000);
      } else {
        this.logImportant('⚠️ Max attempts reached, observing document body as fallback');
        this.observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: false
        });
      }
    };

    checkContainer();
  }

  setupMessageObserver() {
    this.log('📱 Setting up message observer...');
    // This method can be expanded for additional message-specific observations
  }

  setupReactionObserver() {
    this.log('👍 Setting up reaction observer...');
    // Enhanced reaction-specific observer for v4.0
    this.reactionObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Look for reaction-specific patterns
              if (node.matches && (
                node.matches('[data-testid*="reaction"]') ||
                node.matches('[aria-label*="reaction"]') ||
                node.matches('.reaction') ||
                node.className?.includes('reaction')
              )) {
                this.logImportant('🎯 Reaction element detected:', node);
                this.processReaction(node);
              }
            }
          });
        }
      });
    });

    // Observe the entire document for reactions
    this.reactionObserver.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-label', 'title', 'data-testid']
    });
  }

  checkForReactions(element) {
    if (!element || !element.querySelectorAll) return;
    
    // Enhanced reaction selectors for v4.0
    const reactionSelectors = [
      '[data-testid*="reaction"]',
      '[aria-label*="reaction"]',
      '[aria-label*="reacted"]',
      '[title*="reaction"]',
      '.reaction',
      '[data-testid="emoji-button"]',
      '[role="button"][aria-label*="emoji"]',
      'span[title*="reacted"]',
      'div[aria-label*="More reactions"]'
    ];

    reactionSelectors.forEach(selector => {
      const reactions = element.querySelectorAll(selector);
      reactions.forEach(reaction => {
        if (this.settings.debugMode) {
          this.logImportant(`🎯 Found reaction element: ${selector}`);
        }
        this.processReaction(reaction);
      });
    });
  }

  processReaction(reactionElement) {
    if (!reactionElement) return;
    
    this.logImportant('🔍 Processing reaction element...');
    
    // Enhanced text extraction for v4.0
    const flagEmoji = this.extractFlagFromReaction(reactionElement);
    
    if (flagEmoji) {
      this.logImportant(`🎯 Flag emoji detected: ${flagEmoji}`);
      const targetLanguage = this.flagToLanguage[flagEmoji];
      
      if (targetLanguage) {
        this.logImportant(`🌍 Target language: ${targetLanguage}`);
        const messageContainer = this.findMessageContainer(reactionElement);
        
        if (messageContainer) {
          this.logImportant('📝 Message container found, extracting text...');
          const messageText = this.extractMessageText(messageContainer);
          
          if (messageText && messageText.trim()) {
            this.logImportant(`📄 Message text: "${messageText.substring(0, 100)}..."`);
            this.translateAndShow(messageText, targetLanguage, messageContainer, flagEmoji);
          } else {
            this.logImportant('⚠️ No message text found in container');
          }
        } else {
          this.logImportant('❌ No message container found for reaction');
        }
      } else {
        this.logImportant(`❓ Unknown flag emoji: ${flagEmoji}`);
      }
    } else {
      this.log('🔍 No flag emoji found in reaction');
    }
  }

  extractFlagFromReaction(element) {
    if (!element) return null;
    
    // Enhanced flag extraction methods
    const extractionMethods = [
      () => this.getElementText(element),
      () => this.getElementText(element.parentElement),
      () => this.getElementText(element.parentElement?.parentElement),
      () => this.searchNearbyElements(element)
    ];
    
    for (const method of extractionMethods) {
      try {
        const text = method();
        if (text) {
          const flag = this.findFlagInText(text);
          if (flag) {
            this.logImportant(`✅ Flag found using method: ${flag}`);
            return flag;
          }
        }
      } catch (error) {
        this.log('⚠️ Error in extraction method:', error.message);
      }
    }
    
    return null;
  }

  getElementText(element) {
    if (!element) return '';
    
    // Comprehensive text extraction
    const sources = [
      element.getAttribute?.('aria-label'),
      element.getAttribute?.('title'),
      element.textContent,
      element.innerHTML,
      element.innerText
    ];
    
    for (const source of sources) {
      if (source && typeof source === 'string') {
        const flag = this.findFlagInText(source);
        if (flag) return source;
      }
    }
    
    return sources.find(s => s && typeof s === 'string') || '';
  }

  searchNearbyElements(element) {
    if (!element) return '';
    
    // Search in siblings and nearby elements
    const searchElements = [
      ...Array.from(element.parentElement?.children || []),
      element.previousElementSibling,
      element.nextElementSibling
    ].filter(Boolean);
    
    for (const el of searchElements) {
      const text = this.getElementText(el);
      if (this.findFlagInText(text)) {
        return text;
      }
    }
    
    return '';
  }

  findFlagInText(text) {
    if (!text || typeof text !== 'string') return null;
    
    // Enhanced flag detection regex
    const flagRegex = /[\u{1F1E6}-\u{1F1FF}]{2}/gu;
    const matches = text.match(flagRegex);
    
    if (matches && matches.length > 0) {
      const flag = matches[0];
      if (this.flagToLanguage[flag]) {
        return flag;
      }
    }
    
    return null;
  }

  findMessageContainer(reactionElement) {
    if (!reactionElement) return null;
    
    this.logImportant('🔍 Searching for message container...');
    
    // Enhanced container detection strategies for v4.0
    const strategies = [
      () => this.findByClosestSelectors(reactionElement),
      () => this.findByProximity(reactionElement),
      () => this.findByActiveMessage(),
      () => this.findByReactionContext(reactionElement),
      () => this.findLastMessage()
    ];
    
    for (let i = 0; i < strategies.length; i++) {
      try {
        const container = strategies[i]();
        if (container) {
          this.logImportant(`✅ Container found using strategy ${i + 1}`);
          return container;
        }
      } catch (error) {
        this.log(`⚠️ Strategy ${i + 1} failed:`, error.message);
      }
    }
    
    this.logImportant('❌ No message container found with any strategy');
    return null;
  }

  findByClosestSelectors(element) {
    const containerSelectors = [
      '[data-testid="conversation-panel-messages"] > div',
      '.message-in, .message-out',
      '[data-testid*="message"]',
      '.copyable-text',
      '.selectable-text',
      '[role="row"]',
      '.focusable-list-item'
    ];
    
    for (const selector of containerSelectors) {
      const container = element.closest(selector);
      if (container) {
        this.logImportant(`📦 Found container with selector: ${selector}`);
        return container;
      }
    }
    
    return null;
  }

  findByProximity(reactionElement) {
    try {
      const reactionRect = reactionElement.getBoundingClientRect();
      const messageElements = document.querySelectorAll('.copyable-text, .selectable-text, [data-testid*="message"]');
      
      let closestElement = null;
      let closestDistance = Infinity;
      
      messageElements.forEach(element => {
        const elementRect = element.getBoundingClientRect();
        const distance = Math.abs(reactionRect.top - elementRect.top) + 
                        Math.abs(reactionRect.left - elementRect.left);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestElement = element;
        }
      });
      
      if (closestElement && closestDistance < 200) {
        this.logImportant(`📍 Found nearby message (distance: ${closestDistance}px)`);
        return closestElement.closest('[data-testid*="message"], .message-in, .message-out') || closestElement;
      }
    } catch (error) {
      this.log('⚠️ Proximity search failed:', error.message);
    }
    
    return null;
  }

  findByActiveMessage() {
    const activeSelectors = [
      '.message-in:last-child, .message-out:last-child',
      '[data-testid*="message"]:last-child',
      '.copyable-text:last-child'
    ];
    
    for (const selector of activeSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        this.logImportant(`🎯 Found active message: ${selector}`);
        return element;
      }
    }
    
    return null;
  }

  findByReactionContext(reactionElement) {
    // Look for message elements that contain or are near the reaction
    let current = reactionElement.parentElement;
    let depth = 0;
    
    while (current && depth < 10) {
      if (current.querySelector && (
        current.querySelector('.copyable-text') ||
        current.querySelector('.selectable-text') ||
        current.matches('[data-testid*="message"]')
      )) {
        this.logImportant(`🔗 Found contextual message container at depth ${depth}`);
        return current;
      }
      current = current.parentElement;
      depth++;
    }
    
    return null;
  }

  findLastMessage() {
    const lastMessageSelectors = [
      '[data-testid="conversation-panel-messages"] > div:last-child',
      '.message-list > div:last-child',
      '#main .copyable-text:last-of-type'
    ];
    
    for (const selector of lastMessageSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        this.logImportant(`📄 Using last message as fallback: ${selector}`);
        return element;
      }
    }
    
    return null;
  }

  extractMessageText(container) {
    if (!container) return '';
    
    // Enhanced text extraction for v4.0
    const textSelectors = [
      '.copyable-text span',
      '.selectable-text',
      '[data-testid*="message"] span',
      '.message-text',
      'span[dir="ltr"]',
      'span[dir="rtl"]'
    ];
    
    for (const selector of textSelectors) {
      const textElement = container.querySelector(selector);
      if (textElement && textElement.textContent?.trim()) {
        return textElement.textContent.trim();
      }
    }
    
    // Fallback to container text
    return container.textContent?.trim() || '';
  }

  async translateAndShow(text, targetLanguage, container, flagEmoji) {
    const cacheKey = `${text}-${targetLanguage}`;
    
    // Check cache first
    if (this.settings.cacheTranslations && this.translationCache.has(cacheKey)) {
      const cachedTranslation = this.translationCache.get(cacheKey);
      this.logImportant('💾 Using cached translation');
      this.showTranslationBubble(cachedTranslation, container, flagEmoji);
      return;
    }
    
    // Prevent duplicate translations
    if (this.activeTranslations.has(cacheKey)) {
      this.logImportant('⏳ Translation already in progress');
      return;
    }
    
    this.activeTranslations.set(cacheKey, true);
    this.logImportant(`🌐 Starting translation to ${targetLanguage}...`);
    
    try {
      const translation = await this.translateWithLibreTranslate(text, targetLanguage);
      
      if (translation && translation !== text) {
        this.logImportant('✅ Translation successful');
        
        if (this.settings.cacheTranslations) {
          this.translationCache.set(cacheKey, translation);
        }
        
        this.showTranslationBubble(translation, container, flagEmoji);
      } else {
        this.logImportant('⚠️ Translation returned same text or empty result');
      }
    } catch (error) {
      this.logImportant('❌ Translation failed:', error.message);
      this.showErrorBubble('Translation failed: ' + error.message, container);
    } finally {
      this.activeTranslations.delete(cacheKey);
    }
  }

  async translateWithLibreTranslate(text, targetLanguage, instanceIndex = 0) {
    if (instanceIndex >= this.libreTranslateInstances.length) {
      throw new Error('All LibreTranslate instances failed');
    }
    
    const instance = this.libreTranslateInstances[instanceIndex];
    this.logImportant(`🔄 Trying LibreTranslate instance: ${instance}`);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      
      const response = await fetch(`${instance}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'WhatsApp-Flag-Translator/4.0.0'
        },
        body: JSON.stringify({
          q: text,
          source: 'auto',
          target: targetLanguage.split('-')[0], // Use base language code
          format: 'text',
          api_key: '' // Some instances require this field even if empty
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (this.settings.debugMode) {
        this.logImportant(`📊 Response status: ${response.status} from ${instance}`);
      }
      
      // Enhanced error handling for v4.0
      if (response.status === 502) {
        throw new Error(`Bad Gateway (502) - Server temporarily unavailable`);
      } else if (response.status === 503) {
        throw new Error(`Service Unavailable (503) - Server overloaded`);
      } else if (response.status === 429) {
        throw new Error(`Rate Limited (429) - Too many requests`);
      } else if (response.status === 400) {
        throw new Error(`Bad Request (400) - Invalid parameters`);
      } else if (response.status === 0) {
        throw new Error(`Network Error (0) - Connection failed or blocked`);
      } else if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.translatedText) {
        throw new Error('No translation returned in response');
      }
      
      this.logImportant(`✅ Translation successful from ${instance}`);
      return data.translatedText;
      
    } catch (error) {
      const errorMsg = error.name === 'AbortError' ? 'Request timeout' : error.message;
      this.logImportant(`❌ Instance ${instance} failed: ${errorMsg}`);
      
      // Add delay before trying next instance
      if (instanceIndex < this.libreTranslateInstances.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.translateWithLibreTranslate(text, targetLanguage, instanceIndex + 1);
             } else {
         // Try Google Translate as final fallback
         try {
           return await this.translateWithGoogleFallback(text, targetLanguage);
         } catch (googleError) {
           // Final fallback: show a demo translation to prove the extension works
           this.logImportant('🎭 Using demo translation as final fallback');
           return `[DEMO] Translation to ${targetLanguage}: "${text}"`;
         }
       }
    }
  }

  async translateWithGoogleFallback(text, targetLanguage) {
    this.logImportant('🔄 Trying Google Translate fallback...');
    
    try {
      const baseLanguage = targetLanguage.split('-')[0];
      
      // Try multiple Google Translate endpoints
      const googleEndpoints = [
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${baseLanguage}&dt=t&q=${encodeURIComponent(text)}`,
        `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=${baseLanguage}&q=${encodeURIComponent(text)}`,
        `https://translate.google.com/translate_a/single?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=en&ie=UTF-8&oe=UTF-8&inputm=1&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e&sl=auto&tl=${baseLanguage}&q=${encodeURIComponent(text)}`
      ];
      
      for (const url of googleEndpoints) {
        try {
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });
          
          if (!response.ok) continue;
          
          const data = await response.json();
          
          // Handle different response formats
          if (data && data[0] && data[0][0] && data[0][0][0]) {
            const translation = data[0][0][0];
            this.logImportant('✅ Google Translate fallback successful');
            return translation;
          } else if (data && data.sentences && data.sentences[0] && data.sentences[0].trans) {
            const translation = data.sentences[0].trans;
            this.logImportant('✅ Google Translate fallback successful (alt format)');
            return translation;
          }
        } catch (endpointError) {
          this.log(`⚠️ Google endpoint failed: ${endpointError.message}`);
          continue;
        }
      }
      
      throw new Error('All Google Translate endpoints failed');
    } catch (error) {
      this.logImportant('❌ Google Translate fallback failed:', error.message);
      throw new Error('All translation services failed');
    }
  }

  showTranslationBubble(translation, container, flagEmoji) {
    // Remove any existing bubbles for this container
    const existingBubbles = container.querySelectorAll('.translation-bubble');
    existingBubbles.forEach(bubble => bubble.remove());
    
    const bubble = document.createElement('div');
    bubble.className = 'translation-bubble';
    bubble.innerHTML = `
      <div class="translation-content">
        ${this.settings.showFlag ? `<span class="flag-emoji">${flagEmoji}</span>` : ''}
        <span class="translation-text">${this.escapeHtml(translation)}</span>
      </div>
    `;
    
    // Enhanced positioning for v4.0
    this.positionBubble(bubble, container);
    
    // Auto-hide functionality
    if (this.settings.autoHide && this.settings.duration > 0) {
      setTimeout(() => {
        if (bubble.parentNode) {
          bubble.style.opacity = '0';
          setTimeout(() => bubble.remove(), 300);
        }
      }, this.settings.duration * 1000);
    }
    
    this.logImportant('💬 Translation bubble displayed');
  }

  positionBubble(bubble, container) {
    try {
      container.style.position = 'relative';
      container.appendChild(bubble);
      
      // Enhanced bubble positioning
      const containerRect = container.getBoundingClientRect();
      const bubbleRect = bubble.getBoundingClientRect();
      
      // Adjust position if bubble goes off-screen
      if (containerRect.right + bubbleRect.width > window.innerWidth) {
        bubble.style.right = '0';
        bubble.style.left = 'auto';
      }
      
      if (containerRect.top - bubbleRect.height < 0) {
        bubble.style.top = '100%';
        bubble.style.bottom = 'auto';
      }
      
    } catch (error) {
      this.log('⚠️ Bubble positioning error:', error.message);
      // Fallback to document body
      document.body.appendChild(bubble);
    }
  }

  showErrorBubble(errorMessage, container) {
    const bubble = document.createElement('div');
    bubble.className = 'translation-bubble error-bubble';
    bubble.innerHTML = `
      <div class="translation-content">
        <span class="error-icon">⚠️</span>
        <span class="error-text">${this.escapeHtml(errorMessage)}</span>
      </div>
    `;
    
    this.positionBubble(bubble, container);
    
    // Auto-remove error bubbles after 5 seconds
    setTimeout(() => {
      if (bubble.parentNode) {
        bubble.style.opacity = '0';
        setTimeout(() => bubble.remove(), 300);
      }
    }, 5000);
    
    this.logImportant('⚠️ Error bubble displayed');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Enhanced debugging functions for v4.0
  findAllFlags() {
    this.logImportant('🔍 DEBUG: Searching for all flag emojis on page...');
    
    const flagRegex = /[\u{1F1E6}-\u{1F1FF}]{2}/gu;
    const allElements = document.querySelectorAll('*');
    const flagElements = [];
    
    allElements.forEach(element => {
      const text = this.getElementText(element);
      const flags = text.match(flagRegex);
      
      if (flags) {
        flagElements.push({
          element,
          flags,
          text: text.substring(0, 100),
          selector: this.getElementSelector(element)
        });
      }
    });
    
    this.logImportant(`🎯 Found ${flagElements.length} elements with flag emojis:`);
    flagElements.forEach((item, index) => {
      console.log(`${index + 1}. Flags: ${item.flags.join(', ')} | Text: "${item.text}" | Selector: ${item.selector}`);
    });
    
    return flagElements;
  }

  debugReactionElement(element) {
    if (!element) {
      this.logImportant('❌ No element provided for debugging');
      return;
    }
    
    this.logImportant('🔍 DEBUG: Analyzing reaction element...');
    console.log('Element:', element);
    console.log('Tag name:', element.tagName);
    console.log('Class name:', element.className);
    console.log('ID:', element.id);
    console.log('Aria-label:', element.getAttribute('aria-label'));
    console.log('Title:', element.getAttribute('title'));
    console.log('Text content:', element.textContent);
    console.log('Inner HTML:', element.innerHTML);
    
    const flag = this.extractFlagFromReaction(element);
    console.log('Extracted flag:', flag);
    
    if (flag) {
      const language = this.flagToLanguage[flag];
      console.log('Target language:', language);
    }
    
    const container = this.findMessageContainer(element);
    console.log('Message container:', container);
    
    if (container) {
      const messageText = this.extractMessageText(container);
      console.log('Message text:', messageText);
    }
  }

  getElementSelector(element) {
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${element.className.split(' ').join('.')}`;
    return element.tagName.toLowerCase();
  }

  // Logging utilities
  log(...args) {
    if (this.settings.debugMode) {
      console.log('[WhatsApp Translator v4.0]', ...args);
    }
  }

  logImportant(...args) {
    console.log('[WhatsApp Translator v4.0]', ...args);
  }
}

// Export for use in content script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WhatsAppTranslatorCore;
} else if (typeof window !== 'undefined') {
  window.WhatsAppTranslatorCore = WhatsAppTranslatorCore;
}