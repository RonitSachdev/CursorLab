# CursorLab 🎯

<div align="center">
         
![cursorlab_sample](https://github.com/user-attachments/assets/552bcd54-5d03-45f8-8f35-3a021a8304de)

*Interactive cursor trails with real-time parameter controls*

</div>

A powerful, lightweight, and modular JavaScript library for creating custom mouse cursors and trail effects in web applications. Transform your user experience with smooth-following trails and customizable cursor styles.

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Size](https://img.shields.io/badge/size-~8KB-orange.svg)

## ✨ Features

- **🎨 Modular API**: Each property has its own method for maximum flexibility
- **🖱️ Multiple Trail Types**: Circle, Square, Triangle, Star, Dot (filled and hollow variants)
- **🎯 Custom Cursors**: Built-in cursors, crosshair generator, and image cursor support
- **⚙️ Full Customization**: Size, thickness, color, delay, and custom CSS styling
- **🌟 Overlapping Trails**: Create multiple trails that run simultaneously
- **🔗 Method Chaining**: Combine multiple effects effortlessly
- **🚀 Performance Optimized**: Smooth 60fps animations with requestAnimationFrame
- **💻 CLI Help**: Built-in command-line help with `cursorlab help`
- **📱 Universal Compatibility**: Works in browsers and Node.js environments
- **💼 Zero Dependencies**: Lightweight and self-contained

## 🚀 Quick Start

### Installation

```bash
npm install cursorlab

# Try the interactive demo!
cursorlab demo
```

### Basic Usage

```html
<!-- Include in HTML -->
<script src="node_modules/cursorlab/browser.js"></script>

<script>
// Set a circle trail with custom properties
CursorLab.setCursorTrail('circle')
         .setColor('#ff0000')
         .setSize(20)
         .setThickness(3)
         .trailDelay(0.1)
         .startTrail();
</script>
```

```javascript
// Node.js / ES6 Module
const CursorLab = require('cursorlab');

// Create instance for advanced control
const cursor = new CursorLab();
cursor.setCursorTrail('star')
      .setColor('#00ff00')
      .setSize(25)
      .startTrail();
```

## 📚 Modular API

CursorLab uses a modular approach where each property has its own method. This allows for maximum flexibility and clear, readable code.

### Core Methods

#### `setCursorTrail(type)`
Set the trail shape that follows your cursor.

**Available Types:**
- `'circle'` - Hollow circle
- `'circle-filled'` - Filled circle  
- `'square'` - Hollow square
- `'square-filled'` - Filled square
- `'triangle'` - Triangle shape
- `'star'` - Star shape
- `'dot'` - Small filled circle

```javascript
CursorLab.setCursorTrail('circle');
CursorLab.setCursorTrail('star');
```

#### `setSize(widthOrRadius, height)`
Control the trail dimensions.

```javascript
// Single parameter - sets radius for circles/dots, or size for squares/stars
CursorLab.setSize(20);

// Two parameters - sets width and height independently
CursorLab.setSize(30, 20); // 30px wide, 20px tall
```

#### `setThickness(thickness)`
Set border thickness for hollow shapes.

```javascript
CursorLab.setThickness(1); // Thin border
CursorLab.setThickness(5); // Thick border
```

#### `setColor(color)`
Set the trail color using any CSS color format.

```javascript
CursorLab.setColor('#ff0000');        // Hex
CursorLab.setColor('red');            // Named color
CursorLab.setColor('rgb(255,0,0)');   // RGB
CursorLab.setColor('hsl(0,100%,50%)'); // HSL
```

#### `trailDelay(delay)`
Control how quickly the trail follows the cursor (0.01 = fast, 0.3 = slow).

```javascript
CursorLab.trailDelay(0.05); // Fast following
CursorLab.trailDelay(0.1);  // Normal speed
CursorLab.trailDelay(0.3);  // Slow following
```

#### `startTrail()`
Begin the trail animation. Call this after setting up your trail properties.

```javascript
CursorLab.setCursorTrail('circle').setColor('blue').startTrail();
```

### Cursor Methods

#### `setCustomCursor(cursorType, param1, param2)`
Change the actual cursor appearance.

**Built-in Cursors:**
```javascript
CursorLab.setCustomCursor('grab');
CursorLab.setCustomCursor('copy');
CursorLab.setCustomCursor('none'); // Hide cursor
```

**Custom Crosshair:**
```javascript
// setCustomCursor('crosshair', thickness, length)
CursorLab.setCustomCursor('crosshair', 2, 15);
CursorLab.setCustomCursor('crosshair', 4, 25); // Thicker, longer
```

**Image Cursors:**
```javascript
// Use any image as cursor
CursorLab.setCustomCursor('url(path/to/cursor.png), auto');
CursorLab.setCustomCursor('url(data:image/png;base64,iVBOR...), auto');
```

#### `setCustomStyle(cssStyles)`
Apply advanced CSS styling.

**Object Format:**
```javascript
CursorLab.setCustomStyle({
    cursor: 'none',
    'pointer-events': 'auto'
});
```

**CSS String Format:**
```javascript
CursorLab.setCustomStyle(`
    .cursorlab-trail {
        filter: blur(2px) !important;
        opacity: 0.7 !important;
        animation: pulse 1s infinite !important;
    }
    @keyframes pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
    }
`);
```

## 🔗 Method Chaining

All methods return `this`, enabling powerful method chaining:

