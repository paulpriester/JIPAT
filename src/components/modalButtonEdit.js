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
    width                 : '70%',
    transform             : 'translate(-50%, -50%)',
    position              : 'absolute',
    backgroundColor       : '#f2efef', 
  }
};

class ModalButtonEdit extends Component {
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
    <FormGroup controlId="formControlsTextarea">
      <FormControl componentClass="textarea" placeholder="Edit" {...input} />
      {touched && error && <span className="error">{error}</span>}
    </FormGroup>
  )
    const { handleSubmit } = this.props;

    return (
      <span>
        <Button className="btn btn-secondary" onClick={this.openModal}>Edit</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h5 className="closeButton" onClick={this.closeModal}>X</h5>
          <h2>Enter Job Info</h2>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                  <Field name="edit" component={renderField} type="textarea" />
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
})(ModalButtonEdit));