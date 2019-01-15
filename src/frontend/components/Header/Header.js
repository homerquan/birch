/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { white } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Sticky from 'react-stickynode';
import { connect } from 'react-redux';
import CornerNotifications, { info } from 'react-notification-system-redux';

import themeDark from '../themeDark';
import theme from '../theme';
import Loader from '../Loader';
import GlobalNotice from '../GlobalNotice';
import s from './Header.css';
import Messages from './Messages';
import Notifications from './Notifications';
import ReplyButtons from '../CornerNotifications/ReplyButtons';

const styles = {
  header: {
    backgroundColor: white,
    boxShadow: 'none',
  },
  stickyHeader: {
    backgroundColor: white,
  },
};


const notificationStyle = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      padding: '10px 10px 0px 10px',
      height: 'auto',
    },

    MessageWrapper: {
      DefaultStyle: {
        // marginBottom: '10px',
      },
    },

    info: {
      borderTop: `2px solid ${theme.palette.primary1Color}`,
      backgroundColor: 'white',
    },
  },
};

class Header extends React.Component {
  static propTypes = {
    onToggleChange: PropTypes.isRequired,
    runtime: PropTypes.isRequired,
    notifications: PropTypes.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.notificationSystem = React.createRef();
    this.handleToggleButtonTouchTap = this.handleToggleButtonTouchTap.bind(this);
  }

  // after each refresh relogin using refresh token
  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500); // simulates loading of data
  }

  handleToggleButtonTouchTap = () => {
    this.props.onToggleChange();
  };

  handleStickyChange = (e) => {
    if (e.status === Sticky.STATUS_FIXED) {
      this.setState({ sticky: true });
    } else {
      this.setState({ sticky: false });
    }
  };

  renderLoadingIndicator() {
    return this.state.loading ? <Loader /> : null;
  }

  render() {
    const selectedAppName = this.props.runtime && this.props.runtime.selectedApp ? this.props.runtime.selectedApp.name : '';

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(themeDark)}>
        <div>
          {this.renderLoadingIndicator()}
          <GlobalNotice />
          <CornerNotifications
            notifications={this.props.notifications}
            style={notificationStyle}
          />
          <Sticky onStateChange={this.handleStickyChange} innerZ={100}>
            <AppBar
              title={selectedAppName}
              className={this.state.headerClass}
              style={this.state.sticky ? styles.stickyHeader : styles.header}
              onLeftIconButtonTouchTap={this.handleToggleButtonTouchTap}
              iconElementRight={
                <div>
                  <Messages />
                  <Notifications clientId={'asdf'} />
                </div>
              }
            />
          </Sticky>
        </div>
      </MuiThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    runtime: state.runtime,
    notifications: state.notifications,
  };
}

export default withStyles(s)(connect(selectProps, null)(Header));
