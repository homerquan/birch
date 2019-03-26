
export function isLogin(state) {
  if (state.session && state.session.token) {
    return true;
  }

  return false;
}
