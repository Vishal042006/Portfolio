import re

file_path = "/Users/vishal/Downloads/portfolio/vishal_portfolio_ULTIMATE.html"
with open(file_path, "r") as f:
    content = f.read()

# 1. Update Resume Links
content = content.replace(
    'href="https://drive.google.com/drive/folders/19l3h2jCPC9y4tGD7VaBJiOMZ6zEvqELU" target="_blank" rel="noopener" class="nav-cta">Resume ↗</a>',
    'href="./Vishal_S_Resume.pdf" download target="_blank" rel="noopener" class="nav-cta">Resume ↗</a>'
)
content = content.replace(
    'href="https://drive.google.com/drive/folders/19l3h2jCPC9y4tGD7VaBJiOMZ6zEvqELU" target="_blank" rel="noopener" class="btn btn-border">',
    'href="./Vishal_S_Resume.pdf" download target="_blank" rel="noopener" class="btn btn-border">'
)
content = content.replace(
    'href="https://drive.google.com/drive/folders/19l3h2jCPC9y4tGD7VaBJiOMZ6zEvqELU" target="_blank" rel="noopener" class="btn btn-ghost">',
    'href="./Vishal_S_Resume.pdf" download target="_blank" rel="noopener" class="btn btn-ghost">'
)

# 2. View Projects button
content = content.replace(
    '<a href="#featured" class="btn btn-solid">\n        <svg width="14" height="14"',
    '<a href="#projects" class="btn btn-solid">\n        <svg width="14" height="14"'
)

# 3. Nav changes
content = content.replace(
    '<a href="#featured"       onclick="cm()">Featured</a>\n  <a href="#projects"       onclick="cm()">Projects</a>',
    '<a href="#services"       onclick="cm()">Services</a>\n  <a href="#featured"       onclick="cm()">Featured</a>\n  <a href="#projects"       onclick="cm()">Projects</a>'
)
content = content.replace(
    '<a href="#featured">Projects</a>',
    '<a href="#services">Services</a>\n    <a href="#projects">Projects</a>'
)

# 4. Certifications Clickable
cert_blocks = re.findall(r'<div class="card cert-c">.*?</div></div></div>', content)
for block in cert_blocks:
    new_block = block.replace('<div class="card cert-c">', '<a href="#" target="_blank" class="card cert-c">').replace('</div></div></div>', '</div></div></a>')
    content = content.replace(block, new_block)

# 5. Min-height for hero-name
content = content.replace(
    '.hero-name{font-family:var(--ff-h);font-size:clamp(50px,7.5vw,96px);font-weight:800;line-height:.9;letter-spacing:-4.5px;margin-bottom:22px}',
    '.hero-name{font-family:var(--ff-h);font-size:clamp(50px,7.5vw,96px);font-weight:800;line-height:.9;letter-spacing:-4.5px;margin-bottom:22px;min-height:2em;display:flex;flex-direction:column;justify-content:center}'
)

# 6. About section photo to Code Window
old_about_img = '''      <div class="ab-frame">
        <img id="about-img" src="" alt="Vishal S">
        <div class="ab-frame-sheen"></div>
      </div>'''

new_about_img = '''      <div class="ab-frame code-window">
        <div class="cw-header"><span class="cw-dot r"></span><span class="cw-dot y"></span><span class="cw-dot g"></span></div>
        <div class="cw-body">
          <div class="cw-line"><span class="cw-kw">const</span> <span class="cw-var">vishal</span> <span class="cw-op">=</span> <span class="cw-kw">new</span> <span class="cw-class">Developer</span>();</div>
          <div class="cw-line"><span class="cw-var">vishal</span>.<span class="cw-fn">setSkills</span>([<span class="cw-str">'React'</span>, <span class="cw-str">'Node.js'</span>]);</div>
          <div class="cw-line"><span class="cw-var">vishal</span>.<span class="cw-fn">build</span>(<span class="cw-str">'Awesome Apps'</span>);</div>
          <div class="cw-line"><span class="cw-kw">await</span> <span class="cw-var">vishal</span>.<span class="cw-fn">deploy</span>();</div>
          <div class="cw-line cw-cursor">&gt;_</div>
        </div>
        <div class="ab-frame-sheen"></div>
      </div>'''

content = content.replace(old_about_img, new_about_img)

