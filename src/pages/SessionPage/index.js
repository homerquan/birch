/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of reflen-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: dev@reflen.com
 * @Date:   2017-11-05 19:34:16
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-29 01:20:38
 */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Page, Section, LayoutProvider } from 'react-page-layout';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import lightTheme from '../../components/theme';
import grids from '../../components/Layout/grids';
import TitleBar from '../../components/TitleBar';
import SessionView from '../../components/SessionView';
import SessionActivitiesView from '../../components/SessionActivitiesView';
import s from './style.css';

const fakeConversation = {
  id: 'ddcd39c9-dcbc-4a26-bcf7-525d77c12d54',
  visitor: 'ddcd39c9-dcbc-4a26-bcf7-525d77c12d54',
  bot: 'ddcd39c9-dcbc-4a26-bcf7-525d77c12d54',
  client: 'ddcd39c9-dcbc-4a26-bcf7-525d77c12d54',
  status: 'online',
  mode: 'automatic',
  intentions: [{
    name: 'buying xyz',
    score: 34,
  }],
  actions: [{
    source: 'ai',
    name: 'recommending abc',
    status: 'done',
  }],
  token: 'sdf3423',
  createdAt: '2018-05-04T21:02:26.294Z',
  updatedAt: '2018-05-04T21:02:26.294Z',
  pinned: false,
};

class SessionPage extends React.Component {
  
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={createMuiTheme(lightTheme)}>
        <LayoutProvider layouts={grids}>
          <Page layout="grid-one-two">
            <Section slot="titleBar">
              <TitleBar title={this.props.title} />
            </Section>
            <Section slot="main">
              <SessionView conversation={fakeConversation} />
            </Section>
            <Section slot="right">
              <SessionActivitiesView />
            </Section>
          </Page>
        </LayoutProvider>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(SessionPage);
