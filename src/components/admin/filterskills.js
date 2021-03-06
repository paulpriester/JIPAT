// import React, {Component} from 'react';
// import Modal from 'react-modal';
// import { connect } from 'react-redux';
// import {filterSkills} from '../../actions';
// import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';


// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)',
//     position              : 'absolute',
//     backgroundColor       : 'purple', 
//     color                 : 'white'
//   }
// };

// class FilterSkill extends Component {
//   constructor() {
//     super();

//     this.state = {
//       modalIsOpen: false,
//       Skills: []
//     };

//     this.openModal = this.openModal.bind(this);
//     this.closeModal = this.closeModal.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   openModal() {
//     this.setState({modalIsOpen: true});
//   }

//   closeModal() {
//     this.setState({modalIsOpen: false, Skills: []});
//   }

//   onSubmit(e) {
//     e.preventDefault()
//     this.props.dispatch(filterSkills(this.props.student, this.state.Skills))
//     this.closeModal()
//   }

//   handleChange(e){
//     console.log(e.target.value)

//     let newArray = this.state.Skills.filter(i=> i != e.target.value)

//     if(newArray.length === this.state.Skills.length){
//       newArray = newArray.concat(e.target.value)
//     }
//     console.log(newArray)

//     this.setState({
//       Skills: newArray
//     })
//   }



//   renderSkill(skillData,fn) {
//     return (
//         <span>
//         <p>
//         <label>{skillData.skill}</label>
//        <input onClick={fn} name="Skills" type='checkbox' id= {skillData.skill} value={skillData.skill}  />
//        </p>
//        </span>
//     )
//   }

//   render() {

//     const { onSubmit }= this.props;
//     console.log(this.props)
//     return (
//       <span>
//         <Button className="btn btn-secondary" onClick={this.openModal}>Filter By Skill</Button>
//         <Modal
//           isOpen={this.state.modalIsOpen}
//           onRequestClose={this.closeModal}
//           style={customStyles}
//           contentLabel="Example Modal"
//           ariaHideApp={false}
//         >
//           <h5 className="closeButton" onClick={this.closeModal}>X</h5>
//           <h2>Add skill</h2>
//           <br />
//             <form onSubmit={this.onSubmit}>
            
//                 {this.props.skill.map(i=>this.renderSkill(i,this.handleChange))}
        
//                 <input className="btn btn-secondary" type="submit" />
//             </form>
//         </Modal>
//       </span>
//     );
//   }
// }

// function mapStateToProps(state){
//   return {
//           skill: state.student.skills,
//           student: state.student.allStudents,
//           filteredstudent: state.student.filteredStudent
//         }
// }

// export default connect(mapStateToProps)(FilterSkill);