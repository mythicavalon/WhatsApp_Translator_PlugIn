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

## 🚀 Quick Start

### 1. Get a DeepL API Key

1. Visit [DeepL Pro API](https://www.deepl.com/pro-api)
2. Sign up for a free account (500,000 characters/month free)
3. Get your API authentication key

### 2. Choose Your Browser

#### For Chrome:
1. Download the `chrome-extension/` folder
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top right toggle)
4. Click "Load unpacked" and select the `chrome-extension` folder

#### For Firefox:
1. Download the `firefox-extension/` folder
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox" → "Load Temporary Add-on"
4. Select the `manifest.json` file in the `firefox-extension` folder

### 3. Build Extensions (For Distribution)

```bash
# Build both extensions for distribution
node build.js build

# Clean build files (for development)
node build.js clean
```

### 4. Configure API Key

1. Click the extension icon in your browser toolbar
2. Enter your DeepL API key in the popup
3. Click "Save API Key"
4. You're ready to translate!

### 5. Start Translating

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
│   └── icons/
├── firefox-extension/         # Firefox Extension (Manifest V2)
│   ├── manifest.json
│   ├── content.js
│   ├── popup.html
│   ├── popup.js
│   └── icons/
├── shared/                    # Shared code between browsers
│   ├── translator-core.js     # Core translation logic
│   └── styles.css            # Shared styles
├── build.js                   # Build script
├── create-icons.html          # Icon generator
├── README.md                  # This file
├── INSTALL.md                 # Installation guide
└── LICENSE                    # MIT License
```

### Key Components

- **WhatsAppTranslatorCore**: Shared translation logic
- **Browser-Specific Wrappers**: Chrome/Firefox API bindings
- **Shared Styles**: Consistent UI across browsers
- **Build System**: Automated file copying and manifest updates

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

# For development, use the shared folder structure
# Chrome: Load chrome-extension/ folder
# Firefox: Load firefox-extension/ folder

# For distribution, build first
node build.js build
```

### Development vs Production

**Development Mode:**
- Files reference `../shared/` for easy editing
- Changes to shared files affect both extensions
- Use `node build.js clean` to maintain this structure

**Production Mode:**
- Files are copied to each extension folder
- Self-contained extension packages
- Use `node build.js build` before distribution

### Testing

1. **Chrome**: Load `chrome-extension/` in Developer Mode
2. **Firefox**: Load `firefox-extension/` as temporary add-on
3. Test on WhatsApp Web with different languages
4. Verify API key management works in both browsers

## 🎨 Customization

### Adding New Languages

1. Edit `shared/translator-core.js`
2. Add flag emoji and language code to `flagToLanguage` object
3. Ensure DeepL supports the target language
4. Update documentation

### Modifying Styles

1. Edit `shared/styles.css`
2. Changes apply to both browsers
3. Test in both light and dark modes
4. Ensure responsive design works

### Browser-Specific Features

- **Chrome**: Modify `chrome-extension/content.js` or `chrome-extension/popup.js`
- **Firefox**: Modify `firefox-extension/content.js` or `firefox-extension/popup.js`

## 🔒 Privacy & Security

- **No Data Collection**: Extension doesn't collect or store user data
- **API Key Security**: Keys are stored locally using browser's secure storage
- **Client-Side Processing**: All logic runs locally in the browser
- **Minimal Permissions**: Only requests necessary permissions
- **No External Tracking**: No analytics or tracking scripts
- **Cross-Browser Consistency**: Same privacy standards on all browsers

## 📦 Distribution

### Chrome Web Store

1. Run `node build.js build`
2. Zip the `chrome-extension/` folder
3. Upload to Chrome Web Store Developer Dashboard
4. Follow Chrome Web Store guidelines

### Firefox Add-ons (AMO)

1. Run `node build.js build`
2. Zip the `firefox-extension/` folder
3. Upload to Firefox Add-on Developer Hub
4. Follow Mozilla Add-on guidelines

### Manual Installation

Users can install directly from GitHub:
1. Download the repository
2. Follow installation instructions in `INSTALL.md`
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

1. **Shared Code**: Changes to core logic go in `shared/`
2. **Browser-Specific**: Only when necessary for API differences
3. **Testing**: Test on both Chrome and Firefox
4. **Documentation**: Update README and INSTALL.md
5. **Build Process**: Ensure `build.js` handles new files

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DeepL](https://www.deepl.com/) for providing excellent translation API
- [WhatsApp Web](https://web.whatsapp.com/) for the platform
- Chrome Extensions and Firefox WebExtensions teams
- Flag emoji designers and Unicode Consortium

---

**Made with ❤️ for the global WhatsApp community**

**Supports:** Chrome • Firefox • Edge (Chromium)
