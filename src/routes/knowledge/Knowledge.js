import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import TitleBar from '../../components/TitleBar';
import s from './Knowledge.css';
import grids from '../../components/Layout/grids';
import KnowledgeView from '../../components/KnowledgeView';

class Knowledge extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    botId: PropTypes.string.isRequired,
    session: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
      isAuthenticating: PropTypes.bool.isRequired,
      refreshToken: PropTypes.string.isRequired,
      statusText: PropTypes.isRequired,
      token: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      userRole: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <LayoutProvider layouts={grids}>
        <Page layout="grid-one-one">
          <Section slot="titleBar">
            <TitleBar title={this.props.title} />
          </Section>
          <Section slot="main">
            <KnowledgeView
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
    session: state.session,
  };
}

export default compose(withStyles(s))(connect(selectProps, null)(Knowledge));
