import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Conversations.css';
import TitleBar from '../../components/TitleBar';
import grids from '../../components/Layout/grids';
import ConversationsView from '../../components/ConversationsView/ConversationsView';
import fakeData from './fakeData.json';

class Conversations extends React.Component {
  render() {
    return (
      <LayoutProvider layouts={grids}>
        <Page layout="grid-one-one">
          <Section slot="titleBar">
            <TitleBar title={this.props.title} />
          </Section>
          <Section slot="main">
            <ConversationsView
              clientId={this.props.session.userId}
              botId={this.props.botId}
              data={fakeData}
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
  session: PropTypes.shape({
    userId: PropTypes.string,
  }).isRequired,
};

function selectProps(state) {
  return {
    session: state.session,
  };
}

export default withStyles(s)(connect(selectProps, null)(Conversations));
