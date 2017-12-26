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
import * as sessionActions from "../../actions/session";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

const styles = {
  header: {
    backgroundColor: white,
    boxShadow: 'none'
  },
  stickyHeader: {
    backgroundColor: white
  }
};

function LoadingIndicator(props) {
  const loading = props.loading;
  if (loading) {
    return (<Loader />);
  }
  return null;
};

class Header extends React.Component {
  state = {
    loading: true
  };

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

  // after each refresh relogin using refresh token
  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500); // simulates loading of data
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(themeDark)}>
     
        <div>
          <LoadingIndicator loading={this.state.loading} />
          <GlobalNotice />
          <Sticky onStateChange={this.handleStickyChange}>
          <AppBar
            title=''
            className={this.state.headerClass}
            style={this.state.sticky ? styles.stickyHeader : styles.header}
            onLeftIconButtonTouchTap={this.handleToggleButtonTouchTap.bind(
              this
            )}
          >
          </AppBar>
          </Sticky>  
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default withStyles(s)(connect(null, mapDispatchToProps)(Header));
