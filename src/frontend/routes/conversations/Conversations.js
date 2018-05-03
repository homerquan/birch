import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { compose } from 'react-apollo';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import { connect } from 'react-redux';
import Title from '../../components/Title';
import s from './Conversations.css';
import grids from '../../components/Layout/grids';
import ConversationsViewTwo from '../../components/ConversationsViewTwo/ConversationsViewTwo';

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

Conversations.propTypes = {
  title: PropTypes.string.isRequired,
  botId: PropTypes.string.isRequired,
};

function selectProps(state) {
  return {
    session: state.session,
  };
}

export default compose(withStyles(s))(
   connect(selectProps, null)(Conversations),
);
