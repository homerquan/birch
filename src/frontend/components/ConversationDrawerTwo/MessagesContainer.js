import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';

import s from './MessagesContainer.css';

// const MessagesContainer = ({ messages }) => {
class MessagesContainer extends Component {

  componentDidMount() {
    const messageContainerInner = document.getElementById('messageContainerInner');
    messageContainerInner.scrollIntoView(false);
  }

  render() {
    const { messages } = this.props;

    return (
      <div className={s.messagesContainer}>
        <div id="messageContainerInner">
          {messages.map((message, index) => (
            <div key={index} className={message.typeIncoming ? s.messageIncoming : s.messageOutgoing }>
              <div className={message.typeIncoming ? s.messageContainerIncoming : s.messageContainerOutgoing }>
                <div className={s.messageInfoBar}>
                  {message.typeIncoming
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
                    {message.typeIncoming
                      ? 'Visitor'
                      : 'A.I.'
                    }
                  </span>
                  <span className={s.messageSent}>{moment(message.sent).startOf('day').fromNow()}</span>
                </div>
                <p className={s.message}>{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

MessagesContainer.propTypes = {
  messages: PropTypes.array,
};

export default withStyles(s)(MessagesContainer);

