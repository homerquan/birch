/*
* @Author: Homer
* @Date:   2017-12-26 21:21:15
* @Last Modified by:   homer
* @Last Modified time: 2019-05-24 11:08:17
*/

import React from 'react';
import { isLogin } from '../../utils';

// a redirect route, for app overview later
export default {
  path: '/:id',
  action({ store, params, query, path }) {
    if (
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(path)
    ) {
      const login = isLogin(store.getState());

      if (!login) {
        return { redirect: `/login?redirect=${path}` };
      }

      return { redirect: `${path}/conversations` };
    }
  },
};
