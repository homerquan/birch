import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { deepPurple500, black } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import CodeIcon from 'material-ui/svg-icons/action/code';
import RaisedButton from 'material-ui/RaisedButton';
import AppsIcon from 'material-ui/svg-icons/navigation/apps';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import { RCard, RCardHeader, RCardBody, RCardFooter } from '../styled/RCard';
import lightTheme from '../theme';
import s from './style.css';

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

const NotificationsFeedLoadMore = gql`
  query NotificationsFeed($clientId: String, $after: String, $filter: [String]) {
    notificationsFeed(clientId: $clientId) {
      notifications(after: $after, filter: $filter ){
        totalCount
        edges{
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
  listStyle: {
    padding: 0,
    overflow: 'hidden',
    transition: 'height 1s',
  },
  subHeaderStyle: {
    lineHeight: '14px',
    paddingTop: 10,
    paddingBottom: 5,
  },
};

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
  }

  transform = data => (
    _.map(data, 'node') // eslint-disable-line
  );

  loadMore() {
    const { data: { notificationsFeed, fetchMore }, clientId } = this.props;

    fetchMore({
      query: NotificationsFeedLoadMore,
      variables: {
        clientId,
        after: notificationsFeed.notifications.pageInfo.endCursor,
        filter: ['status=unread'],
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const previousEntry = previousResult.notificationsFeed.notifications.edges;
        const newNotifications = fetchMoreResult.notificationsFeed.notifications.edges;

        return {
          notificationsFeed: {
            __typename: previousResult.notificationsFeed.__typename, // eslint-disable-line
            notifications: {
              __typename: previousResult.notificationsFeed.notifications.__typename, // eslint-disable-line
              edges: [...previousEntry, ...newNotifications],
              pageInfo: fetchMoreResult.notificationsFeed.notifications.pageInfo,
              totalCount: [...previousEntry, ...newNotifications].length,
            },
          },
        };
      },
    });
  }

  render() {
    const { data: { loading, notificationsFeed } } = this.props;

    if (loading) {
      return <p>Loading Messages</p>;
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <RCard>
          <RCardHeader>
            <div className="title-container">
              <AppsIcon color={black} />
              <h2>Notifications</h2>
            </div>
            <div className="button-container">
              <IconMenu
                iconButtonElement={<IconButton><MoreVert /></IconButton>}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
              >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Send feedback" />
              </IconMenu>
            </div>
          </RCardHeader>
          <RCardBody>
            <List style={styles.listStyle}>
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
            <RCardFooter >
              <RaisedButton
                label="Load More"
                styled={{ paddingBottom: 0 }}
                primary
                fullWidth
                disabled={!notificationsFeed.notifications.pageInfo.hasNextPage}
                onClick={this.loadMore}
              />
            </RCardFooter>
          </RCardBody>
        </RCard>
      </MuiThemeProvider>
    );
  }
}

Notifications.propTypes = {
  clientId: PropTypes.string.isRequired,
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
  )(Notifications),
);
