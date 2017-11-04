/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepPurple500} from 'material-ui/styles/colors';

const styles = {
  header: {
    backgroundColor: deepPurple500,
  },
};

class Header extends React.Component {
  
  handleToggleButtonTouchTap = (event) => {
     this.props.onToggleChange();
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBar title="App Name" style={styles.header} onLeftIconButtonTouchTap={this.handleToggleButtonTouchTap.bind(this)}>  </AppBar>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Header);