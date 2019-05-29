/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import NotFoundPage from '../../pages/NotFoundPage';
import BlankScreen from '../../components/Layout/BlankScreen';

const title = 'Page Not Found';
const chunk = 'notFound';

export default {
  path: '*',
  chunk,
  action() {
    return {
      title,
      chunk,
      component: (
        <BlankScreen>
          <NotFoundPage title={title} />
        </BlankScreen>
      ),
      status: 404,
    };
  },
};
