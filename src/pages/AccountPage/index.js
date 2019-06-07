/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import { ThemeProvider } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import theme from '../../components/theme';
import grids from '../../components/Layout/grids';
import TitleBar from '../../components/TitleBar';
import Account from '../../components/Account';
import Billing from '../../components/Billing';

class AccountPage extends React.Component {

  static propTypes = {
    tab: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      tab: props.tab || 'account',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.setState({ tab: value });
  }

  render() {
    return (
      <LayoutProvider layouts={grids}>
        <Page layout="grid-one-one">
          <Section slot="titleBar">
            <TitleBar title="Manage Account" />
          </Section>
          <Section slot="main">
            <ThemeProvider theme={theme}>
              <Paper>
                <Tabs
                  value={this.state.tab}
                  onChange={this.handleChange}
                  centered
                  variant="fullWidth"
                >
                  <Tab value="account" label="Account" />
                  <Tab value="billing" label="Billing" />
                </Tabs>
                {this.state.tab === 'account' && <Account />}
                {this.state.tab === 'billing' && <Billing />}
              </Paper>
            </ThemeProvider>
          </Section>
        </Page>
      </LayoutProvider>
    );
  }
}

export default AccountPage;
