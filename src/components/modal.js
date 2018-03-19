import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {reduxForm, Field} from 'redux-form'; 
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    position              : 'absolute',
    backgroundColor       : '#f2efef', 
  }
};

class ModalButton extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  onSubmit({title,company,location,type,description,how_to_apply, created_at}) {
    this.props.addJob({title,company,location,type,description,how_to_apply, created_at})
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
      <span>
        <Button className="btn btn-secondary" onClick={this.openModal}>Add Job</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h5 className="closeButton" onClick={this.closeModal}>X</h5>
          <h2>Enter Job Info</h2>
          	<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <FormGroup className='input-span'>
                <ControlLabel>Title</ControlLabel>
                  <Field name="title" component={renderField} type="text" />
                <ControlLabel>Location</ControlLabel>
                  <Field name="location" component={renderField} type="text" />
                <ControlLabel>Type</ControlLabel>
                  <Field name="type" component={renderField} type="text" />
                <ControlLabel>Description</ControlLabel>
                  <Field componentClass="textarea" name="description" component={renderField} type="text" />
                <ControlLabel>Apply Link</ControlLabel>
                  <Field name="how_to_apply" component={renderField} type="text" />
                <ControlLabel>Date Created</ControlLabel>
                  <Field name="created_at" component={renderField} type="text" />
                  <br />
                <button className="btn btn-secondary" type="submit">Submit</button>
             </FormGroup>
            </form>
        </Modal>
      </span>
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