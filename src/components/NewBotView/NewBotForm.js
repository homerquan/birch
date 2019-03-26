import * as React from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import { RaisedButton } from 'material-ui'; 

import { RCard, RCardBody } from '../styled/RCard';
import { FormGroup } from '../styled/Forms';
import RenderTextInput from '../Forms/RenderTextInput';

class NewBotForm extends React.Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <RCard>
        <RCardBody>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Field
                name="name"
                hintText="Name"
                component={RenderTextInput}
              />
            </FormGroup>

            <FormGroup>
              <Field
                name="url"
                hintText="URL"
                component={RenderTextInput}
              />
            </FormGroup>

            <div>
              <button
                type="submit"
                disabled={pristine || submitting}
              >
                Submit
              </button>
              <button type="button" disabled={pristine || submitting} onClick={reset}>
                Clear Values
              </button>
            </div>
          </form>
        </RCardBody>
      </RCard>
    );
  }
}

export default reduxForm({
  form: 'new_bot', // a unique identifier for this form
})(NewBotForm);
