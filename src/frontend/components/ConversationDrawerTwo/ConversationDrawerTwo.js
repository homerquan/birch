import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import { deepPurple500, white } from 'material-ui/styles/colors';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import Toggle from 'material-ui/Toggle';

import s from './ConversationDrawerTwo.css';
import MessagesContainer from './MessagesContainer';
import ActionMenu from './ActionMenu';
import CommandsList from './CommandList';
import Training from '../Training/Training';
import DecisionSupport from './DecisionSupport';
import fakeData from './fakeData.json';
import { ACTION_TYPES } from '../../constants';

const conversationQuery = gql`
  query Conversation($conversationId: String){
    conversation(conversationId: $conversationId){
      messages(first:1) {
      edges {
        node {
          id
          text
          source
        }
      }
      totalCount
            pageInfo {
        hasNextPage
        endCursor
      }
    }
    }
  }
`;

class ConversationDrawerTwo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMessage: '',
      activeCommands: [],
      keysPressed: [],
      enableTraining: false,
      trainingIsOpen: false,
    };

    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleEnableTrainingToggle = this.handleEnableTrainingToggle.bind(this);
    this.handleTrainingIsOpenToggle = this.handleTrainingIsOpenToggle.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('keyup', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  handleInputOnChange(e) {
    const currentMessage = e.target.value;
    let activeCommands = [];

    if (currentMessage.charAt(0) === '/') {
      activeCommands = fakeData.commands.filter((command, index) => {
        fakeData.commands[index].active = false;

        // Match the currentMessage to the command name and return
        // the matched commands
        return command.command.lastIndexOf(currentMessage) >= 0;
      });

      // Set the first action in the returned list as
      // the active command
      if (activeCommands.length > 0) {
        activeCommands[0].active = true;
      }
    }

    this.setState({ currentMessage, activeCommands });
  }

  handleKeyPress(e) {
    const { activeCommands, keysPressed, currentMessage } = this.state;

    keysPressed[e.keyCode] = e.type === 'keydown';
    this.setState({ keysPressed });

    // Enter Key
    if (keysPressed[13]) {
      // Decide whether or not we're sending a command or a message
      if (activeCommands.length > 0) {
        // Get the current active command and return the name . . . for now
        const activeCommand = activeCommands.find(command => command.active);
        const message = `Entered Command: "${activeCommand.action}"`;
        this.addMessage(message);
      } else {
        this.addMessage(currentMessage);
      }

      this.setState({
        currentMessage: '',
        activeCommands: [],
      });
    }

    // We only need to listen for the other key presses
    // when we have commands available
    if (activeCommands.length > 0) {
      // Escape Key
      if (keysPressed[27]) {
        this.setState({ activeCommands: [] });
      }
    }

    // Tab or Down Arrow Key
    if (keysPressed[9] || keysPressed[40]) {
      e.preventDefault(); // Stop tab focus from moving

      // Find the current active command, get it's index and
      // increment by one, or reset to 0
      const currentActive = activeCommands.find(action => action.active);
      const currentActiveIndex = activeCommands.indexOf(currentActive);

      activeCommands[currentActiveIndex].active = false;
      if (activeCommands[currentActiveIndex + 1]) {
        activeCommands[currentActiveIndex + 1].active = true;
      } else {
        activeCommands[0].active = true;
      }

      this.setState({ activeCommands });
    }

    // Up Arrow Key
    if (keysPressed[38]) {
      e.preventDefault(); // Stop tab focus from moving

      // Find the current active command, get it's index and
      // decrement by one, or set to last index in array
      const currentActive = activeCommands.find(action => action.active);
      const currentActiveIndex = activeCommands.indexOf(currentActive);

      activeCommands[currentActiveIndex].active = false;

      if (activeCommands[currentActiveIndex - 1]) {
        activeCommands[currentActiveIndex - 1].active = true;
      } else {
        activeCommands[activeCommands.length - 1].active = true;
      }

      this.setState({ activeCommands });
    }
  }

  handleEnableTrainingToggle() {
    this.setState({ enableTraining: !this.state.enableTraining });
  }

  handleTrainingIsOpenToggle() {
    this.setState({ trainingIsOpen: !this.state.trainingIsOpen });
  }

  addMessage(newMessage) { // eslint-disable-line
    // TODO: Need to hook this up to save the new mesage
    // then add it to the message list.
  }

  transform = data => {
    return _.map(data, 'node');
  }

  render() {
    const { width, isOpen, closeDrawer } = this.props;
    const { currentMessage, activeCommands, trainingIsOpen, enableTraining } = this.state;

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
        height: 16,
      },
      conversationContainer: {
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: deepPurple500,
        width: '100%',
        maxWidth: width === LARGE ? '700px' : 'none',
        margin: width === LARGE ? '0 auto' : 0,
        overflow: 'hidden',
      },
    };

    const toggleLabel = {
      color: 'white',
    };

    return (
      <div>
        <div style={styles.conversationDrawer}>
          <div
            style={styles.conversationBG}
            onClick={closeDrawer}
            role="button"
            tabIndex="0"
          />
          <div style={styles.conversationWrapper}>

            <div className={s.utilityBarContainer}>
              <div className={s.utilityBar}>
                <Toggle
                  style={{ width: 'auto' }}
                  label="Enable Training"
                  className={s.trainingToggle}
                  labelStyle={toggleLabel}
                  toggled={enableTraining}
                  onClick={this.handleEnableTrainingToggle}
                />
              </div>
            </div>

            <div style={styles.conversationContainer}>
              <DecisionSupport
                isOpen={this.props.runtime[ACTION_TYPES.OPEN_DECISION_SUPPORT]}
                enableTraining={this.state.enableTraining}
                openTraining={this.handleTrainingIsOpenToggle}
              />

              {this.props.data.conversation !== undefined &&
                <MessagesContainer
                  messages={this.transform(this.props.data.conversation.messages.edges)}
                />
              }

              <div className={s.chatBoxContainer}>
                <ActionMenu plugins={fakeData.plugins} />

                <input
                  className={s.chatInput}
                  onChange={e => this.handleInputOnChange(e)}
                  value={currentMessage}
                  placeholder="Type Something"
                />

                <IconButton>
                  <SendIcon />
                </IconButton>

                <CommandsList
                  activeCommands={activeCommands}
                  currentMessage={currentMessage}
                />
              </div>
            </div>

            <div style={styles.closeIconBG} />
            <IconButton
              iconStyle={styles.closeIcon}
              style={styles.closeIconBtn}
              onClick={closeDrawer}
            >
              <CloseIcon color={white} />
            </IconButton>
          </div>
        </div>

        {trainingIsOpen &&
          <Training
            isOpen={trainingIsOpen}
            close={this.handleTrainingIsOpenToggle}
          />
        }
      </div>
    );
  }
}

ConversationDrawerTwo.propTypes = {
  data: PropTypes.shape({
    conversation: PropTypes.shape({
      messages: PropTypes.object,
    }),
  }).isRequired,
  runtime: PropTypes.shape({
    openDecisionSupport: PropTypes.number,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};


function selectProps(state) {
  return {
    runtime: state.runtime,
  };
}

export default withWidth()(withStyles(s)(
  compose(
    graphql(conversationQuery, {
      options: props => ({
        variables: { conversationId: props.clientId },
      }),
    }),
    connect(selectProps, null),
  )(ConversationDrawerTwo),
));
