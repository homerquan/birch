/**
 * Sidebar component
 *
 * Copyright © 2016-present Refle Inc. All rights reserved.
 *
 */

import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sidebar.css';
import Drawer from 'material-ui/Drawer'; 
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from '../theme';
import {spacing, typography, zIndex} from 'material-ui/styles';
import logoUrl from './logo.png';
import logoMinUrl from './logo-min.png';
import {deepPurple500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'react-material-icons/icons/action/help-outline';
import AccountIcon from 'react-material-icons/icons/action/account-circle';
import AddIcon from 'react-material-icons/icons/content/add';
import CloseIcon from 'react-material-icons/icons/navigation/chevron-left';
import ListIcon from 'react-material-icons/icons/action/list';
import OverviewIcon from 'react-material-icons/icons/action/event-seat';
import Link from 'react-router-dom/Link';

const styles = {
  logo: {
    cursor: 'pointer',
    paddingLeft: spacing.desktopGutter,
    marginTop: 24,
    marginBottom: 8,
  },
  fixedMenu: {
    backgroundColor: deepPurple500,
  },
  drawer: {
    width: 320,
  },
  version: {
    paddingLeft: spacing.desktopGutterLess,
    fontSize: 16,
  },
  large: {
    width: 60,
    height: 60,
    padding: 0,
  },
  largeIcon: {
    width: 48,
    height: 48,
  },
};

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
  }

  handleCloseButtonTouchTap = () => {
    this.props.onClose(false);
  };
  
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <Drawer docked={false} open={this.props.open} width={styles.drawer.width} onRequestChange={this.handleCloseButtonTouchTap}>
          <div className={s.leftMenu} style={styles.fixedMenu}>
              <div className={s.logo}>
                <IconButton iconStyle={styles.largeIcon} style={styles.large} onTouchTap={this.handleCloseButtonTouchTap}>
                   <img src={logoMinUrl} alt="logo" />
                </IconButton>
              </div>  
              <div className={s.fixedButton}>
                <IconButton tooltip="All apps">
                  <ListIcon/>
                </IconButton>
              </div>
              <div className={s.fixedButton}>
                <IconButton tooltip="Add a app">
                  <AddIcon/>
                </IconButton>
              </div>
              <div className={s.bottomSection}>
                <div className={s.fixedButton}>
                  <IconButton tooltip="Help" tooltipPosition="top-center">
                    <HelpIcon/>
                  </IconButton>
                </div>
                <div className={s.fixedButton}>
                  <IconButton tooltip="Profile" tooltipPosition="top-center">
                    <AccountIcon/>
                  </IconButton>
                </div>
              </div>      
          </div>
          <div className={s.rightMenu}>
            <div style={styles.logo} onTouchTap={this.handleCloseButtonTouchTap}>
               <img src={logoUrl} alt="convospot" />
            </div>
            <List>
              <ListItem primaryText="Overview" leftIcon={<OverviewIcon />} />
            </List>
            <Divider />
            <List>
              <ListItem leftIcon={<HelpIcon />} button component={Link} to='/conversations'>Conversations</ListItem> 
              <ListItem leftIcon={<HelpIcon />} button component={Link} to='/knowledge'>Knowledge</ListItem>
            </List>
          </div>
      </Drawer>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Sidebar);
