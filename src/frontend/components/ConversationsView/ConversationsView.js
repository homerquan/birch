/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Michael
* @Last Modified time: 2018-05-09
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
import ConversationDrawer from '../ConversationDrawer/ConversationDrawer';

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
              id
              source
              name
              status
            }
            pinToTop
            mode
            updatedAt
          }
        }
        pageInfo{
          hasNextPage
          endCursor
        }
        totalCount
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

  transform = data => (_.map(data, 'node'));

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
            <ConversationDrawer
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
    conversationsFeed: PropTypes.object,
    loading: PropTypes.bool,
    refetch: PropTypes.func,
  }).isRequired,
  mutate: PropTypes.func.isRequired,
};

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
        variables: { clientId: props.clientId, botId: props.botId },
        // pollInterval: config.pollInterval
      }),
    }),
  )(ConversationsView),
);
