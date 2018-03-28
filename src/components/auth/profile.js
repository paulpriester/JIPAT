import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router";
import { connect } from "react-redux";
import * as actions from '../../actions';


const renderInput=field=>{
  const {meta: {touched,error}}=field;
  return(
    <div>
      <input {...field.input} type={field.type} placeholder='' className="form-control" />
      <div className="error">{touched?error:''}</div>
    </div>
    );  
  
};

class Profile extends Component{
  handleFormSubmit(formProps){
    this.props.profile(formProps);
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
        );
    }
  }
  render(){
    const {handleSubmit}=this.props;
          console.log({handleSubmit})

    return(
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>First Name:</label>
            <Field
              name="firstName"
              placeholder= 'test'
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Last Name:</label>
            <Field
              name="lastName"
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>About:</label>
            <Field
              name="about"
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Linkedin:</label>
            <Field
              name="linkedin"
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Github:</label>
            <Field
              name="github"
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Portfolio:</label>
            <Field
              name="portfolio"
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Resume:</label>
            <Field
              name="resume"
              component={renderInput}
              type="text"
            />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Submit</button>
        </form>
    );
  }
}
function validate(formProps){
  const errors={};
  if(!formProps.firstName)
    errors.firstName="Please Enter firstName";
  if(!formProps.lastName)
    errors.lastName="Please Enter a Password";
  return errors;
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error};
}

export default reduxForm({
  validate,
  form: 'profile'
})(
  connect(mapStateToProps,actions)(Profile)
);