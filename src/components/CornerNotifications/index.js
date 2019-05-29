import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './style.css';

const ReplyButtons = ({ reply, archive }) => (
  <div className={s.notificationsButtonContainer}>
    <Button label="Reply" primary onClick={() => reply} />
    <Button label="Archive" primary onClick={() => archive} />
  </div>
);

ReplyButtons.propTypes = {
  reply: PropTypes.isRequired,
  archive: PropTypes.isRequired,
};

export default withStyles(s)(ReplyButtons);
