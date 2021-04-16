const player = document.getElementById('player');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volUpBtn = document.getElementById('vol-up');
const volDownBtn = document.getElementById('vol-down');
const loopBtn = document.getElementById('loop');
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const volContainer = document.getElementById('vol-container');
const volProgress = document.getElementById('vol-progress');

// Titres présents dans la liste de lecture
const songs = ['2-yaperson', 'lof1-yaperson','lofi160bpm-yaperson'];

// Variable
let songIndex = 0;
let isStoppeed = true;
let islooping = true;

// Volume
volProgress.style.width = `${audio.volume * 100}%`;

// loop color
loopBtn.querySelector('i.fas').style.color = '#00FF00';

const currentSong = songs[songIndex];

// chargement des details
loadSong(currentSong);

// Recupere les details du son
function loadSong(song){
  title.innerText = song;
  audio.src = `./assets/music/${song}.mp3`;
  cover.src = `./assets/img/${song}.jpg`;
}

// Liste des événement du DOM
audio.addEventListener('error' ,  audioError);
audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', playLoop);
playBtn.addEventListener('click', playPause);
stopBtn.addEventListener('click', stopSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
volDownBtn.addEventListener('click', reduceSongVol);
volUpBtn.addEventListener('click', increaseSongVol);
volContainer.addEventListener('click', updateVolume);
progressContainer.addEventListener('click', setProgress);
loopBtn.addEventListener('click', changeLoopState);

function changeClasses(e, c1, c2){
  e.classList.remove(c1);
  e.classList.add(c2);
}

// lance le son
function playSong(song){
  /* Je l'ai enlever car il me posait des problemes, ne pas hésiter a la remetre si besoin
  if(isStoppeed){
    loadSong(song);
    cover.alt = song;
  }*/
  changeClasses(playBtn.querySelector('i.fas'),'fa-play','fa-pause');
  playBtn.querySelector('i.fas').style.color = '#00FF00';
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
  /*
  if(isPlaying){
    pauseSong();
  }
  else{
    playSong();
  }
  */ 
}
// Precedent
function prevSong(){
  stopSong();
  songIndex -- ;
  songIndex < 0 ? songIndex = songs.length - 1 : songIndex;
  loadSong(songs[songIndex]);
  playSong(songs[songIndex]);
}
// Suivant
function nextSong(){
  stopSong();
  songIndex ++ ;
  songIndex > songs.length - 1 ? songIndex = 0 : songIndex;
  loadSong(songs[songIndex]);
  playSong(songs[songIndex]);
}
//Tien a jour la progress bar du son
function updateProgressBar(e){
  const {duration, currentTime} = e.target;
  const progressPersent = (currentTime / duration) * 100; // calcul de la progression
  progress.style.width = `${progressPersent}%`;
  console.log( e.target); // e.targer recupere le son et le console.log l'affiche dans la console 
}
// Met a jour la bar en fonction du click 
function setProgress(e){
  const width  = this.clientWidth;
  const clickX = e.offsetX;
  if(!player.classList.contains('stop')){
    audio.currentTime = (clickX / width) * audio.duration // calcul pour jouer le son en fonction de l'endroit ou on click su la progress bar
  }
  //console.log(this.clientWidth, e.offsetX); // affiche la taille de l'element et l'endroit ou on a cliqué
}
// Diminue le volume
function reduceSongVol(){
  if (audio.volume > .1){
    audio.volume -= .1; // le volume max est 1
    volProgress.style.width = `${audio.volume * 100}%`;
  }
  if(audio.volume <= .1){
    audio.volume = 0.0;
    volProgress.style.width = `0`;
    audio.muted = true;
    changeClasses(volDownBtn.querySelector('i.fas'), 'fa-volume-down', 'fa-volume-mute');
  }
  if (audio.volume <= .5){
    changeClasses(volUpBtn.querySelector('i.fas'), 'fa-volume-up', 'fa-volume-down');
  }
}
// Augmente le volume
function increaseSongVol(){
  if (audio.volume < .9){
    audio.muted = false;
    audio.volume += .1;
    volProgress.style.width = `100%`;
    changeClasses(volDownBtn.querySelector('i.fas'), 'fa-volume-mute', 'fa-volume-down');
  }
  if (audio.volume > .5){
    changeClasses(volUpBtn.querySelector('i.fas'), 'fa-volume-down', 'fa-volume-up');
  }
  if (audio.volume > .9){
    audio.volume = 1.0;
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
    loopBtn.querySelector('i.fas').style.color = '#00FF00';
  }
  else{
    loopBtn.querySelector('i.fas').style.color = '#000';
  }
}
// Definie la lecture en boucle ou non
function playLoop(){ 
  if (islooping){ nextSong();}
  else if(songIndex >= songs.length -1 && islooping){
    nextSong();
    console.log('test');
  }
  
  else {
    stopSong();
  }
}


// Renvoi une erreur si le son n'est pas trouvé
function audioError(){
  title.innerText = "Erreur lors du chargement";
}