import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {addJob, selectJobType} from '../actions';
import {reduxForm, Field} from 'redux-form'; 
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const customStyles = {
  
  overlay:{
    backgroundColor:"rgba(150, 150, 150, 0.7)"
  },

  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    position              : 'absolute',
    backgroundColor       : '#fff',
    width                 : '50%',
    height                : '80%',
    border                : 'none',
  
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

  onSubmit({title,company,location,type,email,description,how_to_apply, created_at, jobPrivate}) {
    this.props.dispatch(addJob({title,company,location,type,email,description,how_to_apply, created_at, jobPrivate}))
        this.setState({modalIsOpen: false, jobType:''});
  }

   renderLinks() {
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
     const dropdownMenu = () => (
          <Field name="type" component="select">
            <option disabled>
              Select A Job Type
            </option>
            <option value="Front-End">
              Front-End
            </option>
            <option value="Back-End">
              Back-End
            </option>
            <option value="Full-Stack">
              Full-Stack
            </option>
            <option value="UX/UI Design">
              UX/UI Design
            </option>
            <option value="Graphic Design">
              Graphic Design
            </option>
          </Field>
     )
    const { handleSubmit }= this.props;
    if (this.props.type == 'student') {
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
          <br />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <FormGroup className='input-span'>
                <ControlLabel>Title</ControlLabel>
                  <Field name="title" component={renderField} />
                <ControlLabel>Location</ControlLabel>
                  <Field name="location" component={renderField} />
                <ControlLabel>Type</ControlLabel>
                  <br />
                  <Field name="type" component={dropdownMenu}/>
                  <br /><br />
                <ControlLabel>Email</ControlLabel>
                  <Field name="email" component={renderField} />
                <ControlLabel>Company</ControlLabel>
                  <Field name="company" component={renderField} />
                <ControlLabel>Description</ControlLabel>
                  <Field componentClass="textarea" name="description" component={renderField} />
                <ControlLabel>Apply Link</ControlLabel>
                  <Field name="how_to_apply" component={renderField} />
                <ControlLabel>Date Created</ControlLabel>
                  <Field name="created_at" component={renderField} />
                  <br />
                <button className="btn btn-secondary" type="submit">Submit</button>
             </FormGroup>
            </form>
        </Modal>
      </span>
      )
    } else {
      return (
      <span>
        <Button className="btn btn-secondary" onClick={this.openModal}>Add Job</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal"
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
                  <FormControl 
                  name="type" 
                  placeholder="Enter type"
                  component={dropdownMenu} />
                  <Field name="type" component={renderField} />
                <ControlLabel>Company</ControlLabel>
                  <Field name="company" component={renderField} />
                <FormControl 
                  name="type" 
                  placeholder="Enter type"
                  component={renderField} />
                <ControlLabel>Company</ControlLabel>
                <FormControl 
                  name="company" 
                  placeholder="Enter Company"
                  component={renderField} />
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
                <FormControl 
                  name="date" 
                  placeholder="select date"                  
                  component={renderField} 
                  />

                <ControlLabel>Private</ControlLabel>
                  <Field name="jobPrivate" component={privatecheck} />

                <button className="btn btn-secondary modal-btn" type="submit">Submit</button>
             </FormGroup>
            </form>
        </Modal>
      </span>
      )
    }
  }


  render() {
    return (
      <div>
        {this.renderLinks()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    type: state.auth.type,
    errorMessage: state.errors
  };
};

export default connect(mapStateToProps)(reduxForm({
  form: 'create',
  touched: false
})(ModalButton));