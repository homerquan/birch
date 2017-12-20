import fetch from 'isomorphic-fetch';

const config = require('../config');

class Session {  
  static login(credentials) {
    const request = new Request(config.apiUrl+'/auth/local', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }), 
      body: JSON.stringify(credentials)
    });


    return fetch(request).then(response => {
      return response.json();
    });
  } 
}

export default Session;