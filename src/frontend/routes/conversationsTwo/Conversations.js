import React from "react";
import PropTypes from "prop-types";
// import { graphql, compose } from "react-apollo";
// import { connect } from "react-redux";
import { Page, Section, LayoutProvider } from "react-page-layout";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

import s from "./Conversations.css";
import Title from "../../components/Title";
import grids from "../../components/Layout/grids";
import ConversationsViewTwo from '../../components/ConversationsViewTwo/ConversationsViewTwo';


const data = {
	conversations: [
		{
			id: 'ddcd39c9-dcbc-4a26-bcf7-525d77c12d54',
			visitor: 'ddcd39c9-dcbc-4a26-bcf7-525d77c12d54',
			bot: 'ddcd39c9-dcbc-4a26-bcf7-525d77c12d54',
			client: 'ddcd39c9-dcbc-4a26-bcf7-525d77c12d54',
			status: 'online',
			mode: 'automatic',
			intentions: [{
				name: 'buying xyz',
				score: 34
			}],
			actions: [{
				source: 'ai',
				name: 'recommanding abc',
				status: 'done'
			}],
			token: 'sdf3423',
			createdAt: '2018-05-04T21:02:26.294Z',
			updatedAt: '2018-05-04T21:02:26.294Z'
		},
		{
			id: 'ddcd39c9-dcbc-4a26-bcf7-fdasfasdf324',
			visitor: 'ddcd39c9-dcbc-4a26-bcf7-fdasfasdf324',
			bot: 'ddcd39c9-dcbc-4a26-bcf7-fdasfasdf324',
			client: 'ddcd39c9-dcbc-4a26-bcf7-fdasfasdf324',
			status: 'offline',
			mode: 'automatic',
			intentions: [{
				name: 'buying more',
				score: 55
			}],
			actions: [{
				source: 'ai',
				name: 'recommanding more',
				status: 'done'
			}],
			token: 'sdf3423',
			createdAt: '2018-05-04T21:03:30.294Z',
			updatedAt: '2018-05-04T21:03:30.294Z'
		} 
	],
	loading: false,
	refetch: () => { return '' }
}

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
							data={data}
						/>
					</Section>
				</Page>
			</LayoutProvider>
		);
	}
}

// function selectProps(state) {
//   return {
//     session: state.session
//   };
// }

export default withStyles(s)(Conversations);
// export default withStyles(s)(connect(selectProps, null)(Conversations));
