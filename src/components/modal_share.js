import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {shareJob} from '../actions';
import {FilterSkill} from './admin/filterskills';
import {filterSkills, fetchStudents, fetchSavedSkills} from '../actions';
import {reduxForm, Field} from 'redux-form'; 
import { Button, FormGroup,  ControlLabel } from 'react-bootstrap';

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

class Modal_Share extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      Skills: [],
      names: []
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onFilterSubmit = this.onFilterSubmit.bind(this);

  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false, Skills: []});
  }

  componentWillMount () {
          this.props.dispatch(fetchSavedSkills())
          this.props.dispatch(fetchStudents())
  }

  onSubmit({email, name, msg}) {
    let id =  this.props.job.selectedJob
    this.props.dispatch(shareJob({email, name,msg, _id:id}));
        this.setState({modalIsOpen: false});
  }

   onFilterSubmit(e) {
    e.preventDefault()
    this.props.dispatch(filterSkills(this.props.student, this.state.Skills))
  }

  renderStudent(studentData,fn) {
      return (
        <div draggable>
        <p>

         Name: {studentData.firstName} {studentData.lastName}  Email: {studentData.email}
        <input className="checkbox-skill" onClick={fn} name="names" type='checkbox' id= {studentData.firstName} value={studentData.email}  />        
        </p>
        </div>
      )
    }

    handleName(e) {
      console.log(e.target.value)

      let nameArray = this.state.names.filter(i => i = e.target.value)
      // newArray = newArray.concat(e.target.value)

      console.log(newArray)
      this.setState({
        names: nameArray
      })
    }

    handleChange(e){
    console.log(e.target.value)

    let newArray = this.state.Skills.filter(i=> i != e.target.value)

    if(newArray.length === this.state.Skills.length){
      newArray = newArray.concat(e.target.value)
    }
    console.log(newArray)

    this.setState({
      Skills: newArray
    })
  }


  renderSkill(skillData,fn) {
      return (
        <span>
          <p className="skills-inline">
           <label>{skillData.skill}</label>
           <input className="checkbox-skill" onClick={fn} name="Skills" type='checkbox' id= {skillData.skill} value={skillData.skill}  />
         </p>
        </span>
      )
    }

  renderField = ({label,input, meta: {touched, error}}) => (
    <div className="input-row">
      <label>{label}</label>
      <br />
      <input {...input} type="text"/>
      {touched && error &&
       <span className="error">{error}</span>}
    </div>
  )

  renderModal () {
    const { handleSubmit }= this.props;
    const { onSubmit }= this.props;
    console.log(this.props.state)

    if (this.props.type == 'admin') {
      return (
      <span>
        <Button className="btn btn-secondary" onClick={this.openModal}>Share Job</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}

        >
          <h5 className="closeButton" onClick={this.closeModal}>X</h5>
          <h2>Share Job</h2>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <FormGroup className='input-span'>
                <ControlLabel>Email</ControlLabel>
                  <p>To send to multiple emails separate by a comma</p>
                  <Field name="email" component={this.renderField} />
                <ControlLabel>First Name</ControlLabel>
                  <Field name="name" component={this.renderField} />
                  <ControlLabel>Message</ControlLabel>
                  <Field name="msg" component={this.renderField} />
                  <br />
                <button className="btn btn-secondary" type="submit" >Submit</button>
             </FormGroup>
            </form>

            <h2>Filter By Skill</h2>
            <br />
            <form onSubmit={this.onFilterSubmit}>

                {this.props.skill.map(i=>this.renderSkill(i,this.handleChange))} 
                  <br />
                <input className="btn btn-secondary" type="submit" />
            </form>
                {this.props.ready && this.props.filteredstudent.map(i =>this.renderStudent(i, this.handleName))}

        </Modal>
      </span>
      )
  } else {
    return (
            <span>
        <Button className="btn btn-secondary" onClick={this.openModal}>Share Job</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}

        >
          <h5 className="closeButton" onClick={this.closeModal}>X</h5>
          <h2>Share Job</h2>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <FormGroup className='input-span'>
                <ControlLabel>Email</ControlLabel>
                  <p>To send to multiple emails separate by a comma</p>
                  <Field name="email" component={this.renderField} />
                <ControlLabel>First Name</ControlLabel>
                  <Field name="name" component={this.renderField} />
                  <ControlLabel>Message</ControlLabel>
                  <Field name="msg" component={this.renderField} />
                  <br />
                <button className="btn btn-secondary" type="submit" >Submit</button>
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
      {this.renderModal()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return  {
    type: state.auth.type,
    job: state.job,
    skill: state.student.skills,
    student: state.student.allStudents,
    filteredstudent: state.student.filteredStudent,
    ready: state.student.ready

  }
}

export default connect(mapStateToProps)(reduxForm({
  form: 'sharejob'
})(Modal_Share));