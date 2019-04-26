/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

export default {

  path: '/',
  chunk: 'home',
  action() {
  // TODO: for MVP, add home overview later
  // return { redirect: "/apps" };

    return {
      title: 'reflen dashboard',
      chunk: 'home',
      component: (
        <Layout>
          <Home />
        </Layout>
      ),
    };
  },

};
