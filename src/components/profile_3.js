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

class Profile_3 extends Component {

	render() {
		return (
				<form>
			      <FieldGroup
				      id="formControlsFile"
				      type="file"
				      label="Resume:"
				    />

				   <FieldGroup
				      id="formControlsFile"
				      type="file"
				      label="CoverLetter:"
				    />
				    	<br />
				    	<br />
				    	<br />

			   	  	<ButtonToolbar>
				    <ButtonGroup>
				     <Link className='button' to='/profile_2'> <Button>Last Page</Button></Link>
				     <Link className='button' to='/feature'><Button>Submit</Button></Link>
					</ButtonGroup>
				</ButtonToolbar>

			  </form>
		)
	}
}


export default Profile_3;