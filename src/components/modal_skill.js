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


class ModalSkill extends Component {
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

  onSubmit({skillcheck}) {
    this.props.dispatch(profile({skillcheck}))
        this.setState({modalIsOpen: false});
  }

  renderSkill(skillData,dispatch) {
    var selectSkill = function(skill) {
      dispatch({
        type: 'SELECT_STUDENT',
        payload: skill
      })
    }

    return (
      <li>{skillData.skill}</li>
    )
  }
  render() {

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
        <Button className="btn btn-secondary" onClick={this.openModal}>Edit Skills</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <h5 className="closeButton" onClick={this.closeModal}>X</h5>
          <h2>Add skill</h2>
          <br />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <FormGroup className='input-span'>
                <ControlLabel>{this.skill}</ControlLabel>
                  <Field name="firstName" component={privatecheck} />
                  <br />
                <button className="btn btn-secondary" type="submit">Submit</button>
             </FormGroup>
            </form>
        </Modal>
      </span>
    );
  }
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error,
          skill: state.student.skills
        }
}

export default connect(mapStateToProps)(reduxForm({
  form: 'profile',
})(ModalSkill));