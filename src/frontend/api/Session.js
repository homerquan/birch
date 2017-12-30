import fetch from 'isomorphic-fetch';
import config from '../config';

class Session {  
  static login(credentials) {
    const request = new Request(config.clientUrl+'/auth/local', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify(credentials)
    });


    return fetch(request).then(response => {
      return response.json();
    }).catch(e => {
      console.error(e);
    });
  } 

  static refresh(refreshToken) {
    const request = new Request(config.clientUrl+'/auth/local_refresh', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify({refreshToken})
    });


    return fetch(request).then(response => {
      return response.json();
    });
  } 
}

export default Session;