import CONSTANTS from '../constants';

const initialState = {
  isOpen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.openConsole:
      return action.payload;
    case CONSTANTS.closeConsole:
      return { isOpen: false };
    default:
      return state;
  }
};
