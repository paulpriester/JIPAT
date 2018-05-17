import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import {fetchProfile, fetchcaselength, fetchSavedSkills} from '../../actions';
import Dashboard from '../student/dashboard';
import ModalProfile from '../modal_profile';
import ModalSkill from '../modal_skill';
import '../../../public/css/student-profile.css'


class Profile extends Component{

  componentWillMount () {
    let id = this.props.params.id?this.props.params.id : ''
    this.props.dispatch(fetchcaselength());
    this.props.dispatch(fetchProfile(id));
    this.props.dispatch(fetchSavedSkills())

  }

   renderSkill(skillData,dispatch) {
    return (
      <ul key={skillData.id}>
          <li>{skillData.skill}</li>
      </ul>
    )
  }

  render(){
    console.log(this.props);
    return(
      <div className="student-profile-container">

              {/* <img className="profile-pic" src="https://www.bing.com/th?id=A5e81ae1f568f729aa4810dde8c952a58&w=110&h=110&c=7&rs=1&qlt=80&pcl=f9f9f9&cdv=1&pid=16.1" /> */}
          
            <div className="student-profile-job-info">

                <h3>Name:</h3>
                <p>{this.props.information.firstName} {this.props.information.lastName}</p>
            
            
                <h3>Github:</h3>
                <p>{this.props.information.github}</p>
          
              <div className="student-applied">
                <h3>Jobs Applied</h3>
                <div className="applied-number">{this.props.caselength.length}</div>

              </div>

           </div>
    
        <div className="student-about">

          <div className="about-me-skills">
              <h3>About Me</h3>
              
              <p> {this.props.information.about}    </p>
 

              <h3>Skills</h3>
               
            {this.props.skill.map(this.renderSkill)}

            <div className="student-profile-btn-row">
              <ModalProfile />
              <ModalSkill />
              </div>
            

          </div>

            <div className="student-career-goals">

                <h3>Career Goals</h3>
                <p> {this.props.information.careergoals} </p>

            </div>

          </div>

          <div className="student-jobs-detail">

          <h3>Jobs Open</h3>
          <h3>Jobs Closed</h3>
          <h3>Job Interviews</h3>
          <h3>Job Interviews 2</h3>
          <h3>Jobs Placed</h3>

          
          </div>
         
              <h3>Cases</h3>
              <Dashboard />
       
      </div>
    )
  }
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error,
          information: state.student.profile,
          skill: state.student.skills,
          caselength: state.student.caselength
        }
}

export default connect(mapStateToProps) (Profile);


