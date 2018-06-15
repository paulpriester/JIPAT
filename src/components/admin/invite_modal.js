import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import Invite from './invite'
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

class InviteModal extends Component {
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

  render() {

    const { onSubmit }= this.props;
    console.log(this.props)
    return (
      <span>
        <Button className="btn btn-secondary" onClick={this.openModal}>Invite User</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
        <h5 className="closeButton" onClick={this.closeModal}>X</h5>
          <Invite />
        </Modal>
      </span>
    );
  }
}

function mapStateToProps(state){
  return {
          skill: state.student.skills,
          student: state.student.allStudents,
          filteredstudent: state.student.filteredStudent
        }
}

export default connect(mapStateToProps)(InviteModal);