import React from 'react'
import { Field, reduxForm } from 'redux-form'

const NewBotForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <div>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="App Name"
          />
        </div>
      </div>
      <div>
        <label>Url</label>
        <div>
          <Field
            name="url"
            component="input"
            type="text"
            placeholder="Web Url"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'new_bot' // a unique identifier for this form
})(NewBotForm)