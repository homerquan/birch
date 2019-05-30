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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { FiBell as NotificationIcon, FiCode as CodeIcon } from 'react-icons/fi';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import Link from '../share/Link';
import theme from '../theme';
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
      <ThemeProvider theme={theme}>
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
          >
            <NotificationIcon/>
          </IconButton>
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
