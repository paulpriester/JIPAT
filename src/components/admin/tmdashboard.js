import React, {Component} from 'react';
import {Link} from 'react-router';
import { Container, Row, Col } from 'reactstrap';
import * as FontAwesome from 'react-icons/lib/fa'

class TmDashboard extends Component {
  render() {
    return (
      <Container>
          <Row>
            <Col className="box" sm={6}>
              <p className="welcome-back">Welcome back, Grand Master</p>
            </Col>
            <Col className="box" sm={6}>
            <Row>
              <Col className="tab-icon" sm={5}><FontAwesome.FaBriefcase className="icon"/></Col>
              <Col sm={7}><Link className="admin-links" to="/adminCases">Manage Cases</Link></Col>
            </Row>
            </Col>
          </Row>
          <Row>
            <Col className="box" sm={6}>
              <Row>
                <Col className="tab-icon" sm={5}><FontAwesome.FaMale className="icon"/></Col>
                <Col sm={7}><Link className="admin-links" to="/students">Manage Students</Link></Col>
              </Row>
            </Col>
            <Col className="box" sm={6}>
              <Row>
                <Col className="tab-icon" sm={5}><FontAwesome.FaCode className="icon"/></Col>
                <Col sm={7}><Link className="admin-links" to="/skills">Manage Skills</Link></Col>
              </Row>
            </Col>
          </Row>
      </Container>
    )
  }
}

export default TmDashboard;