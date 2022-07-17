const divInstall = document.getElementById('installContainer');
const butInstall = document.getElementById('butInstall');

createInstallContainer()

if("serviceWorker" in navigator){
    console.log("serviceWorker installer");
    navigator.serviceWorker.register("/musique/ServiceWorker.js");
}

if (window.location.protocol === 'http:') {
    const requireHTTPS = document.getElementById('requireHTTPS');
    const link = requireHTTPS.querySelector('a');
    link.href = window.location.href.replace('http://', 'https://');
    requireHTTPS.classList.remove('hidden');
}



function createInstallContainer() {
  let installContainer = document.createElement('div')
  installContainer.setAttribute('id','installContainer')
  installContainer.classList.add('null')
  
  createInstallBtn()

  return installContainer

  function createInstallBtn() {
    let installBtn = document.createElement('button')
    installBtn.setAttribute('id','butInstall')
    installBtn.classList.add('null')
    installBtn.setAttribute('type', 'button')
    installBtn.innerText = "installer"
  }

}

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Remove the 'hidden' class from the install button container
  divInstall.classList.toggle('hidden', false);
});
butInstall.addEventListener('click', async () => {
    console.log('👍', 'butInstall-clicked');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log('👍', 'userChoice', result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    divInstall.classList.toggle('hidden', true);
  });
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});

var button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
    Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
            randomNotification();
        }
    });
});

function randomNotification() {
    var notifTitle = 'News weekSong.';
    var notifBody = 'Version 2 is available ! More music, swipe right/left and press on the cover to play or stop music.';
    var notifImg = 'assets/icons/icon.ico';
    var options = {
        body: notifBody,
        icon: notifImg
    }
    var notif = new Notification(notifTitle, options);
    // setTimeout(randomNotification, 3000000000);
}
if (window.parent.length){randomNotification()}

window.addEventListener('load', randomNotification())