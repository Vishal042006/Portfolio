import re

file_path = "/Users/vishal/Downloads/portfolio/index.html"
with open(file_path, "r") as f:
    content = f.read()

replacements = {
    "Meta Front-End Developer Professional Certificate": "./certificates/Meta Front-End Developer.pdf",
    "Advanced React": "./certificates/Advanced React.pdf",
    "React Basics": "./certificates/React Basics.pdf",
    "HTML and CSS in Depth": "./certificates/HTML and CSS in depth.pdf",
    "Front-End Developer Capstone": "./certificates/Front-End Developer Capstone.pdf",
    "Programming with JavaScript": "./certificates/Programming with JavaScript.pdf",
    "Front End Web Developer Certification": "./certificates/Vishal.S_Front End Web Developer_Certificate.pdf",
    "Java 11 Essentials": "./certificates/Vishal.S_Java 11 Essentials_Certificate.pdf",
    "JavaScript": "./certificates/Vishal.S_JavaScript_Certificate.pdf",
    "CSS3": "./certificates/Vishal.S_CSS3_certificate.pdf",
    "HTML5 — The Language": "./certificates/Vishal.S_HTML5 - The Language_Certificate.pdf",
    "Networking and Web Technology": "./certificates/Vishal.S_Networking and Web Technology_Certificate.pdf",
    "Principles of UX/UI Design": "./certificates/Principles of UX_UI Design.pdf",
    "Version Control": "./certificates/Version Control.pdf",
    "Introduction to Front-End Development": "./certificates/Introduction to Front-End Development.pdf",
    "Coding Interview Preparation": "./certificates/Coding Interview Preparation.pdf"
}

for cert_name, pdf_path in replacements.items():
    escaped_name = re.escape(cert_name)
    pattern = r'(<a\s+href=")([^"]+)("\s*target="_blank"\s+class="card\s+cert-c">\s*<div\s+class="cert-ico">[^<]+</div>\s*<div>\s*<div\s+class="cert-nm">' + escaped_name + r'</div>)'
    content = re.sub(pattern, r'\g<1>' + pdf_path + r'\g<3>', content)

with open(file_path, "w") as f:
    f.write(content)
print("Updated successfully")
