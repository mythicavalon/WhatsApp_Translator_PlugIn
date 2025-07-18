# 🌍 WhatsApp Flag Translator

A Chrome Extension that enables instant translation of WhatsApp Web messages by reacting with flag emojis. Simply react to any message with a flag emoji (like 🇫🇷 🇯🇵 🇩🇪) and get an instant translation displayed inline.

## ✨ Features

- **Instant Translation**: React with flag emojis to translate messages in real-time
- **40+ Languages**: Support for major world languages including English, Spanish, French, German, Japanese, Chinese, Arabic, and more
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

### 2. Install the Extension

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top right toggle)
4. Click "Load unpacked" and select the extension folder
5. The extension icon should appear in your toolbar

### 3. Configure API Key

1. Click the extension icon in Chrome toolbar
2. Enter your DeepL API key in the popup
3. Click "Save API Key"
4. You're ready to translate!

### 4. Start Translating

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

## 🔧 Technical Details

### Architecture

The extension uses a clean, modular architecture:

```
whatsapp-flag-translator/
├── manifest.json          # Extension configuration
├── content.js            # Main logic & WhatsApp DOM interaction
├── styles.css            # Translation UI styling
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── icons/                # Extension icons
├── README.md             # This file
└── LICENSE               # MIT License
```

### Key Components

- **WhatsAppTranslator Class**: Main orchestrator that handles DOM observation, reaction detection, and translation management
- **MutationObserver**: Monitors WhatsApp's dynamic DOM for new reactions and messages
- **DeepL API Integration**: Secure API calls with error handling and rate limiting
- **Translation Cache**: Prevents redundant API calls for the same content
- **Smart Text Compression**: Reduces translation length while preserving meaning

### Browser Compatibility

- Chrome 88+ (Manifest V3 support)
- Edge 88+ (Chromium-based)
- Other Chromium-based browsers

### Permissions

The extension uses minimal permissions:
- `storage`: Save API key securely
- `activeTab`: Access WhatsApp Web when active
- `https://web.whatsapp.com/*`: Content script injection

## 🛠️ Development

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/yourusername/whatsapp-flag-translator.git
cd whatsapp-flag-translator

# Load in Chrome
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked" and select this folder
```

### File Structure

- `manifest.json`: Extension manifest with permissions and configuration
- `content.js`: Main content script that runs on WhatsApp Web
- `styles.css`: CSS for translation UI elements
- `popup.html/js`: Extension popup for API key configuration
- `icons/`: Extension icons (16x16, 48x48, 128x128)

### Key Functions

- `checkForReactions()`: Detects new emoji reactions
- `processReaction()`: Handles flag emoji reactions
- `translateMessage()`: Manages translation workflow
- `callDeepLAPI()`: Makes API calls to DeepL
- `displayTranslation()`: Shows translation in UI

### Testing

1. Load the extension in Chrome
2. Open WhatsApp Web
3. Send a message and react with a flag emoji
4. Verify translation appears correctly
5. Test different languages and edge cases

## 🎨 Customization

### Adding New Languages

To add support for new languages:

1. Add the flag emoji and language code to `flagToLanguage` object in `content.js`
2. Update the supported languages list in `popup.html`
3. Ensure DeepL supports the target language

### Styling Changes

Modify `styles.css` to customize:
- Translation box appearance
- Colors and fonts
- Animations and transitions
- Dark mode support

### Translation Behavior

Adjust translation settings in `content.js`:
- Auto-hide timeout (default: 120 seconds)
- Text compression rules
- Cache duration
- Error handling

## 🔒 Privacy & Security

- **No Data Collection**: Extension doesn't collect or store user data
- **API Key Security**: Keys are stored locally using Chrome's secure storage
- **Client-Side Processing**: All logic runs locally in the browser
- **Minimal Permissions**: Only requests necessary permissions
- **No External Tracking**: No analytics or tracking scripts

## 🐛 Troubleshooting

### Common Issues

**Translation not appearing:**
- Check if API key is configured correctly
- Verify DeepL API key is valid and has quota
- Ensure you're reacting with a supported flag emoji
- Check browser console for error messages

**Extension not working:**
- Refresh WhatsApp Web page
- Reload the extension in Chrome
- Check if WhatsApp Web updated (may need extension updates)

**API errors:**
- Verify DeepL API key is correct
- Check DeepL API quota usage
- Ensure internet connection is stable

### Debug Mode

Enable debug mode by opening browser console (F12) and looking for:
- `WhatsApp Flag Translator initialized`
- Translation API calls and responses
- Error messages and warnings

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Follow the existing code style and structure
2. Add comments for complex logic
3. Test thoroughly with different languages
4. Update documentation as needed
5. Ensure compatibility with latest WhatsApp Web

## 🙏 Acknowledgments

- [DeepL](https://www.deepl.com/) for providing excellent translation API
- [WhatsApp Web](https://web.whatsapp.com/) for the platform
- Chrome Extensions team for Manifest V3 documentation
- Flag emoji designers and Unicode Consortium

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue with detailed description
4. Include browser version, extension version, and error messages

---

**Made with ❤️ for the WhatsApp community**
