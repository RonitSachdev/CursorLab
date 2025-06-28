class CursorLab {
  constructor() {
    this.originalCursor = document.body.style.cursor || 'default';
    this.customCursorElement = null;
    this.isCustomCursorActive = false;
    this.mousePosition = { x: 0, y: 0 };
    this.targetPosition = { x: 0, y: 0 };
    this.animationFrame = null;
    
    // Trail properties
    this.trailType = 'circle';
    this.trailDelay = 0.1;
    this.trailSize = { width: 20, height: 20, radius: 10 };
    this.trailThickness = 2;
    this.trailColor = '#1abc9c';
    
    this.init();
  }

  init() {
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
    });
    
    // Inject CSS styles
    this.injectStyles();
  }

  injectStyles() {
    const styleId = 'cursorlab-styles';
    
    // Check if styles already exist
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .cursorlab-trail {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
      }
    `;
    
    document.head.appendChild(style);
  }

  // New modular API methods
  setCursorTrail(trailType) {
    this.trailType = trailType;
    if (this.isCustomCursorActive) {
      this.applyTrailStyles();
    }
    return this;
  }
  
  trailDelay(delay = 0.1) {
    this.trailDelayValue = delay;
    return this;
  }
  
  setSize(widthOrRadius, height) {
    if (height !== undefined) {
      // Two parameters: width and height
      this.trailSize.width = widthOrRadius;
      this.trailSize.height = height;
      this.trailSize.radius = Math.min(widthOrRadius, height) / 2;
    } else {
      // One parameter: radius or size
      this.trailSize.radius = widthOrRadius / 2;
      this.trailSize.width = widthOrRadius;
      this.trailSize.height = widthOrRadius;
    }
    if (this.isCustomCursorActive) {
      this.applyTrailStyles();
    }
    return this;
  }
  
  setThickness(thickness) {
    this.trailThickness = thickness;
    if (this.isCustomCursorActive) {
      this.applyTrailStyles();
    }
    return this;
  }
  
  setColor(color) {
    this.trailColor = color;
    if (this.isCustomCursorActive) {
      this.applyTrailStyles();
    }
    return this;
  }
  
  setCustomCursor(cursorType, param1, param2) {
    if (cursorType === 'crosshair') {
      // Handle crosshair with custom parameters
      const thickness = param1 || 2;
      const length = param2 || 15;
      const crosshairSvg = `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${length * 2}" height="${length * 2}" viewBox="0 0 ${length * 2} ${length * 2}">
          <line x1="${length}" y1="0" x2="${length}" y2="${length * 2}" stroke="white" stroke-width="${thickness}" />
          <line x1="0" y1="${length}" x2="${length * 2}" y2="${length}" stroke="white" stroke-width="${thickness}" />
          <line x1="${length}" y1="0" x2="${length}" y2="${length * 2}" stroke="black" stroke-width="${thickness - 1}" />
          <line x1="0" y1="${length}" x2="${length * 2}" y2="${length}" stroke="black" stroke-width="${thickness - 1}" />
        </svg>
      `)}`;
      document.body.style.cursor = `url("${crosshairSvg}") ${length} ${length}, crosshair`;
    } else if (cursorType && cursorType.startsWith('url(')) {
      // Handle image cursors
      document.body.style.cursor = cursorType;
    } else if (cursorType) {
      // Handle any CSS cursor value
      document.body.style.cursor = cursorType;
    }
    return this;
  }
  
  setCustomStyle(cssStyles) {
    if (cssStyles && typeof cssStyles === 'object') {
      // Apply styles to the body for cursor-related styling
      Object.keys(cssStyles).forEach(property => {
        if (property.startsWith('cursor') || property === 'pointer-events') {
          document.body.style[property] = cssStyles[property];
        }
      });
    } else if (typeof cssStyles === 'string') {
      // Apply CSS string to a style element
      const styleId = 'cursorlab-custom-style';
      let styleElement = document.getElementById(styleId);
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = cssStyles;
    }
    return this;
  }
  
  startTrail() {
    this.createCustomTrail();
    return this;
  }

  createCustomTrail() {
    this.removeCustomCursor();
    
    this.customCursorElement = document.createElement('div');
    this.customCursorElement.className = 'cursorlab-trail';
    
    // Apply trail styling based on current properties
    this.applyTrailStyles();
    
    document.body.appendChild(this.customCursorElement);
    
    this.isCustomCursorActive = true;
    
    // Start animation with current delay
    const animate = () => {
      if (!this.isCustomCursorActive || !this.customCursorElement) return;
      
      // Linear interpolation for smooth movement
      const delay = this.trailDelayValue || this.trailDelay;
      this.targetPosition.x += (this.mousePosition.x - this.targetPosition.x) * delay;
      this.targetPosition.y += (this.mousePosition.y - this.targetPosition.y) * delay;
      
      this.customCursorElement.style.left = this.targetPosition.x + 'px';
      this.customCursorElement.style.top = this.targetPosition.y + 'px';
      
      this.animationFrame = requestAnimationFrame(animate);
    };
    
    // Initialize position
    this.targetPosition.x = this.mousePosition.x;
    this.targetPosition.y = this.mousePosition.y;
    
    animate();
  }

  applyTrailStyles() {
    if (!this.customCursorElement) return;
    
    const { width, height, radius } = this.trailSize;
    const color = this.trailColor;
    const thickness = this.trailThickness;
    
    // Reset styles
    this.customCursorElement.style.width = '';
    this.customCursorElement.style.height = '';
    this.customCursorElement.style.background = '';
    this.customCursorElement.style.border = '';
    this.customCursorElement.style.borderRadius = '';
    this.customCursorElement.style.clipPath = '';
    this.customCursorElement.style.boxShadow = '';
    
    switch (this.trailType) {
      case 'circle':
        this.customCursorElement.style.width = (radius * 2) + 'px';
        this.customCursorElement.style.height = (radius * 2) + 'px';
        this.customCursorElement.style.border = `${thickness}px solid ${color}`;
        this.customCursorElement.style.borderRadius = '50%';
        this.customCursorElement.style.background = 'transparent';
        this.customCursorElement.style.boxShadow = `0 0 10px ${color}40`;
        break;
        
      case 'circle-filled':
        this.customCursorElement.style.width = (radius * 2) + 'px';
        this.customCursorElement.style.height = (radius * 2) + 'px';
        this.customCursorElement.style.background = color;
        this.customCursorElement.style.borderRadius = '50%';
        this.customCursorElement.style.boxShadow = `0 0 10px ${color}40`;
        break;
        
      case 'square':
        this.customCursorElement.style.width = width + 'px';
        this.customCursorElement.style.height = height + 'px';
        this.customCursorElement.style.border = `${thickness}px solid ${color}`;
        this.customCursorElement.style.background = 'transparent';
        this.customCursorElement.style.boxShadow = `0 0 10px ${color}40`;
        break;
        
      case 'square-filled':
        this.customCursorElement.style.width = width + 'px';
        this.customCursorElement.style.height = height + 'px';
        this.customCursorElement.style.background = color;
        this.customCursorElement.style.boxShadow = `0 0 10px ${color}40`;
        break;
        
      case 'triangle':
        this.customCursorElement.style.width = '0';
        this.customCursorElement.style.height = '0';
        this.customCursorElement.style.borderLeft = `${width/2}px solid transparent`;
        this.customCursorElement.style.borderRight = `${width/2}px solid transparent`;
        this.customCursorElement.style.borderBottom = `${height}px solid ${color}`;
        this.customCursorElement.style.boxShadow = `0 0 10px ${color}40`;
        break;
        
      case 'star':
        this.customCursorElement.style.width = width + 'px';
        this.customCursorElement.style.height = height + 'px';
        this.customCursorElement.style.background = color;
        this.customCursorElement.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        this.customCursorElement.style.boxShadow = `0 0 12px ${color}60`;
        break;
        
      case 'dot':
        this.customCursorElement.style.width = (radius * 2) + 'px';
        this.customCursorElement.style.height = (radius * 2) + 'px';
        this.customCursorElement.style.background = color;
        this.customCursorElement.style.borderRadius = '50%';
        this.customCursorElement.style.boxShadow = `0 0 8px ${color}60`;
        break;
    }
  }

  removeCustomCursor() {
    if (this.customCursorElement) {
      this.customCursorElement.remove();
      this.customCursorElement = null;
    }
    this.isCustomCursorActive = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  setDefault() {
    this.removeCustomCursor();
    return this;
  }

  setNormalCursor() {
    document.body.style.cursor = this.originalCursor;
    return this;
  }

  // Utility methods
  isActive() {
    return this.isCustomCursorActive;
  }

  destroy() {
    this.removeCustomCursor();
    const styleElement = document.getElementById('cursorlab-styles');
    if (styleElement) {
      styleElement.remove();
    }
    const customStyleElement = document.getElementById('cursorlab-custom-style');
    if (customStyleElement) {
      customStyleElement.remove();
    }
  }
}

