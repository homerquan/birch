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
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import s from './Home.css';
import grids from '../../components/Layout/grids';
import Title from '../../components/Title/Title';
import Dashboard from '../../components/Dashboard/Dashboard';
import Timeline from '../../components/Timeline/Timeline';

class Home extends React.Component {
  render() {
    return (
      <LayoutProvider layouts={grids}>
				<Page layout="grid-one-two">
				    <Section slot="top">
						<Title/>
					</Section>
					<Section slot="main">
						<Dashboard/>
					</Section>
					<Section slot="right">
						<Timeline/>
					</Section>
				</Page>
	 </LayoutProvider>
    );
  }
}

export default compose(
  withStyles(s),
)(Home);
