import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import session from './session';
import runtime from './runtime';
import globalNotification from './globalNotification';
import { reducer as formReducer } from 'redux-form';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    runtime,
    user,
    session,
    routing: routerReducer,
    globalNotification,
    form: formReducer
  });
}
