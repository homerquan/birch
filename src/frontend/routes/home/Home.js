/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import s from './Home.css';
import Paper from 'material-ui/Paper';
import grids from '../../components/Layout/grids';
import Title from '../../components/Title';
import BotsList from '../../components/BotsList/BotsList';
import Activities from '../../components/Activities/Activities';

class Home extends React.Component {
  render() {
    return (
      <LayoutProvider layouts={grids}>
        <Page layout="grid-one-two">
          <Section slot="top">
            <Title>Overview</Title>
          </Section>
          <Section slot="main">
            <BotsList />
          </Section>
          <Section slot="right">
            <Activities />
          </Section>
        </Page>
      </LayoutProvider>
    );
  }
}

export default (withStyles(s))(Home);