# 7. Add Services Section before Featured
services_html = '''<!-- ════════════ SERVICES ════════════ -->
<section id="services">
  <div class="chip rv">What I Do</div>
  <h2 class="h1 rv">Core Expertise</h2>
  <p class="sub rv">Delivering scalable and visually stunning digital experiences.</p>
  <div class="srv-grid">
    <div class="card srv-card rv-l">
      <div class="srv-ico">💻</div>
      <h3 class="srv-title">Front-End Engineering</h3>
      <p class="srv-desc">Building pixel-perfect, highly interactive, and accessible user interfaces using React, modern CSS, and dynamic animations.</p>
    </div>
    <div class="card srv-card rv">
      <div class="srv-ico">⚙️</div>
      <h3 class="srv-title">Back-End Architecture</h3>
      <p class="srv-desc">Designing robust APIs, efficient databases, and scalable server-side logic using Node.js, Express, and Firebase.</p>
    </div>
    <div class="card srv-card rv-r">
      <div class="srv-ico">🎨</div>
      <h3 class="srv-title">UI/UX Design</h3>
      <p class="srv-desc">Crafting intuitive user journeys, wireframing in Figma, and ensuring a premium, user-centered design aesthetic.</p>
    </div>
  </div>
</section>

<!-- ════════════ FEATURED ════════════ -->'''

content = content.replace('<!-- ════════════ FEATURED ════════════ -->', services_html)

# 8. Append Chatbot and new CSS/JS
# CSS appended before </style>
new_css = '''
/* CODE WINDOW */
.code-window{background:var(--ink3);display:flex;flex-direction:column;border:1px solid var(--bdr);aspect-ratio:4/5;border-radius:22px;overflow:hidden;position:relative}
.cw-header{background:rgba(255,255,255,.05);padding:14px;display:flex;gap:8px;border-bottom:1px solid var(--bdr3)}
.cw-dot{width:12px;height:12px;border-radius:50%}
.cw-dot.r{background:#ff5f56}
.cw-dot.y{background:#ffbd2e}
.cw-dot.g{background:#27c93f}
.cw-body{padding:24px;font-family:monospace;font-size:14px;line-height:1.9;color:var(--txt2);flex:1;display:flex;flex-direction:column;justify-content:center}
.cw-line{margin-bottom:8px;animation:slideDown 0.6s backwards}
.cw-line:nth-child(2){animation-delay:0.2s}
.cw-line:nth-child(3){animation-delay:0.4s}
.cw-line:nth-child(4){animation-delay:0.6s}
.cw-kw{color:#ff7b72}
.cw-var{color:#79c0ff}
.cw-op{color:#d2a8ff}
.cw-class{color:#f0883e}
.cw-fn{color:#d2a8ff}
.cw-str{color:#a5d6ff}
.cw-cursor{color:var(--em);font-weight:700;animation:blink 1s infinite}

/* SERVICES */
#services{background:var(--ink)}
.srv-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.srv-card{padding:36px 30px;display:flex;flex-direction:column;align-items:flex-start}
.srv-ico{width:56px;height:56px;background:var(--em-gs);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;border:1px solid var(--bdr);margin-bottom:24px;transition:transform .4s var(--ease)}
.srv-card:hover .srv-ico{transform:translateY(-5px) scale(1.08) rotate(5deg);background:var(--em-g);border-color:var(--em)}
.srv-title{font-family:var(--ff-h);font-size:20px;font-weight:800;color:var(--txt);margin-bottom:12px;letter-spacing:-.5px}
.srv-desc{font-size:14.5px;color:var(--txt2);line-height:1.7}

/* CHATBOT */
#chat-widget {position:fixed;bottom:30px;right:30px;z-index:900;display:flex;flex-direction:column;align-items:flex-end}
#chat-bubble {width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,var(--em),var(--em3));display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 24px rgba(14,168,121,.4);transition:transform .3s var(--ease),box-shadow .3s;color:#fff;font-size:26px;position:relative}
#chat-bubble:hover {transform:scale(1.1) translateY(-4px);box-shadow:0 14px 32px rgba(14,168,121,.5)}
#chat-bubble .ping {position:absolute;top:0;right:0;width:14px;height:14px;background:#FF5F57;border-radius:50%;border:2px solid var(--ink);animation:ping 2s infinite}
#chat-window {width:340px;height:420px;background:rgba(10,18,20,.95);backdrop-filter:blur(24px);border:1px solid var(--bdr2);border-radius:24px;margin-bottom:16px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,.6);transform-origin:bottom right;animation:popIn .4s var(--ease)}
@keyframes popIn {from{opacity:0;transform:scale(0.8) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
#chat-window.open {display:flex}
.chat-header {padding:18px 20px;background:var(--em-gx);border-bottom:1px solid var(--bdr3);display:flex;align-items:center;gap:12px}
.chat-avatar {width:38px;height:38px;border-radius:50%;background:var(--em);display:flex;align-items:center;justify-content:center;font-size:18px;color:#fff}
.chat-title {font-family:var(--ff-h);font-size:15px;font-weight:700;color:var(--txt)}
.chat-status {font-size:11px;color:var(--em3);display:flex;align-items:center;gap:4px}
.chat-status::before {content:'';width:6px;height:6px;background:var(--em2);border-radius:50%}
.chat-body {flex:1;padding:20px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}
.chat-msg {max-width:85%;padding:10px 14px;border-radius:14px;font-size:13.5px;line-height:1.5}
.msg-bot {background:var(--em-gs);border:1px solid var(--bdr3);color:var(--txt);align-self:flex-start;border-bottom-left-radius:4px}
.msg-user {background:var(--em);color:#fff;align-self:flex-end;border-bottom-right-radius:4px;display:none}
.msg-system {background:transparent;color:var(--txt3);font-size:11.5px;text-align:center;align-self:center;display:none;font-style:italic}
.chat-input {padding:14px;border-top:1px solid var(--bdr3);display:flex;gap:8px;background:var(--ink3)}
.chat-input input {flex:1;background:var(--em-gx);border:1px solid var(--bdr3);border-radius:20px;padding:10px 16px;color:var(--txt);font-family:var(--ff-b);font-size:13.5px;outline:none;transition:border-color .2s}
.chat-input input:focus {border-color:var(--bdr)}
.chat-input button {background:var(--em);color:#fff;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s,transform .2s}
.chat-input button:hover {background:var(--em2);transform:scale(1.05)}
.chat-input button svg {width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
</style>'''
content = content.replace('</style>', new_css)

