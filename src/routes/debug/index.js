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
import DebugPage from '../../pages/DebugPage';
import { isLogin } from '../../utils';

const title = 'Debug';
const chunk = 'debug';

export default {
  path: '/debug',
  chunk,
  action({ store, path }) {
    const login = isLogin(store.getState());

    if (!login) {
      return { redirect: `/login?redirect=${path}` };
    }

    return {
      title,
      chunk,
      component: (
        <Layout>
          <DebugPage title={title} />
        </Layout>
      ),
    };
  },
};
