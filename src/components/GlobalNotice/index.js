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
 * @Last Modified time: 2019-05-29 13:47:04
 */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import IconButton from '@material-ui/core/IconButton';
import {
 FiX as CloseIcon,
} from 'react-icons/fi';
import { ThemeProvider } from '@material-ui/styles';
import { ignoreGlobalNotification } from '../../actions/globalNotification';
import theme from '../theme';
import s from './style.css';

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
      <ThemeProvider theme={theme}>
        <div className={s.globalNotice} style={this.props.globalNotification ? {} : { display: 'none' }} >
          <span className={s.content}>{this.props.globalNotification ? this.props.globalNotification.text : ''}</span>
          <IconButton
            color="inherit"
            className={s.noticeButton}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </ThemeProvider>
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
