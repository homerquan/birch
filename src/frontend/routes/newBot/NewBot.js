/*
* @Author: Homer
* @Date:   2017-12-31 18:26:35
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-31 18:43:50
*/

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { Page, Section, LayoutProvider } from 'react-page-layout';

import TitleBar from '../../components/TitleBar';
import grids from '../../components/Layout/grids';
import NewBotView from '../../components/NewBotView';

class NewBot extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
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
    session: state.session,
  };
}

export default compose()(connect(selectProps, null)(NewBot));
