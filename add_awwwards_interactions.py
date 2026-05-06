import re

file_path = "/Users/vishal/Downloads/portfolio/vishal_portfolio_ULTIMATE.html"
with open(file_path, "r") as f:
    content = f.read()

# 1. Inject Canvas and Cursor HTML right after <body>
canvas_html = """<body>
  <canvas id="bg-canvas"></canvas>
  <div class="cursor-dot"></div>
  <div class="cursor-outline"></div>"""
content = re.sub(r"<body>", canvas_html, content, count=1)

# 2. Inject CSS
css_injection = """    /* AWWWARDS INTERACTIONS CSS */
    #bg-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: -1;
      pointer-events: none;
      opacity: 0.4;
    }
    
    .cursor-dot, .cursor-outline {
      position: fixed;
      top: 0;
      left: 0;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    }
    
    .cursor-dot {
      width: 8px;
      height: 8px;
      background-color: var(--em);
      transition: width 0.2s, height 0.2s, background-color 0.2s;
    }
    
    .cursor-outline {
      width: 32px;
      height: 32px;
      border: 1px solid var(--em);
      transition: width 0.15s ease-out, height 0.15s ease-out, background-color 0.15s ease-out, border-color 0.15s ease-out;
    }
    
    /* Hover state for links */
    .cursor-outline.hover-state {
      width: 60px;
      height: 60px;
      background-color: rgba(255, 255, 255, 0.1);
      border-color: transparent;
      mix-blend-mode: difference;
    }
    
    .magnetic {
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      display: inline-block;
    }
"""

content = re.sub(r"(<style>)", r"\1\n" + css_injection, content, count=1)

# 3. Add magnetic class to interactive elements
content = re.sub(r'class="btn btn-solid"', r'class="btn btn-solid magnetic"', content)
content = re.sub(r'class="btn btn-outline"', r'class="btn btn-outline magnetic"', content)
content = re.sub(r'class="nav-link"', r'class="nav-link magnetic"', content)
content = re.sub(r'id="chat-bubble"', r'id="chat-bubble" class="magnetic"', content)

# 4. Inject JS before </body>
js_injection = """
  <!-- AWWWARDS INTERACTIONS JS -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      // 1. Custom Cursor Logic
      const cursorDot = document.querySelector('.cursor-dot');
      const cursorOutline = document.querySelector('.cursor-outline');
      let cursorX = window.innerWidth / 2;
      let cursorY = window.innerHeight / 2;
      let outlineX = cursorX;
      let outlineY = cursorY;
      
      window.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';
      });

      // Smooth outline trailing
      function animateCursor() {
        if (isPerformanceMode) {
          outlineX += (cursorX - outlineX) * 0.2;
          outlineY += (cursorY - outlineY) * 0.2;
          cursorOutline.style.left = outlineX + 'px';
          cursorOutline.style.top = outlineY + 'px';
          requestAnimationFrame(animateCursor);
        } else {
          cursorDot.style.display = 'none';
          cursorOutline.style.display = 'none';
          document.body.style.cursor = 'auto';
        }
      }
      if(isPerformanceMode) animateCursor();

      // Cursor hover states
      document.querySelectorAll('a, button, .magnetic').forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover-state'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover-state'));
      });

      // 2. Magnetic Elements Logic
      document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
          if (!isPerformanceMode) return;
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distanceX = e.clientX - centerX;
          const distanceY = e.clientY - centerY;
          // Pull effect strength
          el.style.transform = `translate(${distanceX * 0.2}px, ${distanceY * 0.2}px)`;
        });
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'translate(0px, 0px)';
        });
      });

      // 3. Canvas Particle Network (WebGL Point Cloud Effect)
      const canvas = document.getElementById('bg-canvas');
      const ctx = canvas.getContext('2d');
      let particlesArray;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let mouse = { x: null, y: null, radius: 150 };

      window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
      });

      class Particle {
        constructor(x, y, directionX, directionY, size, color) {
          this.x = x;
          this.y = y;
          this.directionX = directionX;
          this.directionY = directionY;
          this.size = size;
          this.color = color;
          this.baseX = this.x;
          this.baseY = this.y;
          this.density = (Math.random() * 30) + 1;
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
        update() {
          if (!isPerformanceMode) return;
          
          if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
          if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

          // Fluid attract/repel interaction
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
          } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy / 10;
            }
          }
          
          // Drift slowly
          this.x += this.directionX * 0.5;
          this.y += this.directionY * 0.5;
          
          this.draw();
        }
      }

      function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.width * canvas.height) / 9000;
        if (numberOfParticles > 150) numberOfParticles = 150; // Cap for performance
        
        for (let i = 0; i < numberOfParticles; i++) {
          let size = (Math.random() * 1.5) + 0.5;
          let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
          let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
          let directionX = (Math.random() * 2) - 1;
          let directionY = (Math.random() * 2) - 1;
          let color = 'rgba(14, 168, 121, 0.4)';
          particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
      }

      function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
          for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
              opacityValue = 1 - (distance / 20000);
              ctx.strokeStyle = `rgba(14, 168, 121, ${opacityValue * 0.15})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
              ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
              ctx.stroke();
            }
          }
        }
      }

      function animateParticles() {
        if (!isPerformanceMode) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
        }
        connectParticles();
      }

      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if(isPerformanceMode) initParticles();
      });

      if (isPerformanceMode) {
        initParticles();
        animateParticles();
      }
    });
  </script>
</body>"""

content = re.sub(r"</body>", js_injection, content, count=1)

with open(file_path, "w") as f:
    f.write(content)

print("Injected Awwwards interactions successfully.")
