/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Profile from './Profile';
import { isLogin } from '../../utils';

const title = 'Profile';

export default {
  path: '/profile',
  chunk: 'profile',
  action({ store, path }) {
    const login = isLogin(store.getState());

    if (!login) {
      return { redirect: `/login?redirect=${path}` };
    }

    return {
      title,
      chunk: 'profile',
      component: (
        <Layout>
          <Profile title={title} />
        </Layout>
      ),
    };
  },
};
