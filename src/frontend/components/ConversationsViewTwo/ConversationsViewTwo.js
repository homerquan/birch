/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-28 08:26:05
*/

import React, { Component } from 'react';
// import { graphql, compose } from 'react-apollo';
// import gql from 'graphql-tag';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from '../theme';
import ReloadIcon from 'react-material-icons/icons/action/cached';
import {
  Toolbar,
  ToolbarGroup
} from "material-ui/Toolbar";

import Popup from 'reactjs-popup';

import s from "./ConversationsView.css";
import config from '../../config';
import ConversationsTable from './ConversationsTable';
import ConversationDrawerTwo from '../ConversationDrawerTwo/ConversationDrawerTwo';

import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';

// const conversationsQuery = gql`
//   query ConversationsQuery($clientId : String!, $botId: String){
//     conversations(clientId : $clientId, botId: $botId) {
//       id
//       visitor
//       client
//       intentions {
//         name
//         score
//       }
//       actions {
//         source
//         name
//         status
//       }
//       mode
//       updatedAt
//     }
//   }
// `;

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
      drawerIsOpen: true,
      selectedConversation: {},
    };

    this.addPinned = this.addPinned.bind(this);
  }
  
  closeDrawer = () => {
    this.setState({
      drawerIsOpen: false
    });
  };

  openDrawer = index => {
    // const selected = this.props.data.conversations[index];
    // this.setState({
    //   drawerIsOpen: true,
    //   selectedConversation: selected
    // });

    this.setState({
      drawerIsOpen: true
    });
  };

  addPinned (conversationId) {
    // TODO:
    // conversationId.target.name is id of conversation.
    // Make api call to save this conversation as pinned
    console.log(conversationId.target.name);
  }

  render() {
    const { conversations, loading } = this.props.data;
    // Fake function until real funcion can be passed through props
    // from graphql
    const refetch = () => {};

    if (loading) return <h1>Loading</h1>;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <div>
        <Popup
            trigger={<IconButton><AddIcon /></IconButton>}
            position="top left"
            on="hover"
            closeOnDocumentClick
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            contentStyle={{ padding: "0px", border: "none" }}
            arrow
            offsetY={0}
          >
            <div className={s.menu}>
              <div className={s.menuItem}> item 1</div>
              <div className={s.menuItem}> item 2</div>
              <Popup
                trigger={<div className="menu-item"> sup Menu </div>}
                position="right top"
                on="hover"
                closeOnDocumentClick
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                contentStyle={{ padding: "0px", border: "none" }}
                arrow={false}
              >
                <div className="menu">
                  <div className="menu-item"> item 1</div>
                  <div className="menu-item"> item 2</div>
                  <div className="menu-item"> item 3</div>
                </div>
              </Popup>
            </div>
          </Popup>

          <Toolbar>
            <ToolbarGroup firstChild={true} />
            <ToolbarGroup>
              <IconButton tooltip="Reload" onTouchTap={() => refetch()}>
                <ReloadIcon />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>

          {conversations && conversations.length 
            ?   <div>
                  <ConversationsTable
                    conversations={conversations}
                    openDrawer={this.openDrawer}
                    addPinned={this.addPinned}
                  />
                </div>
            : (
            <div>
              <div className={s.nothing}>
                <div className={s.fun}>
                  <img src="/images/nothing.png" />
                </div>
              </div>
            </div>
            )
          }

          <ConversationDrawerTwo
            conversation={this.state.selectedConversation}
            clientId={this.props.clientId}
            isOpen={this.state.drawerIsOpen}
            closeDrawer={this.closeDrawer}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(ConversationsView);

// export default withStyles(s)(
//   compose(
//     graphql(conversationsQuery, {
//       options: props => ({
//         variables: { clientId: props.clientId, botId: props.botId },
//         pollInterval: config.pollInterval
//       })
//     })
//   )(ConversationsTable)
// );
