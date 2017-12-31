/*
* @Author: Homer
* @Date:   2017-12-31 18:26:35
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-31 18:43:50
*/

import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import Title from "../../components/Title";
import { connect } from "react-redux";
import { Page, Section, LayoutProvider } from "react-page-layout";
import grids from "../../components/Layout/grids";
import NewBotView from "../../components/NewBotView";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class NewBot extends React.Component {

	render() {
		return (
			<LayoutProvider layouts={grids}>
				<Page layout="grid-one-one">
					<Section slot="top">
						<Title>{this.props.title}</Title>
					</Section>
					<Section slot="main">
						<NewBotView
							clientId={this.props.session.userId}
						/>
					</Section>
				</Page>
			</LayoutProvider>
		);
	}
}

function selectProps(state) {
	return {
		session: state.session
	};
}

export default compose()(connect(selectProps, null)(NewBot));
