toggleNeon = document.getElementById('toggleNeon')
Neon = document.getElementById('yap')
NeonOn = true

function NeonState() {
  if (NeonOn == true) {
    NeonOn = false
    Neon.classList.remove('on')
    Neon.classList.add('of')
    toggleNeon.classList.remove('toggleOn')
  }
  else {
    NeonOn = true
    Neon.classList.add('on')
    Neon.classList.remove('of')
    toggleNeon.classList.add('toggleOn')
  }
}

// effet parallax
let past = document.getElementById("past-music");
let pres = document.getElementById("music-container");
let futu = document.getElementById("futur-music");
let test = document.getElementById("container");
if (screen.width > 600) {
  window.addEventListener('scroll', function () {
    var value = window.scrollY;
    past.style.bottom = value * 1 + 'px';
    pres.style.top = value * 1.5 + 'px';
    past.style.bottom = value * 1 + 'px';
    test.style.margin = value * 0.3 + 'px';
  })
}