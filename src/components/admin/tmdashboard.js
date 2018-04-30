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
              <Col md={7}></Col>
            </Col>
          </Row>
          <Row>
            <Col md={5} className="box">
              <Col className="tab-icon" md={5}></Col>
              <Col md={7}></Col>
            </Col>
            <Col md={5} className="box">
              <Col className="tab-icon" md={5}></Col>
              <Col md={7}></Col>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default TmDashboard;