const canvasCircuit = function() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  let width = window.innerWidth;
  let height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  const gridSize = 30; // spacing for circuit grid
  let mousePosition = { x: width / 2, y: height / 2 };

  const circuit = {
    traces: [],
    pads: [],
    mouseRadius: 200,
    glowIntensity: 0.8
  };

  class Pad {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 3;
      this.baseColor = 'rgb(81, 162, 233)';
      this.activeColor = 'rgb(255, 77, 90)';
    }

    draw() {
      const distance = Math.hypot(this.x - mousePosition.x, this.y - mousePosition.y);
      const distanceRatio = Math.min(distance / circuit.mouseRadius, 1);
      const isActive = distance < circuit.mouseRadius;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      
      if (isActive) {
        const intensity = 1 - distanceRatio;
        ctx.fillStyle = `rgba(255, 77, 90, ${intensity * 0.9 + 0.1})`;
        
        // Glow effect
        ctx.shadowBlur = 10 * intensity;
        ctx.shadowColor = 'rgb(50, 77, 100)';
      } else {
        ctx.fillStyle = 'rgba(81, 162, 233, 0.3)';
        ctx.shadowBlur = 0;
      }
      
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  class Trace {
    constructor(startX, startY) {
      this.points = [];
      this.points.push({ x: startX, y: startY });
      
      // Generate trace path
      let currentX = startX;
      let currentY = startY;
      const segments = Math.floor(Math.random() * 4) + 2; // 2-5 segments
      
      for (let i = 0; i < segments; i++) {
        const direction = Math.floor(Math.random() * 4); // 0=right, 1=down, 2=left, 3=up
        const length = (Math.floor(Math.random() * 3) + 1) * gridSize;
        
        switch(direction) {
          case 0: currentX += length; break;
          case 1: currentY += length; break;
          case 2: currentX -= length; break;
          case 3: currentY -= length; break;
        }
        
        // Keep within bounds
        currentX = Math.max(0, Math.min(width, currentX));
        currentY = Math.max(0, Math.min(height, currentY));
        
        this.points.push({ x: currentX, y: currentY });
        
        // Random branching
        if (Math.random() > 0.7 && i < segments - 1) {
          break;
        }
      }
      
      this.width = 2;
      this.baseColor = 'rgb(81, 162, 233)';
      this.activeColor = 'rgb(255, 77, 90)';
    }

    draw() {
      if (this.points.length < 2) return;
      
      // Calculate if trace is near mouse
      let minDistance = Infinity;
      for (const point of this.points) {
        const d = Math.hypot(point.x - mousePosition.x, point.y - mousePosition.y);
        minDistance = Math.min(minDistance, d);
      }
      
      const distanceRatio = Math.min(minDistance / circuit.mouseRadius, 1);
      const isActive = minDistance < circuit.mouseRadius;
      
      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);
      
      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }
      
      if (isActive) {
        const intensity = 1 - distanceRatio;
        ctx.strokeStyle = `rgba(255, 77, 90, ${intensity * 0.8 + 0.2})`;
        ctx.lineWidth = this.width + intensity * 1.5;
        ctx.shadowBlur = 8 * intensity;
        ctx.shadowColor = 'rgb(255, 77, 90)';
      } else {
        ctx.strokeStyle = 'rgba(81, 162, 233, 0.25)';
        ctx.lineWidth = this.width;
        ctx.shadowBlur = 0;
      }
      
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }

  function initCircuit() {
    circuit.traces = [];
    circuit.pads = [];
    
    // Create grid of potential starting points
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);
    
    // Generate traces
    const numTraces = Math.floor((cols * rows) / 8);
    for (let i = 0; i < numTraces; i++) {
      const startX = Math.floor(Math.random() * cols) * gridSize;
      const startY = Math.floor(Math.random() * rows) * gridSize;
      circuit.traces.push(new Trace(startX, startY));
    }
    
    // Generate pads at grid intersections
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > 0.85) { // 15% of grid points get pads
          circuit.pads.push(new Pad(i * gridSize, j * gridSize));
        }
      }
    }
    
    // Add pads at trace endpoints
    for (const trace of circuit.traces) {
      if (trace.points.length > 0) {
        const start = trace.points[0];
        const end = trace.points[trace.points.length - 1];
        circuit.pads.push(new Pad(start.x, start.y));
        circuit.pads.push(new Pad(end.x, end.y));
      }
    }
  }

  function animate() {
    ctx.fillStyle = 'rgb(245, 245, 245)'; // whitesmoke
    ctx.fillRect(0, 0, width, height);
    
    // Draw traces first (background)
    for (const trace of circuit.traces) {
      trace.draw();
    }
    
    // Draw pads on top
    for (const pad of circuit.pads) {
      pad.draw();
    }
    
    requestAnimationFrame(animate);
  }

  window.onmousemove = function(e) {
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
  };

  window.onresize = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initCircuit();
  };

  initCircuit();
  animate();
};

canvasCircuit();