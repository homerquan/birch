import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';
import Paper from 'material-ui/Paper';

import s from './CommandList.css';

class CommandList extends Component {
  // Ensure that the ative list item is always showing in the
  // scroll view.
  componentDidUpdate() {
    const activeListItem = document.getElementById('currentActiveList');
    if (activeListItem) {
      activeListItem.scrollIntoView(false);
    }
  }

  render() {
    const { activeCommands, currentMessage } = this.props;
    const commandContainer = classnames(
      [s.commandContainer],
      { [s.commandContainerActive]: activeCommands.length > 0 },
    );

    return (
      <Paper className={commandContainer}>
        <div className={s.commandTitleContainer}>
          <p className={s.commandTitleMatches}>Commands matching &quot;{currentMessage}&quot;</p>
        </div>
        <div className={s.commandsBody}>
          <ul className={s.commandList}>
            {activeCommands.map(command => (
              <li
                key={command.id}
                id={command.active ? 'currentActiveList' : ''}
                className={classnames(s.commandListItem, { [s.active]: command.active })}
              >
                <div>
                  <span className={s.commandName}>{command.command}</span>
                  <span className={s.commandHelper}>{command.helper}</span>
                </div>
                <p className={s.commandDescription}>{command.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Paper>
    );
  }
}

CommandList.defaultProps = {
  activeCommands: [],
  currentMessage: '',
};

CommandList.propTypes = {
  activeCommands: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      command: PropTypes.string,
      helper: PropTypes.string,
      description: PropTypes.string,
      active: PropTypes.bool,
    }),
  ),
  currentMessage: PropTypes.string,
};

export default withStyles(s)(CommandList);
