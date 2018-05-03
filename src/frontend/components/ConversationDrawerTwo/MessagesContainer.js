import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';

import s from './MessagesContainer.css';

class MessagesContainer extends Component {
  componentDidMount() {
    const messageContainerInner = document.getElementById('messageContainerInner');
    messageContainerInner.scrollIntoView(false);
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('Previous Message Container props: ', prevState);
  //   console.log('Message Container props: ', nextProps);
  //   return nextProps;
  // }

  render() {
    const { messages } = this.props;
    console.log('Herhalsdjfs: ', messages)

    return (
      <div className={s.messagesContainer}>
        <div id="messageContainerInner">
          {messages.map(message => (
            <div
              key={message.id}
              className={message.typeIncoming ? s.messageIncoming : s.messageOutgoing}
            >
              <div
                className={message.source === 'visitor'
                  ? s.messageContainerIncoming
                  : s.messageContainerOutgoing}
              >
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

          <div className={s.messageOutgoingNotRecieved}>
            <div className={s.messageContainerOutgoing}>
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
          </div>

          <div className={s.messageErrorContainer}>
            <p className={s.messageError}>
              <span className={s.messageErrorTitle}>Error: </span>timeout
            </p>
            <p className={s.messageErrorRetry}>Retry</p>
            <p className={s.messageErrorCancel}>Cancel</p>
          </div>

          <img
            className={s.messageTyping}
            src="/images/message-typing.gif"
            alt="A message is being typed"
          />

        </div>
      </div>
    );
  }
}

MessagesContainer.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      source: PropTypes.oneOf(['ai', 'visitor', 'helper']),
      createdAt: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
};

export default withStyles(s)(MessagesContainer);
