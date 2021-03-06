import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'; 
import {connect} from 'react-redux';
import * as actions from '../../actions';
import ReactLoading from 'react-loading';

const renderInput= field => <input {...field.input} type={field.type} className="form-control" />;

class ForgotPassword extends Component{

	handleFormSubmit({email}){
		console.log("An email has been sent");
		this.props.forgotPassword({email})
	}
	renderAlert(){
		console.log(this.props)
		if(this.props.message == "There's no account associated with this email."){
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.message}
				</div>
			);
		} else if(this.props.message == "We've sent you an email with a link!") {
			return (
				<div className="alert alert-success">
					{this.props.message}
				</div>
			)
		} else if(this.props.fetching) {
			return (
				<span className="center-loading">
					<h4>Sending Email</h4>
					<ReactLoading type="spin" color="black" height={0} width={50} />
				</span>
			)
		} else {
			return (
				null
			)
		}
	}
	render(){
		const {handleSubmit}=this.props;
		
		return(
				<form className="container" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
					<br/><br/><br/>
					<button action="submit" className="btn btn-primary">Send Email</button>
				</form>
		);
	}
}

function mapStateToProps(state){
	return {
		message: state.auth.message,
		fetching: state.auth.fetchingEmail
	};
}

export default reduxForm({
	form: 'forgotpassword'
})(
	connect(mapStateToProps,actions)(ForgotPassword)
);