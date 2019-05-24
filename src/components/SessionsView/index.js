/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   homer
* @Last Modified time: 2019-05-23 22:04:14
*/

import React from 'react';
import BaseComponent from '../BaseComponent';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import gql from 'graphql-tag';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ReloadIcon from 'react-material-icons/icons/action/cached';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import lightTheme from '../theme';
import s from './style.css';
import config from '../../config';
import ConversationsTable from './ConversationsTable';
import ConversationDrawer from '../ConversationDrawer';

const conversationsQuery = gql`
query Sessions($userId: String, $appId: String) {
  sessionConnection(first: 10, filter: {_owner: $userId, _app: $appId}) {
    count
    pageInfo {
      startCursor
      endCursor
    }
    edges {
      node {
        _id
        updatedAt
        _app
        _owner
      }
    }
  }
}
`;

// const subscriptionConversationQuery = gql`
//   subscription onUpdateConversation($clientId:String) {
//     updateConversation(clientId:$clientId) {
//       id
//       status
//     }
//   }
// `;

class SessionsView extends BaseComponent {

  static propTypes = {
    userId: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      drawerIsOpen: false,
      selectedConversation: { messages: [] },
    };

    this.addPinned = this.addPinned.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  closeDrawer() {
    this.setState({ drawerIsOpen: false });
  }

  openDrawer(convoId) {
    const { data: { conversationsFeed } } = this.props;
    const selected = conversationsFeed.conversations.edges.find(convo => convo.node.id === convoId);

    this.setState({
      drawerIsOpen: true,
      selectedConversation: selected,
    });
  }

  addPinned(e) {
    const conversationId = e.target.name;
    this.props.mutate({ variables: { conversationId, pinToTop: true } })
      .then(() => this.props.data.refetch());
  }

  render() {
    const { sessionConnection, loading, refetch } = this.props.data;

    if (loading) return <h1>Loading</h1>;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <div>
          <Toolbar>
            <ToolbarGroup firstChild />
            <ToolbarGroup>
              <IconButton tooltip="Reload" onTouchTap={() => refetch()}>
                <ReloadIcon />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>

          {sessionConnection.edges && sessionConnection.edges.length
            ? (
              <div>
                <ConversationsTable
                  conversations={this.transformConnectionNode(sessionConnection.edges)}
                  openDrawer={this.openDrawer}
                  addPinned={this.addPinned}
                />
              </div>
            ) : (
              <div>
                <div className={s.nothing}>
                  <div className={s.fun}>
                    <img src="/images/nothing.png" alt="No Conversations" />
                  </div>
                </div>
              </div>
            )
          }

          {this.state.drawerIsOpen &&
            <ConversationDrawer
              conversation={this.state.selectedConversation.node}
              clientId={this.props.clientId}
              isOpen={this.state.drawerIsOpen}
              closeDrawer={this.closeDrawer}
            />
          }

        </div>
      </MuiThemeProvider>
    );
  }
}

const updateConversationPinToTop = gql`
  mutation UpdateConversationPinToTop($conversationId: String!, $pinToTop: Boolean!)  {
    updateConversationPinToTop(conversationId:$conversationId, pinToTop: $pinToTop) {
      id
      pinToTop
    }
  }
`;

export default withStyles(s)(
  compose(
    graphql(updateConversationPinToTop),
    graphql(conversationsQuery, {
      options: props => ({
        variables: { userId: props.userId, appId: props.appId },
        //pollInterval: config.pollInterval,
      }),
    }),
  )(SessionsView),
);
