import { NOTIFICATION_TYPES } from '../constants';
import config from '../config';

const initialState = null;

export default function globalNotification(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_TYPES.ADD_GLOBAL_NOTIFICATION:
      const newState = action.payload;
      return newState;
    case NOTIFICATION_TYPES.IGNORE_GLOBAL_NOTIFICATION:
      return null;  
    default:
      return state;
  }
}
