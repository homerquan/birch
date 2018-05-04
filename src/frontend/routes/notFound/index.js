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
import FullScreen from '../../components/Layout/Fullscreen';

const title = 'Page Not Found';

export default {
  path: '*',
  chunk: 'notFound',
  action() {
    return {
      title,
      chunk: 'notFound',
      component: (
        <FullScreen>
          <NotFound title={title} />
        </FullScreen>
      ),
      status: 404,
    };
  },
};
