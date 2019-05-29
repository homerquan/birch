/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import HomePage from '../../pages/HomePage';
import Layout from '../../components/Layout';
import { isLogin } from '../../utils';


const title = 'Reflen dashboard';
const chunk = 'home';

export default {

  path: '/',
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
          {/*   <HomePage /> */}
        </Layout>
      ),
    };
  },

};
