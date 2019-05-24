/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   homer
* @Last Modified time: 2019-05-24 15:22:34
*/

import React from 'react';
import BaseComponent from '../BaseComponent';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ReloadIcon from 'react-material-icons/icons/action/cached';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import lightTheme from '../theme';
import config from '../../config';
import SessionsTable from '../SessionsTable';
import ConversationDrawer from '../SessionMonitor';
import s from './style.css';
import { sessionsQuery, updateConversationPinToTop } from './graphql';


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

    if (loading) return (
      <h1>Loading</h1>
    );

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
                <SessionsTable
                  items={this.transformConnectionNode(sessionConnection.edges)}
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

export default withStyles(s)(
  compose(
    graphql(updateConversationPinToTop),
    graphql(sessionsQuery, {
      options: props => ({
        variables: { userId: props.userId, appId: props.appId },
        // pollInterval: config.pollInterval,
      }),
    }),
  )(SessionsView),
);
