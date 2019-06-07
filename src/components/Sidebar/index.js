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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import {
  FiHelpCircle as HelpIcon,
  FiUser as AccountIcon,
  FiPlusCircle as AddIcon,
  FiLayers as AppsIcon,
  FiList as ListIcon,
  FiMoreHorizontal as MoreIcon,
  FiUsers as ConversationsIcon,
  FiGitPullRequest as ExperienceIcon,
  FiLogOut as LogoutIcon,
  FiUserCheck as AccountEditIcon,
} from 'react-icons/fi';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from '../../actions/session';
import ListItemLink from '../share/ListItemLink';
import MenuItemLink from '../share/MenuItemLink';
import logoImage from './logo.png';
import theme from '../theme';
import styles from './styles';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  closeButtonTouchTapHandler = () => {
    this.props.onClose(false);
  };

  logoutHandler(event) {
    event.preventDefault();
    this.props.actions.logout();
    window.location.replace('/login');
  }

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
          onClose={this.closeButtonTouchTapHandler}
        >
          <div className={classes.leftMenu}>
            <div className={classes.logo}>
              <IconButton
                className={classes.largeClose}
                onTouchTap={this.closeButtonTouchTapHandler}
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
                <PopupState variant="popover" popupId="account-popup-menu">
                  {popupState => (
                    <React.Fragment>
                      <IconButton
                        aria-label="AccountIcon"
                        aria-controls="account-menu"
                        tooltip="Profile"
                        tooltipPosition="top-center"
                        {...bindTrigger(popupState)}
                      >
                        <AccountIcon />
                      </IconButton>
                      <Menu
                        {...bindMenu(popupState)}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                      >
                        <MenuItemLink href="/account">
                          <ListItemIcon>
                            <AccountEditIcon />
                          </ListItemIcon>
                          <Typography variant="inherit">Account</Typography>
                        </MenuItemLink>
                        <MenuItem onClick={this.logoutHandler}>
                          <ListItemIcon>
                            <LogoutIcon />
                          </ListItemIcon>
                          <Typography variant="inherit">Logout</Typography>
                        </MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </div>
            </div>
          </div>
          <div className={classes.rightMenu}>
            <div
              className={classes.logo}
              onTouchTap={this.closeButtonTouchTapHandler}
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
                  <ListItemLink href="/apps">
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
    session: state.session,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch),
  };
}

export default withStyles(styles)(connect(selectProps, mapDispatchToProps)(Sidebar));
