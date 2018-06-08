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
    return(
      <div className="edit-profile">
            <Row className="width-row">
              <Col className="border-profile" sm="3">
                <h3>Name: <ModalProfile profile={this.props.information} /></h3>
                <p>{this.props.information.firstName} {this.props.information.lastName}</p>
              </Col>
              <Col className="border-profile" sm="3">
                <h3>Github:</h3>
                <a className="link-width" href={this.props.information.github}>{this.props.information.github}</a>
                <h3>Portfolio:</h3>
                <a className="link-width" href={this.props.information.portfolio}>{this.props.information.portfolio}</a>
              </Col>
              <Col className="border-profile" sm="3">
                <h3>LinkedIn:</h3>
                <a className="link-width" href={this.props.information.linkedin}>{this.props.information.linkedin}</a>
                <h3>Resume:</h3>
                <a className="link-width" href={this.props.information.resume}>{this.props.information.resume}</a>
              </Col>
              <Col className="border-profile" sm="3">
                <h3>Jobs Applied:</h3>
                <p className="jobs">{this.props.caselength.length}</p>
              </Col>
            </Row>
          <Row className="width-row">
            <Col className="border-profile" sm="4">
              <h3>About Me</h3>  
              <p>{this.props.information.about}</p>
            </Col>
            <Col className="border-profile" sm="4">
              <h3>Skills <ModalSkill /></h3>
              {this.props.information.skills && this.props.information.skills.map(i => <p>{i}</p>)}
              {this.props.skill.map(this.renderSkill)}
            </Col>
            <Col className="border-profile" sm="4">
              <h3>Career Goals</h3>
              <p> {this.props.information.careergoals}</p>
            </Col>
          </Row>
          <Row className="width-row">
          <Col className="border-profile">
            <h3>Jobs Open:</h3>
            <p>{this.props.case.filter(i => i.openCase == 'Open').length}</p>
          </Col>
          <Col className="border-profile">
            <h3>Jobs Closed:</h3>
            <p>{this.props.case.filter(i => i.openCase == 'Close').length}</p>
          </Col>
          <Col className="border-profile">
            <h2>Jobs Interview</h2>
            <p>{this.props.case.filter(i => i.openCase == 'Interview').length}</p>
          </Col>
          <Col className="border-profile">
            <h2>Salary Negotation</h2>
            <p>{this.props.case.filter(i => i.openCase == 'Salary Negotation').length}</p>
          </Col>
          <Col className="border-profile">
            <h2>Jobs Placed</h2>
              <p>{this.props.case.filter(i => i.openCase == 'Place').length}</p>
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
    case: state.student.cases,
    caselength: state.student.caselength
  }
}
export default connect(mapStateToProps) (Profile);
