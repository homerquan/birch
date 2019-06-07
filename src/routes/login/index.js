/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { isLogin } from '../../utils';
import LoginPage from '../../pages/LoginPage';

const title = 'Log In';
const chunk = 'login';

export default {
  path: '/login',
  chunk,
  action({ store, query }) {
    const login = isLogin(store.getState());

    if (login) {
      return { redirect: '/profile' };
    }

    return {
      title,
      chunk,
      component: (
        <LoginPage redirect={query.redirect || '/'} />
      ),
    };
  },
};
