let timerInterval = null;
let remainingSeconds = 0;
let isPaused = false;

function startTimer() {
  const timeInput = document.getElementById("time-input").value;
  if (!timeInput) {
    alert("Please select a valid time.");
    return;
  }
  const [hours, minutes, seconds] = timeInput.split(":").map(Number);
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    (seconds !== undefined && (seconds < 0 || seconds > 59))
  ) {
    alert("Invalid time format.");
    return;
  }
  remainingSeconds = hours * 3600 + minutes * 60 + (seconds || 0);
  if (remainingSeconds === 0) {
    alert("Please select a time greater than 00:00:00.");
    return;
  }
  clearInterval(timerInterval);
  isPaused = false;
  updateDisplay(remainingSeconds);
  timerInterval = setInterval(timerTick, 1000);
}

function timerTick() {
  if (!isPaused) {
    remainingSeconds--;
    updateDisplay(remainingSeconds);
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      alert("Time is up!");
    }
  }
}

function pauseTimer() {
  isPaused = true;
}

function resumeTimer() {
  if (remainingSeconds > 0 && isPaused) {
    isPaused = false;
    if (!timerInterval) {
      timerInterval = setInterval(timerTick, 1000);
    }
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingSeconds = 0;
  isPaused = false;
  document.getElementById("timer-display").innerText = "00:00:00";
  document.getElementById("time-input").value = "";
}

function updateDisplay(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const min = Math.floor((totalSeconds % 3600) / 60);
  const sec = totalSeconds % 60;
  document.getElementById("timer-display").innerText =
    `${hrs.toString().padStart(2, "0")}:` +
    `${min.toString().padStart(2, "0")}:` +
    `${sec.toString().padStart(2, "0")}`;
}
