/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import theme from '../../components/theme';
import BlankScreen from '../../components/Layout/BlankScreen';
import ForgotPassword from '../../components/ForgotPassword';


export default {
  path: '/forgot-password',
  chunk: 'forgotPassword',
  action() {
    return {
      component: (
        <BlankScreen>
          <ThemeProvider theme={theme}>
            <div>
              <ForgotPassword />
            </div>
          </ThemeProvider>
        </BlankScreen>
      ),
    };
  },
};
