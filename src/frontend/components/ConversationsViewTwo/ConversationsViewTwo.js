/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-28 08:26:05
*/

import React, { Component } from "react";
// import { graphql, compose } from "react-apollo";
// import gql from "graphql-tag";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import ConversationDrawer from "../ConversationDrawer";
import IconButton from "material-ui/IconButton";
import ReloadIcon from "react-material-icons/icons/action/cached";
import {
  Toolbar,
  ToolbarGroup
} from "material-ui/Toolbar";

import s from "./ConversationsView.css";
import config from '../../config';
import ConversationsTable from './ConversationsTable';


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
      openDrawer: false,
      selectedConversation: null,
    };

    // this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
  }

  closeDrawer = () => {
    this.setState({
      openDrawer: false
    });
  };

  openDrawer = index => {
    const selected = this.props.data.conversations[index];
    this.setState({
      openDrawer: true,
      selectedConversation: selected
    });
  };

  // handleSortOrderChange (key, order) {
  //   console.log('Key: ', key)
  //   console.log('Order: ', order)
  // }

  render() {
    const { conversations, loading, refetch } = this.props.data;

    if (loading) return <h1>Loading</h1>;

    return (
      <MuiThemeProvider>
        <div>
          <Toolbar>
            <ToolbarGroup firstChild={true} />
            <ToolbarGroup>
              <IconButton tooltip="Reload" onTouchTap={() => refetch()}>
                <ReloadIcon />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>

          {conversations && conversations.length 
            ? <ConversationsTable
              conversations={conversations}
              onCellClick={this.openDrawer}
              />
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

          {/* <ConversationDrawer
            conversation={this.state.selectedConversation}
            clientId={this.props.clientId}
            open={this.state.openDrawer}
            onClose={this.closeDrawer}
          /> */}
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
