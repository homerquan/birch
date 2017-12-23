/*
* @Author: Homer
* @Date:   2017-12-17 23:50:40
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-23 13:28:12
*/

import React from "react";
import { graphql, compose, withApollo } from "react-apollo";
import Paper from "material-ui/Paper";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CloseIcon from "react-material-icons/icons/content/clear";
import OpenTextIcon from "react-material-icons/icons/hardware/keyboard";
import CloseTextIcon from "react-material-icons/icons/hardware/keyboard-hide";
import s from "./ConversationDrawer.css";
import gql from "graphql-tag";

class ConversationDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowInput: false,
      inputMessage: ''
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

  handleChange(event) {
    this.setState({inputMessage: event.target.value});
  }

  render() {
    const conversation = this.props.conversation;
    const isShowInput = this.state.isShowInput;
    return (
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
          </div>
          <div className={s.conversation} />
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
                   <RaisedButton label="Send" primary={true} disabled={this.state.inputMessage?false:true} />
                </div>
              </div>
            ) : (
              <div className={s.optionBox}>
                <div>
                  <IconButton tooltip="Type in" onTouchTap={this.showInputBox}>
                    <OpenTextIcon />
                  </IconButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    );
  }
}

function selectProps(state) {
  return {
    session: state.session
  };
}

export default withStyles(s)(
  withApollo(connect(selectProps, null)(ConversationDrawer))
);
