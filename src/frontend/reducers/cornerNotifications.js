import { NOTIFICATION_TYPES } from '../constants';
// import config from '../config';

const initialState = null;

export default function cornerNotifications(state = initialState, action) {
  switch (action.type) {
    case NOTIFICATION_TYPES.ADD_CORNER_NOTIFICATION:
      return action.payload;
    case NOTIFICATION_TYPES.CLOSE_CORNER_NOTIFICATION:
      return null;
    default:
      return state;
  }
}
