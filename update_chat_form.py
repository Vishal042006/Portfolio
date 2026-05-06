import re

file_path = "/Users/vishal/Downloads/portfolio/index.html"
with open(file_path, "r") as f:
    content = f.read()

# CSS replacement
css_old = r"\.chat-input \{padding:14px;border-top:1px solid var\(--bdr3\);display:flex;gap:8px;background:var\(--ink3\)\}.*?\.chat-input button svg \{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round\}"

css_new = """.chat-form {display:flex;flex-direction:column;gap:10px;margin-top:4px}
.chat-form input, .chat-form textarea {background:var(--em-gx);border:1px solid var(--bdr3);border-radius:8px;padding:10px 14px;color:var(--txt);font-family:var(--ff-b);font-size:13.5px;outline:none;transition:border-color .2s;width:100%}
.chat-form textarea {resize:none}
.chat-form input:focus, .chat-form textarea:focus {border-color:var(--bdr)}
.chat-form button {border-radius:8px;padding:12px;margin-top:4px;width:100%}"""

content = re.sub(css_old, css_new, content, flags=re.DOTALL)

# HTML replacement
html_old = r'<div class="chat-body" id="chat-body">.*?<form class="chat-input" id="chat-form" onsubmit="sendChat\(event\)">.*?</form>\n  </div>'

html_new = """<div class="chat-body" id="chat-body">
      <div class="chat-msg msg-bot">Hi there! 👋 I'm Vishal's AI assistant. Please leave your contact details below and I'll notify him immediately!</div>
      <form class="chat-form" id="chat-form" onsubmit="sendChat(event)">
        <input type="text" id="chat-name" placeholder="Your Name" required autocomplete="name">
        <input type="email" id="chat-email" placeholder="Your Email" required autocomplete="email">
        <input type="text" id="chat-subject" placeholder="Subject" required autocomplete="off">
        <textarea id="chat-msg-input" placeholder="Your message..." required rows="4"></textarea>
        <button type="submit" class="btn btn-solid">Send Message</button>
      </form>
      <div class="msg-system" id="chat-sys-msg" style="display:none; margin-top: 10px;"></div>
    </div>
  </div>"""

content = re.sub(html_old, html_new, content, flags=re.DOTALL)

# JS replacement
js_old = r"async function sendChat\(event\) \{.*?\}\n    \}"

js_new = """async function sendChat(event) {
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
    }"""

content = re.sub(js_old, js_new, content, flags=re.DOTALL)

with open(file_path, "w") as f:
    f.write(content)

print("Chat form injected.")
