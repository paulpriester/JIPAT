import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {profile} from '../actions';
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
    backgroundColor       : 'purple', 
    color                 : 'white'
  }
};

class ModalProfile extends Component {
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

  onSubmit({firstName,lastName,about, portfolio,github,linkedin,resume,careergoals}) {
    this.props.dispatch(profile({firstName,lastName,about, portfolio,github,linkedin,resume,careergoals}))
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
    const { handleSubmit }= this.props;

    return (
      <span>
        <Button className="btn btn-secondary" onClick={this.openModal}>Edit Profile</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h5 className="closeButton" onClick={this.closeModal}>X</h5>
          <h2>Edit Profile</h2>
          <br />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <FormGroup className='input-span'>
                <ControlLabel>First Name:</ControlLabel>
                  <Field name="firstName" component={renderField} />
                <ControlLabel>Last Name:</ControlLabel>
                  <Field name="lastName" component={renderField} />
                <ControlLabel>About:</ControlLabel>
                  <Field name="about" component={renderField} />
                <ControlLabel>Linkedin:</ControlLabel>
                  <Field name="linkedin" component={renderField} />
                <ControlLabel>Github:</ControlLabel>
                  <Field name="github" component={renderField} />
                <ControlLabel>Portfolio:</ControlLabel>
                  <Field name="portfolio" component={renderField} />
                <ControlLabel>Resume:</ControlLabel>
                  <Field name="resume" component={renderField} />
                <ControlLabel>Career Goals:</ControlLabel>
                  <Field name="careergoals" component={renderField} />
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
  form: 'profile',
})(ModalProfile));