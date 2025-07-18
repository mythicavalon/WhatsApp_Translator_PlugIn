#!/usr/bin/env node

/**
 * Build script for WhatsApp Flag Translator
 * Copies shared files to both Chrome and Firefox extension directories
 */

const fs = require('fs');
const path = require('path');

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log(`Copied: ${src} -> ${dest}`);
}

function buildExtensions() {
  console.log('🚀 Building WhatsApp Flag Translator extensions...\n');

  // Copy shared files to Chrome extension
  console.log('📦 Building Chrome extension...');
  copyFile('shared/translator-core.js', 'chrome-extension/translator-core.js');
  copyFile('shared/styles.css', 'chrome-extension/styles.css');

  // Copy shared files to Firefox extension
  console.log('📦 Building Firefox extension...');
  copyFile('shared/translator-core.js', 'firefox-extension/translator-core.js');
  copyFile('shared/styles.css', 'firefox-extension/styles.css');

  // Update manifest files to use local files instead of ../shared/
  console.log('🔧 Updating manifest files...');
  
  // Chrome manifest
  const chromeManifest = JSON.parse(fs.readFileSync('chrome-extension/manifest.json', 'utf8'));
  chromeManifest.content_scripts[0].js = ['translator-core.js', 'content.js'];
  chromeManifest.content_scripts[0].css = ['styles.css'];
  chromeManifest.web_accessible_resources[0].resources = ['styles.css'];
  fs.writeFileSync('chrome-extension/manifest.json', JSON.stringify(chromeManifest, null, 2));
  
  // Firefox manifest
  const firefoxManifest = JSON.parse(fs.readFileSync('firefox-extension/manifest.json', 'utf8'));
  firefoxManifest.content_scripts[0].js = ['translator-core.js', 'content.js'];
  firefoxManifest.content_scripts[0].css = ['styles.css'];
  firefoxManifest.web_accessible_resources = ['styles.css'];
  fs.writeFileSync('firefox-extension/manifest.json', JSON.stringify(firefoxManifest, null, 2));

  console.log('\n✅ Build complete!');
  console.log('\nNext steps:');
  console.log('1. Generate icons using create-icons.html');
  console.log('2. Place icons in chrome-extension/icons/ and firefox-extension/icons/');
  console.log('3. Load chrome-extension/ in Chrome Developer Mode');
  console.log('4. Load firefox-extension/ in Firefox Developer Mode');
}

function cleanBuild() {
  console.log('🧹 Cleaning build files...');
  
  const filesToClean = [
    'chrome-extension/translator-core.js',
    'chrome-extension/styles.css',
    'firefox-extension/translator-core.js',
    'firefox-extension/styles.css'
  ];

  filesToClean.forEach(file => {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`Removed: ${file}`);
    }
  });

  // Restore original manifest files
  const chromeManifest = JSON.parse(fs.readFileSync('chrome-extension/manifest.json', 'utf8'));
  chromeManifest.content_scripts[0].js = ['../shared/translator-core.js', 'content.js'];
  chromeManifest.content_scripts[0].css = ['../shared/styles.css'];
  chromeManifest.web_accessible_resources[0].resources = ['../shared/styles.css'];
  fs.writeFileSync('chrome-extension/manifest.json', JSON.stringify(chromeManifest, null, 2));
  
  const firefoxManifest = JSON.parse(fs.readFileSync('firefox-extension/manifest.json', 'utf8'));
  firefoxManifest.content_scripts[0].js = ['../shared/translator-core.js', 'content.js'];
  firefoxManifest.content_scripts[0].css = ['../shared/styles.css'];
  firefoxManifest.web_accessible_resources = ['../shared/styles.css'];
  fs.writeFileSync('firefox-extension/manifest.json', JSON.stringify(firefoxManifest, null, 2));

  console.log('✅ Clean complete!');
}

// Command line interface
const command = process.argv[2];

switch (command) {
  case 'build':
    buildExtensions();
    break;
  case 'clean':
    cleanBuild();
    break;
  default:
    console.log('Usage: node build.js [build|clean]');
    console.log('  build - Copy shared files and prepare extensions for distribution');
    console.log('  clean - Remove build files and restore development state');
    break;
}