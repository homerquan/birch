import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { reducer as snackBarNotifications } from 'mui-redux-alerts-next';
import user from './user';
import session from './session';
import runtime from './runtime';
import globalNotification from './globalNotification';
import console from './console';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    runtime,
    user,
    session,
    routing: routerReducer,
    globalNotification,
    notifications,
    snackBarNotifications,
    console,
  });
}
