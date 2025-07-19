/**
 * WhatsApp Flag Translator - Firefox Popup Script
 * Enhanced with comprehensive settings and testing capabilities
 */

// Firefox uses 'browser' API instead of 'chrome'
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

class PopupManager {
  constructor() {
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
    await this.loadSettings();
    this.setupEventListeners();
    this.checkExtensionStatus();
    this.updateSliderValues();
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
    // Test button
    this.testBtn.addEventListener('click', () => this.testTranslation());



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



  async testTranslation() {
    try {
      this.testBtn.disabled = true;
      this.testBtn.textContent = 'Testing...';
      
      // Test LibreTranslate with multiple instances
      const instances = [
        'https://libretranslate.de/translate',
        'https://translate.terraprint.co/translate',
        'https://libretranslate.com/translate'
      ];

      let success = false;
      let translation = '';

      for (const instance of instances) {
        try {
          const response = await fetch(instance, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              q: 'Hello, world!',
              source: 'en',
              target: 'es',
              format: 'text'
            })
          });

          if (response.ok) {
            const data = await response.json();
            translation = data.translatedText;
            success = true;
            break;
          }
        } catch (error) {
          console.log(`Failed to test with ${instance}:`, error);
          continue;
        }
      }

      if (success) {
        this.showStatus(`✅ LibreTranslate test successful! Translation: "${translation}"`, 'success');
      } else {
        this.showStatus('❌ Test failed. All LibreTranslate instances are unavailable.', 'error');
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