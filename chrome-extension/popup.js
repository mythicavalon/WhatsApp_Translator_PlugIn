/**
 * WhatsApp Flag Translator - Popup Script
 * Handles API key configuration and extension status
 */

class PopupManager {
  constructor() {
    this.apiKeyInput = document.getElementById('apiKey');
    this.saveBtn = document.getElementById('saveBtn');
    this.statusContainer = document.getElementById('status-container');
    
    this.init();
  }

  async init() {
    await this.loadSavedApiKey();
    this.setupEventListeners();
    this.checkExtensionStatus();
  }

  async loadSavedApiKey() {
    try {
      const result = await chrome.storage.sync.get(['deepLApiKey']);
      if (result.deepLApiKey) {
        // Show only the first 8 and last 4 characters for security
        const key = result.deepLApiKey;
        const maskedKey = key.length > 12 ? 
          `${key.substring(0, 8)}${'*'.repeat(key.length - 12)}${key.substring(key.length - 4)}` : 
          key;
        this.apiKeyInput.value = maskedKey;
        this.apiKeyInput.setAttribute('data-has-key', 'true');
        this.showStatus('API key configured successfully', 'success');
      } else {
        this.showStatus('Please configure your DeepL API key to start translating', 'warning');
      }
    } catch (error) {
      console.error('Error loading API key:', error);
      this.showStatus('Error loading configuration', 'error');
    }
  }

  setupEventListeners() {
    this.saveBtn.addEventListener('click', () => this.saveApiKey());
    
    this.apiKeyInput.addEventListener('input', () => {
      this.clearStatus();
      this.saveBtn.disabled = false;
    });

    this.apiKeyInput.addEventListener('focus', () => {
      if (this.apiKeyInput.getAttribute('data-has-key') === 'true') {
        this.apiKeyInput.value = '';
        this.apiKeyInput.removeAttribute('data-has-key');
        this.apiKeyInput.placeholder = 'Enter your new DeepL API key...';
      }
    });

    this.apiKeyInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.saveApiKey();
      }
    });
  }

  async saveApiKey() {
    const apiKey = this.apiKeyInput.value.trim();
    
    if (!apiKey) {
      this.showStatus('Please enter a valid API key', 'error');
      return;
    }

    if (apiKey.includes('*')) {
      this.showStatus('API key is already configured. Clear the field to enter a new one.', 'warning');
      return;
    }

    // Basic validation for DeepL API key format
    if (!this.validateApiKey(apiKey)) {
      this.showStatus('Invalid API key format. Please check your DeepL API key.', 'error');
      return;
    }

    this.saveBtn.disabled = true;
    this.saveBtn.textContent = 'Saving...';

    try {
      // Test the API key before saving
      const isValid = await this.testApiKey(apiKey);
      
      if (isValid) {
        await chrome.storage.sync.set({ deepLApiKey: apiKey });
        this.showStatus('API key saved successfully! You can now translate messages.', 'success');
        
        // Mask the key in the input
        const maskedKey = apiKey.length > 12 ? 
          `${apiKey.substring(0, 8)}${'*'.repeat(apiKey.length - 12)}${apiKey.substring(apiKey.length - 4)}` : 
          apiKey;
        this.apiKeyInput.value = maskedKey;
        this.apiKeyInput.setAttribute('data-has-key', 'true');
        
        // Notify content script about the new key
        this.notifyContentScript();
      } else {
        this.showStatus('Invalid API key. Please check your DeepL API key and try again.', 'error');
      }
    } catch (error) {
      console.error('Error saving API key:', error);
      this.showStatus('Error saving API key. Please try again.', 'error');
    } finally {
      this.saveBtn.disabled = false;
      this.saveBtn.textContent = 'Save API Key';
    }
  }

  validateApiKey(apiKey) {
    // DeepL API keys are typically 36-39 characters long and end with ":fx"
    const deepLPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}:fx$/i;
    return deepLPattern.test(apiKey) || apiKey.length >= 20; // Fallback for different formats
  }

  async testApiKey(apiKey) {
    try {
      const response = await fetch('https://api-free.deepl.com/v2/usage', {
        method: 'GET',
        headers: {
          'Authorization': `DeepL-Auth-Key ${apiKey}`
        }
      });

      return response.ok;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  async notifyContentScript() {
    try {
      const tabs = await chrome.tabs.query({ url: 'https://web.whatsapp.com/*' });
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { action: 'apiKeyUpdated' }).catch(() => {
          // Ignore errors if content script isn't ready
        });
      });
    } catch (error) {
      console.error('Error notifying content script:', error);
    }
  }

  async checkExtensionStatus() {
    try {
      const tabs = await chrome.tabs.query({ url: 'https://web.whatsapp.com/*' });
      
      if (tabs.length === 0) {
        this.showAdditionalStatus('💡 Open WhatsApp Web to start using the translator', 'info');
      } else {
        this.showAdditionalStatus('✅ WhatsApp Web detected - Extension is active', 'success');
      }
    } catch (error) {
      console.error('Error checking extension status:', error);
    }
  }

  showStatus(message, type) {
    this.statusContainer.innerHTML = `<div class="status ${type}">${message}</div>`;
  }

  showAdditionalStatus(message, type) {
    const existingStatus = this.statusContainer.querySelector('.status');
    if (existingStatus) {
      const additionalStatus = document.createElement('div');
      additionalStatus.className = `status ${type}`;
      additionalStatus.textContent = message;
      this.statusContainer.appendChild(additionalStatus);
    } else {
      this.showStatus(message, type);
    }
  }

  clearStatus() {
    this.statusContainer.innerHTML = '';
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupManager();
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'translationComplete') {
    console.log('Translation completed:', request.data);
  }
});