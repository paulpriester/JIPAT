import React, {Component} from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {addJob} from '../actions';
import {reduxForm, Field} from 'redux-form'; 
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import DayPicker from 'react-day-picker';
import 'moment/locale/it';import '../../public/css/modal.css'

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

handleDayClick = (day, { selected })=> {
    if (selected) {
      // Unselect the day if already selected
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay: day });
  }
  parseDate = (str, format, locale) => {
    const parsed = dateFnsParse(str, format, { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }
  formatDate = (date, format, locale) => {
    return dateFnsFormat(date, format, { locale });
  }

  onSubmit({title,company,location,type,description,how_to_apply, created_at, jobPrivate,date}) {
    this.props.dispatch(addJob({title,company,location,type,description,how_to_apply, created_at, jobPrivate,date}))
        this.setState({modalIsOpen: false});
  }

    DateInput = ({input,value}) =>{
     return( 
      <DayPickerInput 
                  formatDate={formatDate}
                  parseDate={parseDate}
                  placeholder={`${formatDate(new Date())}`}
        />
     )
  }

    FieldInput = ({ input,value, meta, type, placeholder}) => {
            return (
                <FormControl
                    type={type}
                    placeholder={placeholder}
                    value={input.value}
                    onChange={input.onChange}
                    />
            )
        }

    privatecheck = ({label,input, meta: {touched, error}}) => (
    <FormGroup className="input-row">
      <label>{label}</label>
      <input {...input} type="checkbox"/>
      {touched && error &&
       <span className="error">{error}</span>}
    </FormGroup>
  )

   renderLinks() {
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
          ariaHideApp={false}

        >
          <h5 className="closeButton" onClick={this.closeModal}>X</h5>
          <h2>Enter Job Info</h2>
          <br />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <FormGroup className='input-span'>
                <ControlLabel>Title</ControlLabel>
                  <Field name="title" component={this.FieldInput} placeholder= 'Enter Title'/>
                <ControlLabel>Location</ControlLabel>
                  <Field name="location" component={this.FieldInput} />
                <ControlLabel>Type</ControlLabel>
                  <Field name="type" component={this.FieldInput} />
                <ControlLabel>Company</ControlLabel>
                  <Field name="company" component={this.FieldInput} />
                <ControlLabel>Description</ControlLabel>
                  <Field componentClass="textarea" name="description" component={this.FieldInput} />
                <ControlLabel>Apply Link</ControlLabel>
                  <Field name="how_to_apply" component={this.FieldInput} />

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
          contentLabel="Example Modal"
          ariaHideApp={false}

        >
          <h5 className="closeButton" onClick={this.closeModal}>X</h5>
          <h2 className="modal-title">Enter Job Info</h2>
          <br />
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <FormGroup className='input-span'>

                <ControlLabel>Title</ControlLabel>
                  <Field
                  name="title" 
                  placeholder="Enter Title" 
                  component={this.FieldInput} />
                <ControlLabel>Location</ControlLabel>
                  <Field 
                  name="location" 
                  placeholder="Enter location" 
                  component={this.FieldInput} />

                <ControlLabel>Type</ControlLabel>
                  <Field 
                  name="type" 
                  placeholder="Enter type"
                  component={this.FieldInput} />
                <ControlLabel>Company</ControlLabel>
                <Field 
                  name="company" 
                  placeholder="Enter Company"
                  component={this.FieldInput} />
                <ControlLabel>Description</ControlLabel>
                  <Field
                  componentClass="textarea" 
                  name="description" 
                  placeholder="Enter description" 
                  component={this.FieldInput} />

                <ControlLabel>Apply Link</ControlLabel>
                  <Field 
                  name="how_to_apply" 
                  placeholder="Enter link to how to apply"                  
                  component={this.FieldInput} 
                  />

                <ControlLabel>Private</ControlLabel>
                  <Field name="jobPrivate" component={this.privatecheck} />

                <button className="btn btn-secondary modal-btn" type="submit">Submit</button>
             </FormGroup>
            </form>
        </Modal>
      </span>
      )
    }
  }


  render() {
    console.log(this.props)
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