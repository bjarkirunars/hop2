const request = new Request('/videos.json', { method: 'GET' });
let min;
let sek;
let skil;
const results = document.querySelector('.body');
let div0;
let div1;
let div2;
let div3;
let div4;
let div5;
let link;
let mynd;
let h1;
let h2;
let timinn;
let p1;
let i;
let j;
let texti;
const videoSida = '/video.html?id=';

function removeBuffering() {
  const buff = document.querySelector('.buff');
  const main = document.querySelector('main');
  main.removeChild(buff);
}

function buffering() {
  const main = document.querySelector('main');
  const buff = document.createElement('h1');
  const textNode = document.createTextNode('Hleð inn gögn....');
  buff.appendChild(textNode);
  buff.classList.add('buff');
  main.appendChild(buff);
}

function timiSidan(msek) {
  const d = new Date();
  const timi = d - msek;
  if (Math.floor(timi / 1000 / 60 / 60 / 24 / 365) > 0) {
    texti = `Fyrir ${Math.floor(timi / 1000 / 60 / 60 / 24 / 365)} árum síðan`;
    return texti;
  } else if (Math.floor(timi / 1000 / 60 / 60 / 24 / 30) > 0) {
    texti = `Fyrir ${Math.floor(timi / 1000 / 60 / 60 / 24 / 30)} mánuðum síðan`;
    return texti;
  } else if (Math.floor(timi / 1000 / 60 / 60 / 24 / 7) > 0) {
    texti = `Fyrir ${Math.floor(timi / 1000 / 60 / 60 / 24 / 7)} vikum síðan`;
    return texti;
  } else if (Math.floor(timi / 1000 / 60 / 60 / 24) > 0) {
    texti = `Fyrir ${Math.floor(timi / 1000 / 60 / 60 / 24)} dögum síðan`;
    return texti;
  }
  texti = `Fyrir ${Math.floor(timi / 1000 / 60 / 60)} sek síðan`;
  return texti;
}

function lengdMyndbands(seconds) {
  min = Math.floor(seconds / 60);
  sek = Math.floor(seconds % 60);
  if (sek < 10) {
    sek = `0${sek}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  skil = `${min}:${sek}`;
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
  const grid = document.querySelector('.body');
  removeBuffering();
  grid.hidden = false;
}
function setUp() {
  fetch(request)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Something went wrong on api server!');
    })
    .then((response) => {
      console.debug(response);
      const json = response;
      addText(json);
    })
    .catch((error) => {
      console.error(error);
    });
}
buffering();
document.addEventListener('DOMContentLoaded', setUp);
