/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import themeWhite from '../../components/theme';

import grids from '../../components/Layout/grids';
import Title from '../../components/Title';
import Notifications from '../../components/Notifications/Notifications';

class AccountView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'account',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <LayoutProvider layouts={grids}>
        <Page layout="grid-one-one">
          <Section slot="top">
            <Title>Manage Account</Title>
          </Section>
          <Section slot="main">
            <MuiThemeProvider muiTheme={getMuiTheme(themeWhite)}>
              <Paper>
                <Notifications />
              </Paper>
            </MuiThemeProvider>
          </Section>
        </Page>
      </LayoutProvider>
    );
  }
}

export default AccountView;
