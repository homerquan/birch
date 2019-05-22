/*
 * Copyright (C) Reflen Inc.
 *
 * This file is part of reflen-console. The codes can not be copied
 * and/or distributed without permission
 *
 * @Author: homer
 * @Email: dev@reflen.com
 * @Date:   2017-11-05 17:00:20
 * @Last Modified by:   homer
 * @Last Modified time: 2019-05-22 17:46:22
 */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'react-material-icons/icons/content/clear';
import { white } from 'material-ui/styles/colors';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { ignoreGlobalNotification } from '../../actions/globalNotification';
import lightTheme from '../theme';
import s from './style.css';

const styles = {
  noticeIcon: {
    width: 18,
    height: 18,
    color: white,
  },
  closeButton: {
    width: 40,
    height: 40,
    padding: 6,
  },
};

class GlobalNotice extends React.Component {
  static propTypes = {
    globalNotification: PropTypes.object,
    ignoreGlobalNotification: PropTypes.func.isRequired,
  };

  static defaultProps = {
    globalNotification: {},
  }

  handleClose = () => {
    this.props.ignoreGlobalNotification({
      name: 'IGNORE_GLOBAL_NOTIFICATION',
      value: {},
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <div className={s.globalNotice} style={this.props.globalNotification ? {} : { display: 'none' }} >
          <span className={s.content}>{this.props.globalNotification ? this.props.globalNotification.text : ''}</span>
          <IconButton
            className={s.noticeButton}
            iconStyle={styles.noticeIcon}
            style={styles.closeButton}
            onTouchTap={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </MuiThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    globalNotification: state.globalNotification,
  };
}

const mapDispatchToProps = dispatch => ({
  ignoreGlobalNotification: bindActionCreators(ignoreGlobalNotification, dispatch),
});

export default withStyles(s)(connect(selectProps, mapDispatchToProps)(GlobalNotice));
