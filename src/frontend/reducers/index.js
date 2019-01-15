import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notifications } from 'react-notification-system-redux';

import user from './user';
import session from './session';
import runtime from './runtime';
import globalNotification from './globalNotification';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    runtime,
    user,
    session,
    routing: routerReducer,
    globalNotification,
    notifications,
    form: formReducer,
  });
}
