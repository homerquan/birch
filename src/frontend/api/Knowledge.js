import fetch from 'isomorphic-fetch';
import config from '../config';

class Knowledge {  
  static get() {
    const request = new Request(config.api.clientUrl+'/api/knowledge', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });


    return fetch(request).then(response => {
      return response.json();
    });
  } 

  static set(text) {
    const request = new Request('/rest-api/knowledge', {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({text:text})
    });


    return fetch(request).then(response => {
      return response.json();
    });
  } 
}

export default Knowledge;