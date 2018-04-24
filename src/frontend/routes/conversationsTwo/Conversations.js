import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Page, Section, LayoutProvider } from "react-page-layout";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

import s from "./Conversations.css";
import Title from "../../components/Title";
import grids from "../../components/Layout/grids";
import ConversationsViewTwo from '../../components/ConversationsViewTwo/ConversationsViewTwo';
import fakeData from './fakeData.json';

class Conversations extends React.Component {
	render() {
		return (
			<LayoutProvider layouts={grids}>
				<Page layout="grid-one-one">
					<Section slot="top">
						<Title>{this.props.title}</Title>
					</Section>
					<Section slot="main">
						<ConversationsViewTwo
              // clientId={this.props.session.userId}
              clientId='1234-asdf-1234-asdf'
							botId={this.props.botId}
							data={fakeData}
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

export default withStyles(s)(connect(selectProps, null)(Conversations));
