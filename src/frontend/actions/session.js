import { ACTION_TYPES } from "../constants";
import jwtDecode from "jwt-decode";
import fetch from "isomorphic-fetch";
import SessionApi from "../api/Session";
import { checkHttpStatus, parseJSON } from "../utils";
import config from '../config';

export function loginUserSuccess(token,refreshToken, userId, userRole) {
  sessionStorage.setItem(config.tokenName, token);
  sessionStorage.setItem(config.refreshTokenName, refreshToken);
  return {
    type: ACTION_TYPES.LOGIN_USER_SUCCESS,
    payload: {
      token,
      refreshToken,
      userId,
      userRole,
    }
  };
}

export function loginUserFailure(error) {
  sessionStorage.removeItem(config.tokenName);
  sessionStorage.removeItem(config.refreshTokenName);
  return {
    type: ACTION_TYPES.LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function loginUserRequest() {
  return {
    type: ACTION_TYPES.LOGIN_USER_REQUEST
  };
}

export function logout() {
  sessionStorage.removeItem(config.tokenName);
  sessionStorage.removeItem(config.refreshTokenName);
  return {
    type: ACTION_TYPES.LOGOUT_USER
  };
}

export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    window.location.replace("/login"); 
  };
}

export function loginUser(credentials, redirect = "/") {
  return function(dispatch) {
    dispatch(loginUserRequest());
    return SessionApi.login(credentials)
      .then(response => {
        try {
          const decoded = jwtDecode(response.token);
          dispatch(loginUserSuccess(response.token, response.refreshToken));
          window.location.replace(redirect); 
        } catch (e) {
          dispatch(
            loginUserFailure({
              response: {
                status: 403,
                statusText: "Invalid token"
              }
            })
          );
        }
      })
      .catch(error => {
        dispatch(loginUserFailure(error));
      });
  };
}

export function refreshLogin(refreshToken) {
  return function(dispatch) {
    dispatch(loginUserRequest());
    return SessionApi.refresh(refreshToken)
      .then(response => {
        try {
          const decoded = jwtDecode(response.token);
          dispatch(loginUserSuccess(response.token, response.refreshToken, decoded._id, decoded.role));
        } catch (e) {
          dispatch(
            loginUserFailure({
              response: {
                status: 403,
                statusText: "Invalid token"
              }
            })
          );
        }
      })
      .catch(error => {
        dispatch(loginUserFailure(error));
      });
  };
}

export function receiveProtectedData(data) {
  return {
    type: ACTION_TYPES.RECEIVE_PROTECTED_DATA,
    payload: {
      data
    }
  };
}

export function fetchProtectedDataRequest() {
  return {
    type: ACTION_TYPES.FETCH_PROTECTED_DATA_REQUEST
  };
}

export function fetchProtectedData(token) {
  return (dispatch, state) => {
    // fetch me
  };
}
