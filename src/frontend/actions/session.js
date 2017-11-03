import {
  checkHttpStatus,
  parseJSON,
} from '../utils';
import {
  ACTION_TYPES,
} from '../constants';
import {
  push,
} from 'react-router-redux';
import jwtDecode from 'jwt-decode';
import fetch from 'isomorphic-fetch';
import SessionApi from '../api/Session';

export function loginUserSuccess(token) {
  sessionStorage.setItem('token', token);
  return {
    type: ACTION_TYPES.LOGIN_USER_SUCCESS,
    payload: {
      token,
    },
  };
}

export function loginUserFailure(error) {
  sessionStorage.removeItem('token');
  return {
    type: ACTION_TYPES.LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function loginUserRequest() {
  return {
    type: ACTION_TYPES.LOGIN_USER_REQUEST,
  };
}

export function logout() {
  sessionStorage.removeItem('token');
  return {
    type: ACTION_TYPES.LOGOUT_USER,
  };
}

export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    dispatch(push('/login'));
  };
}

export function loginUser(credentials, redirect = '/') {
  return function (dispatch) {
    dispatch(loginUserRequest());
    return SessionApi.login(credentials)
      .then((response) => {
        try {
          const decoded = jwtDecode(response.token);
          dispatch(loginUserSuccess(response.token));
          dispatch(push(redirect));
        } catch (e) {
          dispatch(loginUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token',
            },
          }));
        }
      })
      .catch((error) => {
        dispatch(loginUserFailure(error));
      });
  };
}

export function receiveProtectedData(data) {
  return {
    type: ACTION_TYPES.RECEIVE_PROTECTED_DATA,
    payload: {
      data,
    },
  };
}

export function fetchProtectedDataRequest() {
  return {
    type: ACTION_TYPES.FETCH_PROTECTED_DATA_REQUEST,
  };
}

export function fetchProtectedData(token) {
  return (dispatch, state) => {
    // fetch me
  };
}
