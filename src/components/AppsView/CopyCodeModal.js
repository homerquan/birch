import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from '@material-ui/core/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import { FiHelpCircle as HelpIcon } from 'react-icons/fi';

import s from './CopyCodeModal.css';

const CodeModal = ({ close, code, dipatchConfirm }) => (
  <div className={s.container}>
    <div className={s.background} onClick={close} />
    <div className={s.modalContainer}>
      <div className={s.modal}>

        <ListSubheader>Embeded Code</ListSubheader>

        <div className={s.copyContainer}>
          <input value={code} />
          <CopyToClipboard
            text={code}
            onCopy={dipatchConfirm}
          >
            <Button variant="contained" label="Copy" />
          </CopyToClipboard>
        </div>

        <div className={s.footer}>
          <Button
            variant="contained"
            label="Done"
            primary
            onClick={close}
          />
          <IconButton
            href="#"
            label="How to Install"
          >
            <HelpIcon />
          </IconButton>
        </div>
      </div>
    </div>
  </div>
);

CodeModal.propTypes = {
  close: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  dipatchConfirm: PropTypes.isRequired,
};

export default withStyles(s)(CodeModal);
