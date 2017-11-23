'use strict';

function removeOverlay() {
  var overlay = document.querySelector('.video__overlay');
  var sign = overlay.querySelector('img');
  overlay.classList.remove('video__overlay');
  overlay.classList.add('video__notoverlay');
  overlay.removeChild(sign);
  sign = document.querySelector('.playNpause');
  sign.src = 'img/pause.svg';
}

function setOverlay() {
  var overlay = document.querySelector('.video__notoverlay');
  var sign = document.createElement('img');
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
  var videoSigns = document.querySelectorAll('.video__sign');
  videoSigns.forEach(function (e) {
    e.classList.remove('video__sign__border');
  });
}

function playOrPause() {
  var video = document.querySelector('.video');
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
  var video = document.querySelector('.video');
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
  var video = document.querySelector('.video');
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
  var video = document.querySelector('.video');
  if (this.classList[1] === 'backward') {
    video.currentTime -= 3;
  } else {
    video.currentTime += 3;
  }
  removeAllBorders();
  this.classList.add('video__sign__border');
}

function settingsForEvents() {
  var videoOptions = document.querySelectorAll('.video__sign');
  videoOptions.forEach(function (e) {
    var classList = e.classList[1];
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
  var overlay = document.querySelector('.video__overlay');
  var overlaySign = overlay.querySelector('img');
  overlaySign.addEventListener('click', playOrPause);
}

function villuskilabod() {
  var grid = document.querySelector('.main__grid');
  var main = document.querySelector('main');
  var h1 = document.createElement('h1');
  var h2 = document.createElement('h2');
  var textNode = document.createTextNode('error');
  grid.hidden = true;
  h1.appendChild(textNode);
  main.appendChild(h1);
  textNode = document.createTextNode('Myndband fannst ekki');
  h2.appendChild(textNode);
  main.appendChild(h2);
}

function removeBuffering() {
  var buff = document.querySelector('.buff');
  var main = document.querySelector('main');
  main.removeChild(buff);
}

function resolve(response) {
  var url = document.URL;
  var id = url.match('./?id=(.*)');
  var grid = document.querySelector('.main__grid');
  var eid = void 0;
  var video = void 0;
  var title = void 0;
  var videoElement = void 0;
  response.videos.forEach(function (e) {
    eid = e.id.toString();
    if (eid === id[1]) {
      video = e.video.toString();
      title = e.title.toString();
    }
  });

  if (!video) {
    removeBuffering();
    villuskilabod();
    return;
  }
  var node = document.createTextNode(title);
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
  var main = document.querySelector('main');
  var buff = document.createElement('h1');
  var textNode = document.createTextNode('Hleð inn gögn....');
  buff.appendChild(textNode);
  buff.classList.add('buff');
  main.appendChild(buff);
}

function setUp() {
  var request = new Request('./videos.json', { method: 'GET' });
  fetch(request).then(function (response) {
    if (response.status === 200) {
      return response.json();
    }

    throw new Error('Something went wrong on api server!');
  }).then(function (response) {
    console.debug(response);
    resolve(response);
  }).catch(function (error) {
    console.error(error);
  });
}
buffering();
document.addEventListener('DOMContentLoaded', setUp);

//# sourceMappingURL=video-compiled.js.map