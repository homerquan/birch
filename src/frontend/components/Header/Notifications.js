import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import gql from 'graphql-tag';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
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

import lightTheme from '../theme';
import s from './Notifications.css';
import { ACTION_TYPES } from '../../constants';

const NotificationsFeed = gql`
  query NotificationsFeed($clientId: String) {
    notificationsFeed(clientId: $clientId){
      notifications(first:1, filter:["status=unread"]){
        totalCount
        edges {
          node {
            id
            text
            status
          }
        }
        pageInfo{
        hasNextPage
        endCursor
        }
      }
    }
  }
`;


const styles = {
  badgeStyle: {
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
  },
  badgeRootStyle: {
    padding: 0,
  },
  btnStyle: {
    padding: 0,
  },
  paperStyle: {
    position: 'absolute',
    zIndex: 101,
    right: 0,
    top: 46,
    width: 430,
  },
  subHeaderStyle: {
    lineHeight: '14px',
    paddingTop: 10,
    paddingBottom: 5,
  },
  listStyle: {
    padding: 0,
    overflowY: 'scroll',
    maxHeight: '317px', // show 4 notifications
  },
  footerText: {
    margin: '8px 0',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '14px',
    padding: '0 10px',
    color: deepPurple500,
    textDecoration: 'none',
  },
  hiddenStyle: {
    display: 'none',
  },
};

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.handleEventListener = this.handleEventListener.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleEventListener);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleEventListener);
  }

  handleEventListener(e) {
    const { isOpen } = this.state;
    const notificationsIcon = document.querySelector('.notificationIcon');

    // Close notifications if it's already open and the icon
    // is clicked on
    if (notificationsIcon.contains(e.target) && !isOpen) {
      this.setState({ isOpen: true });
      return;
    }

    this.setState({ isOpen: false });
  }

  transform = data => (
    _.map(data, 'node') // eslint-disable-line
  );

  render() {
    const { isOpen } = this.state;
    const { runtime, data: { notificationsFeed } } = this.props;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <Badge
          badgeContent={runtime[ACTION_TYPES.NOTIFICATIONS_COUNT]}
          badgeStyle={
            runtime[ACTION_TYPES.NOTIFICATIONS_COUNT] > 0
            ? styles.badgeStyle
            : styles.hiddenStyle
          }
          style={styles.badgeRootStyle}
        >
          <IconButton
            className="notificationIcon"
            style={styles.btnStyle}
          >
            <NotificationIcon color={deepPurple500} />
          </IconButton>
          <Paper style={isOpen ? styles.paperStyle : styles.hiddenStyle}>
            <div className={s.header}>
              <p className={s.headerTitle}>Notifications</p>
            </div>
            <List style={styles.listStyle}>
              <Subheader style={styles.subHeaderStyle}>Recent</Subheader>
              {notificationsFeed.notifications.edges
                ? (
                  this.transform(notificationsFeed.notifications.edges).map((message, index) => (
                    <div key={message.id}>
                      {index > 0 ? <Divider /> : ''}
                      <ListItem
                        leftAvatar={<Avatar backgroundColor={deepPurple500} icon={<CodeIcon />} />}
                        secondaryText={<p>{message.text}</p>}
                        secondaryTextLines={2}
                      />
                    </div>
                  ))
                ) : 'Loading...'
              }
            </List>
            <div className={s.footer}>
              <Link to="/notifications" style={styles.footerText}>See All</Link>
            </div>
          </Paper>
        </Badge>
      </MuiThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    runtime: state.runtime,
  };
}

Notifications.propTypes = {
  runtime: PropTypes.number.isRequired,
  data: PropTypes.shape({
    notificationsFeed: PropTypes.object,
  }).isRequired,
};

export default withStyles(s)(
  compose(
    graphql(NotificationsFeed, {
      options: props => ({
        variables: { clientId: props.clientId },
      }),
    }),
    connect(selectProps, null),
  )(Notifications),
);
