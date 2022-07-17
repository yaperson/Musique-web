
import musicRepertory from '../../services/music.js'

const player = document.getElementById('player');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const loopBtn = document.getElementById('loop');
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const volDownBtn = document.getElementById('vol-down');
const volContainer = document.getElementById('vol-container');
const volProgress = document.getElementById('vol-progress');

/***********************************/
const FutureTitle = document.getElementById('FutureTitle');
const FutureCover = document.getElementById('FutureCover');

const PastTitle = document.getElementById('PastTitle');
const PastCover = document.getElementById('PastCover');

const previewTitle = document.getElementById('previewTitle');
const previewCover = document.getElementById('previewCover');

/**********************************/

// Titres présents dans la liste de lecture
// const songs = ['guitaredelireStreaming','euroBite3333','cc','instru1','girlgirlgirl remix v1','tzrep-yaperson', 'gtrstl-2' ,'pasDeTitre-yaperson','2-yaperson', 'lof1-yaperson','lofi160bpm-yaperson','upsilon-yaperson'];
let songs = [];
// Titres récupérés grace a l'api
let data = await musicRepertory.musicList()
console.log(data);
for (let item of data.musicList) {
  songs = item;
}

// Variable
let songIndex = 0;
let previewSongIndex = songIndex;
let FsongIndex = 1;
let PsongIndex = songs.length - 1;
let isStoppeed = true;
let islooping = true;

// Volume
volProgress.style.width = `${audio.volume * 100}%`;

// loop color
loopBtn.querySelector('i.fas').style.color = '#0AD3FF';

const currentSong = songs[songIndex];
const FutureSong = songs[FsongIndex];
const PastSong = songs[PsongIndex];
const previewSong = songs[previewSongIndex];

// chargement des details
loadSong(currentSong);

if (screen.width > 600){
loadFutureSong(FutureSong)
loadPastSong(PastSong)
loadPreviewSong(previewSong)
}
// Recupere les details du son
function loadSong(song){
  title.innerText = song;
  audio.src = `./music/${song}`;
  console.log(audio.src)
  // audio.src = `/../../../music/${song}.mp3`;
  cover.src = `./assets/img/noCover.svg`;
  // cover.src = `./assets/img/${song}.jpg` || `./assets/img/NoImage.png`;
}

function loadFutureSong(song){
  FutureTitle.innerText = song;
  FutureCover.src = `./assets/img/NoImage.png`;
  // FutureCover.src = `./assets/img/${song}.jpg` || `./assets/img/NoImage.png`;
}

function loadPastSong(song){
  PastTitle.innerText = song;
  PastCover.src = `./assets/img/NoImage.png`;
  // PastCover.src = `./assets/img/${song}.jpg` || `./assets/img/NoImage.png`;
}

function loadPreviewSong(song){
  previewTitle.innerText = song;
  previewCover.src = `./assets/img/NoImage.png`;
  // previewCover.src = `./assets/img/${song}.jpg` || `./assets/img/NoImage.png`;
}

