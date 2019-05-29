/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of reflen-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: dev@reflen.com
 * @Date:   2017-11-05 17:00:20
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-29 13:47:05
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import theme from '../theme';
import Paper from '@material-ui/core/Paper';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.css';

class Dashboard extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    );
  }
}

export default withStyles(s)(Dashboard);
