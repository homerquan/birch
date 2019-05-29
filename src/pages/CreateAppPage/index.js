/*
* @Author: homer
* @Date:   2019-05-28 20:54:31
* @Last Modified by:   homer
* @Last Modified time: 2019-05-29 13:47:16
*/
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
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';


import theme from '../../components/theme';
import TitleBar from '../../components/TitleBar';
import grids from '../../components/Layout/grids';
import CreateAppWizard from '../../components/CreateAppWizard';

class CreateAppPage extends React.Component { 
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
      <ThemeProvider theme={theme}>
        <LayoutProvider layouts={grids}>
          <Page layout="grid-one-one">
            <Section slot="titleBar">
              <TitleBar title={this.props.title} />
            </Section>
            <Section slot="main">
              <CreateAppWizard
                userId={this.props.session.userId}
              />
            </Section>
          </Page>
        </LayoutProvider>
      </ThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    session: state.session,
  };
}

export default compose()(connect(selectProps, null)(CreateAppPage));
