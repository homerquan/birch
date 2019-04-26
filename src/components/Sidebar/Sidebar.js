/**
 * Sidebar component
 *
 * Copyright © 2016-present Refle Inc. All rights reserved.
 *
 */

import React from 'react';
// import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
// import ActionInfo from 'material-ui/svg-icons/action/info';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { spacing } from 'material-ui/styles';
import { deepPurple500, white } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import HelpIcon from 'react-material-icons/icons/action/help-outline';
import AccountIcon from 'react-material-icons/icons/action/account-circle';
import AddIcon from 'react-material-icons/icons/content/add';
import AppsIcon from 'react-material-icons/icons/action/list';
// import CloseIcon from 'react-material-icons/icons/navigation/chevron-left';
import ListIcon from 'react-material-icons/icons/action/list';
import MoreIcon from 'react-icons/lib/md/more-vert';
// import ConversationIcon from 'react-material-icons/icons/communication/chat';
import ConversationsIcon from 'react-icons/lib/md/chat';
import PluginsIcon from 'react-icons/lib/md/developer-board';
import ExperienceIcon from 'react-icons/lib/md/grain';
import { connect } from 'react-redux';

import s from './Sidebar.css';
import logoUrl from './logo.png';
import themeDark from '../themeDark';
import logoMinUrl from './logo-min.png';

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
  darkLink: {
    color: '#757575',
    fontWeight: '600',
    paddingLeft: 10,
  },
  iconItem: {
    paddingLeft: 10,
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
    const selectedApp =
      this.props.runtime && this.props.runtime.selectedApp ? this.props.runtime.selectedApp : null;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(themeDark)}>
        <Drawer
          docked={false}
          open={this.props.open}
          width={styles.drawer.width}
          onRequestChange={this.handleCloseButtonTouchTap}
        >
          <div className={s.leftMenu} style={styles.fixedMenu}>
            <div className={s.logo}>
              <IconButton
                iconStyle={styles.largeIcon}
                style={styles.large}
                onTouchTap={this.handleCloseButtonTouchTap}
              >
                <img src={logoMinUrl} alt="logo" />
              </IconButton>
            </div>
            <div className={s.fixedButton}>
              <IconButton tooltip="All apps" href="/apps">
                <ListIcon />
              </IconButton>
            </div>
            <div className={s.fixedButton}>
              <IconButton tooltip="Add a app" href="/new_app">
                <AddIcon />
              </IconButton>
            </div>
            <div className={s.bottomSection}>
              <div className={s.fixedButton}>
                <IconButton
                  tooltip="Help"
                  tooltipPosition="top-center"
                  href="/help"
                >
                  <HelpIcon />
                </IconButton>
              </div>
              <div className={s.fixedButton}>
                <IconButton
                  tooltip="Profile"
                  tooltipPosition="top-center"
                  href="/profile"
                >
                  <AccountIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className={s.rightMenu}>
            <div
              style={styles.logo}
              onTouchTap={this.handleCloseButtonTouchTap}
            >
              <img src={logoUrl} alt="reflen" />
            </div>
            {selectedApp ? (
              <div>
                <List>
                  <ListItem
                    primaryText={this.props.runtime.selectedApp.name}
                    style = {styles.darkLink}
                    rightIcon={<MoreIcon />}
                  />
                </List>
                <Divider />
                <List>
                  <ListItem leftIcon={<ConversationsIcon color={white} style={styles.iconItem} />}>
                    <a className={s.link} href={`/${selectedApp.id}/conversations`}>Conversations</a>
                  </ListItem>
                  <ListItem leftIcon={<PluginsIcon color={white} style={styles.iconItem} />}>
                     <a className={s.link} href={`/${selectedApp.id}/plugins`}>Plugins</a>
                  </ListItem>
                  <ListItem leftIcon={<ExperienceIcon color={white} style={styles.iconItem} />}>
                     <a className={s.link} href={`/${selectedApp.id}/experience_editor`}>Experience</a>
                  </ListItem>
                </List>
              </div>
            ) : (
              <div>
                <List>
                  <ListItem leftIcon={<AppsIcon color={white} style={styles.iconItem} />}>
                    <a className={s.link} href={`/apps`}>Properties & Apps</a>
                  </ListItem>
                </List>
              </div>
            )}
          </div>
        </Drawer>
      </MuiThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    runtime: state.runtime
  };
}

export default withStyles(s)(connect(selectProps, null)(Sidebar));
