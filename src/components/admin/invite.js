import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form'; 
import {connect} from 'react-redux';
import * as actions from '../../actions';

const renderInput= field => <input {...field.input} type={field.type} className="form-control" />;

class Invite extends Component{

	handleFormSubmit({email,name, admin}){
		console.log(email, name, admin);
		this.props.inviteUser({email, name, admin});
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
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<fieldset className="form-group">
						<label>Email:</label>
						<Field
							name="email"
							component={renderInput}
							type="email"
						/>
					</fieldset>
					<fieldset className="form-group">
						<label>Name:</label>
						<Field
							name="name"
							component={renderInput}
							type="string"
						/>
					</fieldset>
					<fieldset className="form-group">
						<label>Admin:</label>
						<Field
							name="admin"
							component="input"
							type="checkbox"
							className="private-box"
						/>
					</fieldset>
					<button action="submit" className="btn btn-primary">Invite</button>
				</form>
		);
	}
}



export default reduxForm({
	form: 'invite',
	initialValues: {
    admin: false // if you want it to default to the first one
  }
})(
	connect(null,actions)(Invite)
);