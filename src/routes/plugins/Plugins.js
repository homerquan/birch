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
import { createMuiTheme } from '@material-ui/core/styles';

import { Tabs, Tab } from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';

import theme from '../../components/theme';
import grids from '../../components/Layout/grids';
import TitleBar from '../../components/TitleBar';
import Browse from '../../components/Plugins/Browse';
import Installed from '../../components/Plugins/Installed';

class AccountView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'plugins',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    const { conversationId } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <LayoutProvider layouts={grids}>
          <Page layout="grid-one-one">
            <Section slot="titleBar">
              <TitleBar title="Plugins" />
            </Section>
            <Section slot="main">
              <ThemeProvider theme={theme}>
                <Paper>
                  <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <Tab label="Plugins" value="plugins">
                      <Browse conversationId={conversationId} />
                    </Tab>
                    <Tab label="Installed" value="installed">
                      <Installed conversationId={conversationId} />
                    </Tab>
                  </Tabs>
                </Paper>
              </ThemeProvider>
            </Section>
          </Page>
        </LayoutProvider>
      </ThemeProvider>
    );
  }
}

AccountView.propTypes = {
  conversationId: PropTypes.string.isRequired,
};

export default AccountView;
