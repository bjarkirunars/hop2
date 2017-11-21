'use strict';

var request = new Request('/videos.json', { method: 'GET' });
fetch(request).then(function (response) {
  if (response.status === 200) {
    return response.json();
  }
  throw new Error('Something went wrong on api server!');
}).then(function (response) {
  console.debug(response);
}).catch(function (error) {
  console.error(error);
});

console.log(fetch(request));

//# sourceMappingURL=script-compiled.js.map