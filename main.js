const jukeboxBtn = document.getElementById('jukeboxBtn');
const jukeboxMenu = document.getElementById('jukeboxMenu');
const closeJukebox = document.getElementById('closeJukebox');
const jukeboxChapters = document.getElementById('jukeboxChapters');
const bgm = document.getElementById('bgm');

jukeboxBtn.addEventListener('click', () => {
  jukeboxMenu.style.display = 'flex';
});

closeJukebox.addEventListener('click', () => {
  jukeboxMenu.style.display = 'none';
});

const chapters = [
  { title: 'DELTARUNE Chapter 1 OST', songs: CH1OST },
  { title: 'DELTARUNE Chapter 2 OST', songs: CH2OST },
  { title: 'DELTARUNE Chapters 3+4 OST', songs: CH3_4OST }
];

function createJukebox() {
  jukeboxChapters.innerHTML = '';
  chapters.forEach((chapter) => {
    const chapterDiv = document.createElement('div');
    chapterDiv.className = 'chapter';

    const header = document.createElement('div');
    header.className = 'chapter-header';
    header.textContent = chapter.title;

    const arrow = document.createElement('span');
    arrow.textContent = '▶';
    header.appendChild(arrow);

    const songList = document.createElement('div');
    songList.className = 'chapter-songs';
    songList.style.display = 'none';

    chapter.songs.forEach(song => {
      const songDiv = document.createElement('div');
      const songName = song.split('/').pop().replace('.mp3','');
      songDiv.textContent = songName;
      songDiv.addEventListener('click', () => {
        if (bgm.src.endsWith(song)) return;
        let fadeOut = setInterval(() => {
          if(bgm.volume > 0.05){
            bgm.volume -= 0.05;
          } else {
            clearInterval(fadeOut);
            bgm.src = song;
            bgm.play();
            let fadeIn = setInterval(() => {
              if(bgm.volume < 1){
                bgm.volume += 0.05;
              } else {
                clearInterval(fadeIn);
              }
            }, 50);
          }
        }, 50);
      });
      songList.appendChild(songDiv);
    });

    header.addEventListener('click', () => {
      if(songList.style.display === 'none'){
        songList.style.display = 'block';
        arrow.textContent = '▼';
      } else {
        songList.style.display = 'none';
        arrow.textContent = '▶';
      }
    });

    chapterDiv.appendChild(header);
    chapterDiv.appendChild(songList);
    jukeboxChapters.appendChild(chapterDiv);
  });
}

createJukebox();
