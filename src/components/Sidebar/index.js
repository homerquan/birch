/*
* @Author: homer
* @Date:   2019-05-29 12:37:48
* @Last Modified by:   homer
* @Last Modified time: 2019-05-30 14:39:10
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
  FiHelpCircle as HelpIcon,
  FiUser as AccountIcon,
  FiPlusCircle as AddIcon,
  FiLayers as AppsIcon,
  FiList as ListIcon,
  FiMoreHorizontal as MoreIcon,
  FiUsers as ConversationsIcon,
  FiGitPullRequest as ExperienceIcon,
} from 'react-icons/fi';
import { connect } from 'react-redux';
import ListItemLink from '../share/ListItemLink';
import logoImage from './logo.png';
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
          classes={{
            paper: classes.drawerPaper,
          }}
          open={this.props.open}
          onClose={this.handleCloseButtonTouchTap}
        >
          <div className={classes.leftMenu}>
            <div className={classes.logo}>
              <IconButton
                className={classes.largeClose}
                onTouchTap={this.handleCloseButtonTouchTap}
              >
                <a href="/"><img src={logoImage} alt="logo" /></a>
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
                <div className={classes.appName}>{selectedApp.name}</div>
                <Divider />
                <List component="nav">
                  <ListItemLink href={`/app/${selectedApp._id}/sessions`}>
                    <ListItemIcon>
                      <ConversationsIcon className={classes.iconItem} />
                    </ListItemIcon>
                    <ListItemText primary="Conversations" />
                  </ListItemLink>
                  <ListItemLink href={`/app/${selectedApp._id}/experience`}>
                    <ListItemIcon>
                      <ExperienceIcon className={classes.iconItem} />
                    </ListItemIcon>
                    <ListItemText primary="Experience" />
                  </ListItemLink>
                </List>
              </div>
            ) : (
              <div>
                <List component="nav">
                  <ListItemLink href='/apps'>
                    <ListItemIcon>
                      <ListIcon className={classes.iconItem} />
                    </ListItemIcon>
                    <ListItemText primary="Properties & Apps" />
                  </ListItemLink>
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
