# 🌐 Browser Support Guide

## Supported Browsers

| Browser | Version | Manifest | Status | Installation |
|---------|---------|----------|--------|-------------|
| **Chrome** | 88+ | V3 | ✅ Full Support | Chrome Web Store / Manual |
| **Firefox** | 78+ | V2 | ✅ Full Support | Firefox Add-ons / Manual |
| **Edge** | 88+ | V3 | ✅ Full Support | Use Chrome version |
| **Safari** | - | - | ❌ Not Supported | - |
| **Opera** | 74+ | V3 | ⚠️ Untested | Use Chrome version |

## Key Differences

### Chrome Extension (Manifest V3)
- **Location**: `chrome-extension/`
- **API**: `chrome.*`
- **Permissions**: More restrictive, requires `host_permissions`
- **Action**: Uses `action` instead of `browser_action`
- **Service Workers**: Uses service workers instead of background pages
- **Installation**: Chrome Web Store or Developer Mode

### Firefox Extension (Manifest V2)
- **Location**: `firefox-extension/`
- **API**: `browser.*` (with `chrome.*` fallback)
- **Permissions**: More permissive, direct URL permissions
- **Action**: Uses `browser_action`
- **Background**: Traditional background scripts
- **Installation**: Firefox Add-ons (AMO) or Temporary Add-on

## Installation Instructions

### Chrome / Edge / Chromium-based Browsers

1. **Download**: Get the `chrome-extension/` folder
2. **Open Extensions**: Go to `chrome://extensions/` (or `edge://extensions/`)
3. **Developer Mode**: Enable "Developer mode" toggle
4. **Load Extension**: Click "Load unpacked" → Select `chrome-extension` folder
5. **Configure**: Click extension icon → Enter DeepL API key

### Firefox

1. **Download**: Get the `firefox-extension/` folder
2. **Open Debugging**: Go to `about:debugging#/runtime/this-firefox`
3. **Load Temporary**: Click "Load Temporary Add-on"
4. **Select Manifest**: Choose `manifest.json` in `firefox-extension` folder
5. **Configure**: Click extension icon → Enter DeepL API key

## Development Setup

### For Chrome Development
```bash
# Load chrome-extension/ folder in Chrome Developer Mode
# Files reference ../shared/ for easy development
```

### For Firefox Development
```bash
# Load firefox-extension/ folder as temporary add-on
# Files reference ../shared/ for easy development
```

### For Distribution
```bash
# Build both extensions
npm run build

# This copies shared files to each extension folder
# Creates self-contained packages ready for store submission
```

## API Compatibility

### Storage API
```javascript
// Chrome
chrome.storage.sync.get(['key'])
chrome.storage.sync.set({key: value})

// Firefox (same API, different namespace)
browser.storage.sync.get(['key'])
browser.storage.sync.set({key: value})
```

### Tabs API
```javascript
// Chrome
chrome.tabs.query({url: '...'})
chrome.tabs.sendMessage(tabId, message)

// Firefox
browser.tabs.query({url: '...'})
browser.tabs.sendMessage(tabId, message)
```

### Runtime API
```javascript
// Chrome
chrome.runtime.onMessage.addListener()

// Firefox
browser.runtime.onMessage.addListener()
```

## Feature Parity

| Feature | Chrome | Firefox | Notes |
|---------|--------|---------|-------|
| Flag Detection | ✅ | ✅ | Identical implementation |
| Translation | ✅ | ✅ | Same DeepL API integration |
| Caching | ✅ | ✅ | Same cache logic |
| UI Styling | ✅ | ✅ | Shared CSS file |
| Dark Mode | ✅ | ✅ | Full support both browsers |
| Auto-hide | ✅ | ✅ | Same timeout logic |
| Error Handling | ✅ | ✅ | Identical error states |
| API Key Management | ✅ | ✅ | Same storage approach |

## Testing Checklist

### Chrome Testing
- [ ] Extension loads without errors
- [ ] Popup opens and saves API key
- [ ] Flag reactions trigger translations
- [ ] Translations display correctly
- [ ] Auto-hide works after 120 seconds
- [ ] Dark mode styling works
- [ ] Error states display properly

### Firefox Testing
- [ ] Extension loads without errors
- [ ] Popup opens and saves API key
- [ ] Flag reactions trigger translations
- [ ] Translations display correctly
- [ ] Auto-hide works after 120 seconds
- [ ] Dark mode styling works
- [ ] Error states display properly

### Cross-Browser Testing
- [ ] Same functionality on both browsers
- [ ] Consistent UI appearance
- [ ] API key syncs properly
- [ ] No browser-specific bugs
- [ ] Performance is comparable

## Store Submission

### Chrome Web Store
1. Run `npm run build`
2. Zip `chrome-extension/` folder
3. Upload to Chrome Web Store Developer Dashboard
4. Fill out store listing
5. Submit for review

### Firefox Add-ons (AMO)
1. Run `npm run build`
2. Zip `firefox-extension/` folder
3. Upload to Firefox Add-on Developer Hub
4. Fill out add-on listing
5. Submit for review

## Troubleshooting

### Chrome-Specific Issues
- **Manifest V3 Errors**: Check service worker compatibility
- **Permission Errors**: Verify `host_permissions` are correct
- **API Changes**: Ensure using `chrome.action` not `chrome.browserAction`

### Firefox-Specific Issues
- **API Errors**: Check `browser.*` vs `chrome.*` usage
- **Temporary Add-on**: Remember it's removed on browser restart
- **Manifest V2**: Ensure using correct manifest format

### Common Issues
- **Shared Files**: Ensure build process copies files correctly
- **Path References**: Check `../shared/` paths in development
- **API Keys**: Verify DeepL API key works in both browsers

## Future Considerations

### Manifest V3 Migration for Firefox
- Firefox will eventually support Manifest V3
- Current V2 extension will need migration
- Shared core logic will make migration easier

### Safari Support
- Safari uses different extension system
- Would require significant additional work
- Not currently planned

### Mobile Browser Support
- Mobile browsers have limited extension support
- Focus remains on desktop browsers
- WhatsApp Web is primarily desktop-focused

---

**For technical support, see the main README.md troubleshooting section.**