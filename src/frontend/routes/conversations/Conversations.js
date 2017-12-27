import React from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import Title from "../../components/Title";
import { connect } from "react-redux";
import { Page, Section, LayoutProvider } from "react-page-layout";
import s from "./Conversations.css";
import grids from "../../components/Layout/grids";
import ConversationsView from "../../components/ConversationsView";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class Conversations extends React.Component {
	render() {
		return (
			<LayoutProvider layouts={grids}>
				<Page layout="grid-one-one">
					<Section slot="top">
						<Title>{this.props.title}</Title>
					</Section>
					<Section slot="main">
						<ConversationsView
							clientId={this.props.session.userId}
							botId={this.props.botId}
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

export default compose(withStyles(s))(
	 connect(selectProps, null)(Conversations)
);
