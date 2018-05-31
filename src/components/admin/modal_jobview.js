import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {fetchStudents} from '../../actions';
import {Link} from 'react-router';

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

class Modal_Jobview extends Component {
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

   renderCase(caseData) {
      return (
        <div key={caseData.id} className="case-container">
          <p><Link to={{pathname: '/casedetail' , search: `?id=${caseData._id}`}}>{caseData.studentName}</Link></p>
         </div>
           )
    }


  render() {

    console.log(this.props)
    return (
      <span>
        <Button className="btn btn-secondary" onClick={this.openModal}>{this.props.selectedCase.length}</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <h5 className="closeButton" onClick={this.closeModal}>X</h5>
          <h2>Student Name</h2>
          <br />
            <form >
               {this.props.selectedCase.map(this.renderCase)}
            </form>
        </Modal>
      </span>
    );
  }
}


export default Modal_Jobview;