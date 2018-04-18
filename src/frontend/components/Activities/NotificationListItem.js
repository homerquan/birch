import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ListItem } from 'material-ui/List';
import CodeIcon from 'material-ui/svg-icons/action/code';

import s from './NotificationListItem.css';

const MessageListItem = ({ application, text, time, link }) => (
  <ListItem
    leftIcon={<CodeIcon />}
    primaryText={
      <p className={s.primaryText}>
        {application}:
        <span className={s.primaryTextMessage}>{text}</span>
      </p>
    }
    secondaryText={
      <div>
        <span>{time}</span>
        <span>View Logs</span>
      </div>
    }
  />
);

MessageListItem.propTypes = {
  application: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default withStyles(s)(MessageListItem);
