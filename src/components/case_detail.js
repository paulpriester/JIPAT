import React, {Component} from "react";
import { Jumbotron, Button } from "react-bootstrap";
import {Link} from "react-router";
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {removeCase} from '../actions'
import '../../public/css/case-detail.css'

class CaseDetail extends Component {

    removeCase(id) {
	    var test = confirm('Are You sure want to delete?');
	    if(test == true) {
    		this.props.dispatch(removeCase(id))
    	}
  }

	renderCase(caseData) {
			return (
				<div key={caseData.id}
				className="case-container">
					<h1 className="case-title">Job Title</h1>
					<p className="case-description">{caseData.jobTitle}</p>

					<h1 className="case-title">Case Created Date</h1>
					<p className="case-description"><Moment date={caseData.date} /></p>

					<h1 className="case-title">Student Name</h1> 
					<p className="case-description">{caseData.studentName}</p>

					<h1 className="case-title">Student Id</h1>
					<p className="case-description">{caseData.studentId}</p>

					<h1 className="case-title">Last Status Update</h1>
					<p className="case-description"><Moment date={caseData.statusUpdateDate}/></p>
					
					<h1 className="case-title">Job Description</h1>
					<p className="case-description job-description">{caseData.jobDescription}</p>

					<button onClick={()=> this.removeCase(caseData._id)}> Remove Case</button>

		      	  </div>
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