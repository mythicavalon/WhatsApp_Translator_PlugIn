/**
 * WhatsApp Flag Translator - Firefox Popup Script
 * Enhanced with comprehensive settings and testing capabilities
 */

// Firefox uses 'browser' API instead of 'chrome'
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

class PopupManager {
  constructor() {
    this.apiKeyInput = document.getElementById('apiKey');
    this.saveBtn = document.getElementById('saveBtn');
    this.testBtn = document.getElementById('testBtn');
    this.statusContainer = document.getElementById('status-container');
    this.extensionStatus = document.getElementById('extension-status');
    
    // Settings elements
    this.durationSlider = document.getElementById('duration');
    this.durationValue = document.getElementById('durationValue');
    this.bubbleSizeSlider = document.getElementById('bubbleSize');
    this.bubbleSizeValue = document.getElementById('bubbleSizeValue');
    this.saveSettingsBtn = document.getElementById('saveSettingsBtn');
    this.resetBtn = document.getElementById('resetBtn');
    
    // Toggle elements
    this.autoHideToggle = document.getElementById('autoHide');
    this.showFlagToggle = document.getElementById('showFlag');
    this.compressTextToggle = document.getElementById('compressText');
    this.cacheTranslationsToggle = document.getElementById('cacheTranslations');
    this.debugModeToggle = document.getElementById('debugMode');
    
    // Default settings
    this.defaultSettings = {
      duration: 120,
      bubbleSize: 100,
      autoHide: true,
      showFlag: true,
      compressText: true,
      cacheTranslations: true,
      debugMode: false
    };
    
    this.init();
  }

  async init() {
    await this.loadSavedApiKey();
    await this.loadSettings();
    this.setupEventListeners();
    this.checkExtensionStatus();
    this.updateSliderValues();
  }

