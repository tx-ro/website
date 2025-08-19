let currentAudio = null;
let fadeInterval = null;

const jukebox = {
  chapters: {
    "Chapter 1 OST": [
      "001 ANOTHER HIM",
      "002 Beginning",
      "003 School",
      "009 Lancer",
      "010 Rude Buster",
      "011 Empty Town",
      "013 Field of Hopes and Dreams",
      "018 Quiet Autumn",
      "021 Vs. Lancer",
      "028 Hip Shop",
      "033 THE WORLD REVOLVING",
      "034 Friendship",
      "038 You Can Always Come Home",
      "040 Before the Story"
    ].map(file => ({ name: file, path: `assets/jukebox/CH1OST/${file}.mp3` })),

    "Chapter 2 OST": [
      "041 Faint Glow",
      "042 Girl Next Door",
      "043 My Castle Town",
      "046 A CYBER'S WORLD-",
      "055 Smart Race",
      "057 WELCOME TO THE CITY",
      "058 Mini Studio",
      "062 Spamton",
      "063 NOW'S YOUR CHANCE TO BE A",
      "066 Pandora Palace",
      "068 Acid Tunnel of Love",
      "069 It's Pronounced -Rules-",
      "070 Lost Girl",
      "072 Attack of the Killer Queen",
      "073 Giga Size",
      "075 Knock You Down !!",
      "079 BIG SHOT",
      "083 Chill Jailbreak Alarm To Study And Relax To",
      "084 You Can Always Come Home"
    ].map(file => ({ name: file, path: `assets/jukebox/CH2OST/${file}.mp3` })),

    "Chapter 3+4 OST": [] // empty for now
  },

  playSong(path) {
    if (currentAudio) {
      fadeOut(() => {
        startNewSong(path);
      });
    } else {
      startNewSong(path);
    }
  }
};

function startNewSong(path) {
  currentAudio = new Audio(path);
  currentAudio.volume = 0;
  currentAudio.loop = true;
  currentAudio.play();

  fadeIn();
}

function fadeIn() {
  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (currentAudio && currentAudio.volume < 1) {
      currentAudio.volume = Math.min(currentAudio.volume + 0.05, 1);
    } else {
      clearInterval(fadeInterval);
    }
  }, 100);
}

function fadeOut(callback) {
  clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    if (currentAudio && currentAudio.volume > 0.05) {
      currentAudio.volume = Math.max(currentAudio.volume - 0.05, 0);
    } else {
      clearInterval(fadeInterval);
      if (currentAudio) currentAudio.pause();
      currentAudio = null;
      if (callback) callback();
    }
  }, 100);
}
