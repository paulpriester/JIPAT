import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'; 
import {connect} from 'react-redux';
import * as actions from '../../actions';

const renderInput= field => <input {...field.input} type={field.type} className="form-control" />;

class ForgotPassword extends Component{

	handleFormSubmit({email}){
		console.log("An email has been sent");
		this.props.forgotPassword({email})
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
		
		return(
				<form className="container" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<h1 className="error">{this.props.successMessage}</h1>
					<h1 className="error">{this.props.errorMessage}</h1>
					<h3>Please enter your email address.</h3>
					<fieldset className="form-group">
						<label>Email:</label>
						<Field
							name="email"
							component={renderInput}
							type="email"
						/>
					</fieldset>
					{this.renderAlert()}
					<button action="submit" className="btn btn-primary">Send Email</button>
				</form>
		);
	}
}

function mapStateToProps(state){
	return {
		errorMessage: state.auth.error,
		successMessage: state.auth.success
	};
}

export default reduxForm({
	form: 'forgotpassword'
})(
	connect(mapStateToProps,actions)(ForgotPassword)
);