import CONSTANTS from '../constants';

export function addGlobalNotification({ id, type, text, link }) {
  return {
    type: CONSTANTS.addGlobalNotification,
    payload: {
      id,
      type,
      text,
      link,
    },
  };
}

export function ignoreGlobalNotification({ id }) {
  return {
    type: CONSTANTS.ignoreGlobalNotification,
    payload: {
      id,
    },
  };
}
