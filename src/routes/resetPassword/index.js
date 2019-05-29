/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lightTheme from '../../components/theme';
import BlankScreen from '../../components/Layout/BlankScreen';
import ResetPassword from '../../components/ResetPassword';

export default {
  path: '/reset-password',
  chunk: 'resetPassword',
  action() {
    return {
      component: (
        <BlankScreen>
          <MuiThemeProvider muiTheme={createMuiTheme(lightTheme)}>
            <div>
              <ResetPassword />
            </div>
          </MuiThemeProvider>
        </BlankScreen>
      ),
    };
  },
};
