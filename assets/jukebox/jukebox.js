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

const bgm = document.getElementById('bgm');
const toggleMusic = document.getElementById('toggleMusic');
const volumeSlider = document.getElementById('volumeSlider');

let currentSongDiv = null;

// Create jukebox menu
const jukeboxMenu = document.createElement('div');
jukeboxMenu.style.position = 'fixed';
jukeboxMenu.style.top = '10px';
jukeboxMenu.style.right = '10px';
jukeboxMenu.style.width = '400px';
jukeboxMenu.style.maxHeight = '70%';
jukeboxMenu.style.background = 'rgba(0,0,0,0.9)';
jukeboxMenu.style.border = '2px solid #00ff00';
jukeboxMenu.style.borderRadius = '10px';
jukeboxMenu.style.color = '#00ff00';
jukeboxMenu.style.overflowY = 'auto';
jukeboxMenu.style.padding = '20px';
jukeboxMenu.style.display = 'none';
jukeboxMenu.style.flexDirection = 'column';
jukeboxMenu.style.zIndex = '50';
document.body.appendChild(jukeboxMenu);

// Hide scrollbars
jukeboxMenu.style.msOverflowStyle = 'none';
jukeboxMenu.style.overflow = 'auto';
jukeboxMenu.style.scrollBehavior = 'smooth';

// Close button with sound
const closeBtn = document.createElement('button');
closeBtn.textContent = 'X';
closeBtn.style.position = 'absolute';
closeBtn.style.top = '10px';
closeBtn.style.right = '10px';
closeBtn.style.padding = '5px 10px';
closeBtn.style.background = 'black';
closeBtn.style.border = '2px solid #00ff00';
closeBtn.style.color = '#00ff00';
closeBtn.style.cursor = 'pointer';
closeBtn.style.zIndex = '100';
const closeSound = new Audio('https://audio.jukehost.co.uk/5TfzmfqD1NAHlauVd7uv65X64hzogwHw');
closeBtn.addEventListener('mouseenter', () => {
  closeBtn.style.background = '#00ff00';
  closeBtn.style.color = 'black';
});
closeBtn.addEventListener('mouseleave', () => {
  closeBtn.style.background = 'black';
  closeBtn.style.color = '#00ff00';
});
closeBtn.addEventListener('click', () => {
  closeSound.currentTime = 0;
  closeSound.play();
  jukeboxMenu.style.display = 'none';
  menuOpen = false;
});
jukeboxMenu.appendChild(closeBtn);

// Function to create chapters
function createChapter(title, songs) {
  const chapterDiv = document.createElement('div');
  chapterDiv.style.marginBottom = '15px';

  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.cursor = 'pointer';
  header.style.fontSize = '1.4rem';
  header.style.fontWeight = 'bold';
  header.style.borderBottom = '1px solid #00ff00';
  header.style.paddingBottom = '5px';

  const titleSpan = document.createElement('span');
  titleSpan.textContent = title;

  const arrow = document.createElement('span');
  arrow.textContent = '►';
  arrow.style.fontSize = '1.4rem';

  header.appendChild(titleSpan);
  header.appendChild(arrow);
  chapterDiv.appendChild(header);

  const songList = document.createElement('div');
  songList.style.display = 'none';
  songList.style.marginTop = '5px';

  songs.forEach(song => {
    const songDiv = document.createElement('div');
    songDiv.dataset.src = song;
    songDiv.textContent = song.split('/').pop().replace('.mp3', '');
    songDiv.style.cursor = 'pointer';
    songDiv.style.padding = '2px 0';

    songDiv.addEventListener('click', () => {
      if (!toggleMusic.checked) return;

      bgm.src = song;
      bgm.play();
      bgm.volume = volumeSlider.value;
      updateCurrentSong(songDiv);
    });

    songDiv.addEventListener('mouseenter', () => {
      if (songDiv !== currentSongDiv) songDiv.style.color = 'gold';
    });
    songDiv.addEventListener('mouseleave', () => {
      if (songDiv !== currentSongDiv) songDiv.style.color = '#00ff00';
    });

    songList.appendChild(songDiv);
  });

  header.addEventListener('click', () => {
    if (songList.style.display === 'none') {
      songList.style.display = 'block';
      arrow.textContent = '▼';
    } else {
      songList.style.display = 'none';
      arrow.textContent = '►';
    }
  });

  chapterDiv.appendChild(songList);
  return chapterDiv;
}

// Function to highlight current song
function updateCurrentSong(newSongDiv) {
  if (currentSongDiv) {
    currentSongDiv.style.color = '#00ff00';
    currentSongDiv.textContent = currentSongDiv.textContent.replace(' 🔊', '');
  }
  newSongDiv.style.color = 'white';
  newSongDiv.textContent += ' 🔊';
  currentSongDiv = newSongDiv;
}

// Append chapters
jukeboxMenu.appendChild(createChapter('DELTARUNE Chapter 1 OST', CH1OST));
jukeboxMenu.appendChild(createChapter('DELTARUNE Chapter 2 OST', CH2OST));
jukeboxMenu.appendChild(createChapter('DELTARUNE Chapters 3+4 OST', CH3_4OST));

// Jukebox toggle button
const jukeboxBtn = document.getElementById('jukeboxBtn');
let menuOpen = false;
jukeboxBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  jukeboxMenu.style.display = menuOpen ? 'flex' : 'none';
});
