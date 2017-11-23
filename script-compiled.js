'use strict';

var request = new Request('./videos.json', { method: 'GET' });
var min = void 0;
var sek = void 0;
var skil = void 0;
var results = document.querySelector('.body');
var div0 = void 0;
var div1 = void 0;
var div2 = void 0;
var div3 = void 0;
var div4 = void 0;
var div5 = void 0;
var link = void 0;
var mynd = void 0;
var h1 = void 0;
var h2 = void 0;
var timinn = void 0;
var p1 = void 0;
var i = void 0;
var j = void 0;
var texti = void 0;
var videoSida = './video.html?id=';

function removeBuffering() {
  var buff = document.querySelector('.buff');
  var main = document.querySelector('main');
  main.removeChild(buff);
}

function buffering() {
  var main = document.querySelector('main');
  var buff = document.createElement('h1');
  var textNode = document.createTextNode('Hleð inn gögn....');
  buff.appendChild(textNode);
  buff.classList.add('buff');
  main.appendChild(buff);
}

function timiSidan(msek) {
  var d = new Date();
  var timi = d - msek;
  if (Math.floor(timi / 1000 / 60 / 60 / 24 / 365) > 0) {
    texti = 'Fyrir ' + Math.floor(timi / 1000 / 60 / 60 / 24 / 365) + ' \xE1rum s\xED\xF0an';
    return texti;
  } else if (Math.floor(timi / 1000 / 60 / 60 / 24 / 30) > 0) {
    texti = 'Fyrir ' + Math.floor(timi / 1000 / 60 / 60 / 24 / 30) + ' m\xE1nu\xF0um s\xED\xF0an';
    return texti;
  } else if (Math.floor(timi / 1000 / 60 / 60 / 24 / 7) > 0) {
    texti = 'Fyrir ' + Math.floor(timi / 1000 / 60 / 60 / 24 / 7) + ' vikum s\xED\xF0an';
    return texti;
  } else if (Math.floor(timi / 1000 / 60 / 60 / 24) > 0) {
    texti = 'Fyrir ' + Math.floor(timi / 1000 / 60 / 60 / 24) + ' d\xF6gum s\xED\xF0an';
    return texti;
  }
  texti = 'Fyrir ' + Math.floor(timi / 1000 / 60 / 60) + ' sek s\xED\xF0an';
  return texti;
}

function lengdMyndbands(seconds) {
  min = Math.floor(seconds / 60);
  sek = Math.floor(seconds % 60);
  if (sek < 10) {
    sek = '0' + sek;
  }
  if (min < 10) {
    min = '0' + min;
  }
  skil = min + ':' + sek;
  return skil;
}

function addText(obj) {
  div0 = document.createElement('div');

  for (j = 0; j < obj.categories.length; j += 1) {
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

    for (i = 0; i < obj.categories[j].videos.length; i += 1) {
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
      texti = timiSidan(obj.videos[obj.categories[j].videos[i] - 1].created);
      p1.appendChild(document.createTextNode(texti));
      h2.appendChild(document.createTextNode(obj.videos[obj.categories[j].videos[i] - 1].title));
      texti = lengdMyndbands(obj.videos[obj.categories[j].videos[i] - 1].duration);
      timinn.appendChild(document.createTextNode(texti));
      div5.appendChild(div3);
    }
    div0.appendChild(div5);
  }
  results.appendChild(div0);
  var grid = document.querySelector('.body');
  removeBuffering();
  grid.hidden = false;
}
function setUp() {
  fetch(request).then(function (response) {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error('Something went wrong on api server!');
  }).then(function (response) {
    console.debug(response);
    var json = response;
    addText(json);
  }).catch(function (error) {
    console.error(error);
  });
}
buffering();
document.addEventListener('DOMContentLoaded', setUp);

//# sourceMappingURL=script-compiled.js.map