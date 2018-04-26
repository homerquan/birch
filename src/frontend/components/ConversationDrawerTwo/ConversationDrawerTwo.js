import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import { deepPurple500, white } from 'material-ui/styles/colors';

import s from './ConversationDrawerTwo.css';
import withWidth, { MEDIUM, LARGE } from 'material-ui/utils/withWidth'
import { deepPurple100 } from 'material-ui/styles/colors';

class ConversationDrawerTwo extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentMessage: ''
    }

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputOnChange(e) {
    this.setState({ currentMessage: e.target.value });
  }
  
  handleClick(e, data) {
    console.log(data.foo);
  }
  
  render() {
    const { width, isOpen, closeDrawer } = this.props;
    const { currentMessage } = this.state;

    const styles = {
      conversationBG: {
        display: isOpen ? 'block' : 'none',
        backgroundColor: 'rgba(0, 0, 0, .40)',
        position: 'fixed',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 102,
      },
      conversationWrapper: {
        backgroundColor: deepPurple500,
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        top: 0,
        right: 0,
        bottom: 0,
        left: '20%',
        zIndex: 103,
        transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        transform: isOpen ? 'translateX(0px)' : 'translateX(110%)',
      },
      closeIconBG: {
        backgroundColor: 'transparent',
        width: '0',
        height: '18px',
        position: 'absolute',
        left: '-24px',
        borderTop: '8px solid transparent',
        borderRight: `24px solid ${deepPurple500}`,
        borderBottom: '8px solid transparent',
      },
      closeIconBtn: {
        width: 32,
        height: 32,
        padding: 8,
        left: -28,
        top: 1,
        position: 'absolute',
      },
      closeIcon: {
        width: 16,
        height: 16
      },
      conversationContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: deepPurple500,
        width: '100%',
        maxWidth: width === LARGE ? '700px' : 'none',
        margin: width === LARGE ? '0 auto' : 0,
      }
    }    
    
    return (
      <div style={styles.conversationDrawer}>
        <div style={styles.conversationBG}></div>
        <div style={styles.conversationWrapper}>

          <div className={s.utilityBar}>
          </div>
        
          <div style={styles.conversationContainer}>
            <div className={s.messagesContainer}>
              <p>some content</p>
            </div>

            <div className={s.chatBoxContainer}>
              <ContextMenuTrigger id="some_unique_identifier">
                <IconButton>
                  <AddIcon />
                </IconButton>
              </ContextMenuTrigger>
              <ContextMenu id="some_unique_identifier">
                <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                  ContextMenu Item 1
                </MenuItem>
                <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                  ContextMenu Item 2
                </MenuItem>
                <MenuItem divider />
                <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                  ContextMenu Item 3
                </MenuItem>
              </ContextMenu>
              <input
                className={s.chatInput}
                onChange={(e) => this.handleInputOnChange(e)}
                value={currentMessage}
                placeholder="Type Here"
              />
            </div>

          </div>
          <div style={styles.closeIconBG}></div>
          <IconButton
            iconStyle={styles.closeIcon}
            style={styles.closeIconBtn}
            onClick={closeDrawer}
          >
            <CloseIcon color={white}  />
          </IconButton>
        </div>
      </div>
    );
  }
}

ConversationDrawerTwo.propTypes = {
  conversation: PropTypes.object.isRequired,
  clientId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  width: PropTypes.number
};

export default withWidth()(withStyles(s)(ConversationDrawerTwo));
