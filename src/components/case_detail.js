import React, {Component} from "react";
import { Jumbotron, Button } from "react-bootstrap";
import {Link} from "react-router";
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {removeCase} from '../actions'

class CaseDetail extends Component {

    removeCase(id) {
	    var test = confirm('Are You sure want to delete?');
	    if(test == true) {
    		this.props.dispatch(removeCase(id))
    	}
  }

	renderCase(caseData) {
			return (
				<Jumbotron key={caseData.id}>
					<p>Job Title <br />{caseData.jobTitle}</p>
					<p>Case Created Date <br /><Moment date={caseData.date} /></p>
					<p>Student Name <br />{caseData.studentName}</p>
					<p>Student Id <br />{caseData.studentId}</p>
					<p>Last Status Update <br /><Moment date={caseData.statusUpdateDate} /></p>
					<p>Job Description <br />{caseData.jobDescription}</p>
					<p> Remove Case <br /><button onClick={()=> this.removeCase(caseData._id)}> Remove Case</button></p>
		      	  </Jumbotron>
		       )
		}
	
	render() {
		console.log(this.props);
		return (
			<div>	
				{this.renderCase(this.props.selectedCase)}
			</div>
		)
	}
}

function mapStateToProps({ Case }) {
	console.log(Case)
	return  Case ;
}

export default connect (mapStateToProps)(CaseDetail);