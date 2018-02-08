import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router';


const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const Profile2 = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit(submit)}>
      <Field
        name="Portfolio"
        type="text"
        component={renderField}
        label="Portfolio"
        validate={[required, maxLength15, minLength2]}
        warn={alphaNumeric}
      />
      <Field
        name="Linkedin"
        type="text"
        component={renderField}
        label="Linkedin"
        validate={required, minLength2}
        warn={aol}
      />
      <Field
        name="Github"
        type="text-area"
        component={renderField}
        label="Github"
        validate={required}
      />
      <div>
      	<Link className='button' to='/profile'>
        <button type="submit" disabled={submitting}>
          Last Page
        </button>
        </Link>

      	<Link className='button' to='/profile_3'>
        <button type="submit" disabled={submitting}>
          Next Page
        </button>
        </Link>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldLevelValidation',// a unique identifier for this form
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
  
})(Profile2)