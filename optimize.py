import re

file_path = "/Users/vishal/Downloads/portfolio/vishal_portfolio_ULTIMATE.html"
with open(file_path, "r") as f:
    content = f.read()

# 1. Opaque fallbacks for pointer: coarse
coarse_pattern = r'(@media\s*\(\s*hover\s*:\s*none\s*\)\s*,\s*\(\s*pointer\s*:\s*coarse\s*\)\s*\{[\s\S]*?backdrop-filter:\s*none\s*!important)'
coarse_replacement = r'\1;\n        background: var(--ink2) !important'
content = re.sub(coarse_pattern, coarse_replacement, content, count=1)

# 2. Opaque fallbacks for prefers-reduced-motion
reduced_pattern = r'(@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*\{[\s\S]*?backdrop-filter:\s*none\s*!important)'
reduced_replacement = r'\1;\n        background: var(--ink2) !important'
content = re.sub(reduced_pattern, reduced_replacement, content, count=1)

# 3. Background Animation Hard-Stop
# In prefers-reduced-motion, we add `animation: none !important;` to `*, *::before, *::after`
reduced_anim_pattern = r'(\*\s*,\s*\*\s*::before\s*,\s*\*\s*::after\s*\{)'
reduced_anim_replacement = r'\1\n        animation: none !important;'
content = re.sub(reduced_anim_pattern, reduced_anim_replacement, content, count=1)

# 4. Chatbot Mobile Responsiveness
chatbot_css_injection = """/* MOBILE CHATBOT RESPONSIVENESS */
@media(max-width: 400px) {
  #chat-widget {
    bottom: 16px;
    right: 16px;
  }
  #chat-window {
    width: calc(100vw - 32px);
    height: 400px;
    margin-bottom: 12px;
  }
}
</style>"""
content = content.replace('</style>', chatbot_css_injection)

with open(file_path, "w") as f:
    f.write(content)
print("Optimizations applied successfully.")
