import { Cookies } from 'react-cookie';
import config from '../config';
import CONSTANTS from '../constants';

const cookies = new Cookies();

export default function runtime(state = {}, action) {
  switch (action.type) {
    case CONSTANTS.setRuntimeVariable:
      const newState = {
        ...state,
        [action.payload.name]: action.payload.value,
      };
      cookies.set(config.runtimeCookieName, JSON.stringify(newState), { path: '/', expires: 0 });
      return newState;
    default:
      return state;
  }
}
