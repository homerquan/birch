import {createReducer} from '../utils';
import {ACTION_TYPES} from '../constants';
import jwtDecode from 'jwt-decode';
import { Cookies } from 'react-cookie';
import config from '../config';

const cookies = new Cookies();

const initialState = {
    userId: null,
    userRole: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default function session(state = initialState, action) {
  switch(action.type) {
    case ACTION_TYPES.LOGIN_USER_REQUEST:
  	  return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    case ACTION_TYPES.LOGIN_USER_SUCCESS:
      const newState =  {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'token': action.payload.token,
            'refreshToken': action.payload.refreshToken,
            'userId': action.payload.userId,
            'userRole': action.payload.userRole,
            'statusText': null
      };
      cookies.set(config.sessionCookieName, JSON.stringify(newState), { path: '/', expires: 0 });
      return Object.assign({}, state, newState);
    case ACTION_TYPES.LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'refreshToken': null,
            'userId': null,
            'userRole': null,
            'statusText': `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
        });
    case ACTION_TYPES.LOGOUT_USER:
      cookies.remove(config.sessionCookieName);
      return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'refreshToken': null,
            'userId': null,
            'userRole': null,
            'statusText': 'You have been successfully logged out.'
        });
    default: 
      return state;
  }
}