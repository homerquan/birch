import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationIcon from 'material-ui/svg-icons/social/notifications';
import Paper from 'material-ui/Paper';
import { deepPurple500, pink500 } from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CodeIcon from 'material-ui/svg-icons/action/code';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Link from '../Link/Link';

import s from "./Notifications.css";
import fakeData from './fakeNotifications.json';

const badgeStyle = {
  top: -4,
  right: -4,
  width: 21,
  height: 20,
  paddingTop: 1,
  fontSize: 10,
  border: '2px solid white',
  zIndex: 1,
  backgroundColor: pink500,
  color: 'white',
};

const badgeRootStyle = {
  padding: 0,
};

const btnStyle = {
  padding: 0
};

const paperStyle = {
  position: 'absolute',
  zIndex: 101,
  right: 0,
  top: 46,
  width: 430
};

const subHeaderStyle = {
  lineHeight: '14px',
  paddingTop: 10,
  paddingBottom: 5,
};

const listStyle = {
  padding: 0,
  overflowY: 'scroll',
  maxHeight: '315px', // show 4 notifications
}

const footerText = {
  margin: '8px 0',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '14px',
  padding: '0 10px',
  color: deepPurple500,
  textDecoration: 'none'
};

const hiddenStyle = {
  display: 'none'
};

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isLoading: true,
      notifications: [],
    }

    this.handleEventListener = this.handleEventListener.bind(this);
  }

  componentDidMount() {
    // TODO: Figure out how notifications are going to be loaded
    // so that I can set up a proper loader. Might make more
    // sense to have the whole component be loaded/unloaded
    // in the header itself.
    setTimeout(() => {
      this.setState({
        notifications: fakeData.data,
        isLoading: false,
      });
    }, 1000);

    document.addEventListener("click", this.handleEventListener);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleEventListener);
  }

  handleEventListener(e) {
    const { isOpen } = this.state
    const notificationsIcon = document.querySelector('.notificationIcon');

    if (notificationsIcon.contains(e.target)) {
      // Close notifications if it's already open and the icon
      // is clicked on
      if (isOpen) {
        this.setState({ isOpen: false });
        return;
      }

      this.setState({ isOpen: true });
      return;
    }

    this.setState({ isOpen: false });
  }

  render() {
    const { isLoading, notifications, isOpen } = this.state;

    return (
      <MuiThemeProvider>
        <Badge
          badgeContent={notifications.length}
          badgeStyle={notifications.length ? badgeStyle : hiddenStyle}
          style={badgeRootStyle}
        >
          <IconButton
            className="notificationIcon"
            style={btnStyle} 
          >
            <NotificationIcon color={deepPurple500} />
          </IconButton>
          <Paper style={isOpen ? paperStyle : hiddenStyle}>
            <div className={s.header}>
              <p className={s.headerTitle}>Notifications</p>
            </div>
            <List style={listStyle}>
            <Subheader style={subHeaderStyle}>Recent</Subheader>
              {isLoading
                ? 'Loading...'
                : notifications.map((message, index) => (
                  <div key={index}>
                    {index > 0 ? <Divider /> : ''}  
                    <ListItem
                      leftAvatar={<Avatar backgroundColor={deepPurple500} icon={<CodeIcon />} />}
                      secondaryText={<p>{message.message}</p>}
                      secondaryTextLines={2}
                    />
                  </div>
                ))
              }
            </List>
            <div className={s.footer}>
              <Link to='#' style={footerText}>See All</Link>
            </div>
          </Paper>
        </Badge>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(Notifications);
