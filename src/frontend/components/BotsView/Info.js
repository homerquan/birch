import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import s from './Info.css';

const Info = ({ next }) => (
  <div className={s.body}>
    <div>
      <TextField
        style={{ display: 'block' }}
        hintText="Reflen"
        floatingLabelText="Name"
      />
      <TextField
        style={{ display: 'block' }}
        hintText="http://www.reflen.com"
        floatingLabelText="URL"
      />
    </div>
    <div className={s.footer}>
      <RaisedButton
        label="Next"
        onClick={next}
      />
    </div>
  </div>
);

Info.propTypes = {
  next: PropTypes.func.isRequired,
};

export default withStyles(s)(Info);
