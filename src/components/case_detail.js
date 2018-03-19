import React, {Component} from "react";
import { Jumbotron, Button } from "react-bootstrap";
import {Link} from "react-router";
import { connect } from 'react-redux';

class CaseDetail extends Component {
	renderCase(caseData) {
		function stripHTML(text) {
		 return text.replace(/<.*?>/gm, '');
		}
			return (
				<ul key={caseData.id}>
					<p>Job Title <br />{caseData.jobTitle}</p>
					<p>Post Date <br />{caseData.date}</p>
					<p>Student Name <br />{caseData.studentName}</p>
					<p>Student Id <br />{caseData.studentId}</p>
		      	  </ul>
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