// Static methods for easy usage
CursorLab.setCursorTrail = function(trailType) {
  if (!window.cursorLabInstance) {
    window.cursorLabInstance = new CursorLab();
  }
  return window.cursorLabInstance.setCursorTrail(trailType);
};

CursorLab.trailDelay = function(delay) {
  if (!window.cursorLabInstance) {
    window.cursorLabInstance = new CursorLab();
  }
  return window.cursorLabInstance.trailDelay(delay);
};

CursorLab.setSize = function(widthOrRadius, height) {
  if (!window.cursorLabInstance) {
    window.cursorLabInstance = new CursorLab();
  }
  return window.cursorLabInstance.setSize(widthOrRadius, height);
};

CursorLab.setThickness = function(thickness) {
  if (!window.cursorLabInstance) {
    window.cursorLabInstance = new CursorLab();
  }
  return window.cursorLabInstance.setThickness(thickness);
};

CursorLab.setColor = function(color) {
  if (!window.cursorLabInstance) {
    window.cursorLabInstance = new CursorLab();
  }
  return window.cursorLabInstance.setColor(color);
};

CursorLab.setCustomCursor = function(cursorType, param1, param2) {
  if (!window.cursorLabInstance) {
    window.cursorLabInstance = new CursorLab();
  }
  return window.cursorLabInstance.setCustomCursor(cursorType, param1, param2);
};

CursorLab.setCustomStyle = function(cssStyles) {
  if (!window.cursorLabInstance) {
    window.cursorLabInstance = new CursorLab();
  }
  return window.cursorLabInstance.setCustomStyle(cssStyles);
};

CursorLab.startTrail = function() {
  if (!window.cursorLabInstance) {
    window.cursorLabInstance = new CursorLab();
  }
  return window.cursorLabInstance.startTrail();
};

CursorLab.setDefault = function() {
  if (window.cursorLabInstance) {
    return window.cursorLabInstance.setDefault();
  }
};

CursorLab.setNormalCursor = function() {
  if (!window.cursorLabInstance) {
    window.cursorLabInstance = new CursorLab();
  }
  return window.cursorLabInstance.setNormalCursor();
};

CursorLab.destroy = function() {
  if (window.cursorLabInstance) {
    window.cursorLabInstance.destroy();
    window.cursorLabInstance = null;
  }
};

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  // Node.js
  module.exports = CursorLab;
} else if (typeof window !== 'undefined') {
  // Browser
  window.CursorLab = CursorLab;
} 