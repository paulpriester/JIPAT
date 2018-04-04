import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { Grid, Row, Col } from 'react-bootstrap';
import * as actions from '../../actions';

class Profile extends Component{
  render(){
    return(
      <div className="container">
        <Grid>
          <Row className="show-grid-head">
            <Col xs={4} md={4}>
              <img className="profile-pic" src="https://www.bing.com/th?id=A5e81ae1f568f729aa4810dde8c952a58&w=110&h=110&c=7&rs=1&qlt=80&pcl=f9f9f9&cdv=1&pid=16.1" />
            </Col>
            <Col xs={4} md={4}>
              <h3>Github/LinkedIn</h3>
            </Col>
            <Col xs={4} md={4}>
              <h3>Resume</h3>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <h3>Description</h3>
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
              <h3>Notifications</h3>
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
        </Grid>
      </div>
    );
  }
}

export default Profile;