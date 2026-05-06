import re

file_path = "/Users/vishal/Downloads/portfolio/index.html"
with open(file_path, "r") as f:
    content = f.read()

# CSS replacement
css_old = r"\.chat-form \{display:flex;flex-direction:column;gap:10px;margin-top:4px\}\n\.chat-form input, \.chat-form textarea \{background:var\(--em-gx\);border:1px solid var\(--bdr3\);border-radius:8px;padding:10px 14px;color:var\(--txt\);font-family:var\(--ff-b\);font-size:13\.5px;outline:none;transition:border-color \.2s;width:100\%\}\n\.chat-form textarea \{resize:none\}\n\.chat-form input:focus, \.chat-form textarea:focus \{border-color:var\(--bdr\)\}\n\.chat-form button \{border-radius:8px;padding:12px;margin-top:4px;width:100\%\}"

css_new = """.chat-form {display:flex;flex-direction:column;gap:12px;margin-top:8px}
.chat-form input, .chat-form textarea {background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:14px 16px;color:var(--txt);font-family:var(--ff-b);font-size:14px;outline:none;transition:all 0.3s ease;width:100%}
.chat-form input::placeholder, .chat-form textarea::placeholder {color:var(--txt3)}
.chat-form textarea {resize:none}
.chat-form input:focus, .chat-form textarea:focus {background:rgba(255,255,255,0.05);border-color:var(--em);box-shadow:0 0 0 3px rgba(14,168,121,0.15)}
.chat-form button {border-radius:12px;padding:14px;margin-top:6px;width:100%;font-size:14px;font-weight:600;letter-spacing:0.5px;box-shadow:0 8px 24px rgba(14,168,121,0.25)}"""

content = re.sub(css_old, css_new, content, flags=re.DOTALL)

with open(file_path, "w") as f:
    f.write(content)

print("Updated Chat Form UI")
