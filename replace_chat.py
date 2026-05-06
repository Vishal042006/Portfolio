import re

file_path = "/Users/vishal/Downloads/portfolio/index.html"
with open(file_path, "r") as f:
    content = f.read()

old_func = r"function sendChat\(event\) \{.*?window\.location\.href = `mailto:vishalsundar06@gmail\.com\?subject=\$\{subject\}&body=\$\{body\}`;.*?\}, 650\);\n    \}"

new_func = """async function sendChat(event) {
      event.preventDefault();
      const message = chatInput.value.trim();
      if (!message) return;

      chatUserMsg.textContent = message;
      chatUserMsg.style.display = 'block';
      chatSysMsg.style.display = 'block';
      chatSysMsg.textContent = "Sending...";
      chatBody.scrollTop = chatBody.scrollHeight;
      chatInput.value = '';

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: "04027bb1-6117-4467-b454-e792aa316a92",
            name: "Portfolio Visitor",
            email: "noreply@portfolio.local",
            message: message,
            subject: "New Message from Portfolio Chatbot!"
          })
        });
        
        const result = await response.json();
        if (result.success) {
          chatSysMsg.textContent = "Message sent successfully! Vishal will reach out soon.";
        } else {
          chatSysMsg.textContent = "Oops! Something went wrong. Please try again.";
        }
      } catch (error) {
        chatSysMsg.textContent = "Oops! Network error. Please try again.";
      }
    }"""

content = re.sub(old_func, new_func, content, flags=re.DOTALL)

with open(file_path, "w") as f:
    f.write(content)

print("Updated chat function.")
