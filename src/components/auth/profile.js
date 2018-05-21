import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { Grid, Row, Col, Table,Button } from 'react-bootstrap';
import {fetchProfile, fetchcaselength, fetchSavedSkills} from '../../actions';
import Dashboard from '../student/dashboard';
import ModalProfile from '../modal_profile';
import ModalSkill from '../modal_skill';
// import {csv} from '../../actions'



class Profile extends Component{

  componentWillMount () {
    let id = this.props.params.id?this.props.params.id : ''
    this.props.dispatch(fetchcaselength());
    this.props.dispatch(fetchProfile(id));
    this.props.dispatch(fetchSavedSkills())

  }

  // handleClick() {
  //   console.log('clicked')
  //   this.props.dispatch(csv())
  // }

  renderCase(caseData) {
      return (
        <div key={caseData.id}
        className="case-container">
          <h1 className="case-title">Job Title</h1>
          <p className="case-description">{caseData.jobTitle}</p>
         </div>
           )
    }

  render(){
    console.log(this.props)
    return(
      <div>
        <Grid fluid className="grid">
          <Row className="show-grid-head">
            <Col className="col-box" xs={3} md={3}>
              <img className="profile-pic" src="https://www.bing.com/th?id=A5e81ae1f568f729aa4810dde8c952a58&w=110&h=110&c=7&rs=1&qlt=80&pcl=f9f9f9&cdv=1&pid=16.1" />
            </Col>
            <Col className="col-box" xs={3} md={3}>
              <h3>Name:</h3>
              <p>{this.props.information.firstName} {this.props.information.lastName}</p>
            </Col>
            <Col className="col-box" xs={3} md={3}>
              <h3>Github:</h3>
              <p>{this.props.information.github}</p>
            </Col>
            <Col className="col-box" xs={3} md={3}>
              <h3>Jobs Applied</h3>
              <div className="jobs col-box">{this.props.caselength.length}</div>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={6} className="right-border">
              <h3>About Me</h3>
              <p> {this.props.information.about} </p>
            </Col>
            <Col xs={6} md={6}>
              <h3>Career Goals</h3>
              <p> {this.props.information.careergoals} </p>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={6} className="right-border">
              <h3>Skills</h3>
              <p> {this.props.information.skills} </p>
            </Col>
          </Row>
          <Row className="show-grid">
            <ModalProfile />
            <ModalSkill />

            <Row className="show-grid">
            <Col xs={2} md={2} className="right-border">
              <h2>Jobs Open</h2>
              <p>{this.props.case.filter(i => i.openCase== 'Open').map(this.renderCase).length}</p>
            </Col>
            <Col xs={2} md={2} className="right-border">
              <h2>Jobs Close</h2>
              <p>{this.props.case.filter(i => i.openCase== 'Close').map(this.renderCase).length}</p>
            </Col>
            <Col xs={2} md={2} className="right-border">
              <h2>Jobs Interview</h2>
              <p>{this.props.case.filter(i => i.openCase== 'Interview').map(this.renderCase).length}</p>
            </Col>
            <Col xs={2} md={2} className="right-border">
              <h2>Jobs Interview 2</h2>
              <p>{this.props.case.filter(i => i.openCase== 'Salary Negotation').map(this.renderCase).length}</p>
            </Col>
            <Col xs={2} md={2} className="right-border">
              <h2>Jobs Placed</h2>
              <p>{this.props.case.filter(i => i.openCase== 'Place').map(this.renderCase).length}</p>
            </Col>
          </Row>
            <Col xs={12} md={12}>
              <h3>Cases</h3>
              <Dashboard />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error,
          information: state.student.profile,
          skill: state.student.skills,
          case: state.student.cases,
          caselength: state.student.caselength
        }
}

export default connect(mapStateToProps) (Profile);


