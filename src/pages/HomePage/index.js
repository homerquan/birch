/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import grids from '../../components/Layout/grids';
import TitleBar from '../../components/TitleBar';
import AppsWidget from '../../components/AppsWidget';
import ActivitiesWidget from '../../components/ActivitiesWidget';
import theme from '../../components/theme';

class HomePage extends React.Component {
  render() {
    return (
      <ThemeProvider theme={createMuiTheme(theme)}>
        <LayoutProvider layouts={grids}>
          <Page layout="grid-one-two">
            <Section slot="titleBar">
              <TitleBar title="Dashboard" />         
            </Section>
            <Section slot="col-1">
              <AppsWidget userId={this.props.session.userId} />
            </Section>
            <Section slot="col-2">
               <ActivitiesWidget />
            </Section>
          </Page>
        </LayoutProvider>
      </ThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    session: state.session,
  };
}

export default connect(
  selectProps,
  null,
)(HomePage);
