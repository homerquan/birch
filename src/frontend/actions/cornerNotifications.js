import { NOTIFICATION_TYPES } from '../constants';

export function addCornerNotification({ id, text, level, autoDismiss, position }) {
  return {
    type: NOTIFICATION_TYPES.ADD_CORNER_NOTIFICATION,
    payload: {
      id,
      text,
      level,
      autoDismiss,
      position,
    },
  };
}

export function closeCornerNotification({ uid }) {
  return {
    type: NOTIFICATION_TYPES.CLOSE_CORNER_NOTIFICATION,
    payload: {
      uid,
    },
  };
}
