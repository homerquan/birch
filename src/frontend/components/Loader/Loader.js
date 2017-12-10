/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of convospot-console. The codes can not be copied and/or distributed without permission
 *
 * @Author: homer
 * @Email: homer@convospot.io
 * @Date:   2017-11-05 17:00:20
 * @Last Modified by:   homer
 * @Last Modified time: 2017-11-05 19:41:01
 */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import Paper from 'material-ui/Paper';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Loader.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';

class Loader extends React.Component {
  render() {
    return (
    <MuiThemeProvider>	
     <LinearProgress mode="indeterminate" />
    </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Loader);