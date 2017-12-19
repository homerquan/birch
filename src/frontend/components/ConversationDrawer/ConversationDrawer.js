/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-19 00:20:14
*/

import React from "react";
import { graphql, compose } from "react-apollo";
import Paper from "material-ui/Paper";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import s from "./ConversationDrawer.css";
import gql from "graphql-tag";


const allConversations = gql`
  query {
    conversations {
      id
      visitor
      client
      mode
      updatedAt
    }
  }
`

function TodoApp({ data: { conversations, refetch } }) {
  if (conversations && conversations.length) {
    return (
      <div>
        <button onClick={() => refetch()}>Refresh</button>
        {conversations.map(function(listValue) {
          return <li>{listValue.id}</li>;
        })}
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      empty
    </div>
  );
}

const DemoWithData = graphql(allConversations)(TodoApp);

const messagesSubscription =gql`
    subscription onConversationUpdated {
        conversationUpdated {
            id
        }
}`;


class ConversationDrawer extends React.Component {
  async componentDidMount() {
    this.subscription = this.props.allConversationsQuery.subscribeToMore({
      document: messagesSubscription,
      updateQuery: (previousResult, { subscriptionData }) => {
        const test = subscriptionData.data.conversationUpdated;
        return test;
      }
    });
  }

  render() {
    return <DemoWithData />;
  }
}

export default compose(
  graphql(allConversations, {name: 'allConversationsQuery'}),
)(withStyles(s)(ConversationDrawer));
