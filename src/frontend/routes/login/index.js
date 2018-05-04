/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from '../../components/theme';
import FullScreen from '../../components/Layout/Fullscreen';
import LoginView from '../../components/LoginView';
import Background from './bg.svg';
import { isLogin } from '../../utils';

const title = 'Log In';

const styles = {
  loginScreen: {
    backgroundImage: `url(${Background})`,
    width: '100%',
    height: '100%',
    position: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  loginPaper: {
    minHehgit: 200,
    minWidth: 450,
    maxWidth: '100%',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default {
  path: '/login',
  chunk: 'login',
  action({ store, query }) {
    const login = isLogin(store.getState());

    if (login) {
      return { redirect: '/profile' };
    }

    return {
      title,
      chunk: 'login',
      component: (
        <FullScreen>
          <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
            <div style={styles.loginScreen}>
              <Paper style={styles.loginPaper} zDepth={2}>
                <LoginView title={title} redirect={query.redirect} />
              </Paper>
            </div>
          </MuiThemeProvider>
        </FullScreen>
      ),
    };
  },
};
