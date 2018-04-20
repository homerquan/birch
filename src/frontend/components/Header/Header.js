/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Header.css";
import Link from "../Link";
import AppBar from "material-ui/AppBar";
import MenuItem from "material-ui/MenuItem";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { white } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import themeDark from "../themeDark";
import Loader from "../Loader";
import GlobalNotice from "../GlobalNotice";
import Sticky from "react-stickynode";
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ViewIcon from 'material-ui/svg-icons/action/visibility';
import SMSIcon from 'material-ui/svg-icons/notification/sms';
import NotificationIcon from 'material-ui/svg-icons/social/notifications';
import { deepPurple500 } from 'material-ui/styles/colors';
import Badge from 'material-ui/Badge';

import IconMenu from 'material-ui/IconMenu';

import Messages from './Messages';

const styles = {
  header: {
    backgroundColor: white,
    boxShadow: 'none'
  },
  stickyHeader: {
    backgroundColor: white,
  }
};


const btnStyle = {
  marginTop: '3px',
};

function LoadingIndicator(props) {
  const loading = props.loading;
  if (loading) {
    return (<Loader />);
  }
  return null;
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      messagesOpen: false,
      notificationsOpen: false
    };

    this.handleToggleButtonTouchTap = this.handleToggleButtonTouchTap.bind(this);
  }

  // after each refresh relogin using refresh token
  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500); // simulates loading of data
  }

  handleToggleButtonTouchTap = e => {
    this.props.onToggleChange();
  };

  handleStickyChange = e => {
    if (e.status === Sticky.STATUS_FIXED) {
      this.setState({ sticky: true });
    } else {
      this.setState({ sticky: false });
    }
  };

  render() {
    const selectedAppName = this.props.runtime && this.props.runtime.selectedApp ? this.props.runtime.selectedApp.name : '';

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(themeDark)}>
     
        <div>
          <LoadingIndicator loading={this.state.loading} />
          <GlobalNotice />
          <Sticky onStateChange={this.handleStickyChange} innerZ={100}>
            <AppBar
              title={selectedAppName}
              className={this.state.headerClass}
              style={this.state.sticky ? styles.stickyHeader : styles.header}
              onLeftIconButtonTouchTap={this.handleToggleButtonTouchTap}
              iconElementRight={
                <div>
                  <Messages
                  
                  />
                  <Badge
                    badgeContent={10}
                    badgeStyle={{top: 0, right: 0, width: 20, height: 20, paddingTop: 1, fontSize: 10 }}
                    style={{ padding: 0 }}
                  >
                    <IconButton
                      className='notificationIcon'
                      style={btnStyle}
                    >
                      <NotificationIcon color={deepPurple500} />
                    </IconButton>
                  </Badge>
                </div>
              }
            >
            </AppBar>
          </Sticky>  
        </div>
      </MuiThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    runtime: state.runtime
  };
}

export default withStyles(s)(connect(selectProps, null)(Header));
