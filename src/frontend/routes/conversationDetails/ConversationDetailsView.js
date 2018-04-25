/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 19:34:16
 * @Last Modified by:   Michael
 * @Last Modified time: 2017-04-24
 */
import React from "react";
// import PropTypes from "prop-types";
// import { graphql, compose } from "react-apollo";
// import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { Page, Section, LayoutProvider } from "react-page-layout";

import s from "./ConversationDetailsView.css";
import grids from "../../components/Layout/grids";
import Title from "../../components/Title";
import ConversationDetails from '../../components/ConversationDetails/ConversationDetails';
import ConversationDetailsActivity from '../../components/ConversationDetails/ConversationDetailsActivity';

const fakeConversation = {
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
		name: 'recommending abc',
		status: 'done'
	}],
	token: 'sdf3423',
	createdAt: '2018-05-04T21:02:26.294Z',
	updatedAt: '2018-05-04T21:02:26.294Z',
	pinned: false
}

class ConversationDetailsView extends React.Component {
	render() {
		return (
			<LayoutProvider layouts={grids}>
				<Page layout="grid-one-two">
					<Section slot="top">
						<Title>{this.props.title}</Title>
					</Section>
					<Section slot="main">
						<ConversationDetails conversation={fakeConversation} />
					</Section>
					<Section slot="right">
						<ConversationDetailsActivity />
					</Section>
				</Page>
			</LayoutProvider>
		);
	}
}

export default withStyles(s)(ConversationDetailsView);
