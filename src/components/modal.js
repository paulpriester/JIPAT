import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {addJob} from '../actions';
import {reduxForm, Field} from 'redux-form'; 
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../../public/css/modal.css'

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
    width:'30%',
    height:'80%',
    border: 'none',
    display:'flex',
    flexDirection:'column'
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

  onSubmit({title,company,location,type,description,how_to_apply, created_at, jobPrivate}) {
    this.props.dispatch(addJob({title,company,location,type,description,how_to_apply, created_at, jobPrivate}))
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
   const privatecheck = ({label,input, meta: {touched, error}}) => (
    <FormGroup className="input-row">
      <label>{label}</label>
      <input {...input} type="checkbox"/>
      {touched && error &&
       <span className="error">{error}</span>}
    </FormGroup>
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
          <h2 className="modal-title">Enter Job Info</h2>
          <br />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <FormGroup className='input-span'>

                <ControlLabel>Title</ControlLabel>
                  <FormControl 
                  name="title" 
                  placeholder="Enter title"
                  component={renderField} />

                <ControlLabel>Location</ControlLabel>
                  <FormControl 
                  name="location" 
                  placeholder="Enter location" 
                  component={renderField} />

                <ControlLabel>Type</ControlLabel>
<<<<<<< HEAD
                  <FormControl 
                  name="type" 
                  placeholder="Enter type"
                  component={renderField} />

=======
                  <Field name="type" component={renderField} />
                <ControlLabel>Company</ControlLabel>
                  <Field name="company" component={renderField} />
>>>>>>> 874e0524cd5ddfe9bd7f40c7df955141e5a6d84c
                <ControlLabel>Description</ControlLabel>
                  <FormControl 
                  componentClass="textarea" 
                  name="description" 
                  placeholder="Enter description" 
                  component={renderField} />

                <ControlLabel>Apply Link</ControlLabel>
                  <FormControl 
                  name="how_to_apply" 
                  placeholder="Enter link to how to apply"                  
                  component={renderField} 
                  />

                <ControlLabel>Date Created</ControlLabel>
                  <Field name="created_at" component={renderField} />

                <ControlLabel>Private</ControlLabel>
                  <Field name="jobPrivate" component={privatecheck} />

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

export default connect(mapStateToProps)(reduxForm({
  form: 'create',
  touched: false
})(ModalButton));