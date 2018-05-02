import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'; 
import {connect} from 'react-redux';
import * as actions from '../../actions';

const renderInput= field => <input {...field.input} type={field.type} className="form-control" />;

class PasswordReset extends Component{

	componentDidMount(){
		console.log(this.props.params.tokenId);
		this.props.passwordResetMount(this.props.params.tokenId)
	}

	handleFormSubmit({password, comfirmPassword}){
		console.log("An email haas been sent");
		this.props.passwordReset({password, comfirmPassword})
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
					<h3>Please enter your new password.</h3>
					<fieldset className="form-group">
						<label>New Password:</label>
						<Field
							name="password"
							component={renderInput}
							type="password"
						/>
						<label>Comfirm Password:</label>
						<Field
							name="comfirmPassword"
							component={renderInput}
							type="password"
						/>
					</fieldset>
					{this.renderAlert()}
					<button action="submit" className="btn btn-primary">Send Email</button>
				</form>
		);
	}
}

function mapStateToProps(state){
	return {errorMessage: state.auth.error};
}

export default reduxForm({
	form: 'passwordreset'
})(
	connect(mapStateToProps,actions)(PasswordReset)
);