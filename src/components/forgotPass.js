import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'; 
import {connect} from 'react-redux';
import * as actions from '../actions';

const renderInput= field => <input {...field.input} type={field.type} className="form-control" />;

class ForgotPass extends Component{

	handleFormSubmit = ({email})=>{
		console.log(email);
		this.props.sendEmail({email});
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
				<form className="container" onSubmit={handleSubmit(this.handleFormSubmit)}>
					<fieldset className="form-group">
						<label>Email:</label>
						<Field
							name="email"
							component={renderInput}
							type="email"
						/>
					</fieldset>
					
					{this.renderAlert()}
					<button action="submit" className="btn btn-primary">Send Password</button>
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
	connect(mapStateToProps,actions)(ForgotPass)
);