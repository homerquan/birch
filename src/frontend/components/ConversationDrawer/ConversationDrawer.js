/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2018-01-07 22:45:45
*/

import React from "react";
import { graphql, compose, withApollo } from "react-apollo";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Drawer from "material-ui/Drawer";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import CloseIcon from "react-material-icons/icons/content/clear";
import ReloadIcon from "react-material-icons/icons/action/cached";
import OpenTextIcon from "react-material-icons/icons/hardware/keyboard";
import CloseTextIcon from "react-material-icons/icons/hardware/keyboard-hide";
import AiAvatarIcon from "react-icons/lib/fa/circle-o";
import VisitorAvatarIcon from "react-icons/lib/ti/user-outline";
import HelperAvatarIcon from "react-icons/lib/fa/user";
import FlatButton from "material-ui/FlatButton";
import Badge from "material-ui/Badge";
import s from "./ConversationDrawer.css";
import gql from "graphql-tag";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import theme from "../theme";
import config from "../../config";

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
  mutation createMessageQuery($conversationId: String!, $text: String!) {
    createMessage(conversationId: $conversationId, text: $text) {
      id
      text
    }
  }
`;

const createSuggestionQuery = gql`
  subscription onCreateSuggestion($conversationId: String) {
    createSuggestion(conversationId: $conversationId) {
      id
      text
      delay
    }
  }
`;

class ConversationDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowInput: false,
      inputMessage: "",
      suggestion: null,
      countDown: 0
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

  sendMessage = () => {
    const { mutate, conversation } = this.props;
    mutate({
      variables: {
        conversationId: conversation ? conversation.id : "",
        text: this.state.inputMessage
      },
      update: (store, { data: { createMessage } }) => {
        console.log("test");
      }
    });
  };

  handleChange(event) {
    this.setState({ inputMessage: event.target.value });
  }

  async componentWillUpdate() {
    if (this.props.conversation) {
      if (this.subscription) this.subscription.unsubscribe();
      let that = this;
      this.subscription = this.props.client
        .subscribe({
          query: createSuggestionQuery,
          variables: {
            conversationId: that.props.conversation
              ? that.props.conversation.id
              : ""
          }
        })
        .subscribe({
          next(data) {
            that.setState({
              suggestion: data.createSuggestion,
              countDown: data.createSuggestion.delay
            });
            setTimeout(function() {
              that.setState({
                suggestion: null
              });
            }, data.createSuggestion.delay * 1000);
            setInterval(function() {
              if (that.state.countDown >= 0) {
                that.setState({
                  countDown: that.state.countDown - 1
                });
              }
            }, 1000);
          },
          error(err) {
            console.error("err", err);
          }
        });
    }
  }

  async componentWillUnmount() {
    if (this.subscription) this.subscription.unsubscribe();
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
                  <div
                    className={s.messageCard}
                    data-convospot-message-id="{message.id}"
                  >
                    <Paper
                      className={
                        message.source === "visitor"
                          ? s.messageBulk + " " + s.visitorBulk
                          : s.messageBulk
                      }
                      zDepth={1}
                    >
                      {message.source == "ai" && (
                        <div className={s.avatar}>
                          <img
                            className={s.avatarIcon}
                            src="/images/avatar-ai.png"
                          />
                          <span className={s.sourceName}>A.I.</span>
                        </div>
                      )}

                      {message.source == "visitor" && (
                        <div className={s.avatar}>
                          <img
                            className={s.avatarIcon}
                            src="/images/avatar-visitor.png"
                          />
                          <span className={s.sourceName}>Visitor</span>
                        </div>
                      )}

                      {message.source == "helper" && (
                        <div className={s.avatar}>
                          <img
                            className={s.avatarIcon}
                            src="/images/avatar-helper.png"
                          />
                          <span className={s.sourceName}>Yourself</span>
                        </div>
                      )}

                      <div className={s.messageText}> {message.text} </div>
                    </Paper>
                  </div>
                ))
              ) : (
                <div> no message here </div>
              )}

              {this.state.suggestion && (
                <div className={s.actionCard}>
                  <div className={s.actionTitle}>Suggested response</div>
                  <div className={s.actionText}>
                    {this.state.suggestion.text}
                  </div>
                  <div className={s.actionOption}>
                    <Badge
                      badgeContent={this.state.countDown}
                      primary={true}
                      badgeStyle={{ top: 20, right: 15 }}
                    >
                      <FlatButton primary={true} label="Accept" />
                    </Badge>
                    <FlatButton label="Ignore" />
                  </div>
                </div>
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
          options: (props, state) => ({
            variables: {
              clientId: props.clientId,
              conversationId: props.conversation ? props.conversation.id : ""
            },
            pollInterval: config.pollInterval
          })
        }),
        graphql(createMessageQuery, {
          options: (props, state) => ({
            variables: {}
          })
        })
      )(ConversationDrawer)
    )
  )
);
