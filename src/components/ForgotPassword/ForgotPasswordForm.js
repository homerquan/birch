import * as React from 'react';
import { Field, propTypes } from 'redux-form';
import { Button } from 'material-ui';
import styled from 'styled-components';

import { FormGroup } from '../styled/Forms';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ForgotPasswordForm = ({ handleSubmit, pristine, submitting, submit }) => (
  <Container>
    <h2>Forgot Password</h2>
    <p>Enter your email address to reset your password</p>
    <form onSubmit={handleSubmit(submit)}>
      <FormGroup>
        <Field
          name="email"
          hintText="Email"
        />
      </FormGroup>
      <FormGroup>
        <Button variant="contained"
          type="submit"
          label="Submit"
          primary
          disabled={pristine || submitting}
        />
      </FormGroup>
    </form>
  </Container>
);

ForgotPasswordForm.propTypes = {
  ...propTypes,
};

export default ForgotPasswordForm;
