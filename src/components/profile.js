import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { Grid, Row, Col, Table } from 'react-bootstrap';
import {fetchProfile} from '../actions';
// import {Dashboard} from '../student/dashboard'

class Profile extends Component{

     componentDidMount() {
     this.props.dispatch(fetchProfile())
   }

  render(){
    return(
      <div>
        <Grid fluid className="grid">
          <Row className="show-grid-head">
            <Col className="col-box" xs={3} md={3}>
              <img className="profile-pic" src="https://www.bing.com/th?id=A5e81ae1f568f729aa4810dde8c952a58&w=110&h=110&c=7&rs=1&qlt=80&pcl=f9f9f9&cdv=1&pid=16.1" />
            </Col>
            <Col className="col-box" xs={3} md={3}>
              <h2>Name:</h2>
              <p>{this.props.information.firstName} {this.props.information.lastName}</p>
            </Col>
            <Col className="col-box" xs={3} md={3}>
              <h2>Linkedin:</h2>
              <p>{this.props.information.linkedin}</p>
            </Col>
            <Col className="col-box" xs={3} md={3}>
              <h3>Portfolio:</h3>
              <p>{this.props.information.portfolio}</p>
            </Col>
            <Col className="col-box" xs={3} md={3}>
              <h3>Jobs Applied</h3>
              <div className="jobs col-box"></div>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={6} md={6} className="right-border">
              <h3>About Me</h3>
                {this.props.information.about}
              <p>
              </p>
            </Col>
            <Col xs={6} md={6}>
              <h3>Career Goals</h3>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna ali
                qua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <h3>Cases</h3>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Job Type</th>
                    <th>Status</th>
                    <th>Date Added</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                  <tr>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
          errorMessage: state.auth.error,
          information: state.student.profile
      };
  }

export default connect (mapStateToProps)(Profile);