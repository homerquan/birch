/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-28 08:41:20
*/

import React from "react";
import { graphql, compose, withApollo } from "react-apollo";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import CloseIcon from "react-material-icons/icons/content/clear";
import ReloadIcon from "react-material-icons/icons/action/cached";
import OpenTextIcon from "react-material-icons/icons/hardware/keyboard";
import CloseTextIcon from "react-material-icons/icons/hardware/keyboard-hide";
import s from "./ConversationDrawer.css";
import gql from "graphql-tag";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import theme from "../theme";
import config from '../../config';

const messagesQuery = gql`
  query MessagesQuery($clientId: String, $conversationId: String) {
    messages(clientId: $clientId, conversationId: $conversationId) {
      id
      source
      text
    }
  }
`;

const createMessageQuery = gql`
  mutation createMessageQuery($conversationId:String!, $text:String!) {
    createMessage(conversationId:$conversationId,text:$text) {
      id
      text
    }
  }
`;

class ConversationDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowInput: false,
      inputMessage: ""
    };
  }

  handleCloseButtonTouchTap = () => {
    this.props.onClose();
  };

  showInputBox = () => {
    this.setState({
      isShowInput: true
    });
  };

  hideInputBox = () => {
    this.setState({
      isShowInput: false
    });
  };

  sendMessage =() => {
    const {mutate,conversation} = this.props;
    mutate({
        variables: {
          "conversationId": conversation ? conversation.id : "", 
          "text": this.state.inputMessage
        },
        update: (store, { data: { addMessage } }) => {
          console.log('test');
        },
      });
  };

  handleChange(event) {
    this.setState({ inputMessage: event.target.value });
  }

  render() {
    const conversation = this.props.conversation;
    const { messages, loading, refetch } = this.props.data;
    const isShowInput = this.state.isShowInput;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <Drawer
          width={window.innerWidth > 650 ? 600 : "100%"}
          openSecondary={true}
          open={this.props.open}
        >
          <div className={s.flexContainer}>
            <div className={s.topbar}>
              <IconButton
                tooltip="Close"
                onTouchTap={this.handleCloseButtonTouchTap}
              >
                <CloseIcon />
              </IconButton>
              <IconButton tooltip="Reload" onTouchTap={() => refetch()}>
                <ReloadIcon />
              </IconButton>
            </div>
            <div className={s.conversation}>
              {messages && messages.length ? (
                messages.map(message => (
                  <div data-convospot-message-id="{message.id}">
                  <Paper className={message.source === 'visitor'? s.messageBulk + " " + s.visitorBulk : s.messageBulk } zDepth={1}>
                    {message.text}
                  </Paper>  
                  </div>
                ))
              ) : (
                <div> no message here </div>
              )}
            </div>
            <div className={s.inputs}>
              {isShowInput ? (
                <div className={s.inputBox}>
                  <div className={s.inputControl}>
                    <IconButton tooltip="Close" onTouchTap={this.hideInputBox}>
                      <CloseTextIcon />
                    </IconButton>
                  </div>
                  <div className={s.inputField}>
                    <TextField
                      hintText="Input message here"
                      floatingLabelText="Typing message (alt+enter to send)"
                      fullWidth={true}
                      multiLine={true}
                      rows={2}
                      value={this.state.inputMessage}
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                  <div className={s.sendButton}>
                    <RaisedButton
                      label="Send"
                      primary={true}
                      disabled={this.state.inputMessage ? false : true}
                      onTouchTap={this.sendMessage}
                    />
                  </div>
                </div>
              ) : (
                <div className={s.optionBox}>
                  <div>
                    <IconButton
                      tooltip="Type in"
                      onTouchTap={this.showInputBox}
                    >
                      <OpenTextIcon />
                    </IconButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Drawer>
      </MuiThemeProvider>
    );
  }
}

function selectProps(state) {
  return {
    session: state.session
  };
}

export default withStyles(s)(
  withApollo(
    connect(selectProps, null)(
      compose(
        graphql(messagesQuery, {
          options: (props,state) => ({
            variables: {
              clientId: props.clientId,
              conversationId: props.conversation ? props.conversation.id : ""
            },
            pollInterval: config.pollInterval
          })
        }),
        graphql(createMessageQuery,{
          options: (props,state) => ({
            variables: {}
          })
        })
      )(ConversationDrawer)
    )
  )
);
