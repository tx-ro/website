const loadingMessage = document.getElementById('loadingMessage');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const loadedBlock = document.getElementById('loadedBlock');
const clickPrompt = document.getElementById('clickPrompt');
const backgroundOverlay = document.getElementById('backgroundOverlay');
const bgm = document.getElementById('bgm');
const menu = document.getElementById('menu');
const buttonBox = document.querySelector('.button-box');
const mouseTracker = document.getElementById('mouseTracker');
const highlightBox = document.getElementById('highlightBox');
const highlightInfo = document.getElementById('highlightInfo');
const optionsBtn = document.getElementById('optionsBtn');
const optionsMenu = document.getElementById('optionsMenu');
const closeOptions = document.getElementById('closeOptions');
const toggleMusic = document.getElementById('toggleMusic');
const toggleSounds = document.getElementById('toggleSounds');
const volumeSlider = document.getElementById('volumeSlider');
const creditsBtn = document.getElementById('creditsBtn');
const closeCredits = document.getElementById('closeCredits');
const loadedText = document.getElementById('loadedText');
const bugReport = document.getElementById('bugReport');

let index = 0;
let debugActive = false;
let isHighlighting = false;

const loadingMessages = [
  "initializing...",
  "loading assets...",
  "almost ready...",
  "petting the cats...",
  "hiding the skeletons...",
  "this is all fake, lol"
];

function showNextMessage() {
  loadingMessage.style.opacity = 0;
  setTimeout(() => {
    const msg = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    loadingMessage.textContent = msg;
    loadingMessage.style.animation = 'fadeIn 0.5s ease forwards';
  }, 300);
  const progress = Math.min(((index + 1) / 6) * 100, 100);
  progressBar.style.width = `${progress}%`;
}

const interval = setInterval(() => {
  showNextMessage();
  index++;
if (index >= 6) {
  clearInterval(interval);
  loadingFinished = true; // optional here
  setTimeout(() => {
    loadingMessage.style.animation = 'fadeOut 1s ease forwards';
    progressContainer.style.display = 'none';
    setTimeout(() => {
      loadingMessage.style.display = 'none';
      loadedBlock.style.display = 'block';
      loadedBlock.style.animation = 'fadeIn 1s ease forwards';

      // Notify errorWatcher that loading completed successfully
      if (window.loadingCompleted) window.loadingCompleted();

    }, 1000);
  }, 1000);
}
}, 1200);

clickPrompt.addEventListener('click', () => {
  loadedBlock.style.animation = 'fadeOut 1s ease forwards';
  const flash = document.getElementById('flashOverlay');
  flash.style.opacity = 0.6;
  setTimeout(() => {
    flash.style.opacity = 0;
    loadedBlock.style.display = 'none';
    backgroundOverlay.classList.add('visible');
    if (toggleMusic.checked) bgm.play();
    setTimeout(() => {
      menu.classList.add('visible');
      buttonBox.classList.add('visible');
    }, 1000);
  }, 300);
});

document.addEventListener('mousemove', (e) => {
  if (debugActive) mouseTracker.textContent = `x: ${e.clientX}, y: ${e.clientY}`;
  if (isHighlighting) {
    const width = Math.abs(e.clientX - startX);
    const height = Math.abs(e.clientY - startY);
    const left = Math.min(e.clientX, startX);
    const top = Math.min(e.clientY, startY);
    highlightBox.style.left = `${left}px`;
    highlightBox.style.top = `${top}px`;
    highlightBox.style.width = `${width}px`;
    highlightBox.style.height = `${height}px`;
  }
});

document.addEventListener('mousedown', (e) => {
  if (e.ctrlKey && e.button === 0) {
    isHighlighting = true;
    startX = e.clientX;
    startY = e.clientY;
    highlightBox.style.display = 'block';
    highlightInfo.style.display = 'none';
  }
});

document.addEventListener('mouseup', (e) => {
  if (isHighlighting) {
    isHighlighting = false;
    const endX = e.clientX;
    const endY = e.clientY;
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    const left = Math.min(endX, startX);
    const top = Math.min(endY, startY);
    highlightInfo.innerHTML = `
      <strong>Selection:</strong><br>
      x: ${left}, y: ${top}<br>
      width: ${width}px<br>
      height: ${height}px
    `;
    highlightInfo.style.display = 'block';
  }
});

document.addEventListener('click', (e) => {
  const targetX = 286;
  const targetY = 315;
  const radius = 10;
  if (
    e.clientX >= targetX - radius && e.clientX <= targetX + radius &&
    e.clientY >= targetY - radius && e.clientY <= targetY + radius
  ) {
    debugActive = !debugActive;
    mouseTracker.style.display = debugActive ? 'block' : 'none';
  }
});

const hoverSound = new Audio("https://audio.jukehost.co.uk/4ZruYflQNOrRcO80xbq7cr4uiDDDRLpO");
hoverSound.preload = "auto";
const buttonClickSound = new Audio("https://audio.jukehost.co.uk/QHZd6nvlcKjRT23YT64KumNcvkXPVmw0");
buttonClickSound.preload = "auto";
const menuCloseSound = new Audio("https://audio.jukehost.co.uk/5TfzmfqD1NAHlauVd7uv65X64hzogwHw");
menuCloseSound.preload = "auto";

const allButtons = document.querySelectorAll('.menu-button');

allButtons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    if (toggleSounds.checked) {
      hoverSound.currentTime = 0;
      hoverSound.play();
    }
  });
  button.addEventListener('click', () => {
    if (toggleSounds.checked) {
      buttonClickSound.currentTime = 0;
      buttonClickSound.play();
    }
  });
});

optionsBtn.addEventListener('click', () => optionsMenu.style.display = 'flex');
closeOptions.addEventListener('click', () => {
  optionsMenu.style.display = 'none';
  if (toggleSounds.checked) menuCloseSound.play();
});
toggleMusic.addEventListener('change', () => toggleMusic.checked ? bgm.play() : bgm.pause());
volumeSlider.addEventListener('input', () => bgm.volume = volumeSlider.value);
creditsBtn.addEventListener('click', () => document.getElementById('creditsMenu').style.display = 'flex');
closeCredits.addEventListener('click', () => {
  document.getElementById('creditsMenu').style.display = 'none';
  if (toggleSounds.checked) menuCloseSound.play();
});
