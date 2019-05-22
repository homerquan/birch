import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import moment from 'moment';
import classnames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DownArrowIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Scroll from 'react-scroll';
import _ from 'lodash';

import s from './MessagesContainer.css';
import CONSTANTS from '../../constants';

const Element = Scroll.Element;
const scroll = Scroll.animateScroll;

class MessagesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoadMoreMessages: false,
      showScrollToBottom: false,
    };

    this.listenScrollEvent = this.listenScrollEvent.bind(this);
  }

  componentDidMount() {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.addEventListener('scroll', _.throttle(this.listenScrollEvent, 250));

    const messageContainerInner = document.getElementById('messageContainerInner');
    messageContainerInner.scrollIntoView(false);

    // Show the load more messages button if messages are hidden in the
    // scroll
    if (messageContainer.scrollTop > 50) {
      this.setState({ showLoadMoreMessages: true }); // eslint-disable-line
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollEvent);
  }

  listenScrollEvent() {
    const messageContainer = document.getElementById('messageContainer');
    const clientHeight = messageContainer.clientHeight;
    const scrollHeight = messageContainer.scrollHeight;

    if ((messageContainer.scrollTop + 100) < (scrollHeight - clientHeight)) {
      this.setState({ showScrollToBottom: true });
    } else {
      this.setState({ showScrollToBottom: false });
    }
  }

  scrollToBottom = () => {
    scroll.scrollToBottom({
      containerId: 'messageContainer',
    });
  }

  render() {
    const { messages, loadMoreMessages } = this.props;
    const { showLoadMoreMessages, showScrollToBottom } = this.state;

    const messageNotRecievedOutgoing = classnames(
      [s.messageOutgoing],
      { [s.messageNotRecieved]: false },
    );

    const toBottomClass = classnames(
      s.toBottomWrapper,
      { [s.toBottomActive]: showScrollToBottom },
    );

    const showMoreButtonStyles = {
      display: showLoadMoreMessages ? 'inline-block' : 'none',
    };

    return (
      <Element id="messageContainer" className={s.messagesContainer}>
        <div className={toBottomClass}>
          <FloatingActionButton
            style={{ position: 'fixed' }}
            onClick={() => this.scrollToBottom()}
          >
            <DownArrowIcon />
          </FloatingActionButton>
        </div>

        <div id="messageContainerInner">
          <RaisedButton
            style={showMoreButtonStyles}
            label="Load More"
            onClick={loadMoreMessages}
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

          <div className={messageNotRecievedOutgoing}>
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
                <span className={s.messageSent}>
                  {moment('2018-04-27T21:02:26.294Z').startOf('day').fromNow()}
                </span>
              </div>
              <p className={s.message}>This message hasn&apos;t been recieved yet.</p>
            </div>
          </div>

          {this.props.runtime[CONSTANTS.showChatError]
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

          {this.props.runtime[CONSTANTS.showChatBubble]
            ? (
              <img
                className={s.messageTyping}
                src="/images/message-typing.gif"
                alt="A message is being typed"
              />
            ) : ''
          }

        </div>
      </Element>
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
  loadMoreMessages: PropTypes.func.isRequired,
};


function selectProps(state) {
  return {
    runtime: state.runtime,
  };
}

export default withStyles(s)(
  connect(selectProps, null)(MessagesContainer),
);
