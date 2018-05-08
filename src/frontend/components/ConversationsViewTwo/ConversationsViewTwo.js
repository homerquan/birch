/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-28 08:26:05
*/

import React, { Component } from 'react';
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
import s from './ConversationsView.css';
// import config from '../../config';
import ConversationsTable from './ConversationsTable';
import ConversationDrawerTwo from '../ConversationDrawerTwo/ConversationDrawerTwo';

const conversationsQuery = gql`
  query ConversationsQuery($clientId : String, $botId: String){
    conversationsFeed(clientId : $clientId, botId: $botId) {
      conversations(first:1){
        edges {
          cursor
          node{
            id
            visitor
            client
            intentions {
              name
              score
            }
            actions {
              source
              name
              status
            }
            mode
            updatedAt
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

// const subscriptionConversationQuery = gql`
//   subscription onUpdateConversation($clientId:String) {
//     updateConversation(clientId:$clientId) {
//       id
//       status
//     }
//   }
// `;

class ConversationsView extends Component {
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

  openDrawer(conversationId) {
    const selected = this.props.data.conversationsFeed.conversations.edges.find(con => con.node.id === conversationId);

    this.setState({
      drawerIsOpen: true,
      selectedConversation: selected,
    });
  }

  addPinned(conversationId) {
    // TODO:
    // conversationId.target.name is id of conversation.
    // Make api call to save this conversation as pinned
    console.log(conversationId.target.name);
  }

  transform = data => {
    return _.map(data, 'node');
  }

  render() {
    const { conversationsFeed, loading, refetch } = this.props.data;

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

          {conversationsFeed.conversations.edges && conversationsFeed.conversations.edges.length
            ? (
              <div>
                <ConversationsTable
                  conversations={this.transform(conversationsFeed.conversations.edges)}
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
            <ConversationDrawerTwo
              conversation={this.state.selectedConversation}
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

ConversationsView.propTypes = {
  clientId: PropTypes.string.isRequired,
  data: PropTypes.shape({
    conversations: PropTypes.array,
    loading: PropTypes.bool,
    refetch: PropTypes.func,
  }).isRequired,
};

export default withStyles(s)(
  compose(
    graphql(conversationsQuery, {
      options: props => ({
        variables: { clientId: props.clientId, botId: props.botId },
        // pollInterval: config.pollInterval
      }),
    }),
  )(ConversationsView),
);
