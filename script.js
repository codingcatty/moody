const audio = document.getElementById("audio");
const quoteBox = document.getElementById("quoteBox");
const emoji = document.getElementById("emoji");
const themeSwitcher = document.getElementById("themeSwitcher");
const historyList = document.getElementById("historyList");
const greeting = document.getElementById("greeting");

const quotes = {
  happy: "Happiness is a direction, not a place!",
  sad: "It's okay to feel sad. Let the music heal you.",
  calm: "Peace begins with a deep breath.",
  energetic: "Turn the energy up and let it flow!"
};

const moods = {
  happy: { music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", emoji: "😄", bg: "linear-gradient(to right, #fceabb, #f8b500)" },
  sad: { music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", emoji: "😭", bg: "linear-gradient(to right, #6a11cb, #2575fc)" },
  calm: { music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", emoji: "😌", bg: "linear-gradient(to right, #89f7fe, #66a6ff)" },
  energetic: { music: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", emoji: "🔥", bg: "linear-gradient(to right, #ff416c, #ff4b2b)" }
};

// Set greeting based on time
const hour = new Date().getHours();
if (hour < 12) {
  greeting.textContent = "☀️ Good Morning! Select Your Mood";
} else if (hour < 18) {
  greeting.textContent = "🌤️ Good Afternoon! Select Your Mood";
} else {
  greeting.textContent = "🌙 Good Evening! Select Your Mood";
}

// Theme toggle
themeSwitcher.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});

function setMood(mood) {
  const m = moods[mood];
  if (!m) return;

  document.body.style.background = m.bg;
  quoteBox.textContent = quotes[mood] || "";
  audio.src = m.music;
  emoji.textContent = m.emoji;
  emoji.style.opacity = 1;
  audio.play();

  updateHistory(mood);
}

function addCustomMood() {
  const name = document.getElementById("customMood").value.trim();
  const url = document.getElementById("customMusic").value.trim();

  if (!name || !url) {
    alert("Please enter both mood and music URL");
    return;
  }

  moods[name] = {
    music: url,
    emoji: "🎶",
    bg: "linear-gradient(to right, #d4fc79, #96e6a1)"
  };

  quotes[name] = "You created this mood — how cool!";
  setMood(name);
}

function updateHistory(mood) {
  let history = JSON.parse(localStorage.getItem("moodHistory")) || [];
  history.unshift(mood);
  history = history.slice(0, 3);
  localStorage.setItem("moodHistory", JSON.stringify(history));
  displayHistory();
}

function displayHistory() {
  const history = JSON.parse(localStorage.getItem("moodHistory")) || [];
  historyList.innerHTML = "";
  history.forEach((m, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${m}`;
    historyList.appendChild(li);
  });
}

displayHistory();
