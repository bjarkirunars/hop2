var poster;
var video;
var title;

function start() {

	
};



function resolve(response){

	var url = document.URL + 'id=2';
	var id = url.match('/id=(.*)');

	var eid;

	 response.videos.forEach(function(e){
	 	eid = e.id.toString();
		if(eid === id[1]) {
			poster = e.poster;
			video = e.video;
			title = e.title;
			// duration = e.duration;
			// created = e.created;
		}
	});

	var videoElement = document.querySelector('.video__heading');
	var node = document.createTextNode(title);
	videoElement.appendChild(node);

	videoElement = document.querySelector('.video');
	videoElement.setAttribute("src", video);

};


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


document.addEventListener('DOMContentLoaded', start());
