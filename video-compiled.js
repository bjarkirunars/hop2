'use strict';

function removeOverlay() {
  var overlay = document.querySelector('.video__overlay');
  var sign = overlay.querySelector('img');
  overlay.classList.remove('video__overlay');
  overlay.classList.add('video__notoverlay');
  overlay.removeChild(sign);
}

function setOverlay() {
  var overlay = document.querySelector('.video__notoverlay');
  var sign = document.createElement('img');
  overlay.classList.remove('video__notoverlay');
  overlay.classList.add('video__overlay');
  sign.src = 'img/play.svg';
  sign.classList.add('video__overlay__play');
  sign.classList.add('video__sign');
  sign.addEventListener('click', playOrPause);
  overlay.insertBefore(sign, overlay.firstChild);
}

function removeAllBorders() {
  var videoSigns = document.querySelectorAll('.video__sign');
  videoSigns.forEach(function (e) {
    e.classList.remove('video__sign__border');
  });
}

function playOrPause() {
  var video = document.querySelector('.video');
  var sign = document.querySelector('.playNpause');
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

function settingsForEvents() {
  var _this = this;

  var video = document.querySelector('.video');
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
      e.addEventListener('click', function () {
        video.currentTime -= 3;
        removeAllBorders();
        _this.classList.add('video__sign__border');
      });
    } else if (classList === 'forward') {
      e.addEventListener('click', function () {
        video.currentTime += 3;
        removeAllBorders();
        _this.classList.add('video__sign__border');
      });
    }
  });
  var overlay = document.querySelector('.video__overlay');
  var overlaySign = overlay.querySelector('img');
  overlaySign.addEventListener('click', playOrPause);
}

function resolve(response) {
  var url = document.URL;
  var id = url.match('/?id=(.*)');
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
  var node = document.createTextNode(title);
  videoElement = document.querySelector('.video__heading');
  videoElement.appendChild(node);
  videoElement = document.querySelector('.video');
  videoElement.setAttribute('src', video);
  videoElement.currentTime = 2.4;
  settingsForEvents();
}

function setUp() {
  var request = new Request('/videos.json', { method: 'GET' });
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

document.addEventListener('DOMContentLoaded', setUp());

//# sourceMappingURL=video-compiled.js.map