// Liste des événement du DOM
audio.addEventListener('error' ,  audioError);
audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', playLoop);
playBtn.addEventListener('click', playPause);
stopBtn.addEventListener('click', stopSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
volDownBtn.addEventListener('click', muteSong); // mute le son
volContainer.addEventListener('click', updateVolume);
progressContainer.addEventListener('click', setProgress);
loopBtn.addEventListener('click', changeLoopState);

function changeClasses(e, c1, c2){
  e.classList.remove(c1);
  e.classList.add(c2);
}

// lance le son
function playSong(song){
 changeClasses(playBtn.querySelector('i.fas'),'fa-play','fa-pause');
 playBtn.querySelector('i.fas').style.color = '#0AD3FF';
 changeClasses(player, 'stop', 'play');
 audio.play(); 
}

// Met en pause
function pauseSong(){
  player.classList.remove('play');
  changeClasses(playBtn.querySelector('i.fas'),'fa-pause','fa-play');
  playBtn.querySelector('i.fas').style.color = '#000';
  audio.pause();
}
// Arrete le son
function stopSong(){
  playBtn.querySelector('i.fas').style.color = '#000';
  changeClasses(playBtn.querySelector('i.fas'),'fa-pause','fa-play');
  changeClasses(player, 'play', 'stop');
  //title.innerText = 'Titre';
  audio.pause();
  audio.currentTime = 0;
  cover.alt = '';
  isStoppeed = true;
}
// Lence ou arrete la lecture
function playPause (){
  const isPlaying = player.classList.contains('play');
  isPlaying ? pauseSong() : playSong(currentSong); // résume ce qui est en dessous
}
// Precedent
function prevSong(){
  stopSong();
  songIndex -- ;
  FsongIndex -- ;   //ajout récent
  PsongIndex -- ;   //ajout récent
  previewSongIndex -- ;   //ajout récent

  PsongIndex <  0 ? PsongIndex = songs.length -1 : PsongIndex;  //ajout récent
  FsongIndex <  0 ? FsongIndex = songs.length -1 : FsongIndex;  //ajout récent
  songIndex < 0 ? songIndex = songs.length - 1 : songIndex;
  previewSongIndex < 0 ? previewSongIndex = songs.length - 1 : previewSongIndex;
  loadSong(songs[songIndex]);

  if (screen.width > 600){
  loadFutureSong(songs[FsongIndex]);  //ajout récent
  loadPastSong(songs[PsongIndex]);  //ajout récent
  loadPreviewSong(songs[previewSongIndex]);  //ajout récent
  }
  

  playSong(songs[songIndex]);
}
// Suivant
function nextSong(){
  stopSong();
  songIndex ++ ;

  PsongIndex ++ ;  //ajout récent
  FsongIndex ++ ;  //ajout récent
  previewSongIndex ++ ;  //ajout récent
  PsongIndex > songs.length - 1 ? PsongIndex = 0 : PsongIndex;  //ajout récent
  FsongIndex > songs.length - 1 ? FsongIndex = 0 : FsongIndex;  //ajout récent
  previewSongIndex > songs.length - 1 ? previewSongIndex = 0 : previewSongIndex;  //ajout récent

  songIndex > songs.length - 1 ? songIndex = 0 : songIndex;

  // setTimeout(function(){

  loadSong(songs[songIndex]);

  if (screen.width > 600){
  loadFutureSong(songs[FsongIndex])  // ajout récent
  loadPastSong(songs[PsongIndex]);  //ajout récent
  loadPreviewSong(songs[previewSongIndex]);  //ajout récent
  }

  playSong(songs[songIndex]);

}
//Tien a jour la progress bar du son
function updateProgressBar(e){
  const {duration, currentTime} = e.target;
  const progressPersent = (currentTime / duration) * 100; // calcul de la progression
  progress.style.width = `${progressPersent}%`;
}
// Met a jour la bar en fonction du click 
function setProgress(e){
  const width  = this.clientWidth;
  const clickX = e.offsetX;
  if(!player.classList.contains('stop')){
    audio.currentTime = (clickX / width) * audio.duration // calcul pour jouer le son en fonction de l'endroit ou on click su la progress bar
  }
}

// TODO : mute le son
let state = 0;

function muteSong(){
  switch (state) {
    case 0: 
      state = 1;
      audio.muted = true; 
      changeClasses(volDownBtn.querySelector('i.fas'), 'fa-volume-down', 'fa-volume-mute');
      break;
    case 1:
      state = 0;
      audio.muted = false;
      changeClasses(volDownBtn.querySelector('i.fas'), 'fa-volume-mute', 'fa-volume-down');
      break;
    }
}


// Met a jour le volume par le click de l'utilisateur
function updateVolume(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;

  audio.volume = (clickX / width); // calcule le volume par raport au pourcentage de la progress bar volume 
  volProgress.style.width = `${audio.volume * 100}%`;
}
// active la lecture en boucle
function changeLoopState(){
  islooping === true ? islooping = false : islooping = true;
  if (islooping){
    loopBtn.querySelector('i.fas').style.color = '#0AD3FF';
  }
  else{
    loopBtn.querySelector('i.fas').style.color = '#000';
  }
}
// Definie la lecture en boucle ou non
function playLoop(){ 
  if (islooping){ nextSong();}
  else {
    stopSong();
  }
}

// Renvoi une erreur si le son n'est pas trouvé
function audioError(){
  title.innerText = "Erreur lors du chargement";
}


// Test toutch event

document.addEventListener('touchstart', function(e){
  console.log(e.target);
  if (e.target === cover) {
    playPause();
  }
})
