/*
* @Author: Homer
* @Date:   2017-12-20 16:56:15
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-20 17:01:35
*/
import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import Title from "../../components/Title";
import Layout from '../../components/Layout';
import s from "./About.css";
import grids from "../../components/Layout/grids";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Page from '../../components/Page';

class About extends React.Component {

	const data = await require.ensure([], require => require('./about.md'), 'about');

	render() {
		return (
			<Layout>
				<Page {...data} />
			</Layout>
		);
	}
}

export default compose(withStyles(s))(Conversations);
