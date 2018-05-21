import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {profile} from '../actions';
import {reduxForm, Field} from 'redux-form'; 
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import '../../public/css/modal.css'

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
    width:'30%',
    height:'80%',
    border: 'none',
  
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

  renderField = ({ input,value, meta, type, placeholder}) => {
    return (
        <FormControl
            type={type}
            placeholder={placeholder}
            value={input.value}
            onChange={input.onChange}
            />
    )
}

  render() {
    const { handleSubmit }= this.props;

    return (
      <span>
        <Button className="btn btn-secondary" onClick={this.openModal}>Edit Profile</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <h5 className="closeButton" onClick={this.closeModal}>X</h5>
          <h2>Edit Profile</h2>
          <br />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <FormGroup className='input-span'>
                <ControlLabel>First Name:</ControlLabel>
                  <Field name="firstName" component={this.renderField} />
                <ControlLabel>Last Name:</ControlLabel>
                  <Field name="lastName" component={this.renderField} />
                <ControlLabel>About:</ControlLabel>
                  <Field name="about" component={this.renderField} />
                <ControlLabel>Linkedin:</ControlLabel>
                  <Field name="linkedin" component={this.renderField} />
                <ControlLabel>Github:</ControlLabel>
                  <Field name="github" component={this.renderField} />
                <ControlLabel>Portfolio:</ControlLabel>
                  <Field name="portfolio" component={this.renderField} />
                <ControlLabel>Resume:</ControlLabel>
                  <Field name="resume" component={this.renderField} />
                <ControlLabel>Career Goals:</ControlLabel>
                  <Field name="careergoals" component={this.renderField} />
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