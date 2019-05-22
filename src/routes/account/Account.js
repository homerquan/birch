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
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import datatableTheme from '../../components/datatableTheme';

import grids from '../../components/Layout/grids';
import TitleBar from '../../components/TitleBar';
import Account from '../../components/Account';
import Billing from '../../components/Billing';

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
          <Section slot="titleBar">
            <TitleBar title="Manage Account" />
          </Section>
          <Section slot="main">
            <MuiThemeProvider muiTheme={getMuiTheme(datatableTheme)}>
              <Paper>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  <Tab label="Account" value="account">
                    <Account />
                  </Tab>
                  <Tab label="Billing" value="billing">
                    <Billing />
                  </Tab>
                </Tabs>
              </Paper>
            </MuiThemeProvider>
          </Section>
        </Page>
      </LayoutProvider>
    );
  }
}

export default AccountView;
