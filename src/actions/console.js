import CONSTANTS from '../constants';

export function openConsole() {
  return {
    type: CONSTANTS.openConsole,
    payload: {
      isOpen: true,
    },
  };
}

export function closeConsole() {
  return {
    type: CONSTANTS.closeConsole,
  };
}
