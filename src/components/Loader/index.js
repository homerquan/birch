/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of reflen-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: dev@reflen.com
 * @Date:   2017-11-05 17:00:20
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-22 22:00:47
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from '../theme';
import Paper from 'material-ui/Paper';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LinearProgress from 'material-ui/LinearProgress';
import s from './style.css';

class Loader extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>	
     <LinearProgress mode="indeterminate" />
    </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Loader);