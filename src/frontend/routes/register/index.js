/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import FullScreen from '../../components/Layout/FullScreen';
import Register from './Register';

const title = 'New User Registration';

export default {

  path: '/register',
  chunk: 'register',
  action() {
    return {
      title,
      chunk: 'register',
      component: <FullScreen><Register /></FullScreen>,
    };
  },

};