  async loadSavedApiKey() {
    try {
      const result = await browserAPI.storage.sync.get(['deepLApiKey']);
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

  async loadSettings() {
    try {
      const result = await browserAPI.storage.sync.get(['translatorSettings']);
      const settings = result.translatorSettings || this.defaultSettings;
      
      // Apply settings to UI
      this.durationSlider.value = settings.duration;
      this.bubbleSizeSlider.value = settings.bubbleSize;
      this.autoHideToggle.checked = settings.autoHide;
      this.showFlagToggle.checked = settings.showFlag;
      this.compressTextToggle.checked = settings.compressText;
      this.cacheTranslationsToggle.checked = settings.cacheTranslations;
      this.debugModeToggle.checked = settings.debugMode;
      
      this.updateSliderValues();
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }

  setupEventListeners() {
    // API Key events
    this.saveBtn.addEventListener('click', () => this.saveApiKey());
    this.testBtn.addEventListener('click', () => this.testTranslation());
    
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

    // Settings events
    this.durationSlider.addEventListener('input', () => this.updateSliderValues());
    this.bubbleSizeSlider.addEventListener('input', () => this.updateSliderValues());
    this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
    this.resetBtn.addEventListener('click', () => this.resetSettings());
  }

  updateSliderValues() {
    this.durationValue.textContent = `${this.durationSlider.value}s`;
    this.bubbleSizeValue.textContent = `${this.bubbleSizeSlider.value}%`;
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

    // Basic validation - DeepL API keys are typically 36-40 characters
    if (apiKey.length < 20) {
      this.showStatus('API key seems too short. Please check your key.', 'error');
      return;
    }

    try {
      this.saveBtn.disabled = true;
      this.saveBtn.textContent = 'Saving...';
      
      await browserAPI.storage.sync.set({ deepLApiKey: apiKey });
      
      // Test the API key
      const isValid = await this.validateApiKey(apiKey);
      if (isValid) {
        // Mask the key in the input
        const maskedKey = `${apiKey.substring(0, 8)}${'*'.repeat(apiKey.length - 12)}${apiKey.substring(apiKey.length - 4)}`;
        this.apiKeyInput.value = maskedKey;
        this.apiKeyInput.setAttribute('data-has-key', 'true');
        
        this.showStatus('API key saved and validated successfully!', 'success');
        
        // Notify content script to reload API key
        this.notifyContentScript('apiKeyUpdated');
      } else {
        this.showStatus('API key saved but validation failed. Please check your key.', 'warning');
      }
    } catch (error) {
      console.error('Error saving API key:', error);
      this.showStatus('Error saving API key', 'error');
    } finally {
      this.saveBtn.disabled = false;
      this.saveBtn.textContent = 'Save API Key';
    }
  }

  async validateApiKey(apiKey) {
    try {
      const response = await fetch('https://api-free.deepl.com/v2/usage', {
        method: 'GET',
        headers: {
          'Authorization': `DeepL-Auth-Key ${apiKey}`
        }
      });
      return response.ok;
    } catch (error) {
      console.error('API validation error:', error);
      return false;
    }
  }

  async testTranslation() {
    try {
      const result = await browserAPI.storage.sync.get(['deepLApiKey']);
      if (!result.deepLApiKey) {
        this.showStatus('Please save your API key first', 'error');
        return;
      }

      this.testBtn.disabled = true;
      this.testBtn.textContent = 'Testing...';
      
      const response = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
          'Authorization': `DeepL-Auth-Key ${result.deepLApiKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          text: 'Hello, world!',
          target_lang: 'ES'
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.showStatus(`✅ Test successful! Translation: "${data.translations[0].text}"`, 'success');
      } else {
        this.showStatus('❌ Test failed. Please check your API key.', 'error');
      }
    } catch (error) {
      console.error('Test translation error:', error);
      this.showStatus('❌ Test failed. Check your internet connection.', 'error');
    } finally {
      this.testBtn.disabled = false;
      this.testBtn.textContent = 'Test Translation';
    }
  }

  async saveSettings() {
    try {
      const settings = {
        duration: parseInt(this.durationSlider.value),
        bubbleSize: parseInt(this.bubbleSizeSlider.value),
        autoHide: this.autoHideToggle.checked,
        showFlag: this.showFlagToggle.checked,
        compressText: this.compressTextToggle.checked,
        cacheTranslations: this.cacheTranslationsToggle.checked,
        debugMode: this.debugModeToggle.checked
      };

      this.saveSettingsBtn.disabled = true;
      this.saveSettingsBtn.textContent = 'Saving...';

      await browserAPI.storage.sync.set({ translatorSettings: settings });
      
      // Notify content script about settings update
      this.notifyContentScript('settingsUpdated', settings);
      
      this.showStatus('Settings saved successfully!', 'success');
    } catch (error) {
      console.error('Error saving settings:', error);
      this.showStatus('Error saving settings', 'error');
    } finally {
      this.saveSettingsBtn.disabled = false;
      this.saveSettingsBtn.textContent = 'Save Settings';
    }
  }

  async resetSettings() {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      try {
        await browserAPI.storage.sync.set({ translatorSettings: this.defaultSettings });
        await this.loadSettings();
        this.notifyContentScript('settingsUpdated', this.defaultSettings);
        this.showStatus('Settings reset to defaults', 'success');
      } catch (error) {
        console.error('Error resetting settings:', error);
        this.showStatus('Error resetting settings', 'error');
      }
    }
  }

  async notifyContentScript(action, data = null) {
    try {
      const [tab] = await browserAPI.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.url && tab.url.includes('web.whatsapp.com')) {
        await browserAPI.tabs.sendMessage(tab.id, { action, data });
      }
    } catch (error) {
      // Content script might not be loaded yet, which is fine
      console.log('Could not notify content script:', error.message);
    }
  }

  async checkExtensionStatus() {
    try {
      const [tab] = await browserAPI.tabs.query({ active: true, currentWindow: true });
      
      if (!tab || !tab.url) {
        this.updateExtensionStatus('❌ Cannot determine current tab', 'error');
        return;
      }

      if (tab.url.includes('web.whatsapp.com')) {
        this.updateExtensionStatus('✅ WhatsApp Web detected - Extension active', 'success');
        
        // Try to ping the content script
        try {
          const response = await browserAPI.tabs.sendMessage(tab.id, { action: 'ping' });
          if (response && response.status === 'active') {
            this.updateExtensionStatus('✅ Extension fully loaded and active', 'success');
          }
        } catch (error) {
          this.updateExtensionStatus('⚠️ Extension loaded but not fully initialized', 'warning');
        }
      } else {
        this.updateExtensionStatus('ℹ️ Navigate to WhatsApp Web to use the extension', 'info');
      }
    } catch (error) {
      console.error('Error checking extension status:', error);
      this.updateExtensionStatus('❌ Error checking status', 'error');
    }
  }

  updateExtensionStatus(message, type) {
    this.extensionStatus.innerHTML = `<div class="status ${type}">${message}</div>`;
  }

  showStatus(message, type) {
    this.statusContainer.innerHTML = `<div class="status ${type}">${message}</div>`;
    
    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
      setTimeout(() => {
        this.clearStatus();
      }, 3000);
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