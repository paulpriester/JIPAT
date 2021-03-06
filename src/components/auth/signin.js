import React, {Component} from 'react';
import { Link } from 'react-router';
import {reduxForm, Field} from 'redux-form'; 
import {connect} from 'react-redux';
import * as actions from '../../actions';

const renderInput= field => <input {...field.input} type={field.type} className="form-control" />;

class SignIn extends Component{

	handleFormSubmit({email,password}){
		console.log(email,password);
		let redirect = this.props.location.query.redirect? true : false
		this.props.signInUser({email,password},redirect);
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
		console.log(this.props)
		const {handleSubmit}=this.props;
		
		return(
				<form className="container" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<fieldset className="form-group">
						<label>Email:</label>
						<Field
							name="email"
							component={renderInput}
							type="email"
						/>
					</fieldset>
					<fieldset className="form-group">
						<label>Password:</label>
						<Field
							name="password"
							component={renderInput}
							type="password"
						/>
					</fieldset>
					{this.renderAlert()}
					<Link to="/forgot">Forgot Password</Link>
					<br /><br />
					<button action="submit" className="btn btn-primary">Sign In</button>
				</form>
		);
	}
}

function mapStateToProps(state){
	return {errorMessage: state.auth.error};
}

export default reduxForm({
	form: 'signin'
})(
	connect(mapStateToProps,actions)(SignIn)
);