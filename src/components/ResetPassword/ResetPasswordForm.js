import * as React from 'react';
import { Field, propTypes } from 'redux-form';
import { Button } from '@material-ui/core/Button';
import styled from 'styled-components';

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
      
    </form>
  </Container>
);

ResetPasswordForm.propTypes = {
  ...propTypes,
};

export default ResetPasswordForm;
