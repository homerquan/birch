import React from 'react';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import lightTheme from '../../components/theme';
import TitleBar from '../../components/TitleBar';
import grids from '../../components/Layout/grids';
import SessionsView from '../../components/SessionsView';
import AppView from '../../components/AppView'; // no view, only set runtime data
import s from './style.css';

class SessionsPage extends React.Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={createMuiTheme(lightTheme)}>
        <LayoutProvider layouts={grids}>
          <Page layout="grid-one-one">
            <Section slot="titleBar">
              <TitleBar title={this.props.title} />
            </Section>
            <Section slot="main">
              <AppView
                userId={this.props.session.userId}
                appId={this.props.appId}
              />
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

const selectProps = state => ({
  session: state.session,
});

export default withStyles(s)(connect(selectProps, null)(SessionsPage));
