import React, {Component} from "react";
import { Jumbotron, Button } from "react-bootstrap";
import {Link} from "react-router";
// import '../style/jobdetail.css';

class Detail extends Component {
	render() {
		return(
			<div>
			  <Jumbotron className="Jumbotron2">
			    <h1>Job Title </h1>
			    <h3>Job Company</h3>
			    <hr></hr>
			    <h6>Post Date: Jan 11,1111</h6>
			    <br></br>
			    <h3>Job Description</h3>
			    <p>Some old Lorem Ipsum Description swaggyness...</p>
			    <h3>Qualifications</h3>
			    <p>Some old Lorem Ipsum Description swaggyness...</p>
			    <h3>Requirements</h3>
			    <p>Some old Lorem Ipsum Description swaggyness...</p>
			    <hr></hr>
			    <Button><Link className='button' to='/'>Apply</Link></Button>
			    <Button><Link className='button' to='/'>Back</Link></Button>
			  </Jumbotron>
			</div>
		)
	}
}

export default Detail;