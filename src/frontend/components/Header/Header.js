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
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { white } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import themeDark from "../themeDark";
import Loader from "../Loader";
import GlobalNotice from "../GlobalNotice";
import Sticky from "react-stickynode";
import { connect } from 'react-redux';

import s from "./Header.css";
import Messages from './Messages';
import Notifications from './Notifications';

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
                  <Messages />
                  <Notifications />
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
