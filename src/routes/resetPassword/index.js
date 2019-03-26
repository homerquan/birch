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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';

import lightTheme from '../../components/theme';
import BlankScreen from '../../components/Layout/BlankScreen';
import Background from '../../../public/images/bg.svg';
import ResetPassword from '../../components/ResetPassword';

const Container = styled.div`
  background-image: url(${Background});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ContentContainer = styled(Paper)`
  min-height: 200px;
  min-width: 450px;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default {
  path: '/reset-password',
  chunk: 'resetPassword',
  action() {
    return {
      component: (
        <BlankScreen>
          <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
            <Container>
              <ContentContainer>
                <ResetPassword />
              </ContentContainer>
            </Container>
          </MuiThemeProvider>
        </BlankScreen>
      ),
    };
  },
};
