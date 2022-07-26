/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of reflen-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: dev@reflen.com
 * @Date:   2017-11-05 17:00:20
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-29 13:47:03
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import theme from '../theme';
import Paper from '@material-ui/core/Paper';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import s from './style.css';

class Loader extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <LinearProgress mode="indeterminate" />
      </ThemeProvider>
    );
  }
}

export default withStyles(s)(Loader);
