import _ from 'lodash';
import React from 'react';
import BaseComponent from '../BaseComponent';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationIcon from 'material-ui/svg-icons/social/notifications';
import Paper from 'material-ui/Paper';
import { deepPurple500, pink500, white } from 'material-ui/styles/colors';
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
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <Badge
          badgeContent={
            runtime[ACTION_TYPES.NOTIFICATIONS_COUNT]
              ? runtime[ACTION_TYPES.NOTIFICATIONS_COUNT]
              : 0
          }
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
              <Subheader style={styles.subHeaderStyle}>Recent</Subheader>
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
      </MuiThemeProvider>
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
        variables: { userId: "507f1f77bcf86cd799439011"},
      }),
    }),
    connect(selectProps, null),
  )(Notifications),
);
