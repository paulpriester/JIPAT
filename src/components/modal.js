import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {addJob} from '../actions';
import {reduxForm, Field} from 'redux-form'; 
import { Button, FormGroup,  ControlLabel, FormControl} from 'react-bootstrap';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    height                : '90%',
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
    this.props.dispatch(addJob({title,company,location,type,description,how_to_apply, created_at}))
        this.setState({modalIsOpen: false});
  }

  render() {
    const renderField = ({label,input, meta: {touched, error}}) => (
    <FormGroup className="input-row">
      <ControlLabel>{label}</ControlLabel>
      <FormControl className="input-edit" {...input} type="text"/>
      {touched && error &&
       <span className="error">{error}</span>}
    </FormGroup>
  )
    const { handleSubmit } = this.props;

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
                <label htmlFor="title">Title</label>
                  <Field name="title" component={renderField} type="text" />
                <label htmlFor="location">Location</label>
                  <Field name="location" component={renderField} type="text" />
                <label htmlFor="type">Type</label>
                  <Field name="type" component={renderField} type="text" />
                <label htmlFor="description">Description</label>
                  <Field componentClass="textarea" name="description" component={renderField} type="text" />
                <label htmlFor="how_to_apply">Apply Link</label>
                  <Field name="how_to_apply" component={renderField} type="text" />
                <label htmlFor="created_at">Date Created</label>
                  <Field name="created_at" component={renderField} type="text" />
                <button className="btn btn-secondary" type="submit">Submit</button>
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

export default connect(mapStateToProps)(reduxForm({
  form: 'create'
})(ModalButton));