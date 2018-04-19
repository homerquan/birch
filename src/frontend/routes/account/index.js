/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Account from './Account';
import Layout from '../../components/Layout';
// import { isLogin } from "../../utils";

export default {
  path: '/account',
  chunk: 'account',
  action() {
    // let login = isLogin(store.getState());

		// if (!login) {
		// 	return { redirect: "/login?redirect="+path };
		// }

    return {
      title: 'My Account',
      chunk: 'account',
      component: (
        <Layout>
          <Account />
        </Layout>
      ),
    };
  },

};
