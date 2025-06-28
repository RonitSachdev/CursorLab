// Main entry point - works in both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment
  module.exports = require('./src/cursorlab');
} else {
  // Browser environment - load the source file
  // This file should not be used directly in browser, use browser.js instead
  throw new Error('For browser usage, please use browser.js or load src/cursorlab.js directly');
} 