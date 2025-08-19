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
const flashOverlay = document.getElementById('flashOverlay');

let index = 0;
let debugActive = false;
let isHighlighting = false;

// ------------------- LOADING MESSAGES -------------------
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
    setTimeout(() => {
      loadingMessage.style.animation = 'fadeOut 1s ease forwards';
      progressContainer.style.display = 'none';
      setTimeout(() => {
        loadingMessage.style.display = 'none';
        loadedBlock.style.display = 'block';
        loadedBlock.style.animation = 'fadeIn 1s ease forwards';
      }, 1000);
    }, 1000);
  }
}, 1200);

clickPrompt.addEventListener('click', () => {
  loadedBlock.style.animation = 'fadeOut 1s ease forwards';
  flashOverlay.style.opacity = 0.6;
  setTimeout(() => {
    flashOverlay.style.opacity = 0;
    loadedBlock.style.display = 'none';
    backgroundOverlay.classList.add('visible');
    if (toggleMusic.checked) bgm.play();
    setTimeout(() => {
      menu.classList.add('visible');
      buttonBox.classList.add('visible');
    }, 1000);
  }, 300);
});

// ------------------- MOUSE & HIGHLIGHT -------------------
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

// ------------------- SOUNDS -------------------
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

// ------------------- Jukebox PANEL -------------------
const CH1OST = [
  'assets/jukebox/CH1OST/001 ANOTHER HIM.mp3',
  'assets/jukebox/CH1OST/002 Beginning.mp3',
  'assets/jukebox/CH1OST/003 School.mp3',
  'assets/jukebox/CH1OST/009 Lancer.mp3',
  'assets/jukebox/CH1OST/010 Rude Buster.mp3',
  'assets/jukebox/CH1OST/011 Empty Town.mp3',
  'assets/jukebox/CH1OST/013 Field of Hopes and Dreams.mp3',
  'assets/jukebox/CH1OST/018 Quiet Autumn.mp3',
  'assets/jukebox/CH1OST/021 Vs. Lancer.mp3',
  'assets/jukebox/CH1OST/028 Hip Shop.mp3',
  'assets/jukebox/CH1OST/033 THE WORLD REVOLVING.mp3',
  'assets/jukebox/CH1OST/034 Friendship.mp3',
  'assets/jukebox/CH1OST/038 You Can Always Come Home.mp3',
  'assets/jukebox/CH1OST/040 Before the Story.mp3'
];
const CH2OST = [
  'assets/jukebox/CH2OST/041 Faint Glow.mp3',
  'assets/jukebox/CH2OST/042 Girl Next Door.mp3',
  'assets/jukebox/CH2OST/043 My Castle Town.mp3',
  'assets/jukebox/CH2OST/046 A CYBER\'S WORLD-.mp3',
  'assets/jukebox/CH2OST/055 Smart Race.mp3',
  'assets/jukebox/CH2OST/057 WELCOME TO THE CITY.mp3',
  'assets/jukebox/CH2OST/058 Mini Studio.mp3',
  'assets/jukebox/CH2OST/062 Spamton.mp3',
  'assets/jukebox/CH2OST/063 NOW\'S YOUR CHANCE TO BE A.mp3',
  'assets/jukebox/CH2OST/066 Pandora Palace.mp3',
  'assets/jukebox/CH2OST/068 Acid Tunnel of Love.mp3',
  'assets/jukebox/CH2OST/069 It\'s Pronounced -Rules-.mp3',
  'assets/jukebox/CH2OST/070 Lost Girl.mp3',
  'assets/jukebox/CH2OST/072 Attack of the Killer Queen.mp3',
  'assets/jukebox/CH2OST/073 Giga Size.mp3',
  'assets/jukebox/CH2OST/075 Knock You Down !!.mp3',
  'assets/jukebox/CH2OST/079 BIG SHOT.mp3',
  'assets/jukebox/CH2OST/083 Chill Jailbreak Alarm To Study And Relax To.mp3',
  'assets/jukebox/CH2OST/084 You Can Always Come Home.mp3'
];
const CH3_4OST = [];

const jukeboxPanel = document.createElement('div');
jukeboxPanel.style.position = 'fixed';
jukeboxPanel.style.top = '0';
jukeboxPanel.style.left = '-300px';
jukeboxPanel.style.width = '300px';
jukeboxPanel.style.height = '100%';
jukeboxPanel.style.background = 'rgba(0,0,0,0.9)';
jukeboxPanel.style.borderRight = '2px solid #00ff00';
jukeboxPanel.style.color = '#00ff00';
jukeboxPanel.style.overflowY = 'auto';
jukeboxPanel.style.padding = '20px';
jukeboxPanel.style.zIndex = '50';
jukeboxPanel.style.transition = 'left 0.5s ease';
document.body.appendChild(jukeboxPanel);

function createSection(title, songs) {
  const section = document.createElement('div');
  const h2 = document.createElement('h2');
  h2.textContent = title;
  h2.style.marginBottom = '10px';
  section.appendChild(h2);

  songs.forEach(song => {
    const songName = song.split('/').pop().replace('.mp3','');
    const btn = document.createElement('div');
    btn.textContent = songName;
    btn.style.cursor = 'pointer';
    btn.style.padding = '5px 0';
    btn.addEventListener('click', () => changeBGM(song));
    btn.addEventListener('mouseenter', () => { btn.style.color = 'gold'; });
    btn.addEventListener('mouseleave', () => { btn.style.color = '#00ff00'; });
    section.appendChild(btn);
  });
  return section;
}

jukeboxPanel.appendChild(createSection('DELTARUNE Chapter 1 OST', CH1OST));
jukeboxPanel.appendChild(createSection('DELTARUNE Chapter 2 OST', CH2OST));
jukeboxPanel.appendChild(createSection('DELTARUNE Chapters 3+4 OST', CH3_4OST));

let panelOpen = false;
let currentBGM = bgm.src;

const jukeboxBtn = document.getElementById('jukeboxBtn');
jukeboxBtn.addEventListener('click', () => {
  panelOpen = !panelOpen;
  jukeboxPanel.style.left = panelOpen ? '0' : '-300px';
});

// ------------------- CHANGE BGM -------------------
function changeBGM(src) {
  if (src === currentBGM) return;
  currentBGM = src;

  if (!toggleMusic.checked) return;

  let fadeOut = setInterval(() => {
    if (bgm.volume > 0.05) {
      bgm.volume -= 0.05;
    } else {
      clearInterval(fadeOut);
      bgm.src = src;
      bgm.play();
      let fadeIn = setInterval(() => {
        if (bgm.volume < volumeSlider.value) {
          bgm.volume += 0.05;
        } else {
          clearInterval(fadeIn);
        }
      }, 50);
    }
  }, 50);
}