```javascript
// Basic chaining
CursorLab.setCursorTrail('circle')
         .setColor('#ff0000')
         .setSize(20)
         .startTrail();

// Complex combination
CursorLab.setCursorTrail('star')
         .setColor('#9b59b6')
         .setSize(25)
         .setThickness(3)
         .trailDelay(0.08)
         .setCustomCursor('grab')
         .setCustomStyle({cursor: 'none'})
         .startTrail();

// Multiple effects
const cursor = new CursorLab();
cursor.setCursorTrail('triangle')
      .setColor('#e74c3c')
      .setSize(30, 25)      // width, height
      .trailDelay(0.12)
      .setCustomCursor('crosshair', 3, 20)
      .startTrail();

// Create new trail (replaces any existing trail)
CursorLab.setCursorTrail('circle').setColor('#ff0000').setSize(25).startTrail();
```

## 🎮 Control Methods

```javascript
// Remove all trails (keeps cursor changes)
CursorLab.setDefault();

// Reset cursor to original
CursorLab.setNormalCursor();

// Remove everything and clean up
CursorLab.destroy();

// Check if any trail is active
if (CursorLab.isActive()) {
    console.log('Trails are running');
}
```

## 🎨 Complete Examples

### Rainbow Star with Custom Cursor
```javascript
CursorLab.setCursorTrail('star')
         .setColor('#ff00ff')
         .setSize(30)
         .trailDelay(0.06)
         .setCustomCursor('crosshair', 2, 18)
         .setCustomStyle(`
             .cursorlab-trail {
                 animation: rainbow 2s infinite !important;
             }
             @keyframes rainbow {
                 0% { filter: hue-rotate(0deg); }
                 100% { filter: hue-rotate(360deg); }
             }
         `)
         .startTrail();
```

### Spinning Square Trail
```javascript
CursorLab.setCursorTrail('square')
         .setColor('#f39c12')
         .setSize(22)
         .setThickness(4)
         .trailDelay(0.15)
         .setCustomStyle(`
             .cursorlab-trail {
                 animation: spin 1s linear infinite !important;
             }
             @keyframes spin {
                 from { transform: translate(-50%, -50%) rotate(0deg); }
                 to { transform: translate(-50%, -50%) rotate(360deg); }
             }
         `)
         .startTrail();
```

### Variable Sizes and Speeds
```javascript
// Small fast dot
CursorLab.setCursorTrail('dot')
         .setSize(8)
         .setColor('#1abc9c')
         .trailDelay(0.03)
         .startTrail();

// Large slow circle  
CursorLab.setCursorTrail('circle')
         .setSize(40)
         .setThickness(2)
         .setColor('#e74c3c')
         .trailDelay(0.25)
         .startTrail();
```

## 🏗️ Instance vs Static Usage

### Static Methods (Global Instance)
```javascript
// Uses a global instance automatically
CursorLab.setCursorTrail('circle').setColor('red').startTrail();
CursorLab.setDefault(); // Reset the trail
```

### Instance Methods (Independent Control)
```javascript
// Create separate instances for independent control
const cursor1 = new CursorLab();
const cursor2 = new CursorLab();

cursor1.setCursorTrail('circle').setColor('blue').startTrail();
cursor2.setCursorTrail('star').setColor('red').startTrail();
```

## 📋 API Reference

### Trail Configuration
| Method | Parameters | Description |
|--------|------------|-------------|
| `setCursorTrail(type)` | `type: string` | Set trail shape |
| `setSize(size)` | `size: number` | Set uniform size |
| `setSize(width, height)` | `width: number, height: number` | Set dimensions |
| `setThickness(thickness)` | `thickness: number` | Set border thickness |
| `setColor(color)` | `color: string` | Set trail color |
| `trailDelay(delay)` | `delay: number` | Set follow speed |
| `startTrail()` | - | Begin trail animation |

### Cursor Control
| Method | Parameters | Description |
|--------|------------|-------------|
| `setCustomCursor(type)` | `type: string` | Set CSS cursor |
| `setCustomCursor('crosshair', thickness, length)` | `thickness: number, length: number` | Custom crosshair |
| `setCustomCursor(imageUrl)` | `imageUrl: string` | Image cursor |
| `setCustomStyle(styles)` | `styles: object\|string` | Custom CSS |

### Control Methods
| Method | Parameters | Description |
|--------|------------|-------------|
| `setDefault()` | - | Remove trail |
| `setNormalCursor()` | - | Reset cursor |
| `destroy()` | - | Clean up everything |
| `isActive()` | - | Check if active |

## 💻 CLI Help

CursorLab includes a built-in command-line interface for quick reference:

```bash
# After installation
npm install cursorlab

# Get comprehensive help
cursorlab help

# Open interactive demo in browser
cursorlab demo

# Check version
cursorlab version
```

The CLI provides:
- Complete API documentation
- Method chaining examples
- Browser and Node.js examples
- Performance tips and best practices
- **Interactive demo with live controls** - `cursorlab demo`

Perfect for quick reference while coding!

## 🔧 Customization Tips

### Performance Optimization
- Use `trailDelay(0.1)` or higher for better performance on slower devices
- Avoid very complex CSS animations in `setCustomStyle()`
- Call `destroy()` when removing the trail to prevent memory leaks

### Visual Effects
- Combine trails with CSS filters: `blur()`, `drop-shadow()`, `brightness()`
- Use CSS animations for rotating, pulsing, or color-changing effects
- Create visual depth with different colors and delays

### Browser Compatibility
- Image cursors work best with PNG files under 32x32 pixels
- Use data URLs for embedded cursor images
- Test crosshair cursors across different browsers for consistency

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [npm package](https://www.npmjs.com/package/cursorlab)
- [GitHub repository](https://github.com/RonitSachdev/cursorlab)
- [Demo](demo.html)

---
