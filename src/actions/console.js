import { CONSOLE_TYPES } from '../constants';

export function openConsole() {
  return {
    type: CONSOLE_TYPES.OPEN_CONSOLE,
    payload: {
      isOpen: true,
    },
  };
}

export function closeConsole() {
  return {
    type: CONSOLE_TYPES.CLOSE_CONSOLE,
  };
}
