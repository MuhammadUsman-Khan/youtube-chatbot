document.addEventListener("DOMContentLoaded", () => {
  const pages = {
    landing: document.getElementById("landing-page"),
    train: document.getElementById("train-page"),
    chat: document.getElementById("chat-page")
  };

  const getStartedBtn = document.getElementById("get-started");
  const addVideoBtn = document.getElementById("add_video");
  const trainBtn = document.getElementById("train_btn");
  const videoInputs = document.getElementById("video_inputs");
  const loader = document.getElementById("loader");
  const statusText = document.getElementById("status");
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  // ✨ Page switching
  function switchPage(target) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    setTimeout(() => {
      Object.values(pages).forEach(p => p.classList.add("hidden"));
      target.classList.remove("hidden");
      setTimeout(() => target.classList.add("active"), 50);
    }, 400);
  }

  getStartedBtn.addEventListener("click", () => switchPage(pages.train));

  // Add more video input fields
  addVideoBtn.addEventListener("click", () => {
    const group = document.createElement("div");
    group.classList.add("video-group");
    group.innerHTML = `<input placeholder="YouTube URL" class="input-field">
                       <input placeholder="Video Name" class="input-field">`;
    videoInputs.appendChild(group);
    // Scroll to newly added input
    group.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // Train chatbot - send data to Flask backend
  trainBtn.addEventListener("click", async () => {
    const chatbotName = document.getElementById("chatbot_name").value.trim();
    if (!chatbotName) return alert("Enter chatbot name.");

    const groups = document.querySelectorAll(".video-group");
    const downloads = [];
    groups.forEach(g => {
      const inputs = g.querySelectorAll("input");
      const url = inputs[0].value.trim();
      const name = inputs[1].value.trim();
      if (url && name) downloads.push({ url, name });
    });
    if (downloads.length === 0) return alert("Add at least one video.");

    loader.classList.remove("hidden");
    statusText.textContent = "Training in progress... ⏳";

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatbot_name: chatbotName, downloads })
      });
      const data = await response.json();
      loader.classList.add("hidden");
      statusText.textContent = data.message;

      if (data.status === "success") {
        switchPage(pages.chat);
      }
    } catch (err) {
      loader.classList.add("hidden");
      statusText.textContent = "❌ Error: " + err.message;
    }
  });

  // 💬 Chat functionality
  function appendMessage(sender, text) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.innerHTML = `<span class="avatar">${sender === "user" ? "🧑" : "🤖"}</span>
                     <div class="bubble">${text}</div>`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;
    appendMessage("user", text);
    userInput.value = "";

    loader.classList.remove("hidden");

    try {
      const response = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text })
      });
      const data = await response.json();
      loader.classList.add("hidden");
      appendMessage("bot", data.answer || "🤖 Sorry, I couldn't find an answer.");
    } catch (err) {
      loader.classList.add("hidden");
      appendMessage("bot", "⚠️ Error connecting to server.");
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

  // 💠 Aurora particle background (silver-blue)
  const canvas = document.getElementById("aurora-bg");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  }));

  function animateAurora() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${200 + Math.random() * 55}, ${220 + Math.random() * 30}, 255, 0.5)`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animateAurora);
  }
  animateAurora();
});
