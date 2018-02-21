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

const Profile3 = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form >
      <Field
        name="File"
        type="file"
        component={renderField}
        label="Resume"
        validate={required}
      />
      <Field
        name="File"
        type="file"
        component={renderField}
        label="Cover Letter"
        validate={required}
      />
     
      <div>
      	<Link className='button' to='/profile_2'>
        <button type="submit" disabled={submitting}>
          Last Page
        </button>
        </Link>
        <Link className='button' to='/feature'>
        <button type="submit" disabled={submitting}>
          Submit
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
  
})(Profile3)