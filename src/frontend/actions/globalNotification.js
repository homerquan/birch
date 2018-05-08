import { NOTIFICATION_TYPES } from '../constants';

export function addGlobalNotification({id, type, data }) {
  return {
    type: NOTIFICATION_TYPES.ADD_GLOBAL_NOTIFICATION,
    payload: {
      id,
      type,
      text,
      link
    },
  };
}

export function ignoreGlobalNotification({id}) {
  return {
    type: NOTIFICATION_TYPES.IGNORE_GLOBAL_NOTIFICATION,
    payload: {
      id
    },
  };
}