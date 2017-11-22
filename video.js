
function setUp() {

	var request = new Request('/videos.json', { method: 'GET' });
	fetch(request)
		.then(function(response) {
		    if (response.status === 200) {
		      return response.json();
		    }
		    throw new Error('Something went wrong on api server!');
		  })
		  .then(function(response) {
		    console.debug(response);
		    resolve(response);
		  })
		  .catch(function(error) {
		    console.error(error);
		  });

};

function resolve(response){

	var url = document.URL;
	var id = url.match('/?id=(.*)');

	var eid, video, title;

	 response.videos.forEach(function(e){
	 	eid = e.id.toString();
		if(eid === id[1]) {
			video = e.video;
			title = e.title;
		}
	});

	 var videoElement = document.querySelector('.video__heading');
	 var node = document.createTextNode(title);
	 videoElement.appendChild(node);

	 videoElement = document.querySelector('.video');
	 videoElement.setAttribute("src", video);

	 settingsForEvents();

};


document.addEventListener('DOMContentLoaded', setUp());
var video = document.querySelector('.video');

function settingsForEvents() {

	var videoOptions = document.querySelectorAll('.video__sign');

	videoOptions.forEach(function(e) {

		var classList = e.classList;

		if(classList.contains("play&pause")) {
			e.addEventListener('click', playOrPause);
		}
		else if(classList.contains("sound")){
			e.addEventListener('click', muteOrUnmute);
		}
		else if(classList.contains("fullscreen")) {
			e.addEventListener('click', fullscreen);
		}
		else if(classList.contains("backward")) {
			e.addEventListener('click', function(){
				video.currentTime = video.currentTime - 3;
			});
		}
		else if(classList.contains("forward")) {
			e.addEventListener('click', function(){
				video.currentTime = video.currentTime + 3;
			});
		}
	});

	// her
	var overlay = document.querySelector('.video__overlay');
	var overlaySign = overlay.querySelector('img');
	overlaySign.addEventListener('click', function() {
		console.log('virkar?');
	})
}

function playOrPause() {
	
	if(video.paused) {
		video.play();
		this.src = "img/pause.svg";
		removeOverlay();
	}
	else {
		video.pause();
		this.src = "img/play.svg";
		setOverlay();
	}

}

function muteOrUnmute() {

	if(video.muted) {
		video.muted = false;
		this.src = "img/mute.svg";
	}
	else {
		video.muted = true;
		this.src = "img/unmute.svg";

	}

}

function fullscreen() {

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

function removeOverlay() {
	var overlay = document.querySelector('.video__overlay');
	var sign = overlay.querySelector('img');
	overlay.classList.remove('video__overlay');
	overlay.classList.add('video__notoverlay');
	overlay.removeChild(sign);
}

function setOverlay() {

	var overlay = document.querySelector('.video__notoverlay');
	overlay.classList.remove('video__notoverlay');
	overlay.classList.add('video__overlay');

	var sign = document.createElement('img');
	sign.src = "img/play.svg";
	sign.classList.add('video__overlay__play');
	sign.classList.add('video__sign');

	overlay.insertBefore(sign, overlay.firstChild);

}