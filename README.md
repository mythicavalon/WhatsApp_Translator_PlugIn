# 🌍 WhatsApp Flag Translator v2.0

A **Cross-Browser Extension** that enables instant translation of WhatsApp Web messages by reacting with flag emojis. Simply react to any message with a flag emoji (like 🇫🇷 🇯🇵 🇩🇪) and get an instant translation displayed inline.

**Available for:** Chrome (Manifest V3) & Firefox (Manifest V2)

## ✨ New in v2.0

- **🎛️ Comprehensive Settings**: Configurable duration, bubble size, and feature toggles
- **🎯 Enhanced Flag Detection**: Improved reaction detection with multiple fallback strategies
- **⚙️ User Preferences**: Toggle auto-hide, flag display, text compression, and caching
- **🧪 Debug Mode**: Optional console logging for troubleshooting
- **🎨 Better UI**: Polished popup interface with real-time testing
- **📊 Status Monitoring**: Extension health and API connectivity indicators
- **🔄 Settings Sync**: Preferences sync across browser sessions

## ✨ Core Features

- **Instant Translation**: React with flag emojis to translate messages in real-time
- **40+ Languages**: Support for major world languages including English, Spanish, French, German, Japanese, Chinese, Arabic, and more
- **Cross-Browser**: Works on both Chrome and Firefox
- **Inline Display**: Translations appear directly below the original message
- **Configurable Duration**: Auto-hide after 30 seconds to 5 minutes (user configurable)
- **Smart Compression**: Translations can be compressed ~20% while preserving meaning and tone
- **Intelligent Caching**: Avoid redundant API calls with smart caching system
- **Dark Mode**: Full support for WhatsApp Web's dark theme
- **Privacy-First**: No data collection, fully client-side processing

## 📥 Download & Install

### Quick Download (Latest v2.0)

**Ready-to-install extensions:**

