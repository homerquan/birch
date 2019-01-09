/* eslint-disable import/prefer-default-export */

export const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';

export const ACTION_TYPES = {
  LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST',
  LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  LOGOUT_USER: 'LOGOUT_USER',
  FETCH_PROTECTED_DATA_REQUEST: 'FETCH_PROTECTED_DATA_REQUEST',
  RECEIVE_PROTECTED_DATA: 'RECEIVE_PROTECTED_DATA',
  OPEN_DECISION_SUPPORT: 'OPEN_DECISION_SUPPORT',
  SHOW_CHAT_BUBBLE: 'SHOW_CHAT_BUBBLE',
  SHOW_CHAT_ERROR: 'SHOW_CHAT_ERROR',
  NOTIFICATIONS_COUNT: 'NOTIFICATIONS_COUNT',
};


export const NOTIFICATION_TYPES = {
  ADD_GLOBAL_NOTIFICATION: 'ADD_GLOBAL_NOTIFICATION',
  IGNORE_GLOBAL_NOTIFICATION: 'IGNORE_GLOBAL_NOTIFICATION',
  ADD_CORNER_NOTIFICATION: 'ADD_CORNER_NOTIFICATION',
  CLOSE_CORNER_NOTIFICATION: 'CLOSE_CORNER_NOTIFICATION',
};
