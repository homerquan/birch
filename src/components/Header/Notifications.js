import _ from 'lodash';
import React from 'react';
import BaseComponent from '../BaseComponent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { deepPurple500, pink500, white } from '@material-ui/core/colors';
import { List, ListItem } from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import {FiBell as NotificationIcon, FiCode as CodeIcon} from 'react-icons/fi';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Link from '../Link';
import lightTheme from '../theme';
import s from './Notifications.css';
import CONSTANTS from '../../constants';

const NotificationsFeed = gql`
query Notifications($userId: String) {
  notificationConnection(first:10,filter:{_owner:$userId}) {
     count
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        node {
          _id
          text
          updatedAt
          _owner
        }
      }
  } 
}
`;

const styles = {
  badgeStyle: {
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    fontSize: 9,
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

class Notifications extends BaseComponent {
  
  static propTypes = {
    runtime: PropTypes.shape({
      NOTIFICATIONS_COUNT: PropTypes.number,
    }).isRequired,
    data: PropTypes.shape({
      notificationsConnection: PropTypes.object,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.handleEventListener = this.handleEventListener.bind(this);
    this.mouseLeftNotificationsContainer = this.mouseLeftNotificationsContainer.bind(this);
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

  mouseLeftNotificationsContainer() {
    setTimeout(() => {
      if (this.state.isOpen) {
        this.setState({ isOpen: false });
      }
    }, 1500);
  }

  render() {
    const { isOpen } = this.state;
    const { runtime, data: { notificationConnection, loading } } = this.props;
    
    if (loading) {
      return <div>loading</div>;
    }

    // TBD: add grace error if notifications are empty
    return (
      <ThemeProvider theme={createMuiTheme(lightTheme)}>
        <Badge
          badgeContent={
            runtime[CONSTANTS.notificationsCount]
              ? runtime[CONSTANTS.notificationsCount]
              : 0
          }
          badgeStyle={
            runtime[CONSTANTS.notificationsCount] > 0
            ? styles.badgeStyle
            : styles.hiddenStyle
          }
          style={styles.badgeRootStyle}
        >
          <IconButton
            className="notificationIcon"
            style={styles.btnStyle}
          >
            <NotificationIcon color={white} />
          </IconButton>
          <Paper
            onMouseLeave={this.mouseLeftNotificationsContainer}
            style={isOpen ? styles.paperStyle : styles.hiddenStyle}
          >
            <div className={s.header}>
              <p className={s.headerTitle}>Notifications</p>
            </div>
            <List style={styles.listStyle}>
              <ListSubheader style={styles.subHeaderStyle}>Recent</ListSubheader>
               {notificationConnection.edges.length
                ? (
                  this.transformConnectionNode(notificationConnection.edges).map((item, index) => (
                    <div key={item.id}>
                      {index > 0 ? <Divider /> : ''}
                      <ListItem
                        leftAvatar={<Avatar backgroundColor={deepPurple500} icon={<CodeIcon />} />}
                        secondaryText={<p>{item.text}</p>}
                        secondaryTextLines={2}
                      />
                    </div>
                  ))
                ) : 'No notification'
              }
            </List>
            <div className={s.footer}>
              <Link to="/notifications" style={styles.footerText}>See All</Link>
            </div>
          </Paper>
        </Badge>
      </ThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    runtime: state.runtime,
  };
}

export default withStyles(s)(
  compose(
    graphql(NotificationsFeed, {
      options: props => ({
        variables: { userId: props.userId },
      }),
    }),
    connect(selectProps, null),
  )(Notifications),
);
