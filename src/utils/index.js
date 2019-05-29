import history from '../history';
import config from '../config/';

export const isLogin = (state) => {
  if (state.session && state.session.token) {
    return true;
  }
  return false;
};

// check if the string is a valid mongo id
export const isValidId = str => /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(str);

export const redirect = (path) => {
  history.push(path);
};

export const genEmbedCode = (id, token) => `<script src="${config.widgetUrl}" aid="${id}" token="${token}" async></script>`;
