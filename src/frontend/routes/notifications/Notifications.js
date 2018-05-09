/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import themeWhite from '../../components/theme';

import grids from '../../components/Layout/grids';
import Title from '../../components/Title';
import Notifications from '../../components/Notifications/Notifications';

class NotificationsView extends Component {
  render() {
    return (
      <LayoutProvider layouts={grids}>
        <Page layout="grid-one-one">
          <Section slot="top">
            <Title>Notifications</Title>
          </Section>
          <Section slot="main">
            <MuiThemeProvider muiTheme={getMuiTheme(themeWhite)}>
              <Paper>
                <Notifications clientId={this.props.session.userId} />
              </Paper>
            </MuiThemeProvider>
          </Section>
        </Page>
      </LayoutProvider>
    );
  }
}

NotificationsView.propTypes = {
  session: PropTypes.shape({
    userId: PropTypes.string,
  }).isRequired,
};

function selectProps(state) {
  return {
    session: state.session,
  };
}

export default connect(selectProps, null)(NotificationsView);
