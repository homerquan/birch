import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from '@material-ui/core/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import s from './Info.css';
import f from './Finish.css';

const copyButtonStyle = {
  marginTop: '14px',
  display: 'flex',
  alignItems: 'center',
};

const Finish = ({ next, back, text }) => (
  <div className={s.body}>
    <div className={f.copyContainer}>
      <input value={text} />
      <CopyToClipboard
        text={text}
      ><Button variant="contained" style={copyButtonStyle} label="Copy" />
      </CopyToClipboard>
    </div>
    <div className={s.footer}>
      <Button variant="contained"
        style={{ marginRight: '14px' }}
        label="Back"
        onClick={back}
      />
      <Button variant="contained"
        label="Close"
        onClick={next}
      />
    </div>
  </div>
);

Finish.propTypes = {
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(s, f)(Finish);
