const musicCont = document.querySelector("#music-container");
const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const audio = document.querySelector("#audio");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// setting up the songs to be called upon completion

const songs = ["madara", "Rage", "Happiness"];

// Keep Track of any Song Playing

let songIndex = 0;

// Initally Loading Song

loadSong(songs[songIndex]);

// song = songs[songIndex]

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;

  // Try to load .jpg first, then fallback to .png
  const imgJpg = `images/${song}.jpg`;
  const imgPng = `images/${song}.png`;

  // Use a generic cover if both images fail to load
  cover.onerror = function () {
    cover.src = imgPng; // Try .png if .jpg fails
    cover.onerror = function () {
      cover.src = "images/default.jpg"; // Fallback to a default image
    };
  };

  cover.src = imgJpg;

  // Set background image based on cover image
  document.body.style.backgroundImage = `url(${cover.src})`;
}

// Playng and Pausing Functions
function playSong() {
  musicCont.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

function prevSong() {
  if (songIndex > 0) {
    songIndex--;
  } else {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
}

function nextSong() {
  if (songIndex < songs.length - 1) {
    songIndex++;
  } else {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
playBtn.addEventListener("click", () => {
  const isPlaying = musicCont.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }

  // if(audio.paused) {
  //     audio.play();
  //     playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  // } else {
  //     audio.pause();
  //     playBtn.innerHTML = '<i class="fa fa-play"></i>';
  // }
});

function pauseSong() {
  musicCont.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

function updateProgress(e){

   const {duration, currentTime} = e.srcElement;
   const progressPercent = (currentTime / duration) * 100;
   progress.style.width = `${progressPercent}%`;
}

function setProgress(e){
const width = this.clientWidth;
const clientX = e.offsetX;
const duration = audio.duration;

audio.currentTime = (clientX / width) * duration;

}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time Update Event
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener('click', setProgress);
