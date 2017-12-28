/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-28 11:46:33
*/

import React from "react";
import { graphql, compose } from "react-apollo";
import Paper from "material-ui/Paper";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import s from "./KnowledgeView.css";
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

const knowledgeQuery = gql`
  query knowledgeQuery($clientId : String!, $botId: String){
    knowledge(clientId : $clientId, botId: $botId)
  }
`;

//TODO for mvp only one knowledge
const updateKnowledgeQuery = gql`
  mutation updateKnowledgeQuery($text:String!) {
    updateKnowledge(text:$text)
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
      <MuiThemeProvider>
        <div>
          <Toolbar>
            <ToolbarGroup firstChild={true} />
            <ToolbarGroup>
              <IconButton tooltip="Reload" onTouchTap={() => refetch()}>
                <ReloadIcon />
              </IconButton>
              <IconButton tooltip="Send" onTouchTap={this.sendKnowledge.bind(this)}>
                <SendIcon />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
          <textarea id="demoKB" className={s.knowledge} defaultValue={knowledge} onChange={this.handleChange.bind(this)}/>
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
    graphql(updateKnowledgeQuery,{
          options: (props,state) => ({
            variables: {}
          })
    })
  )(KnowledgeView)
);
