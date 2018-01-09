import React, {Component} from 'react';
import {Button, FormGroup, FormControl, Form, ControlLabel, Col, ButtonToolbar, ButtonGroup, HelpBlock} from 'react-bootstrap';
import {Link} from 'react-router';

class Profile_2 extends Component {
	render() {
		return (
			<div className='page2'>
				<Form horizontal>
			    <FormGroup>
			      <Col componentClass={ControlLabel} sm={2}>
			        Portofolio
			      </Col>
			      <Col sm={10}>
			        <FormControl type="text" placeholder="" />
			      </Col>
			    </FormGroup>

			    <FormGroup>
			      <Col componentClass={ControlLabel} sm={2}>
			        Github
			      </Col>
			      <Col sm={10}>
			        <FormControl type="text" placeholder="" />
			      </Col>
			    </FormGroup>

			    <FormGroup>
			      <Col componentClass={ControlLabel} sm={2}>
			        LinkedIn
			      </Col>
			      <Col sm={10}>
			        <FormControl type="text" placeholder="" />
			      </Col>
			    </FormGroup>

			    <ButtonToolbar>
				    <ButtonGroup>
				     <Link className='button' to='/profile'> <Button>Last Page</Button></Link>
				     <Link className='button' to='/profile_3'><Button>Next Page</Button></Link>
					</ButtonGroup>
				</ButtonToolbar>
			  </Form>
  		</div>
		)
	}
}


export default Profile_2;