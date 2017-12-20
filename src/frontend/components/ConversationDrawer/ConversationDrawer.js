/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-19 00:20:14
*/

import React from "react";
import { graphql, compose, withApollo} from "react-apollo";
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
`;

const conversationSubscription = gql`
  subscription {
    now
  }
`;

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

class ConversationDrawer extends React.Component {
  state = {
    test: ''
  };
  async componentDidMount() {
    let that = this;
    this.subscription = this.props.client.subscribe({
      query: conversationSubscription,
      variables: {}
    }).subscribe({
      next(data) {
      that.setState({test:data.now});
      console.log(data);
      },
      error(err) {
        console.error("err", err);
      }
    });
  }

  render() {
    return <div>
    <div data-homer="test">{this.state.test}</div>
    <DemoWithData />
    </div>;
  }
}

export default compose()(withStyles(s)(withApollo(ConversationDrawer)));
