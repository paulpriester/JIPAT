import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router";
import { connect } from "react-redux";
import * as actions from '../actions';

import { profile } from "../actions/index";

class Profile extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  handleFormSubmit(formProps) {
        this.props.profile(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          label="First Name"
          name="fistname"
          component={this.renderField}
        />
        <Field
          label="Last Name"
          name="lastname"
          component={this.renderField}
        />
        <Field
          label="About"
          name="about"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.fistname) {
    errors.title = "Enter a title";
  }
  if (!values.lastname) {
    errors.categories = "Enter some categories";
  }
  if (!values.about) {
    errors.content = "Enter some content please";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error};
}

export default reduxForm({
  validate,
  form: "Profile"
})(
  connect(mapStateToProps,actions)(Profile)
);