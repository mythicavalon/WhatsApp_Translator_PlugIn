# 🌍 WhatsApp Flag Translator

A **Cross-Browser Extension** that enables instant translation of WhatsApp Web messages by reacting with flag emojis. Simply react to any message with a flag emoji (like 🇫🇷 🇯🇵 🇩🇪) and get an instant translation displayed inline.

**Available for:** Chrome (Manifest V3) & Firefox (Manifest V2)

## ✨ Features

- **Instant Translation**: React with flag emojis to translate messages in real-time
- **40+ Languages**: Support for major world languages including English, Spanish, French, German, Japanese, Chinese, Arabic, and more
- **Cross-Browser**: Works on both Chrome and Firefox
- **Inline Display**: Translations appear directly below the original message
- **Auto-Hide**: Translations automatically disappear after 2 minutes
- **Smart Compression**: Translations are compressed ~20% while preserving meaning and tone
- **Caching**: Intelligent caching to avoid redundant API calls
- **Dark Mode**: Full support for WhatsApp Web's dark theme
- **Privacy-First**: No data collection, fully client-side processing

## 📥 Download & Install

### Quick Download (Recommended)

**Ready-to-install extensions:**

[![Chrome Extension](https://img.shields.io/badge/Chrome-Download-blue?style=for-the-badge&logo=google-chrome)](https://github.com/mythicavalon/WhatsApp_Translator_PlugIn/raw/main/release-zips/whatsapp-flag-translator-chrome.zip) [![Firefox Extension](https://img.shields.io/badge/Firefox-Download-orange?style=for-the-badge&logo=firefox)](https://github.com/mythicavalon/WhatsApp_Translator_PlugIn/raw/main/release-zips/whatsapp-flag-translator-firefox.zip)

### 🎯 Key Features & Browser Support

**🌍 Universal Translation**
- 40+ languages supported
- Instant translation with flag emoji reactions
- Smart text compression (20% shorter while preserving meaning)

**🔧 Cross-Browser Compatibility**
- ✅ **Chrome 88+** (Manifest V3)
- ✅ **Firefox 78+** (Manifest V2) 
- ✅ **Edge 88+** (Chromium-based)
- ✅ **Opera 74+** (Chromium-based)

**⚡ Performance & UX**
- Intelligent caching system
- Auto-hide after 2 minutes
- WhatsApp-native styling
- Dark mode support
- Mobile-responsive design

**🔒 Privacy & Security**
- No data collection
- Client-side processing only
- Secure API key storage
- Minimal permissions required

### 🧪 Manual Installation

#### For Chrome:
1. **Download**: Click the Chrome download button above
2. **Extract**: Unzip the downloaded file
3. **Install**: 
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)
   - Click "Load unpacked" and select the extracted folder

#### For Firefox:
1. **Download**: Click the Firefox download button above
2. **Extract**: Unzip the downloaded file
3. **Install**:
   - Open Firefox and go to `about:debugging`
   - Click "This Firefox" → "Load Temporary Add-on"
   - Select the `manifest.json` file in the extracted folder

### 🚀 Setup

#### 1. Get a DeepL API Key

1. Visit [DeepL Pro API](https://www.deepl.com/pro-api)
2. Sign up for a free account (500,000 characters/month free)
3. Get your API authentication key

#### 2. Configure Extension

1. Click the extension icon in your browser toolbar
2. Enter your DeepL API key in the popup
3. Click "Save API Key"
4. You're ready to translate!

### 🎯 How to Use

1. Open [WhatsApp Web](https://web.whatsapp.com)
2. Find a message you want to translate
3. React to it with a flag emoji (e.g., 🇫🇷 for French)
4. Watch the translation appear below the message!

## 🏳️ Supported Languages

| Flag | Language | Code | Flag | Language | Code |
|------|----------|------|------|----------|------|
| 🇺🇸 | English (US) | en-US | 🇯🇵 | Japanese | ja |
| 🇬🇧 | English (UK) | en-GB | 🇰🇷 | Korean | ko |
| 🇪🇸 | Spanish | es | 🇨🇳 | Chinese | zh |
| 🇫🇷 | French | fr | 🇷🇺 | Russian | ru |
| 🇩🇪 | German | de | 🇳🇱 | Dutch | nl |
| 🇮🇹 | Italian | it | 🇵🇱 | Polish | pl |
| 🇵🇹 | Portuguese | pt | 🇨🇿 | Czech | cs |
| 🇧🇷 | Portuguese (BR) | pt-BR | 🇸🇰 | Slovak | sk |
| 🇮🇳 | Hindi | hi | 🇭🇺 | Hungarian | hu |
| 🇸🇦 | Arabic | ar | 🇬🇷 | Greek | el |
| 🇮🇱 | Hebrew | he | 🇹🇷 | Turkish | tr |
| 🇺🇦 | Ukrainian | uk | 🇷🇴 | Romanian | ro |
| 🇹🇭 | Thai | th | 🇧🇬 | Bulgarian | bg |
| 🇻🇳 | Vietnamese | vi | 🇭🇷 | Croatian | hr |
| 🇮🇩 | Indonesian | id | 🇸🇮 | Slovenian | sl |
| 🇲🇾 | Malay | ms | 🇱🇹 | Lithuanian | lt |
| 🇵🇭 | Filipino | tl | 🇱🇻 | Latvian | lv |
| 🇸🇪 | Swedish | sv | 🇪🇪 | Estonian | et |
| 🇳🇴 | Norwegian | no | 🇫🇮 | Finnish | fi |
| 🇩🇰 | Danish | da | | | |

## 🔧 Technical Architecture

### Project Structure

```
whatsapp-flag-translator/
├── chrome-extension/          # Chrome Extension (Manifest V3)
│   ├── manifest.json
│   ├── content.js
│   ├── popup.html
│   ├── popup.js
│   ├── translator-core.js
│   ├── styles.css
│   └── icons/
├── firefox-extension/         # Firefox Extension (Manifest V2)
│   ├── manifest.json
│   ├── content.js
│   ├── popup.html
│   ├── popup.js
│   ├── translator-core.js
│   ├── styles.css
│   └── icons/
├── .github/
│   └── FUNDING.yml           # GitHub Sponsors configuration
├── README.md                  # This file
└── LICENSE                    # MIT License
```

### Key Components

- **WhatsAppTranslatorCore**: Core translation logic with 40+ language support
- **Browser-Specific Wrappers**: Chrome/Firefox API bindings
- **Consistent UI**: Identical styling and behavior across browsers
- **Self-Contained**: Each extension folder is complete and ready to install

### Browser Compatibility

- **Chrome**: 88+ (Manifest V3 support)
- **Firefox**: 78+ (WebExtensions API)
- **Edge**: 88+ (Chromium-based, use Chrome version)

### API Differences Handled

| Feature | Chrome | Firefox |
|---------|--------|---------|
| Extension API | `chrome.*` | `browser.*` |
| Manifest Version | V3 | V2 |
| Action API | `action` | `browser_action` |
| Permissions | More restrictive | More permissive |

## 🛠️ Development

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/yourusername/whatsapp-flag-translator.git
cd whatsapp-flag-translator

# Load extensions in browsers
# Chrome: Load chrome-extension/ folder in Developer Mode
# Firefox: Load firefox-extension/ folder as Temporary Add-on
```

### Ready to Use

Both extension folders are **complete and self-contained**:
- All necessary files included
- No build process required
- Ready for immediate installation
- Ready for store submission

### Testing

1. **Chrome**: Load `chrome-extension/` in Developer Mode
2. **Firefox**: Load `firefox-extension/` as temporary add-on
3. Test on WhatsApp Web with different languages
4. Verify API key management works in both browsers

## 🎨 Customization

### Adding New Languages

1. Edit `translator-core.js` in both extension folders
2. Add flag emoji and language code to `flagToLanguage` object
3. Ensure DeepL supports the target language
4. Update documentation

### Modifying Styles

1. Edit `styles.css` in both extension folders
2. Test in both light and dark modes
3. Ensure responsive design works
4. Keep both versions synchronized

### Browser-Specific Features

- **Chrome**: Modify files in `chrome-extension/` folder
- **Firefox**: Modify files in `firefox-extension/` folder
- **Shared Logic**: Update `translator-core.js` in both folders

## 🔒 Privacy & Security

- **No Data Collection**: Extension doesn't collect or store user data
- **API Key Security**: Keys are stored locally using browser's secure storage
- **Client-Side Processing**: All logic runs locally in the browser
- **Minimal Permissions**: Only requests necessary permissions
- **No External Tracking**: No analytics or tracking scripts
- **Cross-Browser Consistency**: Same privacy standards on all browsers

## 📦 Distribution

### Chrome Web Store

1. Zip the `chrome-extension/` folder
2. Upload to Chrome Web Store Developer Dashboard
3. Follow Chrome Web Store guidelines
4. Submit for review

### Firefox Add-ons (AMO)

1. Zip the `firefox-extension/` folder
2. Upload to Firefox Add-on Developer Hub
3. Follow Mozilla Add-on guidelines
4. Submit for review

### Manual Installation

Users can install directly from GitHub:
1. Download the repository
2. Choose the appropriate extension folder for their browser
3. Load as unpacked/temporary extension

## 🐛 Troubleshooting

### Common Issues

**Extension not loading:**
- Ensure you're using the correct browser folder
- Check manifest.json syntax
- Verify all referenced files exist

**Translation not working:**
- Verify API key is configured correctly
- Check browser console for errors
- Ensure DeepL API has quota remaining

**Browser-specific issues:**
- Chrome: Check Manifest V3 compliance
- Firefox: Verify WebExtensions API usage
- Cross-browser: Test shared code compatibility

## 🤝 Contributing

Contributions welcome! Please consider:

1. **Core Logic**: Update `translator-core.js` in both extension folders
2. **Browser-Specific**: Only when necessary for API differences
3. **Testing**: Test on both Chrome and Firefox
4. **Documentation**: Update README for any changes
5. **Synchronization**: Keep both extension folders in sync

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ☕ Support the Project

**Love this extension?** Help keep it maintained and growing! Your support enables continued development, new features, and maintenance.

### 💳 Donate via PayPal

[![Donate with PayPal](https://img.shields.io/badge/Donate-PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/paypalme/amalnair11)

**Why donate?**
- ✅ Keep the extension free and open source
- ✅ Support new language additions
- ✅ Fund regular WhatsApp Web compatibility updates
- ✅ Enable faster bug fixes and feature development

**Even $1 helps!** Every contribution, no matter how small, makes a difference in keeping this project alive and improving.

## 🙏 Acknowledgments

- [DeepL](https://www.deepl.com/) for providing excellent translation API
- [WhatsApp Web](https://web.whatsapp.com/) for the platform
- Chrome Extensions and Firefox WebExtensions teams
- Flag emoji designers and Unicode Consortium

---

**Made with ❤️ for the global WhatsApp community**

**Supports:** Chrome • Firefox • Edge (Chromium)
