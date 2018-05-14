import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';
import classnames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';

import s from './MessagesContainer.css';
import { ACTION_TYPES } from '../../constants';

class MessagesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoadMoreMessages: false,
    };
  }

  componentDidMount() {
    const messageContainerInner = document.getElementById('messageContainerInner');
    messageContainerInner.scrollIntoView(false);

    // Show the load more messages button if messages are hidden in the
    // scroll
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer.scrollTop > 50) {
      this.setState({ showLoadMoreMessages: true });
    }
  }

  render() {
    const { messages } = this.props;

    const messageNotRecievedOutgoing = classnames(
      [s.messageOutgoing],
      { [s.messageNotRecieved]: true },
    );

    const showMoreButtonStyles = {
      display: this.state.showLoadMoreMessages ? 'inline-block' : 'none',
    };

    return (
      <div id="messageContainer" className={s.messagesContainer}>
        <div id="messageContainerInner">
          <RaisedButton
            style={showMoreButtonStyles}
            label="Load More"
            fullWidth
            primary
          />

          {messages.map(message => (
            <div
              key={message.id}
              className={message.source === 'visitor' ? s.messageIncoming : s.messageOutgoing}
            >
              <div className={s.messageBody}>
                <div className={s.messageInfoBar}>
                  {message.source === 'ai'
                    ? <img
                      className={s.messageAvatar}
                      width="18px"
                      height="18px"
                      src="/images/avatar-visitor.png"
                      alt="Visitor Icon"
                    />
                    : <img
                      className={s.messageAvatar}
                      width="18px"
                      height="18px"
                      src="/images/avatar-ai.png"
                      alt="Visitor Icon"
                    />
                  }
                  <span className={s.messageType}>
                    {message.source}
                  </span>
                  <span className={s.messageSent}>{moment(message.sent).startOf('day').fromNow()}</span>
                </div>
                <p className={s.message}>{message.text}</p>
              </div>
            </div>
          ))}

          {/* <div className={messageNotRecievedOutgoing}>
            <div className={s.messageBody}>
              <div className={s.messageInfoBar}>
                <img
                  className={s.messageAvatar}
                  width="18px"
                  height="18px"
                  src="/images/avatar-ai.png"
                  alt="Visitor Icon"
                />
                <span className={s.messageType}>A.I.</span>
                <span className={s.messageSent}>{moment('2018-04-27T21:02:26.294Z').startOf('day').fromNow()}</span>
              </div>
              <p className={s.message}>This message hasn&apos;t been recieved yet.</p>
            </div>
          </div> */}

          {this.props.runtime[ACTION_TYPES.SHOW_CHAT_ERROR]
            ? (
              <div className={s.messageErrorContainer}>
                <p className={s.messageError}>
                  <span className={s.messageErrorTitle}>Error: </span>timeout
                </p>
                <p className={s.messageErrorRetry}>Retry</p>
                <p className={s.messageErrorCancel}>Cancel</p>
              </div>
            ) : ''
          }

          {this.props.runtime[ACTION_TYPES.SHOW_CHAT_BUBBLE]
            ? (
              <img
                className={s.messageTyping}
                src="/images/message-typing.gif"
                alt="A message is being typed"
              />
            ) : ''
          }

        </div>
      </div>
    );
  }
}

MessagesContainer.propTypes = {
  runtime: PropTypes.shape({
    SHOW_CHAT_BUBBLE: PropTypes.number,
    SHOW_CHAT_ERROR: PropTypes.number,
  }).isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      source: PropTypes.oneOf(['ai', 'visitor', 'helper']),
      createdAt: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
};


function selectProps(state) {
  return {
    runtime: state.runtime,
  };
}

export default withStyles(s)(
  connect(selectProps, null)(MessagesContainer),
);