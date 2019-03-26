/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import StyleGuide from './StyleGuide';
import Layout from '../../components/Layout';

export default {

  path: '/style-guide',
  chunk: 'style-guide',
  action() {
    return {
      title: 'Reflen Style Guide',
      chunk: 'style-guide',
      component: (
        <Layout>
          <StyleGuide />
        </Layout>
      ),
    };
  },

};
