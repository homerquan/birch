import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import InputMask from 'react-input-mask';

import s from './AddCreditCardDialog.css';

const AddCreditCard = ({
  title,
  actions,
  open,
  onRequestClose,
}) => (
  <Dialog
    title={title}
    actions={actions}
    modal={false}
    open={open}
    onRequestClose={onRequestClose}
  >
    <form className={s.container}>
      <TextField
        hintText="Thomas S. Charette"
        floatingLabelText="Name on Card"
      />

      <TextField
        hintText="1234 1234 1234 1234"
        floatingLabelText="Card Number"
      >
        <InputMask mask="9999 9999 9999 9999"/>
      </TextField>

      <TextField
        hintText="01/18"
        floatingLabelText="Experation Date"
      >
        <InputMask mask="99/99"/>
      </TextField>

      <TextField
        hintText="123412341234"
        floatingLabelText="CCV"
        >
        <InputMask mask="999"/>
      </TextField>
    </form>
  </Dialog>
);

AddCreditCard.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default withStyles(s)(AddCreditCard);
