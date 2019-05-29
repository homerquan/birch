import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { deepPurple500, pink500, white } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { FiMail as SMSIcon, FiCode as CodeIcon } from 'react-icons/fi';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Link from '../Link';
import theme from '../theme';
import s from './Messages.css';
import fakeData from './fakeMessages.json';

const badgeStyle = {
  top: 4,
  right: 4,
  width: 18,
  height: 18,
  fontSize: 9,
  zIndex: 1,
  backgroundColor: pink500,
  color: 'white',
};

const badgeRootStyle = {
  padding: 0,
};

const btnStyle = {
  padding: 0,
};

const paperStyle = {
  position: 'absolute',
  zIndex: 101,
  right: 0,
  top: 46,
  width: 430,
};

const subHeaderStyle = {
  lineHeight: '14px',
  paddingTop: 10,
  paddingBottom: 5,
};

const listStyle = {
  padding: 0,
  overflowY: 'scroll',
  maxHeight: '315px', // show 4 messages
};

const footerText = {
  margin: '8px 0',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '14px',
  padding: '0 10px',
  color: deepPurple500,
  textDecoration: 'none',
};

const hiddenStyle = {
  display: 'none',
};

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isLoading: true,
      messages: [],
    };

    this.handleEventListener = this.handleEventListener.bind(this);
    this.mouseLeftMessagesContainer = this.mouseLeftMessagesContainer.bind(this);
  }

  componentDidMount() {
    // TODO: Figure out how messages are going to be loaded
    // so that I can set up a proper loader. Might make more
    // sense to have the whole component be loaded/unloaded
    // in the header itself.
    setTimeout(() => {
      this.setState({
        messages: fakeData.data,
        isLoading: false,
      });
    }, 1000);

    document.addEventListener('click', this.handleEventListener);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleEventListener);
  }

  handleEventListener(e) {
    const { isOpen } = this.state;
    const messagesIcon = document.querySelector('.messageIcon');

    if (messagesIcon.contains(e.target)) {
      // Close messages if it's already open and the icon
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

  mouseLeftMessagesContainer() {
    setTimeout(() => {
      if (this.state.isOpen) {
        this.setState({ isOpen: false });
      }
    }, 1500);
  }

  render() {
    const { isLoading, messages, isOpen } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Badge
          badgeContent={messages.length ? messages.length : 0}
          badgeStyle={messages.length ? badgeStyle : hiddenStyle}
          style={badgeRootStyle}
        >
          <IconButton
            className="messageIcon"
            style={btnStyle}
          >
            <SMSIcon color={white} />
          </IconButton>
          <Paper
            onMouseLeave={this.mouseLeftMessagesContainer}
            style={isOpen ? paperStyle : hiddenStyle}
          >
            <div className={s.header}>
              <p className={s.headerTitle}>Messages</p>
            </div>
            <List style={listStyle}>
              <ListSubheader style={subHeaderStyle}>Recent</ListSubheader>
              {isLoading
                ? 'Loading...'
                : messages.map((message, index) => (
                  <div key={message.id}>
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
      </ThemeProvider>
    );
  }
}

// Messages.propTypes = {

// };

export default withStyles(s)(Messages);
