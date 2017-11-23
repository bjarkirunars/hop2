function removeOverlay() {
  const overlay = document.querySelector('.video__overlay');
  let sign = overlay.querySelector('img');
  overlay.classList.remove('video__overlay');
  overlay.classList.add('video__notoverlay');
  overlay.removeChild(sign);
  sign = document.querySelector('.playNpause');
  sign.src = 'img/pause.svg';
}

function setOverlay() {
  const overlay = document.querySelector('.video__notoverlay');
  let sign = document.createElement('img');
  overlay.classList.remove('video__notoverlay');
  overlay.classList.add('video__overlay');
  sign.src = 'img/play.svg';
  sign.classList.add('video__overlay__play');
  sign.classList.add('video__sign');
  /* eslint-disable */
  sign.addEventListener('click', playOrPause);
  /* eslint-enable */
  overlay.insertBefore(sign, overlay.firstChild);
  sign = document.querySelector('.playNpause');
  sign.src = 'img/play.svg';
}

function removeAllBorders() {
  const videoSigns = document.querySelectorAll('.video__sign');
  videoSigns.forEach((e) => {
    e.classList.remove('video__sign__border');
  });
}

function playOrPause() {
  const video = document.querySelector('.video');
  if (video.paused) {
    video.play();
    removeOverlay();
  } else {
    video.pause();
    setOverlay();
  }
  if (this.classList.contains('playNpause')) {
    removeAllBorders();
    this.classList.add('video__sign__border');
  }
}

function muteOrUnmute() {
  const video = document.querySelector('.video');
  if (video.muted) {
    video.muted = false;
    this.src = 'img/mute.svg';
  } else {
    video.muted = true;
    this.src = 'img/unmute.svg';
  }
  removeAllBorders();
  this.classList.add('video__sign__border');
}

function fullscreen() {
  const video = document.querySelector('.video');
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
}

function backOrForward() {
  const video = document.querySelector('.video');
  if (this.classList[1] === 'backward') {
    video.currentTime -= 3;
  } else {
    video.currentTime += 3;
  }
  removeAllBorders();
  this.classList.add('video__sign__border');
}

function settingsForEvents() {
  const videoOptions = document.querySelectorAll('.video__sign');
  videoOptions.forEach((e) => {
    const classList = e.classList[1];
    if (classList === 'playNpause') {
      e.addEventListener('click', playOrPause);
    } else if (classList === 'sound') {
      e.addEventListener('click', muteOrUnmute);
    } else if (classList === 'fullscreen') {
      e.addEventListener('click', fullscreen);
    } else if (classList === 'backward') {
      e.addEventListener('click', backOrForward);
    } else if (classList === 'forward') {
      e.addEventListener('click', backOrForward);
    }
  });
  const overlay = document.querySelector('.video__overlay');
  const overlaySign = overlay.querySelector('img');
  overlaySign.addEventListener('click', playOrPause);
}

function villuskilabod() {
  const grid = document.querySelector('.main__grid');
  const main = document.querySelector('main');
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  let textNode = document.createTextNode('error');
  grid.hidden = true;
  h1.appendChild(textNode);
  main.appendChild(h1);
  textNode = document.createTextNode('Myndband fannst ekki');
  h2.appendChild(textNode);
  main.appendChild(h2);
}

function removeBuffering() {
  const buff = document.querySelector('.buff');
  const main = document.querySelector('main');
  main.removeChild(buff);
}

function resolve(response) {
  const url = document.URL;
  const id = url.match('/?id=(.*)');
  const grid = document.querySelector('.main__grid');
  let eid;
  let video;
  let title;
  let videoElement;
  response.videos.forEach((e) => {
    eid = e.id.toString();
    if (eid === id[1]) {
      video = e.video.toString();
      title = e.title.toString();
    }
  });

  if (!video) {
    villuskilabod();
    return;
  }
  const node = document.createTextNode(title);
  videoElement = document.querySelector('.video__heading');
  videoElement.appendChild(node);
  videoElement = document.querySelector('.video');
  videoElement.setAttribute('src', video);
  videoElement.currentTime = 2.4;
  videoElement.addEventListener('ended', setOverlay);
  removeBuffering();
  grid.hidden = false;
  settingsForEvents();
}

function buffering() {
  const main = document.querySelector('main');
  const buff = document.createElement('h1');
  const textNode = document.createTextNode('Hleð inn gögn....');
  buff.appendChild(textNode);
  buff.classList.add('buff');
  main.appendChild(buff);
}

function setUp() {
  const request = new Request('/videos.json', { method: 'GET' });
  fetch(request)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }

      throw new Error('Something went wrong on api server!');
    })
    .then((response) => {
      console.debug(response);
      resolve(response);
    })
    .catch((error) => {
      console.error(error);
    });
}
buffering();
document.addEventListener('DOMContentLoaded', setUp);
