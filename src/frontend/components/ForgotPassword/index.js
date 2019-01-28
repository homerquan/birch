import * as React from 'react';
import { reduxForm, propTypes } from 'redux-form';

import LoadingIndicator from '../LoadingIndicator';
import ForgotPasswordForm from './ForgotPasswordForm';
import ForgotPasswordSuccess from './ForgotPasswordSuccess';

class ForgotPassword extends React.Component {
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
      return <ForgotPasswordSuccess />;
    }

    return (
      <ForgotPasswordForm
        handleSubmit={handleSubmit}
        pristine={pristine}
        submitting={submitting}
        submit={this.resetPassword}
      />);
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  }

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export default reduxForm({
  form: 'forgotPasswordForm',
  validate,
})(ForgotPassword);
