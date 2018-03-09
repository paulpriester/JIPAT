import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {reduxForm, Field} from 'redux-form'; 

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ModalButton extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  onSubmit({title,company,location,type,jobid,description,how_to_apply, created_at}) {
    this.props.addJob({title,company,location,type,jobid,description,how_to_apply, created_at})
  }

  render() {
    const renderField = ({label,input, meta: {touched, error}}) => (
    <div className="input-row">
      <label>{label}</label>
      <br />
      <input {...input} type="text"/>
      {touched && error &&
       <span className="error">{error}</span>}
    </div>
  )
    const { handleSubmit }= this.props;

    return (
      <div>
        <button onClick={this.openModal}>Add Job</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Enter Job Info</h2>
          	<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field name="title" component={renderField} label='Title' type="text" />
                  <Field name="company" component={renderField} label='Company' type="text" />
                  <Field name="location" component={renderField} label='Location' type="text" />
                  <Field name="type" component={renderField} label='Type of Job' type="text" />
                  <Field name="jobid" component={renderField} label='Job ID' type="text" />
                  <Field name="description" component={renderField} label='Description' type="text" />
                  <Field name="how_to_apply" component={renderField} label='How to Apply' type="text" />
                  <Field name="created_at" component={renderField} label='Date of Post' type="text" />

                <button type="submit">Submit</button>
            </form>

          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errors
  };
};

export default connect(mapStateToProps,actions)(reduxForm({
  form: 'create'
})(ModalButton));