import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from '../../components/theme';
import TitleBar from '../../components/TitleBar';
import grids from '../../components/Layout/grids';
import SessionsView from '../../components/SessionsView';
import s from './style.css';

class SessionsPage extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <LayoutProvider layouts={grids}>
          <Page layout="grid-one-one">
            <Section slot="titleBar">
              <TitleBar title={this.props.title} />
            </Section>
            <Section slot="main">
              <SessionsView
                userId={this.props.session.userId}
                appId={this.props.appId}
              />
            </Section>
          </Page>
        </LayoutProvider>
      </MuiThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    session: state.session,
  };
}

export default withStyles(s)(connect(selectProps, null)(SessionsPage));
