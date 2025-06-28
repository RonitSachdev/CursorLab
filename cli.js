#!/usr/bin/env node

const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log(`
🎯 CursorLab - Custom Cursor Trails & Effects
=============================================

✨ INSTALLATION:
   npm install cursorlab

🚀 BASIC USAGE:
   const CursorLab = require('cursorlab');
   
   // Basic trail
   CursorLab.setCursorTrail('circle').startTrail();

📚 MODULAR API METHODS:
   
   🎨 Trail Configuration:
   setCursorTrail(type)        - Set trail type ('circle', 'square', 'star', etc.)
   setSize(radius)            - Set size (single param for radius/size)
   setSize(width, height)     - Set dimensions (width, height)
   setThickness(thickness)    - Set border thickness for hollow shapes
   setColor(color)           - Set trail color (hex, rgb, named colors)
   trailDelay(delay)         - Set follow speed (0.05 = fast, 0.3 = slow)
   startTrail()              - Begin trail animation

   🖱️ Cursor Control:
   setCustomCursor(type)              - Set CSS cursor ('grab', 'copy', etc.)
   setCustomCursor('crosshair', t, l) - Custom crosshair (thickness, length)
   setCustomCursor('url(...), auto')  - Image cursor
   setCustomStyle(styles)             - Apply custom CSS

   🎮 Management:
   setDefault()              - Remove trail
   setNormalCursor()        - Reset cursor to default
   destroy()                - Clean up everything

🔗 METHOD CHAINING EXAMPLES:

   // Simple trail with custom properties
   CursorLab.setCursorTrail('circle')
            .setColor('#ff0000')
            .setSize(20)
            .setThickness(3)
            .startTrail();

   // Complex combination
   CursorLab.setCursorTrail('star')
            .setColor('#9b59b6')
            .setSize(25)
            .trailDelay(0.08)
            .setCustomCursor('grab')
            .startTrail();

   // Create new trail (replaces existing)
   CursorLab.setCursorTrail('circle').setColor('red').startTrail();

🎨 AVAILABLE TRAIL TYPES:
   • 'circle'        - Hollow circle
   • 'circle-filled' - Filled circle
   • 'square'        - Hollow square
   • 'square-filled' - Filled square
   • 'triangle'      - Triangle shape
   • 'star'          - Star shape
   • 'dot'           - Small filled circle

🎯 CURSOR TYPES:
   • Built-in CSS: 'grab', 'copy', 'none', 'pointer', etc.
   • Custom crosshair: setCustomCursor('crosshair', thickness, length)
   • Image cursors: setCustomCursor('url(path/to/image.png), auto')

🌐 BROWSER USAGE:
   <script src="node_modules/cursorlab/browser.js"></script>
   <script>
     CursorLab.setCursorTrail('circle').setColor('blue').startTrail();
   </script>

💡 TIPS:
   • Use trailDelay(0.1) or higher for better performance
   • Call destroy() when removing the trail to prevent memory leaks
   • Image cursors work best with PNG files under 32x32 pixels

📖 DOCUMENTATION:
   GitHub: https://github.com/RonitSachdev/cursorlab
   npm: https://www.npmjs.com/package/cursorlab
`);
}

function showVersion() {
  const packageJson = require('./package.json');
  console.log(`CursorLab v${packageJson.version}`);
}

function showUsage() {
  console.log(`
Usage: cursorlab <command>

Commands:
  help     Show detailed help and examples
  version  Show version number
  
Examples:
  cursorlab help
  cursorlab version
`);
}

// Handle commands
switch (command) {
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  case 'version':
  case '--version':
  case '-v':
    showVersion();
    break;
  default:
    if (command) {
      console.log(`Unknown command: ${command}\n`);
    }
    showUsage();
    break;
} 