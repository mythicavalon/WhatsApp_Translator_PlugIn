# 🚀 Installation Guide

## Prerequisites

1. **Chrome Browser** (version 88 or higher)
2. **DeepL API Key** (free tier available)

## Step 1: Get Your DeepL API Key

1. Visit [DeepL Pro API](https://www.deepl.com/pro-api)
2. Click "Sign up for free"
3. Create an account and verify your email
4. Go to your account settings and find the "API" section
5. Copy your authentication key (it looks like: `12345678-1234-1234-1234-123456789abc:fx`)

## Step 2: Download the Extension

### Option A: Clone from GitHub
```bash
git clone https://github.com/yourusername/whatsapp-flag-translator.git
cd whatsapp-flag-translator
```

### Option B: Download ZIP
1. Click the "Code" button on GitHub
2. Select "Download ZIP"
3. Extract the ZIP file to a folder

## Step 3: Generate Icons (Optional)

If you want to generate fresh icons:

1. Open `create-icons.html` in your browser
2. Click "Generate Icons"
3. Download all three icon sizes
4. Save them in the `icons/` folder as:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`

## Step 4: Install in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the extension folder
5. The extension should appear in your extensions list

## Step 5: Configure API Key

1. Click the extension icon in your Chrome toolbar
2. Enter your DeepL API key in the popup
3. Click "Save API Key"
4. You should see a success message

## Step 6: Test the Extension

1. Open [WhatsApp Web](https://web.whatsapp.com)
2. Send a message (or find an existing one)
3. React to the message with a flag emoji (e.g., 🇫🇷)
4. The translation should appear below the message!

## Troubleshooting

### Extension not showing up
- Make sure you enabled "Developer mode"
- Check that all files are in the correct folder
- Refresh the extensions page

### Translation not working
- Verify your API key is correct
- Check your DeepL API quota
- Make sure you're using a supported flag emoji
- Open browser console (F12) to check for errors

### WhatsApp Web not detected
- Refresh the WhatsApp Web page
- Make sure you're on `https://web.whatsapp.com`
- Check that the extension is enabled

## Supported Flag Emojis

The extension supports 40+ languages. Here are some popular ones:

- 🇺🇸 English
- 🇪🇸 Spanish  
- 🇫🇷 French
- 🇩🇪 German
- 🇮🇹 Italian
- 🇯🇵 Japanese
- 🇰🇷 Korean
- 🇨🇳 Chinese
- 🇷🇺 Russian
- 🇵🇹 Portuguese
- 🇳🇱 Dutch
- 🇵🇱 Polish
- 🇮🇳 Hindi
- 🇸🇦 Arabic

## Usage Tips

1. **Multiple Languages**: You can react with multiple flag emojis to get translations in different languages
2. **Auto-Hide**: Translations automatically hide after 2 minutes
3. **Manual Close**: Click the × button to close a translation manually
4. **Caching**: The extension remembers translations to save API calls

## Updating the Extension

1. Download the latest version
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Or remove and re-add the extension

## Uninstalling

1. Go to `chrome://extensions/`
2. Find "WhatsApp Flag Translator"
3. Click "Remove"
4. Confirm the removal

## Privacy Notice

This extension:
- ✅ Stores your API key locally in Chrome
- ✅ Only sends message text to DeepL for translation
- ✅ Does not collect or store personal data
- ✅ Works entirely client-side
- ❌ No tracking or analytics

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. Open browser console (F12) for error messages
3. Create an issue on GitHub with details
4. Include your Chrome version and error messages

---

**Happy translating! 🌍**