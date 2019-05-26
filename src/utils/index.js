import history from '../history';

export const isLogin = (state) => {
  if (state.session && state.session.token) {
    return true;
  }
  return false;
}

// check if the string is a valid mongo id
export const isValidId = (str) => {
  return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(str);
}

export const redirect = (path) => {
	history.push(path);
}