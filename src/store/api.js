import ES6Promise from 'es6-promise';
import 'isomorphic-fetch';

ES6Promise.polyfill();

const api = (url, body, method) => () => {

  return fetch(url, {
    method: method || 'GET',
    body: JSON.stringify(body),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(response => {
    if (!response.ok) {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText
      });
    }
    return response.json()
  });
}

export default api;