import * as React from 'react';
import { Field, propTypes } from 'redux-form';
import { RaisedButton } from 'material-ui';
import styled from 'styled-components';

import { FormGroup } from '../styled/Forms';
import RenderTextInput from '../Forms/RenderTextInput';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ResetPasswordForm = ({ handleSubmit, pristine, submitting, submit }) => (
  <Container>
    <h2>Reset Password</h2>
    <p>Enter your new password below:</p>
    <form onSubmit={handleSubmit(submit)}>
      <FormGroup>
        <Field
          name="password"
          hintText="Password"
          type="password"
          component={RenderTextInput}
        />
      </FormGroup>
      <FormGroup>
        <Field
          name="confirmPassword"
          hintText="Confirm Password"
          type="password"
          component={RenderTextInput}
        />
      </FormGroup>
      <FormGroup>
        <RaisedButton
          type="submit"
          label="Submit"
          primary
          disabled={pristine || submitting}
        />
      </FormGroup>
    </form>
  </Container>
);

ResetPasswordForm.propTypes = {
  ...propTypes,
};

export default ResetPasswordForm;
