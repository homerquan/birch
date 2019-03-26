/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import NotFound from './NotFound';
import BlankScreen from '../../components/Layout/BlankScreen';

const title = 'Page Not Found';

export default {
  path: '*',
  chunk: 'notFound',
  action() {
    return {
      title,
      chunk: 'notFound',
      component: (
        <BlankScreen>
          <NotFound title={title} />
        </BlankScreen>
      ),
      status: 404,
    };
  },
};
