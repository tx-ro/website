// errorWatcher.js
let lastProgress = 0;
let lastProgressTime = Date.now();
const progressBar = document.getElementById('progressBar');
let loadingFinished = false;

// Error sound
const errorSound = new Audio("https://audio.jukehost.co.uk/8f6znbUSXrCKOhFna0WyGtZLwFpG8rPw");
errorSound.preload = "auto";

function showErrorPopup(message) {
  if (document.getElementById('errorPopup') || loadingFinished) return; // don't spam after finished

  // Play sound once
  errorSound.currentTime = 0;
  errorSound.play().catch(() => { /* ignore play errors on mobile */ });

  const popup = document.createElement('div');
  popup.id = 'errorPopup';
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.background = 'black';
  popup.style.color = 'red';
  popup.style.border = '2px solid red';
  popup.style.padding = '20px';
  popup.style.zIndex = '9999';
  popup.style.fontFamily = 'monospace';
  popup.style.whiteSpace = 'pre-wrap';
  popup.style.maxWidth = '80%';
  popup.style.maxHeight = '80%';
  popup.style.overflowY = 'auto';

  const title = document.createElement('div');
  title.textContent = '⚠ ERROR DETECTED ⚠';
  title.style.fontWeight = 'bold';
  title.style.marginBottom = '10px';

  const content = document.createElement('div');
  content.textContent = message;

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.style.marginTop = '10px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.background = 'red';
  closeBtn.style.color = 'black';
  closeBtn.style.border = 'none';
  closeBtn.style.padding = '5px 10px';
  closeBtn.addEventListener('click', () => popup.remove());

  popup.appendChild(title);
  popup.appendChild(content);
  popup.appendChild(closeBtn);

  document.body.appendChild(popup);
}

function checkProgress() {
  if (loadingFinished) return;

  const current = parseFloat(progressBar.style.width) || 0;

  // If bar is complete, disable errorWatcher
  if (current >= 100) {
    loadingFinished = true;
    clearInterval(progressInterval);
    return;
  }

  if (current === lastProgress) {
    if (Date.now() - lastProgressTime > 5000) {
      showErrorPopup("Loading seems stuck. Please check the console and send the error to the owner.");
    }
  } else {
    lastProgress = current;
    lastProgressTime = Date.now();
  }
}

const progressInterval = setInterval(checkProgress, 500);

// Global error handlers
window.addEventListener("error", function(event) {
  if (loadingFinished) return; // ignore after load
  const msg = `Error: ${event.message}\nAt: ${event.filename}:${event.lineno}:${event.colno}`;
  showErrorPopup(msg);
});

window.addEventListener("unhandledrejection", function(event) {
  if (loadingFinished) return; // ignore after load
  const msg = `Unhandled Promise Rejection: ${event.reason}`;
  showErrorPopup(msg);
});

// Called from main.js when loading finishes successfully
window.loadingCompleted = function() {
  loadingFinished = true;
  clearInterval(progressInterval);
  console.log("%cLoaded with no errors!", "color: green; font-weight: bold;");
};
