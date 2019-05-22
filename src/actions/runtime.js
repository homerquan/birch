import CONSTANTS from '../constants';

export function setRuntimeVariable({ name, value }) {
  return {
    type: CONSTANTS.setRuntimeVariable,
    payload: {
      name,
      value,
    },
  };
}
