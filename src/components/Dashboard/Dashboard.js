/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 17:00:20
 * @Last Modified by:   Homer
 * @Last Modified time: 2017-12-17 23:58:31
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from '../theme';
import Paper from 'material-ui/Paper';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';

class Dashboard extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <div>
          <Paper className={s.card} zDepth={1}>
            <div className={s.value}>12,345</div>
            <div className={s.label}>Visitors (last 24h)</div>
          </Paper>
          <Paper className={s.card} zDepth={1}>
            <div className={s.value}>45</div>
            <div className={s.label}>Conversations (last 24h) </div>
          </Paper>
          <Paper className={s.card} zDepth={1}>
            <div className={s.value}>12,345</div>
            <div className={s.label}>Automation hit rate (last 24h)</div>
          </Paper>
          <Paper className={s.card} zDepth={1}>
            <div className={s.value}>109</div>
            <div className={s.label}>Learned knowledge (last 24h)</div>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Dashboard);
