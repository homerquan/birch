/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   homer
* @Last Modified time: 2019-05-22 17:47:57
*/

import React from "react";
import { graphql, compose } from "react-apollo";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from '../theme';
import Paper from "material-ui/Paper";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import gql from "graphql-tag";
import IconButton from "material-ui/IconButton";
import SendIcon from "react-material-icons/icons/action/done";
import ReloadIcon from "react-material-icons/icons/action/cached";
import RaisedButton from "material-ui/RaisedButton";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from "material-ui/Toolbar";
import s from "./style.css";

const knowledgeQuery = gql`
  query knowledgeQuery($clientId: String!, $botId: String!) {
    knowledge(clientId: $clientId, botId: $botId) {
      id
      raw
      text
      bot
      client
    }
  }
`;

//TODO for mvp only one knowledge
const updateKnowledgeQuery = gql`
  mutation updateKnowledgeQuery(
    $text: String!
    $clientId: String!
    $botId: String!
  ) {
    updateKnowledge(text: $text, clientId: $clientId, botId: $botId) {
      id
      raw
      text
      bot
      client
    }
  }
`;

class KnowledgeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      knowledgeText: ""
    };
  }

  sendKnowledge = () => {
    const { mutate } = this.props;
    mutate({
      variables: {
        clientId: this.props.clientId,
        botId: this.props.botId,
        text: this.state.knowledgeText
      }
    });
  };

  handleChange(event) {
    this.setState({ knowledgeText: event.target.value });
  }

  render() {
    const { knowledge, loading, refetch } = this.props.data;

    if (loading) return <h1>Loading</h1>;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightTheme)}>
        <div>
          <Toolbar>
            <ToolbarGroup firstChild={true} />
            <ToolbarGroup>
              <IconButton tooltip="Reload" onTouchTap={() => refetch()}>
                <ReloadIcon />
              </IconButton>
              <IconButton
                tooltip="Send"
                onTouchTap={this.sendKnowledge.bind(this)}
              >
                <SendIcon />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
          <textarea
            id="demoKB"
            className={s.knowledge}
            defaultValue={knowledge.raw}
            onChange={this.handleChange.bind(this)}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(s)(
  compose(
    graphql(knowledgeQuery, {
      options: props => ({
        variables: { clientId: props.clientId, botId: props.botId }
      })
    }),
    graphql(updateKnowledgeQuery, {
      options: (props, state) => ({
        variables: {}
      })
    })
  )(KnowledgeView)
);
