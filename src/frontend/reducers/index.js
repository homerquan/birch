import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';
import session from './session';
import runtime from './runtime';
import globalNotification from './globalNotification';
import cornerNotifications from './cornerNotifications';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    runtime,
    user,
    session,
    routing: routerReducer,
    globalNotification,
    cornerNotifications,
    form: formReducer,
  });
}
