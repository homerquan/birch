/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 19:34:16
 * @Last Modified by:   Homer
 * @Last Modified time: 2017-12-26 12:52:13
 */
import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Bots.css";
import { Page, Section, LayoutProvider } from "react-page-layout";
import grids from "../../components/Layout/grids";
import Title from "../../components/Title";

class Bots extends React.Component {
	render() {
		return (
			<LayoutProvider layouts={grids}>
				<Page layout="grid-one-one">
					<Section slot="top">
						<Title>{this.props.title}</Title>
					</Section>
					<Section slot="main">
						<div>BOTs</div>
					</Section>
				</Page>
			</LayoutProvider>
		);
	}
}

export default compose()(Bots);