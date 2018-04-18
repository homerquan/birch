import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ListItem } from 'material-ui/List';
import BuildIcon from 'material-ui/svg-icons/action/build';

import s from './MessageListItem.css';

const MessageListItem = ({ application, text, time }) => (
  <ListItem
    leftIcon={<BuildIcon />}
    primaryText={
      <p className={s.primaryText}>
        {application}:
        <span className={s.primaryTextMessage}>{text}</span>
      </p>
    }
    secondaryText={time}
  />
);

MessageListItem.propTypes = {
  application: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default withStyles(s)(MessageListItem);
