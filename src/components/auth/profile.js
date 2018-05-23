import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import {fetchProfile, fetchcaselength, fetchSavedSkills} from '../../actions';
import Dashboard from '../student/dashboard';
import ModalProfile from '../modal_profile';
import ModalSkill from '../modal_skill';
import { Row, Col } from 'reactstrap';


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
      <div className="edit-profile">
              {/* <img className="profile-pic" src="https://www.bing.com/th?id=A5e81ae1f568f729aa4810dde8c952a58&w=110&h=110&c=7&rs=1&qlt=80&pcl=f9f9f9&cdv=1&pid=16.1" /> */}    
            <Row>
              <Col className="border-profile" sm="3">
                <h3>Name:</h3>
                <p>{this.props.information.firstName} {this.props.information.lastName}</p>
              </Col>
              <Col className="border-profile" sm="3">
                <h3>Github:</h3>
                <p>{this.props.information.github}</p>
              </Col>
              <Col className="border-profile" sm="3">
                <h3>LinkedIn/Resume:</h3>
                <p>{this.props.information.github}</p>
              </Col>
              <Col className="border-profile" sm="3">
                <h3>Jobs Applied:</h3>
                <p className="jobs">{this.props.information.github}</p>
              </Col>
            </Row>
          <Row>
            <Col className="border-profile" sm="4">
              <h3>About Me</h3>  
              <p>{this.props.information.about}</p>
            </Col>
            <Col className="border-profile" sm="4">
              <h3>Skills</h3>
              {this.props.skill.map(this.renderSkill)}
              <ModalProfile />
              <ModalSkill />
            </Col>
            <Col className="border-profile" sm="4">
              <h3>Career Goals</h3>
              <p> {this.props.information.careergoals}</p>
            </Col>
          </Row>
          <Row>
          <Col className="border-profile">
            <h3>Jobs Open:</h3>
          </Col>
          <Col className="border-profile">
            <h3>Jobs Closed:</h3>
          </Col>
          <Col className="border-profile">
            <h3>Job Interviews:</h3>
          </Col>
          <Col className="border-profile">
            <h3>Job Interviews 2:</h3>
          </Col>
          <Col className="border-profile">
            <h3>Jobs Placed:</h3>
          </Col>
          </Row>
            <br></br>
              <h3>Cases</h3>
              <Dashboard />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    errorMessage: state.auth.error,
    information: state.student.profile,
    skill: state.student.skills,
    caselength: state.student.caselength
  }
}

export default connect(mapStateToProps) (Profile);


