import React, {Component} from 'react';
import {Link} from 'react-router';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import * as FontAwesome from 'react-icons/lib/fa'

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
              <Col className="tab-icon" md={5}><FontAwesome.FaBriefcase /></Col>
              <Col md={7}><Link className="admin-links" to="/adminCases">Manage Cases</Link></Col>
            </Col>
          </Row>
          <Row>
            <Col md={5} className="box">
              <Col className="tab-icon" md={5}><FontAwesome.FaMale /></Col>
              <Col md={7}><Link className="admin-links" to="/students">Manage Students</Link></Col>
            </Col>
            <Col md={5} className="box">
              <Col className="tab-icon" md={5}><FontAwesome.FaCode /></Col>
              <Col md={7}><Link className="admin-links" to="/skills">Manage Skills</Link></Col>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default TmDashboard;