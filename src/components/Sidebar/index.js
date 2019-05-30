/*
* @Author: homer
* @Date:   2019-05-29 12:37:48
* @Last Modified by:   homer
* @Last Modified time: 2019-05-30 00:26:56
*/
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { ThemeProvider, withStyles } from '@material-ui/styles';
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
import theme from '../theme';
import styles from './styles';

class Sidebar extends React.Component {

  handleCloseButtonTouchTap = () => {
    this.props.onClose(false);
  };

  render() {
    const { classes } = this.props;

    const selectedApp =
      this.props.runtime && this.props.runtime.selectedApp ? this.props.runtime.selectedApp : null;

    return (
      <ThemeProvider theme={theme}>
        <Drawer
          docked={false}
          open={this.props.open}
          width={classes.drawer.width}
          onClose={this.handleCloseButtonTouchTap}
        >
          <div className={classes.leftMenu}>
            <div className={classes.logo}>
              <IconButton
                className={classes.large}
                onTouchTap={this.handleCloseButtonTouchTap}
              >
                <img src={logoUrl} alt="logo" />
              </IconButton>
            </div>
            <div className={classes.fixedButton}>
              <IconButton tooltip="All apps" href="/apps">
                <ListIcon />
              </IconButton>
            </div>
            <div className={classes.fixedButton}>
              <IconButton tooltip="Add a app" href="/create-app">
                <AddIcon />
              </IconButton>
            </div>
            <div className={classes.bottomSection}>
              <div className={classes.fixedButton}>
                <IconButton
                  tooltip="Help"
                  tooltipPosition="top-center"
                  href="/help"
                >
                  <HelpIcon />
                </IconButton>
              </div>
              <div className={classes.fixedButton}>
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
          <div className={classes.rightMenu}>
            <div
              className={classes.logo}
              onTouchTap={this.handleCloseButtonTouchTap}
            >
              <h2 className={classes.logoText}>Platform Console</h2>
            </div>
            {selectedApp ? (
              <div>
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <ConversationsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                  </ListItem>
                  <ListItem
                    primaryText={this.props.runtime.selectedApp.name}
                    className={classes.darkLink}
                    rightIcon={<MoreIcon />}
                  />
                </List>
                <Divider />
                <List>
                  <ListItem leftIcon={<ConversationsIcon  className={classes.iconItem} />}>
                    <a className={classes.link} href={`/app/${selectedApp._id}/sessions`}>Conversations</a>
                  </ListItem>
                  <ListItem leftIcon={<ExperienceIcon className={classes.iconItem} />}>
                    <a className={classes.link} href={`/app/${selectedApp._id}/experience`}>Experience</a>
                  </ListItem>
                </List>
              </div>
            ) : (
              <div>
                <List>
                  <ListItem leftIcon={<AppsIcon className={classes.iconItem} />}>
                    <a className={classes.link} href={'/apps'}>Properties & Apps</a>
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

export default withStyles(styles)(connect(selectProps, null)(Sidebar));
