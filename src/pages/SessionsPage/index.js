import React from 'react';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import theme from '../../components/theme';
import TitleBar from '../../components/TitleBar';
import grids from '../../components/Layout/grids';
import SessionsView from '../../components/SessionsView';
import AppView from '../../components/AppView'; // no view, only set runtime data
import s from './style.css';

class SessionsPage extends React.Component {

  render() {
    return (
      <ThemeProvider theme={theme}>
        <LayoutProvider layouts={grids}>
          <Page layout="grid-one-two">
            <Section slot="titleBar">
              <TitleBar title={this.props.title} />
            </Section>
            <Section slot="col-1">
              <AppView
                userId={this.props.session.userId}
                appId={this.props.appId}
              />
              <SessionsView
                userId={this.props.session.userId}
                appId={this.props.appId}
              />
            </Section>
            <Section slot="col-2" />
          </Page>
        </LayoutProvider>
      </ThemeProvider>
    );
  }

}

const selectProps = state => ({
  session: state.session,
});

export default withStyles(s)(connect(selectProps, null)(SessionsPage));
