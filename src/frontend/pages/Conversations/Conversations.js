import React from "react";
import Layout from "../../components/Layout";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import Title from "../../components/Title";
import { Page, Section, LayoutProvider } from "react-page-layout";
import s from "./Conversations.css";
import grids from "../../components/Layout/grids";
import ConversationsTable from "../../components/ConversationsTable";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class Conversations extends React.Component {
	state = {
		conversations: []
	};

	render() {
		return (
			<Layout>
				<LayoutProvider layouts={grids}>
					<Page layout="grid-one-one">
						<Section slot="top">
							<Title>Conversations</Title>
						</Section>
						<Section slot="main">
							<ConversationsTable
								conversations={this.state.conversations}
							/>
						</Section>
					</Page>
				</LayoutProvider>
			</Layout>
		);
	}
}

export default compose(withStyles(s))(Conversations);
