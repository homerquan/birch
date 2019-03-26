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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Page, Section, LayoutProvider } from 'react-page-layout';

import s from './Profile.css';
import grids from '../../components/Layout/grids';
import TitleBar from '../../components/TitleBar';
import ProfileView from '../../components/ProfileView';

class Profile extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  logoutHandler(event) {
    event.preventDefault();
    this.props.actions.logout();
  }

  render() {
    return (
      <LayoutProvider layouts={grids}>
        <Page layout="grid-one-one">
          <Section slot="titleBar">
            <TitleBar title={this.props.title} />
          </Section>
          <Section slot="main">
            <ProfileView />
          </Section>
        </Page>
      </LayoutProvider>
    );
  }
}

export default withStyles(s)(Profile);