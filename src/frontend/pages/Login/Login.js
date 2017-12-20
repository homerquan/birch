/*
* @Author: Homer
* @Date:   2017-12-20 17:06:55
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-20 17:08:42
*/
import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import Layout from '../../components/Layout';
import Login from '../../views/login/Login';
import s from "./Login.css";
import grids from "../../components/Layout/grids";
import withStyles from "isomorphic-style-loader/lib/withStyles";

class Login extends React.Component {

	const data = await require.ensure([], require => require('./about.md'), 'about');

	render() {
		return (
			<Layout>
				<Login title="Login" />
			</Layout>
		);
	}
}

export default compose(withStyles(s))(Conversations);
