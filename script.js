
    /* ── CURSOR ── */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isPerformanceMode = prefersReducedMotion || !hasFinePointer;

    const cd = document.getElementById('cur-dot'), cr = document.getElementById('cur-ring');
    if (hasFinePointer && cd && cr) {
      let mx = 0, my = 0, rx = 0, ry = 0;
      document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cd.style.left = mx + 'px'; cd.style.top = my + 'px';
      });
      (function loop() {
        rx += (mx - rx) * .11; ry += (my - ry) * .11;
        cr.style.left = rx + 'px'; cr.style.top = ry + 'px';
        requestAnimationFrame(loop);
      })();
      document.addEventListener('mousedown', () => cr.classList.add('clk'));
      document.addEventListener('mouseup', () => cr.classList.remove('clk'));
      document.querySelectorAll('a,button,.card,.lead-item,.ab-cell').forEach(el => {
        el.addEventListener('mouseenter', () => cr.classList.add('hov'));
        el.addEventListener('mouseleave', () => cr.classList.remove('hov'));
      });
    } else {
      if (cd) cd.style.display = 'none';
      if (cr) cr.style.display = 'none';
    }

    /* ── NAV + PROGRESS ── */
    const nav = document.getElementById('nav'), prog = document.getElementById('prog');
    const orbA = document.querySelector('.orb-a');
    const orbB = document.querySelector('.orb-b');
    let ticking = false;
    function runScrollEffects() {
      const s = window.scrollY || window.pageYOffset;
      nav.classList.toggle('stuck', s > 50);
      const total = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      prog.style.width = ((s / total) * 100) + '%';
      if (!isPerformanceMode && orbA && orbB) {
        orbA.style.transform = `translateY(${s * .18}px)`;
        orbB.style.transform = `translateY(${-s * .12}px)`;
      }
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(runScrollEffects);
      }
    }, { passive: true });
    runScrollEffects();

    /* ── MOBILE MENU ── */
    document.getElementById('ham').addEventListener('click', () => document.getElementById('mob').classList.add('open'));
    document.getElementById('mob-x').addEventListener('click', () => document.getElementById('mob').classList.remove('open'));
    function cm() { document.getElementById('mob').classList.remove('open') }

    /* ── TYPED HERO ── */
    const words = ['Developer.', 'Builder.', 'Engineer.', 'Creator.', 'Leader.'];
    let wi = 0, ci = 0, del = false;
    const tel = document.getElementById('typed');
    function type() {
      const w = words[wi];
      if (del) {
        ci = Math.max(ci - 1, 0);
        tel.textContent = w.slice(0, ci);
        if (ci === 0) {
          del = false;
          wi = (wi + 1) % words.length;
          setTimeout(type, 240);
          return;
        }
        setTimeout(type, 58);
        return;
      }

      ci = Math.min(ci + 1, w.length);
      tel.textContent = w.slice(0, ci);
      if (ci === w.length) {
        del = true;
        setTimeout(type, 1650);
      } else {
        setTimeout(type, 92);
      }
    }
    tel.textContent = words[0];
    ci = words[0].length;
    setTimeout(() => {
      del = true;
      type();
    }, 1300);

    /* ── SCROLL REVEAL ── */
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target) } });
    }, { threshold: isPerformanceMode ? .02 : .1 });
    document.querySelectorAll('.rv,.rv-l,.rv-r,.rv-s').forEach(el => obs.observe(el));

    /* ── STAGGER GRID ITEMS ── */
    document.querySelectorAll('.srv-grid,.cert-grid,.proj-row,.exp-grid,.edu-wrap,.contact-row,.lead-list').forEach(grid => {
      [...grid.children].forEach((c, i) => {
        if (!c.style.transitionDelay) c.style.transitionDelay = (i * .07) + 's';
      });
    });

    /* ── 3D TILT ── */
    if (!isPerformanceMode) {
      document.querySelectorAll('.tilt').forEach(card => {
        card.style.willChange = 'transform';
        card.addEventListener('mousemove', e => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - .5;
          const y = (e.clientY - r.top) / r.height - .5;
          card.style.transform = `perspective(900px) rotateY(${x * 11}deg) rotateX(${-y * 8}deg) translateY(-6px) scale(1.01)`;
          card.style.transition = 'none';
        });
        card.addEventListener('mouseleave', () => {
          card.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1),border-color .3s,box-shadow .35s';
          card.style.transform = '';
        });
      });
    } else {
      document.querySelectorAll('.tilt').forEach(card => {
        card.style.willChange = 'auto';
      });
    }

    /* ── CERT TOGGLE ── */
    let copen = false;
    document.getElementById('ctog').addEventListener('click', function () {
      copen = !copen;
      const ex = document.getElementById('cex');
      ex.classList.toggle('open', copen);
      this.textContent = copen ? 'Show Less ↑' : 'View All ↓';
      if (copen) {
        ex.querySelectorAll('.card').forEach((c, i) => {
          c.style.opacity = '0'; c.style.transform = 'translateY(14px)';
          setTimeout(() => { c.style.transition = 'opacity .4s,transform .4s'; c.style.opacity = '1'; c.style.transform = ''; }, i * 55);
        });
      }
    });

    /* ── DASHBOARD BARS ── */
    const bc = document.getElementById('bars');
    if (bc) {
      [38, 60, 52, 78, 65, 90, 72, 84, 58, 95].forEach((h, i) => {
        const b = document.createElement('div');
        b.className = 'db'; b.style.height = '0'; b.style.animationDelay = (i * .08 + .7) + 's';
        b.style.animationDuration = '1s'; b.style.animationTimingFunction = 'cubic-bezier(.22,1,.36,1)';
        setTimeout(() => { b.style.height = h + '%'; b.style.transition = 'height 1s cubic-bezier(.22,1,.36,1)'; }, 700 + i * 80);
        bc.appendChild(b);
      });
    }

    /* ── ACTIVE NAV ── */
    const secList = document.querySelectorAll('section[id]');
    const navAs = document.querySelectorAll('.nav-menu a');
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAs.forEach(a => a.classList.remove('active'));
        const a = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
        if (a) a.classList.add('active');
      });
    }, { threshold: .4, rootMargin: '-10% 0px -45% 0px' });
    secList.forEach((section) => navObs.observe(section));

    /* ── BUTTON RIPPLE ── */
    if (!isPerformanceMode) {
      const rs = document.createElement('style');
      rs.textContent = '@keyframes rip{to{transform:scale(3.5);opacity:0}}';
      document.head.appendChild(rs);
      document.querySelectorAll('.btn').forEach(b => {
        b.style.position = 'relative'; b.style.overflow = 'hidden';
        b.addEventListener('click', function (e) {
          const r = document.createElement('span');
          const rect = this.getBoundingClientRect(), sz = Math.max(rect.width, rect.height);
          Object.assign(r.style, { position: 'absolute', borderRadius: '50%', pointerEvents: 'none', width: sz + 'px', height: sz + 'px', left: (e.clientX - rect.left - sz / 2) + 'px', top: (e.clientY - rect.top - sz / 2) + 'px', background: 'rgba(255,255,255,.18)', transform: 'scale(0)', animation: 'rip .55s ease-out forwards' });
          this.appendChild(r); setTimeout(() => r.remove(), 560);
        });
      });
    }

    /* ── COUNTER ANIMATION ── */
    document.querySelectorAll('.hn-v').forEach(el => {
      const text = el.innerHTML;
      const num = parseFloat(text);
      if (isNaN(num)) return;
      const span = el.querySelector('.em');
      const emContent = span ? span.outerHTML : '';
      el.dataset.target = num;
      const startAnim = (entries) => {
        if (entries[0].isIntersecting) {
          const dur = isPerformanceMode ? 900 : 1600;
          let startTime = null;
          function step(ts) {
            if (!startTime) startTime = ts;
            const prog = Math.min((ts - startTime) / dur, 1);
            const val = Math.floor(prog * num * 100) / 100;
            el.innerHTML = (val % 1 === 0 ? Math.floor(val) : val) + emContent;
            if (prog < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          numObs.unobserve(el);
        }
      };
      const numObs = new IntersectionObserver(startAnim, { threshold: .5 });
      numObs.observe(el);
    });

    /* ── CERT LINK FALLBACKS ── */
    document.querySelectorAll('#certifications .cert-c').forEach((card) => {
      if (card.closest('a')) return;
      const wrap = document.createElement('a');
      wrap.href = '#';
      wrap.target = '_blank';
      wrap.rel = 'noopener';
      wrap.className = 'cert-link';
      wrap.setAttribute('aria-label', 'Open certificate');
      card.parentNode.insertBefore(wrap, card);
      wrap.appendChild(card);
    });
    
    /* ── CHATBOT ── */
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input-field');
    const chatUserMsg = document.getElementById('chat-user-msg');
    const chatSysMsg = document.getElementById('chat-sys-msg');
    const chatBody = document.getElementById('chat-body');
    const chatBubble = document.getElementById('chat-bubble');
    let chatOpen = false;

    function toggleChat() {
      chatOpen = !chatOpen;
      chatWindow.classList.toggle('open', chatOpen);
      chatBubble.setAttribute('aria-expanded', String(chatOpen));
      if (chatOpen) {
        setTimeout(() => chatInput.focus(), 180);
      }
    }

    async function sendChat(event) {
      event.preventDefault();
      
      const name = document.getElementById('chat-name').value.trim();
      const email = document.getElementById('chat-email').value.trim();
      const subject = document.getElementById('chat-subject').value.trim();
      const message = document.getElementById('chat-msg-input').value.trim();
      
      if (!name || !email || !message) return;

      const chatForm = document.getElementById('chat-form');
      const chatSysMsg = document.getElementById('chat-sys-msg');
      const chatBody = document.getElementById('chat-body');
      
      chatForm.style.display = 'none';
      chatSysMsg.style.display = 'block';
      chatSysMsg.textContent = "Sending...";
      chatBody.scrollTop = chatBody.scrollHeight;

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: "04027bb1-6117-4467-b454-e792aa316a92",
            name: name,
            email: email,
            subject: `Portfolio Inquiry: ${subject || 'New Message'}`,
            message: message
          })
        });
        
        const result = await response.json();
        if (result.success) {
          chatSysMsg.style.color = "var(--em)";
          chatSysMsg.textContent = "Message sent successfully! Vishal will reach out soon.";
        } else {
          chatSysMsg.style.color = "#FF5F57";
          chatSysMsg.textContent = "Oops! Something went wrong. Please try again.";
          chatForm.style.display = 'flex';
        }
      } catch (error) {
        chatSysMsg.style.color = "#FF5F57";
        chatSysMsg.textContent = "Oops! Network error. Please try again.";
        chatForm.style.display = 'flex';
      }
    }

    window.toggleChat = toggleChat;
    window.sendChat = sendChat;

    /* ══════════════════════════════════════════
       PARALLAX ORBS
    ══════════════════════════════════════════ */
    window.addEventListener('scroll', () => {
      const sy = scrollY * 0.15;
      document.querySelectorAll('.orb-a').forEach(o => o.style.transform = `translateY(${sy * 0.3}px)`);
      document.querySelectorAll('.orb-b').forEach(o => o.style.transform = `translateY(${-sy * 0.2}px)`);
    }, { passive: true });

    /* ══════════════════════════════════════════
       STAGGER CHILDREN IN GRIDS
    ══════════════════════════════════════════ */
    document.querySelectorAll('.cert-grid, .proj-row, .exp-grid, .contact-row, .ab-grid, .lead-list').forEach(grid => {
      const children = [...grid.querySelectorAll('.cert-c, .pc, .exp-card, .cc-card, .ab-cell, .lead-item')];
      children.forEach((child, i) => {
        if (!child.style.transitionDelay || child.style.transitionDelay === '0s') {
          child.style.transitionDelay = (i * 0.08) + 's';
        }
      });
    });

    /* ══════════════════════════════════════════
       BUTTON RIPPLE
    ══════════════════════════════════════════ */
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const r = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        r.style.cssText = `position:absolute;border-radius:50%;pointer-events:none;width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;background:rgba(255,255,255,0.15);transform:scale(0);animation:ripple 0.5s ease-out forwards;`;
        this.appendChild(r);
        setTimeout(() => r.remove(), 500);
      });
    });

    /* ══════════════════════════════════════════
       ACTIVE NAV HIGHLIGHT
    ══════════════════════════════════════════ */
    const navLinks = document.querySelectorAll('.nav-menu a');
    const secObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active'));
          const active = document.querySelector(`.nav-menu a[href="#${e.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('section[id]').forEach(s => secObs.observe(s));

    /* ══════════════════════════════════════════
       CERT TOGGLE STAGGER
    ══════════════════════════════════════════ */
    const origCtogClick = document.getElementById('ctog').onclick;
    document.getElementById('ctog').addEventListener('click', function() {
      const cex = document.getElementById('cex');
      if (cex.classList.contains('open')) {
        cex.querySelectorAll('.cert-c').forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s, transform 0.4s';
            card.style.opacity = '1';
            card.style.transform = '';
          }, i * 60);
        });
      }
    });
    chatBubble.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleChat();
      }
    });
    document.addEventListener("DOMContentLoaded", () => {
      const cursorDot = document.querySelector('.cursor-dot');
      const cursorOutline = document.querySelector('.cursor-outline');
      const canvas = document.getElementById('bg-canvas');
      const legacyDot = document.getElementById('cur-dot');
      const legacyRing = document.getElementById('cur-ring');
      const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const enableExperimental = !isPerformanceMode && supportsFinePointer;

      if (!enableExperimental) {
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
        if (canvas) canvas.style.display = 'none';
        return;
      }

      if (legacyDot) legacyDot.style.display = 'none';
      if (legacyRing) legacyRing.style.display = 'none';

      // 1) Advanced cursor trail
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

      function animateCursor() {
        outlineX += (cursorX - outlineX) * 0.18;
        outlineY += (cursorY - outlineY) * 0.18;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateCursor);
      }
      animateCursor();

      // 1b) Pointer-reactive hero typography warp (subtle 3D depth)
      const heroEl = document.getElementById('hero');
      const heroNameEl = heroEl ? heroEl.querySelector('.hero-name') : null;
      const heroRoleEl = heroEl ? heroEl.querySelector('.hero-role') : null;
      let heroWarpRaf = 0;
      let heroDx = 0;
      let heroDy = 0;

      function applyHeroWarp(dx, dy) {
        if (!heroNameEl) return;
        const rx = (-dy * 8).toFixed(2) + 'deg';
        const ry = (dx * 10).toFixed(2) + 'deg';
        const tz = ((Math.abs(dx) + Math.abs(dy)) * 14).toFixed(1) + 'px';

        // Text shadow offsets (pixels). Alpha is kept low for subtlety.
        const textDx = (dx * 14).toFixed(1) + 'px';
        const textDy = (dy * 10).toFixed(1) + 'px';
        const alpha = Math.min(0.28, (Math.abs(dx) + Math.abs(dy)) * 0.14).toFixed(3);

        heroNameEl.style.setProperty('--rx', rx);
        heroNameEl.style.setProperty('--ry', ry);
        heroNameEl.style.setProperty('--tz', tz);
        heroNameEl.style.setProperty('--dx', textDx);
        heroNameEl.style.setProperty('--dy', textDy);
        heroNameEl.style.setProperty('--warp-alpha', alpha);

        if (heroRoleEl) {
          heroRoleEl.style.setProperty('--rx2', (-dy * 4.5).toFixed(2) + 'deg');
          heroRoleEl.style.setProperty('--ry2', (dx * 6.5).toFixed(2) + 'deg');
          heroRoleEl.style.setProperty('--tz2', ((Math.abs(dx) + Math.abs(dy)) * 7).toFixed(1) + 'px');
        }
      }

      function clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
      }

      function onHeroMove(e) {
        if (!heroNameEl) return;
        const r = heroNameEl.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const nx = r.width ? (e.clientX - cx) / (r.width / 2) : 0;
        const ny = r.height ? (e.clientY - cy) / (r.height / 2) : 0;
        heroDx = clamp(nx, -1, 1);
        heroDy = clamp(ny, -1, 1);

        if (heroWarpRaf) return;
        heroWarpRaf = 1;
        requestAnimationFrame(() => {
          heroWarpRaf = 0;
          applyHeroWarp(heroDx, heroDy);
        });
      }

      window.addEventListener('mousemove', onHeroMove, { passive: true });
      heroEl && heroEl.addEventListener('mouseleave', () => applyHeroWarp(0, 0));

      document.querySelectorAll('a, button, .magnetic').forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover-state'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover-state'));
      });

      // 2) Magnetic elements
      document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const distanceX = e.clientX - centerX;
          const distanceY = e.clientY - centerY;
          el.style.transform = `translate(${distanceX * 0.2}px, ${distanceY * 0.2}px)`;
        });
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'translate(0px, 0px)';
        });
      });

      // 3) Particle canvas (point-cloud style)
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let particlesArray = [];
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      let mouse = { x: null, y: null, radius: 150 };

      function sizeCanvas() {
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      sizeCanvas();

      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
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
          if (this.x > window.innerWidth || this.x < 0) this.directionX = -this.directionX;
          if (this.y > window.innerHeight || this.y < 0) this.directionY = -this.directionY;

          const dx = (mouse.x ?? this.x) - this.x;
          const dy = (mouse.y ?? this.y) - this.y;
          const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxDistance = mouse.radius;
          const force = (maxDistance - distance) / maxDistance;
          const directionX = forceDirectionX * force * this.density;
          const directionY = forceDirectionY * force * this.density;

          if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
          } else {
            this.x -= (this.x - this.baseX) / 10;
            this.y -= (this.y - this.baseY) / 10;
          }

          this.x += this.directionX * 0.5;
          this.y += this.directionY * 0.5;
          this.draw();
        }
      }

      function initParticles() {
        particlesArray = [];
        let numberOfParticles = (window.innerWidth * window.innerHeight) / 9000;
        if (numberOfParticles > 140) numberOfParticles = 140;

        for (let i = 0; i < numberOfParticles; i++) {
          const size = (Math.random() * 1.5) + 0.5;
          const x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
          const y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
          const directionX = (Math.random() * 2) - 1;
          const directionY = (Math.random() * 2) - 1;
          particlesArray.push(new Particle(x, y, directionX, directionY, size, 'rgba(14, 168, 121, 0.38)'));
        }
      }

      function connectParticles() {
        const maxDistanceSq = 140 * 140;
        for (let a = 0; a < particlesArray.length; a++) {
          for (let b = a + 1; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distanceSq = (dx * dx) + (dy * dy);
            if (distanceSq < maxDistanceSq) {
              const opacityValue = 1 - (distanceSq / maxDistanceSq);
              ctx.strokeStyle = `rgba(14, 168, 121, ${opacityValue * 0.14})`;
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
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update();
        connectParticles();
      }

      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          sizeCanvas();
          initParticles();
        }, 120);
      });

      initParticles();
      animateParticles();
    });


/* ═══════════════════════════════════════════════════════
   CINEMATIC CODE WINDOW — typewriter animation
═══════════════════════════════════════════════════════ */
(function initCineTerminal() {
  const codeBody = document.getElementById('cine-code-body');
  const idleNote = document.getElementById('cine-idle-note');
  if (!codeBody || !idleNote) return;

  /* token definitions per line */
  const CODE_LINES = [
    [
      { cls: 'cine-kw', text: 'const ' },
      { cls: 'cine-va', text: 'vishal' },
      { cls: 'cine-op', text: ' = ' },
      { cls: 'cine-kw', text: 'new ' },
      { cls: 'cine-va', text: 'Developer' },
      { cls: 'cine-pn', text: '();' }
    ],
    [
      { cls: 'cine-va', text: 'vishal' },
      { cls: 'cine-pn', text: '.' },
      { cls: 'cine-va', text: 'build' },
      { cls: 'cine-pn', text: '(' },
      { cls: 'cine-st', text: '"real-world products"' },
      { cls: 'cine-pn', text: ');' }
    ],
    [
      { cls: 'cine-va', text: 'vishal' },
      { cls: 'cine-pn', text: '.' },
      { cls: 'cine-va', text: 'optimize' },
      { cls: 'cine-pn', text: '(' },
      { cls: 'cine-st', text: '"performance + UX"' },
      { cls: 'cine-pn', text: ');' }
    ],
    [
      { cls: 'cine-va', text: 'vishal' },
      { cls: 'cine-pn', text: '.' },
      { cls: 'cine-va', text: 'ship' },
      { cls: 'cine-pn', text: '(' },
      { cls: 'cine-st', text: '"clean, scalable code"' },
      { cls: 'cine-pn', text: ');' }
    ],
    [
      { cls: 'cine-cm', text: '// from idea to production' }
    ]
  ];

  const LINE_PAUSES = [300, 240, 240, 240, 0];

  /* build DOM rows */
  const lineEls = CODE_LINES.map((tokens, i) => {
    const row = document.createElement('div');
    row.className = 'cine-code-line' + (i === CODE_LINES.length - 1 ? ' cine-comment-line' : '');

    const glow = document.createElement('div');
    glow.className = 'cine-line-glow';
    row.appendChild(glow);

    const ln = document.createElement('span');
    ln.className = 'cine-ln';
    ln.textContent = i + 1;
    row.appendChild(ln);

    const ct = document.createElement('span');
    ct.className = 'cine-code-text';
    row.appendChild(ct);

    codeBody.insertBefore(row, idleNote);
    return { row, ct, tokens };
  });

  /* cursor */
  const cur = document.createElement('span');
  cur.id = 'cine-cursor';
  codeBody.appendChild(cur);

  /* helpers */
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function flattenTokens(tokens) {
    const out = [];
    for (const tok of tokens)
      for (const ch of tok.text)
        out.push({ ch, cls: tok.cls });
    return out;
  }

  function renderChars(ct, chars) {
    ct.innerHTML = '';
    let i = 0;
    while (i < chars.length) {
      const cls = chars[i].cls;
      const span = document.createElement('span');
      span.className = cls;
      let txt = '';
      while (i < chars.length && chars[i].cls === cls) { txt += chars[i].ch; i++; }
      span.textContent = txt;
      ct.appendChild(span);
    }
  }

  function charDelay(ch) {
    const base = 50;
    if ('();'.includes(ch)) return base + Math.random() * 28;
    if (ch === '"')          return base + Math.random() * 18;
    if (ch === ' ')          return base * 0.55 + Math.random() * 12;
    return base + (Math.random() - 0.3) * 26;
  }

  /* main animation — only runs when section scrolls into view */
  let started = false;

  async function runTyping() {
    await sleep(500);
    for (let li = 0; li < lineEls.length; li++) {
      const { row, ct, tokens } = lineEls[li];
      const chars = flattenTokens(tokens);

      row.classList.add('cine-active');
      ct.appendChild(cur);
      cur.classList.add('typing');

      const typed = [];
      for (let ci = 0; ci < chars.length; ci++) {
        typed.push(chars[ci]);
        renderChars(ct, typed);
        ct.appendChild(cur);
        await sleep(charDelay(chars[ci].ch));
      }

      cur.classList.remove('typing');
      await sleep(LINE_PAUSES[li] + 160);
      row.classList.remove('cine-active');

      if (li < lineEls.length - 1) {
        cur.classList.add('typing');
        await sleep(110);
      }
    }

    cur.classList.remove('typing');
    lineEls[lineEls.length - 1].ct.appendChild(cur);
    await sleep(1000);
    idleNote.classList.add('show');
  }

  /* trigger when the terminal scrolls into view */
  const trigger = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      trigger.disconnect();
      runTyping();
    }
  }, { threshold: 0.35 });

  trigger.observe(codeBody);
})();

/* ══════════════════════════════════════════
   CORE EXPERTISE INTERACTIONS
══════════════════════════════════════════ */
(function initServiceCards() {
  const serviceCards = Array.from(document.querySelectorAll('#services .srv-card'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (!serviceCards.length || reduceMotion || !finePointer) return;

  serviceCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - .5) * 7;
      const rotateX = (.5 - y) * 5;

      card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      card.style.setProperty('--srv-ry', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--srv-rx', `${rotateX.toFixed(2)}deg`);
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '18%');
      card.style.setProperty('--srv-ry', '0deg');
      card.style.setProperty('--srv-rx', '0deg');
    });
  });
})();

/* ══════════════════════════════════════════
   TECHNICAL ARSENAL CAROUSEL
══════════════════════════════════════════ */
(function initTechnicalArsenal() {
  const section = document.getElementById('skills');
  const carousel = document.getElementById('skillsCarousel');
  const originalCards = Array.from(section?.querySelectorAll('.skill-card') || []);
  const progressBar = section?.querySelector('.progress-bar');

  if (!section || !carousel || !originalCards.length) return;
  if (carousel.dataset.arsenalReady === 'true') return;
  carousel.dataset.arsenalReady = 'true';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const beforeFragment = document.createDocumentFragment();
  const afterFragment = document.createDocumentFragment();

  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.dataset.clone = 'before';
    beforeFragment.appendChild(clone);
  });

  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.dataset.clone = 'after';
    afterFragment.appendChild(clone);
  });

  carousel.insertBefore(beforeFragment, carousel.firstChild);
  carousel.appendChild(afterFragment);

  const cards = Array.from(carousel.querySelectorAll('.skill-card'));
  const middleCards = Array.from(carousel.querySelectorAll('.skill-card:not([data-clone])'));

  let rafId = 0;
  let autoRafId = 0;
  let snapRafId = 0;
  let lastAutoTime = 0;
  let isDragging = false;
  let isInteracting = false;
  let sectionInView = false;
  let userPauseUntil = 0;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let snapTimer = 0;
  let interactionTimer = 0;
  let resizeTimer = 0;
  let activeIndex = -1;
  let renderedActiveIndex = -1;
  let loopSpan = 0;
  let originalStart = 0;
  let originalEnd = 0;
  let isNormalizing = false;

  const stopSnapAnimation = () => {
    if (snapRafId) {
      cancelAnimationFrame(snapRafId);
      snapRafId = 0;
    }
  };

  cards.forEach((card, cardIndex) => {
    card.style.setProperty('--i', cardIndex);
    card.querySelectorAll('.skill-tag').forEach((tag, tagIndex) => {
      tag.style.setProperty('--tag-i', tagIndex);
    });
  });

  function measureLoop() {
    const firstMiddle = middleCards[0];
    const lastMiddle = middleCards[middleCards.length - 1];
    const firstAfter = carousel.querySelector('.skill-card[data-clone="after"]');

    if (!firstMiddle || !lastMiddle || !firstAfter) return;

    originalStart = firstMiddle.offsetLeft;
    originalEnd = lastMiddle.offsetLeft + lastMiddle.offsetWidth;
    loopSpan = firstAfter.offsetLeft - firstMiddle.offsetLeft;
  }

  function normalizeLoopPosition(force = false) {
    if (!loopSpan || isNormalizing || (!force && (isDragging || isInteracting || snapRafId))) return;

    const center = carousel.scrollLeft + carousel.clientWidth / 2;
    let nextScroll = carousel.scrollLeft;

    if (center < originalStart) {
      nextScroll += loopSpan;
    } else if (center > originalEnd) {
      nextScroll -= loopSpan;
    }

    if (nextScroll !== carousel.scrollLeft) {
      isNormalizing = true;
      carousel.scrollLeft = nextScroll;
      isNormalizing = false;
    }
  }

  function pauseAutoplay(duration = 1600) {
    userPauseUntil = performance.now() + duration;
  }

  function markInteraction(duration = 520) {
    isInteracting = true;
    pauseAutoplay(duration + 900);
    window.clearTimeout(interactionTimer);
    interactionTimer = window.setTimeout(() => {
      isInteracting = false;
    }, duration);
  }

  function canAutoplay() {
    return !reduceMotion && sectionInView && !isDragging && !isInteracting && !snapRafId && performance.now() > userPauseUntil;
  }

  /* Continuous autoplay: one low-speed rAF loop, paused by hover, drag, touch, wheel, focus, and reduced motion. */
  function runAutoplay(timestamp) {
    if (!lastAutoTime) lastAutoTime = timestamp;
    const delta = Math.min(timestamp - lastAutoTime, 34);
    lastAutoTime = timestamp;
    const autoplaying = canAutoplay();

    carousel.classList.toggle('auto-playing', autoplaying);

    if (autoplaying) {
      carousel.scrollLeft += delta * 0.045;
      normalizeLoopPosition(true);
      scheduleUpdate();
    }

    autoRafId = requestAnimationFrame(runAutoplay);
  }

  function startAutoplay() {
    if (!autoRafId && !reduceMotion) {
      autoRafId = requestAnimationFrame(runAutoplay);
    }
  }

  /* Center-distance engine: one rAF read/write pass controls scale, 3D rotation, blur, and active state. */
  function updateCarousel() {
    rafId = 0;

    const rect = carousel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const maxDistance = rect.width * 0.72;
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const offset = cardCenter - centerX;
      const distance = Math.abs(offset);
      const ratio = clamp(1 - distance / maxDistance, 0, 1);
      const eased = ratio * ratio * (3 - 2 * ratio);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }

      if (reduceMotion) {
        card.style.setProperty('--active', ratio.toFixed(3));
        card.style.setProperty('--scale', '1');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--lift', '0px');
        card.style.setProperty('--blur', '0px');
        return;
      }

      const direction = clamp(offset / maxDistance, -1, 1);
      const scale = 0.82 + eased * 0.22;
      const rotateY = -direction * (11 - eased * 5);
      const rotateX = (1 - eased) * 3.2;
      const lift = -eased * 18;
      const blur = finePointer ? (1 - eased) * 1.35 : 0;

      card.style.setProperty('--active', eased.toFixed(3));
      card.style.setProperty('--scale', scale.toFixed(4));
      card.style.setProperty('--rx', `${rotateX.toFixed(3)}deg`);
      card.style.setProperty('--ry', `${rotateY.toFixed(3)}deg`);
      card.style.setProperty('--lift', `${lift.toFixed(2)}px`);
      card.style.setProperty('--blur', `${blur.toFixed(2)}px`);
      card.style.zIndex = String(Math.round(100 + eased * 100));
    });

    const normalizedActiveIndex = closestIndex % originalCards.length;

    if (normalizedActiveIndex !== activeIndex || closestIndex !== renderedActiveIndex) {
      activeIndex = normalizedActiveIndex;
      renderedActiveIndex = closestIndex;
      cards.forEach((card, index) => {
        const isActive = index === closestIndex;
        card.classList.toggle('active', isActive);
        card.setAttribute('aria-current', isActive && !card.dataset.clone ? 'true' : 'false');
      });
    }

    if (progressBar) {
      const center = carousel.scrollLeft + carousel.clientWidth / 2;
      const progress = clamp((center - originalStart) / Math.max(originalEnd - originalStart, 1), 0, 1);
      progressBar.style.transform = `scaleX(${progress})`;
      progressBar.style.width = '100%';
    }
  }

  function scheduleUpdate() {
    if (!rafId) rafId = requestAnimationFrame(updateCarousel);
  }

  /* Snap system: resolves to the closest card center after wheel/drag momentum settles. */
  function snapToNearest() {
    if (isDragging) return;
    if (isInteracting) {
      queueSnap();
      return;
    }

    const center = carousel.scrollLeft + carousel.clientWidth / 2;
    let target = carousel.scrollLeft;
    let minDistance = Infinity;

    cards.forEach((card) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(center - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        target = cardCenter - carousel.clientWidth / 2;
      }
    });

    target = clamp(target, 0, carousel.scrollWidth - carousel.clientWidth);

    if (reduceMotion) {
      carousel.scrollLeft = target;
      scheduleUpdate();
      return;
    }

    stopSnapAnimation();

    const start = carousel.scrollLeft;
    const distance = target - start;
    const duration = clamp(Math.abs(distance) * 1.8, 260, 620);
    const startTime = performance.now();

    function animateSnap(now) {
      const t = clamp((now - startTime) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - t, 4);

      carousel.scrollLeft = start + distance * eased;
      scheduleUpdate();

      if (t < 1) {
        snapRafId = requestAnimationFrame(animateSnap);
      } else {
        snapRafId = 0;
        normalizeLoopPosition(true);
        scheduleUpdate();
        pauseAutoplay(550);
      }
    }

    snapRafId = requestAnimationFrame(animateSnap);
  }

  function queueSnap() {
    if (canAutoplay() || snapRafId) return;
    window.clearTimeout(snapTimer);
    snapTimer = window.setTimeout(snapToNearest, 260);
  }

  carousel.addEventListener('scroll', () => {
    scheduleUpdate();
    queueSnap();
  }, { passive: true });

  carousel.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    stopSnapAnimation();
    markInteraction(520);
    carousel.scrollLeft += event.deltaY * 1.12;
    scheduleUpdate();
    queueSnap();
  }, { passive: false });

  carousel.addEventListener('focusin', () => {
    pauseAutoplay(3000);
  });

  carousel.addEventListener('focusout', () => {
    pauseAutoplay(900);
  });

  /* Pointer drag: native scroll position is the source of truth, so inertia and snap stay stable. */
  carousel.addEventListener('pointerdown', (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    stopSnapAnimation();
    markInteraction(1200);
    isDragging = true;
    dragStartX = event.clientX;
    dragStartScroll = carousel.scrollLeft;
    carousel.classList.add('dragging');
    carousel.setPointerCapture?.(event.pointerId);
  });

  carousel.addEventListener('pointermove', (event) => {
    if (!isDragging) return;
    event.preventDefault();
    carousel.scrollLeft = dragStartScroll - (event.clientX - dragStartX) * 1.18;
    markInteraction(360);
    scheduleUpdate();
  });

  function endDrag(event) {
    if (!isDragging) return;
    isDragging = false;
    carousel.classList.remove('dragging');
    carousel.releasePointerCapture?.(event.pointerId);
    markInteraction(680);
    queueSnap();
  }

  carousel.addEventListener('pointerup', endDrag);
  carousel.addEventListener('pointercancel', endDrag);
  carousel.addEventListener('pointerleave', endDrag);

  if (finePointer && !reduceMotion) {
    cards.forEach((card) => {
      /* Mouse parallax: only updates CSS variables, avoiding transform stacking conflicts. */
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;

        card.style.setProperty('--tilt-y', `${(x * 5.2).toFixed(2)}deg`);
        card.style.setProperty('--tilt-x', `${(-y * 4.2).toFixed(2)}deg`);
        card.style.setProperty('--glow-x', `${((x + .5) * 100).toFixed(1)}%`);
        card.style.setProperty('--glow-y', `${((y + .5) * 100).toFixed(1)}%`);
      }, { passive: true });

      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-y', '0deg');
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--glow-x', '50%');
        card.style.setProperty('--glow-y', '18%');
      });
    });
  }

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      stopSnapAnimation();
      measureLoop();
      scheduleUpdate();
      snapToNearest();
    }, 120);
  }, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    sectionInView = Boolean(entries[0]?.isIntersecting);
    if (sectionInView) {
      scheduleUpdate();
      startAutoplay();
    }
  }, { threshold: 0.16 });

  observer.observe(section);

  function centerInitialCard() {
    measureLoop();
    const initialCard = middleCards[1] || middleCards[0];
    if (!initialCard) return;

    carousel.scrollLeft = initialCard.offsetLeft + initialCard.offsetWidth / 2 - carousel.clientWidth / 2;
    scheduleUpdate();
  }

  window.addEventListener('load', () => {
    centerInitialCard();
    window.setTimeout(() => {
      pauseAutoplay(600);
      snapToNearest();
    }, 80);
  }, { once: true });

  centerInitialCard();
  scheduleUpdate();
  startAutoplay();
})();
