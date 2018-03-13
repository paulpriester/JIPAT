import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router";
import { connect } from "react-redux";
import * as actions from '../actions';
import {browserHistory} from 'react-router';


const renderInput=field=>{
  const {meta: {touched,error}}=field;
  return(
    <div>
      <input {...field.input} type={field.type} className="form-control" />
      <div className="error">{touched?error:''}</div>
    </div>
    );  
  
};

class Profile_2 extends Component{

  handleFormSubmit(formProps){
    //call action creator to signup user
    this.props.profile(formProps);
    browserHistory.push('/feature');  

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
            <label>Porfolio:</label>
            <Field
              name="Porfolio"
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Github:</label>
            <Field
              name="Github"
              component={renderInput}
              type="text"
            />
          </fieldset>
          <fieldset className="form-group">
            <label>Linkedin:</label>
            <Field
              name="Linkedin"
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
  if(!formProps.about)
    errors.about="Please Enter a Confirm Password";
  return errors;
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error};
}

export default reduxForm({
  validate,
  form: 'profile2'
})(
  connect(mapStateToProps,actions)(Profile_2)
);