import re

file_path = "/Users/vishal/Downloads/portfolio/index.html"
with open(file_path, "r") as f:
    content = f.read()

# 1. Update Resume Links (Drive to PDF)
content = re.sub(
    r'href="https://drive\.google\.com/drive/folders/19l3h2jCPC9y4tGD7VaBJiOMZ6zEvqELU"',
    r'href="./Vishal_S_Resume.pdf" download',
    content
)

# 2. View Projects button pointing to #featured -> #projects
content = re.sub(
    r'<a\s+href="#featured"\s+class="btn\s+btn-solid">',
    r'<a href="#projects" class="btn btn-solid">',
    content
)

# 3. Certifications Clickable
# The structure is:
# <div class="card cert-c">
#   <div class="cert-ico">🏅</div>
#   <div>
#     <div class="cert-nm">Meta Front-End Developer Professional Certificate</div>
#     <div class="cert-is">Meta · Coursera · 2026</div>
#   </div>
# </div>
# We can replace `<div class="card cert-c">` with `<a href="#" target="_blank" class="card cert-c">`
# And we need to replace the corresponding closing `</div>` with `</a>`.
# Since it's nested 2 divs deep inside the main div, we can use regex to match the whole block.
pattern = r'<div\s+class="card\s+cert-c">([\s\S]*?)</div>\s*</div>\s*</div>'
replacement = r'<a href="#" target="_blank" class="card cert-c">\1</div>\n        </div>\n      </a>'
content = re.sub(pattern, replacement, content)

# 4. Hero Name CSS Min-Height
# The original CSS was `.hero-name { font-family: ... }` but now it's formatted across multiple lines.
# We can just look for `.hero-name {` and insert `min-height: 2em; display: flex; flex-direction: column; justify-content: center;`
hero_name_pattern = r'(\.hero-name\s*\{)'
hero_name_replacement = r'\1\n      min-height: 2em;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;'
# Only replace the first occurrence (which is the CSS rule)
content = re.sub(hero_name_pattern, hero_name_replacement, content, count=1)

# 5. About section photo to Code Window
# Find <img id="about-img" src="" alt="Vishal S"> and its surrounding <div class="ab-frame">
# Wait, let's just find <img id="about-img".*?> and replace the entire ab-frame content.
about_img_pattern = r'<div\s+class="ab-frame">\s*<img\s+id="about-img"[^>]*>\s*<div\s+class="ab-frame-sheen">\s*</div>\s*</div>'
code_window_html = '''<div class="ab-frame code-window">
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
content = re.sub(about_img_pattern, code_window_html, content)

with open(file_path, "w") as f:
    f.write(content)
print("Fixes applied successfully.")
