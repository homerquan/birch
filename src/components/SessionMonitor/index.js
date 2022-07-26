import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { greenA700, grey900, white } from '@material-ui/core/colors';
import { FiSend as SendIcon} from 'react-icons/fi';
import { FiX as CloseIcon} from 'react-icons/fi';
import { FiZap as SupportIcon} from 'react-icons/fi';
import withWidth, { LARGE } from '@material-ui/core/withWidth';
import BaseComponent from '../BaseComponent';
import MessagesContainer from './MessagesContainer';
import ActionMenu from './ActionMenu';
import CommandsList from './CommandList';
import Training from '../Training';
import DecisionSupport from './DecisionSupport';
import fakeData from './fakeData.json';
import CONSTANTS from '../../constants';
import s from './style.css';
import { sessionQuery, conversationQueryLoadMore, createMessage } from './graphql';


class SessionMonitor extends BaseComponent {

  static propTypes = {
    data: PropTypes.shape({
      sessionById: PropTypes.object,
    }).isRequired,
    mutate: PropTypes.func.isRequired,
    runtime: PropTypes.shape({
      openDecisionSupport: PropTypes.number,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired,
  };

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
    this.loadMoreMessages = this.loadMoreMessages.bind(this);
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

  addMessage(text) {
    const { session, data, mutate } = this.props;
    const { enableTraining } = this.state;

    const newMessage = {
      text,
      conversationId: data.conversation.id,
      userId: session.userId,
      isLearning: enableTraining,
    };

    mutate({ variables: { ...newMessage } })
      .then(() => data.refetch())
      .then(this.setState({ currentMessage: '' }));
  }

  loadMoreMessages() {
    const { data, session } = this.props;

    data.fetchMore({
      query: conversationQueryLoadMore,
      variables: {
        sessionId: session._id,
        after: data.session.actionConnection.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const previousEntry = previousResult.session.actionConnection.edges;
        const newMessages = fetchMoreResult.session.actionConnection.edges;

        return {
          conversation: {
            __typename: previousResult.conversation.__typename, // eslint-disable-line
            id: previousResult.conversation.id,
            messages: {
              __typename: previousResult.session.actionConnection.__typename, // eslint-disable-line
              edges: [...newMessages, ...previousEntry],
              pageInfo: fetchMoreResult.session.actionConnection.pageInfo,
              totalCount: [...newMessages, ...previousEntry].length,
            },
          },
        };
      },
    });
  }

  render() {
    const { width, isOpen, closeDrawer, data: { loading, sessionById } } = this.props;
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
        backgroundColor: white,
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
        width: 0,
        height: 32,
        position: 'absolute',
        left: -24,
        top: 0,
        borderTop: '8px solid transparent',
        borderRight: '24px solid white',
        borderBottom: '8px solid transparent',
      },
      closeIconBtn: {
        width: 32,
        height: 32,
        padding: 8,
        left: -28,
        top: 9,
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
        width: '100%',
        maxWidth: width === LARGE ? '700px' : 'none',
        margin: width === LARGE ? '0 auto' : 0,
        overflow: 'hidden',
      },
      small: {
        width: 48,
        height: 48,
        padding: 8,
      },
      smallIcon: {
        width: 24,
        height: 24,
      },
    };

    if (loading) {
      return <p>Loading</p>;
    }

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
                <IconButton
                  tooltip="Enable Training"
                  onClick={this.handleEnableTrainingToggle}
                >
                  <SupportIcon color={enableTraining ? greenA700 : grey900} />
                </IconButton>
              </div>
            </div>

            <div style={styles.conversationContainer}>
              <DecisionSupport
                isOpen={this.props.runtime[CONSTANTS.openDecisionSupport]}
                enableTraining={this.state.enableTraining}
                openTraining={this.handleTrainingIsOpenToggle}
              />

              <MessagesContainer
                messages={this.transformConnectionNode(sessionById.actionConnection.edges)}
                loadMoreMessages={this.loadMoreMessages}
              />

              <div className={s.chatBoxContainer}>
                <ActionMenu plugins={fakeData.plugins} />

                <input
                  className={s.chatInput}
                  onChange={e => this.handleInputOnChange(e)}
                  value={currentMessage}
                  placeholder="Type Something"
                />

                <IconButton>
                  <SendIcon
                    onClick={() => this.addMessage(currentMessage)}
                  />
                </IconButton>

                <CommandsList
                  activeCommands={activeCommands}
                  currentMessage={currentMessage}
                />
              </div>
            </div>

            <div style={styles.closeIconBG} />
            <IconButton
             onClick={closeDrawer}
            >
              <CloseIcon />
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


function selectProps(state) {
  return {
    runtime: state.runtime
  };
}

export default withWidth()(withStyles(s)(
  compose(
    graphql(createMessage),
    graphql(sessionQuery, {
      options: props => ({
        variables: { sessionId: props.sessionId },
      }),
    }),
    connect(selectProps, null),
  )(SessionMonitor),
));
