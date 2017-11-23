function removeOverlay() {
  const overlay = document.querySelector('.video__overlay');
  const sign = overlay.querySelector('img');
  overlay.classList.remove('video__overlay');
  overlay.classList.add('video__notoverlay');
  overlay.removeChild(sign);
}

function setOverlay() {
  const overlay = document.querySelector('.video__notoverlay');
  const sign = document.createElement('img');
  overlay.classList.remove('video__notoverlay');
  overlay.classList.add('video__overlay');
  sign.src = 'img/play.svg';
  sign.classList.add('video__overlay__play');
  sign.classList.add('video__sign');
  /* eslint-disable */
  sign.addEventListener('click', playOrPause);
  /* eslint-enable */
  overlay.insertBefore(sign, overlay.firstChild);
}

function removeAllBorders() {
  const videoSigns = document.querySelectorAll('.video__sign');
  videoSigns.forEach((e) => {
    e.classList.remove('video__sign__border');
  });
}

function playOrPause() {
  const video = document.querySelector('.video');
  const sign = document.querySelector('.playNpause');
  if (video.paused) {
    video.play();
    sign.src = 'img/pause.svg';
    removeOverlay();
  } else {
    video.pause();
    sign.src = 'img/play.svg';
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

function settingsForEvents() {
  const video = document.querySelector('.video');
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
      e.addEventListener('click', () => {
        video.currentTime -= 3;
        removeAllBorders();
        this.classList.add('video__sign__border');
      });
    } else if (classList === 'forward') {
      e.addEventListener('click', () => {
        video.currentTime += 3;
        removeAllBorders();
        this.classList.add('video__sign__border');
      });
    }
  });
  const overlay = document.querySelector('.video__overlay');
  const overlaySign = overlay.querySelector('img');
  overlaySign.addEventListener('click', playOrPause);
}

function resolve(response) {
  const url = document.URL;
  const id = url.match('/?id=(.*)');
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
  const node = document.createTextNode(title);
  videoElement = document.querySelector('.video__heading');
  videoElement.appendChild(node);
  videoElement = document.querySelector('.video');
  videoElement.setAttribute('src', video);
  videoElement.currentTime = 2.4;
  settingsForEvents();
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

document.addEventListener('DOMContentLoaded', setUp());
