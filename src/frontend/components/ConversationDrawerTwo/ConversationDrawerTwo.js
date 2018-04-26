import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';

import s from './ConversationDrawerTwo.css';
import withWidth, { MEDIUM, LARGE } from 'material-ui/utils/withWidth'

class ConversationDrawerTwo extends Component {
  render() {
    const { width, isOpen, closeDrawer } = this.props;

    const styles = {
      conversationDrawer: {
      },
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
        backgroundColor: 'white',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'flex-end',
        top: 0,
        right: 0,
        bottom: 0,
        left: '20%',
        zIndex: 103,
        transition: 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        transform: isOpen ? 'translate(0px, 0px)' : 'translate(110%, 0px)',
      },
      closeIconBG: {
        backgroundColor: 'transparent',
        width: '0',
        height: '18px',
        position: 'absolute',
        left: '-24px',
        borderTop: '8px solid transparent',
        borderRight: '24px solid white',
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
        backgroundColor: 'green',
        width: '100%',
        maxWidth: '700px',
        margin: width === LARGE ? '0 auto' : 0,
      }
    }    
    
    return (
      <div style={styles.conversationDrawer}>
        <div style={styles.conversationBG}></div>
        <div style={styles.conversationWrapper}>
          <div style={styles.conversationContainer}>
            <h1>Conversation</h1>
            <p>laksjdflajsdflasjf jals fdla lasjdf laskjdf l;asj flaksjfd lasjdf laksjdf ajslkdfj asl;df</p>
          </div>
          <div style={styles.closeIconBG}></div>
          <IconButton
            iconStyle={styles.closeIcon}
            style={styles.closeIconBtn}
            onClick={closeDrawer}
          >
            <CloseIcon color='black'  />
          </IconButton>
          {/* <CloseIcon  style={styles.closeIcon} /> */}
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
