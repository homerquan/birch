import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './ReplyButtons.css';

const ReplyButtons = ({ reply, archive }) => (
  <div className={s.notificationsButtonContainer}>
    <FlatButton label="Reply" primary onClick={() => reply} />
    <FlatButton label="Archive" primary onClick={() => archive} />
  </div>
);

ReplyButtons.propTypes = {
  reply: PropTypes.isRequired,
  archive: PropTypes.isRequired,
};

export default withStyles(s)(ReplyButtons);
