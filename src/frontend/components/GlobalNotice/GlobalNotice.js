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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'react-material-icons/icons/content/clear';
import s from './GlobalNotice.css';
import {white} from 'material-ui/styles/colors';

const styles = {
  noticeIcon: {
    width: 18,
    height: 18,
    color: white
  },
  closeButton: {
  	width: 40,
    height: 40,
    padding: 6
  }
};

class GlobalNotice extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isActive: false,
    }
  }

  handleClose = () => {
    this.setState({
      isActive: false,
    });
  }

  
  render() {
    return (
    <MuiThemeProvider>	
      <div className={s.globalNotice} style={this.state. isActive ? {} : { display: 'none' }} > 
      		<span className={s.content}>{this.props.notice}</span>
      		<IconButton className={s.noticeButton} iconStyle={styles.noticeIcon} style={styles.closeButton} onTouchTap={this.handleClose}><CloseIcon/></IconButton>
      </div>
    </MuiThemeProvider>
    );
  }
}
export default withStyles(s)(GlobalNotice);