# Chatbot HTML appended before <footer>
chatbot_html = '''<!-- CHATBOT WIDGET -->
<div id="chat-widget">
  <div id="chat-window">
    <div class="chat-header">
      <div class="chat-avatar">VS</div>
      <div>
        <div class="chat-title">Vishal S</div>
        <div class="chat-status">Online • Replies instantly</div>
      </div>
    </div>
    <div class="chat-body" id="chat-body">
      <div class="chat-msg msg-bot">Hi there! 👋 I'm Vishal's AI assistant. How can I help you today?</div>
      <div class="chat-msg msg-bot">Feel free to leave a message and I'll ping him right away!</div>
      <div class="chat-msg msg-user" id="chat-user-msg"></div>
      <div class="msg-system" id="chat-sys-msg">Notification sent! Vishal will reach out soon.</div>
    </div>
    <form class="chat-input" id="chat-form" onsubmit="sendChat(event)">
      <input type="text" id="chat-input-field" placeholder="Type your message..." required autocomplete="off">
      <button type="submit">
        <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </button>
    </form>
  </div>
  <div id="chat-bubble" onclick="toggleChat()">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    <div class="ping"></div>
  </div>
</div>

<footer>'''
content = content.replace('<footer>', chatbot_html)

# Chatbot JS appended before </script>
chatbot_js = '''
    /* ── CHATBOT LOGIC ── */
    function toggleChat() {
      const cw = document.getElementById('chat-window');
      cw.classList.toggle('open');
      const ping = document.querySelector('#chat-bubble .ping');
      if (ping) ping.style.display = 'none';
    }
    function sendChat(e) {
      e.preventDefault();
      const input = document.getElementById('chat-input-field');
      const val = input.value.trim();
      if (!val) return;
      
      const userMsg = document.getElementById('chat-user-msg');
      userMsg.textContent = val;
      userMsg.style.display = 'block';
      
      input.value = '';
      input.disabled = true;
      
      setTimeout(() => {
        document.getElementById('chat-sys-msg').style.display = 'block';
        document.getElementById('chat-body').scrollTo(0, document.getElementById('chat-body').scrollHeight);
        
        setTimeout(() => {
          window.location.href = `mailto:vishalsundar06@gmail.com?subject=Portfolio Chatbot Message&body=${encodeURIComponent(val)}`;
        }, 800);
      }, 600);
    }
</script>'''
content = content.replace('</script>', chatbot_js)

# Ensure cert grid delay applies to new services grid
content = content.replace('.sk-grid,.cert-grid', '.sk-grid,.srv-grid,.cert-grid')

with open(file_path, "w") as f:
    f.write(content)
print("Updated successfully")
