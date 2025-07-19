// Minimal test script to verify extension loading
console.log("🚨 TEST EXTENSION LOADED!");
console.log("🚨 Current URL:", window.location.href);
console.log("🚨 User Agent:", navigator.userAgent);

// Create visible element
const testDiv = document.createElement('div');
testDiv.id = 'extension-test';
testDiv.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: red;
  color: white;
  padding: 10px;
  text-align: center;
  z-index: 999999;
  font-size: 20px;
  font-weight: bold;
`;
testDiv.textContent = '🚨 EXTENSION TEST LOADED!';

// Add to page
setTimeout(() => {
  document.body?.appendChild(testDiv) || document.documentElement?.appendChild(testDiv);
  console.log("🚨 Test banner added to page");
}, 1000);