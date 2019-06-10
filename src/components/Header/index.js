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
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/styles';
import Sticky from 'react-stickynode';
import { connect } from 'react-redux';
import CornerNotifications from 'react-notification-system-redux';
import { Alerts as SnackBarAlerts } from 'mui-redux-alerts-next';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { FiTerminal as TerminalIcon, FiMenu as HamburgerIcon } from 'react-icons/fi';
import theme from '../theme';
import Loader from '../Loader';
import GlobalNotice from '../GlobalNotice';
import GlobalSearch from '../GlobalSearch';
import SubscriptionVirtual from '../SubscriptionVirtual';
import Messages from './Messages';
import Notifications from './Notifications';
import { openConsole, closeConsole } from '../../actions/console';
import styles from './styles';

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
    onToggleChange: PropTypes.func.isRequired,
    runtime: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired,
    snackBarNotifications: PropTypes.object.isRequired,
    openConsole: PropTypes.func.isRequired,
    closeConsole: PropTypes.func.isRequired,
    console: PropTypes.shape({
      isOpen: PropTypes.bool.isRequired,
    }).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.notificationSystem = React.createRef();
    this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this);
    this.toggleConsole = this.toggleConsole.bind(this);
  }

  // after each refresh relogin using refresh token
  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500); // simulates loading of data
  }

  handleToggleButtonClick = () => {
    this.props.onToggleChange();
  };

  handleStickyChange = (e) => {
    if (e.status === Sticky.STATUS_FIXED) {
      this.setState({ sticky: true });
    } else {
      this.setState({ sticky: false });
    }
  };

  toggleConsole() {
    if (this.props.console.isOpen) {
      this.props.closeConsole();
    } else {
      this.props.openConsole();
    }
  }

  renderLoadingIndicator() {
    return this.state.loading ? <Loader /> : null;
  }

  render() {
    const selectedAppName = this.props.runtime && this.props.runtime.selectedApp ? this.props.runtime.selectedApp.name : '';
    const openConsole = this.props.console.isOpen;
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div>
          {this.renderLoadingIndicator()}
          <GlobalNotice />
          <CornerNotifications
            notifications={this.props.notifications}
            style={notificationStyle}
          />
          <SnackBarAlerts alerts={this.props.snackBarNotifications} />
          {/* <Sticky onStateChange={this.handleStickyChange} innerZ={100}> */}
          <SubscriptionVirtual />
          <AppBar color="default" position="static">
            <Toolbar>
              <IconButton className={classes.drawerSwitch} edge="start" color="inherit" onClick={this.handleToggleButtonClick}>
                <HamburgerIcon color="inherit" />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {selectedAppName}
              </Typography>
              <GlobalSearch />

              <IconButton color={openConsole ? 'primary' : 'default'} tooltip="Open Console">
                <TerminalIcon onClick={this.toggleConsole} />
              </IconButton>
               {/* <Messages /> 
                   <Notifications userId={this.props.session.userId} /> */}
            </Toolbar>
          </AppBar>
          {/* </Sticky> */}
        </div>
      </ThemeProvider>
    );
  }
}

Header.propTypes = {
  session: PropTypes.shape({
    userId: PropTypes.string,
  }).isRequired,
};

function selectProps(state) {
  return {
    runtime: state.runtime,
    notifications: state.notifications,
    snackBarNotifications: state.snackBarNotifications,
    console: state.console,
    session: state.session,
  };
}

const mapDispatchToProps = dispatch => ({
  openConsole: bindActionCreators(openConsole, dispatch),
  closeConsole: bindActionCreators(closeConsole, dispatch),
});

export default withStyles(styles)(connect(selectProps, mapDispatchToProps)(Header));
