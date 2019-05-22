import { request } from 'graphql-request';
import config from '../config';


class Session {
  static login(credentials) {
    const query = `
    mutation login($username:String!, $password: String!) {
      login (username:$username,password:$password) {
       token
       refreshToken
      }
    }
    `;
    return request(config.clientUrl, query, credentials).then(
      response => response.login,
    ).catch((e) => {
      console.error(e);
    });
  }

  static refresh(refreshToken) {
    const query = `
    mutation refresh($refreshToken:String!) {
      refresh (refreshToken:$refreshToken) {
       token
       refreshToken
      }
    }
    `;
    return request(config.clientUrl, query, {refreshToken}).then(
      response => response.refresh,
    ).catch((e) => {
      console.error(e);
    });
  }
}

export default Session;
