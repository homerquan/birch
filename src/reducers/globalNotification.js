import CONSTANTS from '../constants';

const initialState = null;

export default function globalNotification(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.addGlobalNotification:
      return action.payload;
    case CONSTANTS.ignoreGlobalNotification:
      return null;
    default:
      return state;
  }
}
