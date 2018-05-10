import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { deepPurple500 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import CodeIcon from 'material-ui/svg-icons/action/code';
import RaisedButton from 'material-ui/RaisedButton';

import s from './Notifications.css';

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
      <div>
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
        <RaisedButton
          label="Load More"
          primary
          fullWidth
          disabled={!notificationsFeed.notifications.pageInfo.hasNextPage}
          onClick={this.loadMore}
        />
      </div>
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
