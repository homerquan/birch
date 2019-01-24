import { CONSOLE_TYPES } from '../constants';

const initialState = {
  isOpen: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONSOLE_TYPES.OPEN_CONSOLE:
      return action.payload;
    case CONSOLE_TYPES.CLOSE_CONSOLE:
      return { isOpen: false };
    default:
      return state;
  }
};
