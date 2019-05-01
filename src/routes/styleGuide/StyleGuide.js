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
import { connect } from 'react-redux';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import grids from '../../components/Layout/grids';
import TitleBar from '../../components/TitleBar';
import AppsList from '../../components/AppsList/AppsList';
import Activities from '../../components/Activities/Activities';

class Home extends React.Component {
  render() {
    return (
      <LayoutProvider layouts={grids}>
        <Page layout="grid-one-one">
          <Section slot="titleBar">
            <TitleBar title="Style Guide" />
          </Section>
          <Section slot="main">
            <AppsList clientId={this.props.session.userId} />
            <Activities />
          </Section>
        </Page>
      </LayoutProvider>
    );
  }
}

Home.propTypes = {
  session: PropTypes.shape({
    userId: PropTypes.string,
  }).isRequired,
};

function selectProps(state) {
  return {
    session: state.session,
  };
}

export default connect(selectProps, null)(Home);
