import React, {Component} from 'react';
import {Button, FormGroup, FormControl, Form, ControlLabel, Col, ButtonToolbar, ButtonGroup, HelpBlock} from 'react-bootstrap';
import {Link} from 'react-router';



function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
     </FormGroup>
  );
}

class Profile extends Component {
	render() {
		return (
			<div className='login'>
				<Form horizontal>
			    <FormGroup>
			      <Col componentClass={ControlLabel} sm={2}>
			        First Name
			      </Col>
			      <Col sm={10}>
			        <FormControl type="email" placeholder="Email" />
			      </Col>
			    </FormGroup>

			    <FormGroup>
			      <Col componentClass={ControlLabel} sm={2}>
			        Last Name
			      </Col>
			      <Col sm={10}>
			        <FormControl type="password" placeholder="Password" />
			      </Col>
			    </FormGroup>

			    
			      <FieldGroup
				      id="formControlsFile"
				      type="file"
				      label="File"
				    />


			    <FormGroup controlId="formControlsTextarea">
			      <Col componentClass={ControlLabel} lg >
			        About Me
			      </Col>
			      <Col lg={20} >
			      <FormControl componentClass="textarea" placeholder="About" />
			      </Col>
			    </FormGroup>
			   	<Link className='button' to='/profile_2'><button action="submit" className="btn btn-primary">Next Page</button></Link>
			  </Form>
  		</div>
		)
	}
}

export default Profile;
