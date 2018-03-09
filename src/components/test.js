import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {reduxForm} from 'redux-form'; 


class Test extends Component {

  handleSubmit(formProps) {
	this.props.addJob(formProps);
  }

  render() {

  	const {handleSubmit,
  		   fields: {title,company,location,type}}=this.props;

    return (
      <div>
          	<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<fieldset className="form-group">
						<label>Title:</label>
						<input className='form-control' {...title} />
					</fieldset>
					<fieldset className="form-group">
						<label>Company:</label>
						<input className='form-control' {...company} />
					</fieldset>
					<fieldset className="form-group">
						<label>Location:</label>
						<input className='form-control' {...location} />
					</fieldset>
					<fieldset className="form-group">
						<label>Type:</label>
						<input className='form-control' {...type} />
					</fieldset>
					{this.renderAlert()}
					<button action="submit" className="btn btn-primary">Submit</button>
				</form>
      </div>
    );
  }
}

export default reduxForm({
	form: 'addjob',
	fields: ['title','company','type', 'location']
},actions)(Test)
