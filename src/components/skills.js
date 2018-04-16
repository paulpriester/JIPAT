import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {addSkills, fetchSkills} from '../actions';
import {reduxForm, Field} from 'redux-form'; 
import { Button, FormGroup,  ControlLabel, Jumbotron } from 'react-bootstrap';

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
  }
};

class Skills extends Component {
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

  onSubmit({skill}) {
    this.props.dispatch(addSkills({skill}))
        this.setState({modalIsOpen: false});
  }

  componentDidMount() {
		this.props.dispatch(fetchSkills())
	}

  // renderSkill(skillData,dispatch) {
		// 	this.props.dispatch(fetchSkills);
		// 	return (
		// 		<ul >
		// 			<p>Title <br />{skillData.skill}</p>
		//       	  </ul>
		// 	)
		// }

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
    <div>
      <span>
        <Button className="btn btn-secondary" onClick={this.openModal}>Add Skill</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h5 className="closeButton" onClick={this.closeModal}>X</h5>
          <h2>Enter Skill</h2>
          	<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <FormGroup className='input-span'>
                <ControlLabel>Add skill</ControlLabel>
                  <Field name="skill" component={renderField} />
                  <br />
                <button className="btn btn-secondary" type="submit">Submit</button>
             </FormGroup>
            </form>
        </Modal>
      </span>
     </div>
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
})(Skills));