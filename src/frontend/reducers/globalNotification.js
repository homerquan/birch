import { NOTIFICATION_TYPES } from '../constants';

const initialState = null;

export default function globalNotification(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_TYPES.ADD_GLOBAL_NOTIFICATION:
      return action.payload;
    case NOTIFICATION_TYPES.IGNORE_GLOBAL_NOTIFICATION:
      return null;
    default:
      return state;
  }
}
