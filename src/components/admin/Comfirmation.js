import React from 'react';
import {Button, Jumbotron} from 'react-bootstrap';
var Link = require('react-router-dom').Link;

class Approval extends React.Component {
	render() {
		return(
			<div className='container'>
			  <Jumbotron className="Jumbotron">
			    <h1>Job Board </h1>
			    <h1>The Knowledge House</h1>
			    <h3>Talent Management</h3>
			    <p>Add or Modify Comfirmation - Student or Alumni To Register</p>
			    <hr></hr>
			    <p>(First Name)</p>
			    <p>(Last Name)</p>
			    <p>(Email)</p>
			    <hr></hr>
			    <Link className='button' to='/'>Submit</Link>
			  </Jumbotron>
			</div>
		)
	}
}

export default Approval;