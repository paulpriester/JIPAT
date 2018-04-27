import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { Grid, Row, Col, Table } from 'react-bootstrap';
import * as actions from '../../actions';
import {fetchProfile} from '../../actions';
import Dashboard from '../student/dashboard';
import ModalProfile from '../modal_profile';

class Profile extends Component{

  componentDidMount() {
    this.props.dispatch(fetchProfile())
  }

  renderStudent(studentData) {
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
                  <div className="jobs col-box"></div>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={6} md={6} className="right-border">
                  <h3>About Me</h3>
                  <p> {this.props.information.about}</p>
                </Col>
                <Col xs={6} md={6}>
                  <h3>Career Goals</h3>
                  <p> {this.props.information.careergoals} </p>
                </Col>
              </Row>
              <Row className="show-grid">
                <ModalProfile />
                <Col xs={12} md={12}>
                  <h3>Cases</h3>
                  <Dashboard />
                </Col>
              </Row>
            </Grid>
        </div>
      )
  }

  render(){
    return (
      <div>
        {this.renderStudent(this.props.select)}
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log(state)
  return {
    errorMessage: state.auth.error,
    information: state.student.profile,
    select: state.student.selectedStudent
  };
}

export default connect(mapStateToProps) (Profile);