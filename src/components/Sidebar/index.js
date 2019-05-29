/**
 * Sidebar component
 *
 * Copyright © 2016-present Refle Inc. All rights reserved.
 *
 */

import React from 'react';
// import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import { deepPurple500, white } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import {
  FiUsers as HelpIcon,
  FiUsers as AccountIcon,
  FiUsers as AddIcon,
  FiUsers as AppsIcon,
  FiUsers as ListIcon,
  FiMoreHorizontal as MoreIcon,
  FiUsers as ConversationsIcon,
  FiGitPullRequest as ExperienceIcon,
} from 'react-icons/fi';
import { connect } from 'react-redux';
import logoUrl from './logo.png';
import darkTheme from '../darkTheme';
import s from './style.css';

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
      <ThemeProvider theme={createMuiTheme(darkTheme)}>
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
                <img src={logoUrl} alt="logo" />
              </IconButton>
            </div>
            <div className={s.fixedButton}>
              <IconButton tooltip="All apps" href="/apps">
                <ListIcon />
              </IconButton>
            </div>
            <div className={s.fixedButton}>
              <IconButton tooltip="Add a app" href="/create-app">
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
              <h2 className={s.logoText}>Platform Console</h2>
            </div>
            {selectedApp ? (
              <div>
                <List>
                  <ListItem
                    primaryText={this.props.runtime.selectedApp.name}
                    style={styles.darkLink}
                    rightIcon={<MoreIcon />}
                  />
                </List>
                <Divider />
                <List>
                  <ListItem leftIcon={<ConversationsIcon color={white} style={styles.iconItem} />}>
                    <a className={s.link} href={`/app/${selectedApp._id}/sessions`}>Conversations</a>
                  </ListItem>
                  <ListItem leftIcon={<ExperienceIcon color={white} style={styles.iconItem} />}>
                    <a className={s.link} href={`/app/${selectedApp._id}/experience`}>Experience</a>
                  </ListItem>
                </List>
              </div>
            ) : (
              <div>
                <List>
                  <ListItem leftIcon={<AppsIcon color={white} style={styles.iconItem} />}>
                    <a className={s.link} href={'/apps'}>Properties & Apps</a>
                  </ListItem>
                </List>
              </div>
            )}
          </div>
        </Drawer>
      </ThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    runtime: state.runtime,
  };
}

export default withStyles(s)(connect(selectProps, null)(Sidebar));
