import CONSTANTS from '../constants';

export function addGlobalNotification({ id, type, data }) {
  return {
    type: CONSTANTS.addGlobalNotification,
    payload: {
      id,
      type,
      text: data.text,
      link: data.link,
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
