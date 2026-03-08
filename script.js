// ===============================
// 1️⃣ GET ELEMENTS FROM DOM
// ===============================

const timerDisplay = document.getElementById("timerDisplay");
const statusText = document.getElementById("statusText");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const darkModeBtn = document.getElementById("themeToggle");

// ===============================
// 2️⃣ STATE (premenné)
// ===============================

let elapsedMs = 0;
let isRunning = false;
let intervalId = null;
let lastTick = null;

// ===============================
// 3️⃣ HELPER FUNCTION - FORMAT TIME
// ===============================

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");

  return `${h}:${m}:${s}`;
}

// ===============================
// 4️⃣ UPDATE DISPLAY
// ===============================

function updateDisplay() {
  timerDisplay.textContent = formatTime(elapsedMs);
}

// ===============================
// 5️⃣ UPDATE STATUS
// ===============================

function updateStatus(message) {
  statusText.textContent = message;
}

// ===============================
// 6️⃣ START TIMER
// ===============================

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  lastTick = Date.now();

  intervalId = setInterval(() => {
    const now = Date.now();

    elapsedMs += now - lastTick;
    lastTick = now;

    updateDisplay();
  }, 250);

  updateStatus("Running");
}

// ===============================
// 7️⃣ PAUSE TIMER
// ===============================

function pauseTimer() {
  if (!isRunning) return;

  isRunning = false;

  clearInterval(intervalId);
  intervalId = null;

  updateStatus("Paused");
}

// ===============================
// 8️⃣ RESET TIMER
// ===============================

function resetTimer() {
  if (isRunning) {
    clearInterval(intervalId);
  }

  elapsedMs = 0;
  isRunning = false;
  intervalId = null;
  lastTick = null;

  updateDisplay();
  updateStatus("Idle");
}

// ===============================
// 9️⃣ DARK MODE
// ===============================

function toggleTheme() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  darkModeBtn.textContent = isDark ? "☀️" : "🌙";
}

// ===============================
// 🔟 BUTTON EVENT LISTENERS
// ===============================

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
darkModeBtn.addEventListener("click", toggleTheme);

// ===============================
// 1️⃣1️⃣ INIT
// ===============================

updateDisplay();
updateStatus("Idle");
