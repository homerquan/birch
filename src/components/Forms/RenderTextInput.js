import * as React from 'react';
import PropTypes from 'prop-types';
import { propTypes } from 'redux-form';
import TextField from 'material-ui/TextField';

const RenderTextInput = ({ hintText, type = 'text', input, meta: { touched, error } }) => (
  <TextField
    {...input}
    hintText={hintText}
    type={type}
    errorText={touched && error}
  />
);

RenderTextInput.propTypes = {
  ...propTypes,
  hintText: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default RenderTextInput;
