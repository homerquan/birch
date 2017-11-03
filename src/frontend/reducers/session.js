import {createReducer} from '../utils';
import {ACTION_TYPES} from '../constants';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';

const initialState = {
    token: null,
    userName: null,
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
      return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'statusText': null
       });
    case ACTION_TYPES.LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'statusText': `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
        });
    case ACTION_TYPES.LOGOUT_USER:
      return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'userName': null,
            'statusText': 'You have been successfully logged out.'
        });
    default: 
      return state;
  }
}