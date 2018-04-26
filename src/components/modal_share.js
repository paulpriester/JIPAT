
import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {addJob} from '../actions';
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

class Modal_Share extends Component {
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


  onSubmit({email, name}) {
    let id =  this.props.job
    this.props.dispatch(shareJob({email, name, _id:id}));
        this.setState({modalIsOpen: false});
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
        <Button className="btn btn-secondary" onClick={this.openModal}>Share Job</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h5 className="closeButton" onClick={this.closeModal}>X</h5>
          <h2>Share Job</h2>
          	<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <FormGroup className='input-span'>
                <ControlLabel>Email</ControlLabel>
                  <Field name="email" component={renderField} />
                <ControlLabel>First Name</ControlLabel>
                  <Field name="name" component={renderField} />
                  <br />
                <button className="btn btn-secondary" type="submit" >Submit</button>
             </FormGroup>
            </form>
        </Modal>
      </span>
    );
  }
}

function mapStateToProps({ job }) {
  console.log(job)
  return  job ;
}

export default connect(mapStateToProps)(reduxForm({
  form: 'sharejob'
})(Modal_Share));