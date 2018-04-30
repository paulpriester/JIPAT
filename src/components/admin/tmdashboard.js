import React, {Component} from 'react';
import {Link} from 'react-router';
import { Grid, Row, Col, Table } from 'react-bootstrap';

class TmDashboard extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={5} className="box">
              <h3 className="welcome-back">Welcome back, Grand Master</h3>
            </Col>
            <Col md={5} className="box">
              <Col className="tab-icon" md={5}>
              </Col>
              <Col md={7}>
               <h3><Link to="/adminCases" className="dash-links">Manage Cases</Link></h3>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col md={5} className="box">
              <Col className="tab-icon" md={5}></Col>
              <Col md={7}>
                <h3><Link to="/students" className="dash-links">Edit Members</Link></h3>
              </Col>
            </Col>
            <Col md={5} className="box">
              <Col className="tab-icon" md={5}></Col>
              <Col md={7}>
                <h3><Link to="/skills" className="dash-links">Manage Skills</Link></h3>
              </Col>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default TmDashboard;