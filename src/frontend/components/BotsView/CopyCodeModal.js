import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RaisedButton from 'material-ui/RaisedButton';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';

import s from './CopyCodeModal.css';

const CodeModal = ({ close, code }) => (
  <div className={s.container}>
    <div className={s.background} onClick={close} />
    <div className={s.modalContainer}>
      <div className={s.modal}>

        <Subheader>Embeded Code</Subheader>

        <div className={s.copyContainer}>
          <input value={code} />
          <CopyToClipboard
            text={code}
          ><RaisedButton label="Copy" />
          </CopyToClipboard>
        </div>

        <div className={s.footer}>
          <RaisedButton
            label="Done"
            primary
            onClick={close}
          />
          <FlatButton
            href="#"
            label="How to Install"
            icon={<HelpIcon />}
          />
        </div>
      </div>
    </div>
  </div>
);

CodeModal.propTypes = {
  close: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
};

export default withStyles(s)(CodeModal);