[![Chrome Extension](https://img.shields.io/badge/Chrome-Download%20v2.0-blue?style=for-the-badge&logo=google-chrome)](https://github.com/mythicavalon/WhatsApp_Translator_PlugIn/raw/main/release-zips/whatsapp-flag-translator-chrome-v2.0.zip) [![Firefox Extension](https://img.shields.io/badge/Firefox-Download%20v2.0-orange?style=for-the-badge&logo=firefox)](https://github.com/mythicavalon/WhatsApp_Translator_PlugIn/raw/main/release-zips/whatsapp-flag-translator-firefox-v2.0.zip)

### 🎯 Key Features & Browser Support

**🌍 Universal Translation**
- 40+ languages supported
- Instant translation with flag emoji reactions
- Configurable text compression (0-20% shorter while preserving meaning)
- Smart caching system for improved performance

**🔧 Cross-Browser Compatibility**
- ✅ **Chrome 88+** (Manifest V3)
- ✅ **Firefox 78+** (Manifest V2) 
- ✅ **Edge 88+** (Chromium-based)
- ✅ **Opera 74+** (Chromium-based)

**⚡ Performance & UX**
- Configurable auto-hide duration (30s - 5min)
- Adjustable bubble sizes (80% - 120%)
- Enhanced reaction detection algorithms
- WhatsApp-native styling with smooth animations
- Full dark mode support
- Mobile-responsive design

**🔒 Privacy & Security**
- No data collection
- Client-side processing only
- Secure API key storage with masking
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
4. **New**: Test your API key with the "Test Translation" button
5. Configure your preferences in the Settings section
6. You're ready to translate!

### 🎯 How to Use

1. Open [WhatsApp Web](https://web.whatsapp.com)
2. Find a message you want to translate
3. React to it with a flag emoji (e.g., 🇫🇷 for French)
4. Watch the translation appear below the message!
5. **New**: Translations will auto-hide after your configured duration

## ⚙️ Settings & Configuration

### Translation Settings
- **Auto-hide Duration**: 30 seconds to 5 minutes
- **Bubble Size**: 80% to 120% of normal size
- **Auto-hide**: Toggle automatic hiding of translations
- **Show Flag**: Display flag emoji in translation header
- **Compress Text**: Enable 20% text compression
- **Cache Translations**: Store translations for faster repeated access
- **Debug Mode**: Enable console logging for troubleshooting

### API Configuration
- **API Key Management**: Secure storage with input masking
- **API Testing**: Built-in translation test functionality
- **Connection Status**: Real-time API connectivity monitoring

## 🏳️ Supported Languages

| Flag | Language | Code | Flag | Language | Code |
|------|----------|------|------|----------|------|
| 🇺🇸 | English (US) | en-US | 🇯🇵 | Japanese | ja |
| 🇬🇧 | English (UK) | en-GB | 🇰🇷 | Korean | ko |
| 🇪🇸 | Spanish | es | 🇨🇳 | Chinese | zh |
| 🇫🇷 | French | fr | 🇷🇺 | Russian | ru |
| 🇩🇪 | German | de | 🇳🇱 | Dutch | nl |
| 🇮🇹 | Italian | it | 🇸🇪 | Swedish | sv |
| 🇵🇹 | Portuguese | pt | 🇳🇴 | Norwegian | no |
| 🇧🇷 | Portuguese (BR) | pt-BR | 🇩🇰 | Danish | da |
| 🇵🇱 | Polish | pl | 🇫🇮 | Finnish | fi |
| 🇨🇿 | Czech | cs | 🇭🇺 | Hungarian | hu |
| 🇸🇰 | Slovak | sk | 🇬🇷 | Greek | el |
| 🇹🇷 | Turkish | tr | 🇺🇦 | Ukrainian | uk |
| 🇷🇴 | Romanian | ro | 🇧🇬 | Bulgarian | bg |
| 🇭🇷 | Croatian | hr | 🇸🇮 | Slovenian | sl |
| 🇱🇹 | Lithuanian | lt | 🇱🇻 | Latvian | lv |
| 🇪🇪 | Estonian | et | 🇮🇳 | Hindi | hi |
| 🇹🇭 | Thai | th | 🇻🇳 | Vietnamese | vi |
| 🇮🇩 | Indonesian | id | 🇲🇾 | Malay | ms |
| 🇵🇭 | Filipino | tl | 🇸🇦 | Arabic | ar |
| 🇦🇪 | Arabic (UAE) | ar | 🇪🇬 | Arabic (Egypt) | ar |
| 🇮🇱 | Hebrew | he | | | |

## 🧪 Testing

We've included a comprehensive testing guide to ensure the extension works perfectly:

📋 **[Testing Guide](TESTING_GUIDE.md)** - Complete end-to-end testing instructions

The testing guide covers:
- Core functionality tests
- Settings configuration verification
- Advanced detection scenarios  
- Error handling validation
- UI/UX integration checks
- Performance and caching tests
- Cross-browser compatibility
- Security and privacy verification

## 🔧 Technical Details

### Architecture
- **Manifest V3** (Chrome) and **Manifest V2** (Firefox) compatible
- **Content Script Injection** for WhatsApp Web integration
- **Mutation Observer** for real-time reaction detection
- **Storage API** for settings and caching
- **Message Passing** for popup-content script communication

### Enhanced Detection System
- Multiple fallback strategies for reaction detection
- Improved message container identification
- Better handling of different message types (text, media, quotes)
- Robust flag emoji extraction using Unicode ranges

### Performance Optimizations
- Smart caching system to reduce API calls
- Debounced reaction processing
- Efficient DOM observation with targeted selectors
- Memory leak prevention with proper cleanup

## 🐛 Troubleshooting

### Common Issues

**Extension not working:**
1. Ensure you're on WhatsApp Web (web.whatsapp.com)
2. Check that your DeepL API key is correctly configured
3. Try refreshing the WhatsApp Web page
4. Enable Debug Mode in settings to see console logs

**Translations not appearing:**
1. Verify you're using flag emojis (🇫🇷, 🇪🇸, etc.)
2. Check that the message contains translatable text
3. Ensure your API key hasn't exceeded its quota
4. Test your API connection using the "Test Translation" button

**Settings not saving:**
1. Check browser permissions for the extension
2. Try resetting settings to defaults
3. Ensure you have sufficient storage permissions

### Debug Mode
Enable Debug Mode in the extension settings to see detailed console logs that can help identify issues.

## 🔒 Privacy & Security

- **No Data Collection**: The extension doesn't collect or store any personal data
- **Local Processing**: All operations happen locally in your browser
- **Secure API Storage**: API keys are stored securely using browser storage APIs
- **Minimal Permissions**: Only requests necessary permissions for WhatsApp Web access
- **No Analytics**: No tracking, analytics, or telemetry

## 📝 Changelog

### v2.0.0 (Latest)
- ✨ **New**: Comprehensive settings interface with duration, bubble size, and feature toggles
- ✨ **New**: Enhanced flag detection with multiple fallback strategies
- ✨ **New**: API key testing and validation functionality
- ✨ **New**: Debug mode with optional console logging
- ✨ **New**: Extension status monitoring and health checks
- ✨ **New**: Settings sync across browser sessions
- 🎨 **Improved**: Polished UI with better animations and hover effects
- 🎨 **Improved**: Better error handling and user feedback
- 🐛 **Fixed**: Various edge cases in message detection
- 🐛 **Fixed**: Memory leaks and performance issues
- 📚 **Added**: Comprehensive testing guide

### v1.0.0
- Initial release with basic flag translation functionality
- Cross-browser support (Chrome & Firefox)
- 40+ language support
- Basic caching system
- WhatsApp Web integration

## 🤝 Contributing

Contributions are welcome! Please feel free to:

1. **Report Bugs**: Use the issue tracker to report any problems
2. **Suggest Features**: Share ideas for new functionality
3. **Submit PRs**: Contribute code improvements
4. **Test**: Help test the extension across different scenarios

### Development Setup

1. Clone the repository
2. Make changes to the appropriate extension folder
3. Test using the manual installation method
4. Run the testing guide scenarios
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **DeepL API** for providing excellent translation services
- **WhatsApp Web** for the platform integration
- **Contributors** who have helped improve the extension
- **Users** who provide feedback and bug reports

## 📞 Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Testing**: Use the comprehensive [Testing Guide](TESTING_GUIDE.md)
- **Documentation**: Check this README for detailed information

---

**Made with ❤️ for the WhatsApp Web community**

*Translate the world, one flag emoji at a time! 🌍*
