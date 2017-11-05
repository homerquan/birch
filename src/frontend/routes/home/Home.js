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


class Home extends React.Component {
  render() {
    return (
      <LayoutProvider layouts={grids}>
				<Page layout="grid-one-two">
				    <Section slot="top">
						<h1> THIS IS THE PAGE TITLE </h1>
					</Section>
					<Section slot="main">
						<h1> THIS IS THE PAGE CONTENT </h1>
					</Section>
					<Section slot="right">
						<h1> THIS IS THE RIGHT CONTENT </h1>
					</Section>
				</Page>
	 </LayoutProvider>
    );
  }
}

export default compose(
  withStyles(s),
)(Home);
