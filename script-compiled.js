'use strict';

var request = new Request('/videos.json', { method: 'GET' });
var json;

var bilnumer;
var strengur;
var json;
var results = document.querySelector('.body');
var div0, div1, div2, div3, div4, div5, link, mynd, h1, h2, timinn, p1, i, j;
var videoSida = '/video.html?id=';

fetch(request).then(function (response) {
  if (response.status === 200) {
    return response.json();
  }
  throw new Error('Something went wrong on api server!');
}).then(function (response) {
  console.debug(response);
  json = response;
  prenta(json);
  addText(json);
}).catch(function (error) {
  console.error(error);
});

function prenta(strengur) {
  console.log(strengur);
  console.log(strengur.videos[0]);
  console.log(strengur.categories[0].videos[0]);
}

function addText(obj) {
  div0 = document.createElement('div');

  for (j = 0; j < obj.categories.length; j++) {
    div1 = document.createElement('div');
    div2 = document.createElement('div');
    div5 = document.createElement('div');
    h1 = document.createElement('h1');
    div2.appendChild(h1);
    div1.appendChild(div2);
    h1.appendChild(document.createTextNode(obj.categories[j].title));
    div0.appendChild(div1);
    div1.setAttribute('class', 'row kafli');
    div2.setAttribute('class', 'col');
    div5.setAttribute('class', 'row');

    for (i = 0; i < obj.categories[j].videos.length; i++) {

      div3 = document.createElement('div');
      div4 = document.createElement('div');
      link = document.createElement('a');
      mynd = document.createElement('img');
      h2 = document.createElement('h2');
      p1 = document.createElement('p');
      timinn = document.createElement('div');
      div3.appendChild(div4);
      div4.appendChild(link);
      link.appendChild(mynd);
      div4.appendChild(timinn);
      div4.appendChild(h2);
      div4.appendChild(p1);

      div3.setAttribute('class', 'col col-12 col-m-6 col-l-4');
      link.setAttribute('href', videoSida + obj.videos[obj.categories[j].videos[i] - 1].id);
      div4.setAttribute('class', 'container');
      mynd.src = obj.videos[obj.categories[j].videos[i] - 1].poster;
      mynd.setAttribute('class', 'mynd');
      timinn.setAttribute('class', 'timinn');
      mynd.setAttribute('id', obj.videos[obj.categories[j].videos[i] - 1].id);
      p1.appendChild(document.createTextNode(timiSidan(obj.videos[obj.categories[j].videos[i] - 1].created)));
      h2.appendChild(document.createTextNode(obj.videos[obj.categories[j].videos[i] - 1].title));
      timinn.appendChild(document.createTextNode(lengdMyndbands(obj.videos[obj.categories[j].videos[i] - 1].duration)));
      div5.appendChild(div3);
    }
    div0.appendChild(div5);
  }
  results.appendChild(div0);
}

function timiSidan(msek) {
  var d = new Date();
  var timi = d - msek;
  if (Math.floor(timi / 1000 / 60 / 60 / 24 / 365) > 0) {
    return 'Fyrir ' + Math.floor(timi / 1000 / 60 / 60 / 24 / 365) + ' árum síðan';
  } else if (Math.floor(timi / 1000 / 60 / 60 / 24 / 30) > 0) {
    return 'Fyrir ' + Math.floor(timi / 1000 / 60 / 60 / 24 / 30) + ' mánuðum síðan';
  } else if (Math.floor(timi / 1000 / 60 / 60 / 24 / 7) > 0) {
    return 'Fyrir ' + Math.floor(timi / 1000 / 60 / 60 / 24 / 7) + ' vikum síðan';
  } else if (Math.floor(timi / 1000 / 60 / 60 / 24) > 0) {
    return 'Fyrir ' + Math.floor(timi / 1000 / 60 / 60 / 24) + ' dögum síðan';
  } else return 'Fyrir ' + Math.floor(timi / 1000 / 60 / 60) + ' sek síðan';
}

function lengdMyndbands(sek) {
  var min = Math.floor(sek / 60);
  var sek = Math.floor(sek % 60);
  if (sek < 10) {
    sek = '0' + sek;
  }
  if (min < 10) {
    min = '0' + min;
  }
  var skil = min + ':' + sek;
  return skil;
}

//# sourceMappingURL=script-compiled.js.map