import * as React from 'react';
import { reduxForm, propTypes } from 'redux-form';

import LoadingIndicator from '../LoadingIndicator';
import ResetPasswordForm from './ResetPasswordForm';
import ResetPasswordSuccess from './ResetPasswordSuccess';

class ResetPassword extends React.Component {
  static propTypes = {
    ...propTypes,
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      complete: false,
    };

    this.resetPassword = this.resetPassword.bind(this);
  }

  resetPassword() {
    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({
        loading: false,
        complete: true,
      });
    }, 1000);
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    if (this.state.complete) {
      return <ResetPasswordSuccess />;
    }

    return (
      <ResetPasswordForm
        handleSubmit={handleSubmit}
        pristine={pristine}
        submitting={submitting}
        submit={this.resetPassword}
      />)
    ;
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Required';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export default reduxForm({
  form: 'forgotPasswordForm',
  validate,
})(ResetPassword);
