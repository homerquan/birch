/*
* @Author: Homer
* @Date:   2017-12-26 21:21:15
* @Last Modified by:   homer
* @Last Modified time: 2019-05-25 20:30:29
*/

import React from 'react';
import { isLogin, isValidId } from '../../utils';

// a redirect route, for app overview later
export default {
  path: '/:id',
  action({ store, params, query, path }) {
    if (isValidId(path)) {
      const login = isLogin(store.getState());

      if (!login) {
        return { redirect: `/login?redirect=${path}` };
      }
      
      return { redirect: `${path}/sessions` };
    }
  },
};
