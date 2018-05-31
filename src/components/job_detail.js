import React, {Component} from "react";
import { connect } from 'react-redux';
import {saveCase, fetchOneJob, fetchSavedSkills,fetchStudents,fetchAllCases} from '../actions';
import {Link} from 'react-router';
import { Grid, Row, Col, Table,Button } from 'react-bootstrap';
import Modal_Share from './modal_share';
import FilterSkill from './admin/filterskills';
import Modal_Jobview from './admin/modal_jobview';

class JobDetail extends Component {

	componentWillMount () {
			if(this.props.location.query.id)
			this.props.dispatch(fetchOneJob(this.props.location.query.id));
   		    this.props.dispatch(fetchSavedSkills())
   		    this.props.dispatch(fetchStudents())
		    this.props.dispatch(fetchAllCases())

	}

	handleClick(id) {
		console.log(id)
		this.props.dispatch(saveCase(id))
	}

	renderCase(caseData,dispatch) {
	 var selectCase = function(Case) {
     dispatch({
        type: 'SELECT_CASE',
        payload: Case
      })
    }
      return (
        <div key={caseData.id} className="case-container">
          <p><Link to={{pathname: '/casedetail' , search: `?id=${caseData._id}`}} onClick={()=> selectCase(caseData)}>{caseData.studentName}</Link></p>
         </div>
           )
    }

    renderStudent(studentData) {
    	return (
    		<p>{studentData.firstName} {studentData.lastName}</p>
    	)
    }

	renderJob(jobData) {
		function stripHTML(text) {
		 return text.replace(/<.*?>/gm, '');
		}
			return (
				<ul key={jobData.id}>
					<p>From <br /> {jobData.author}</p>
					<p>Title <br />{jobData.title}</p>
					<p>Company <br />{jobData.company}</p>
					<p>Post Date <br />{jobData.created_at}</p>
				  	<p>Location <br />{jobData.location}</p>
				  	<p>Type <br />{jobData.type}</p>
				  	<p>Desciption <br /> {stripHTML(jobData.description)}</p>
				  	<p >How to apply <br /><a onClick={()=> this.handleClick(jobData._id)}
				  							  href={stripHTML(jobData.how_to_apply)} 
				  							  target="_blank">apply</a>
				  							  </p>
		      	</ul>
		    )
		}

	render() {
		console.log(this.props);
		return (

			<div>	
				{this.props.job.selectedJob? this.renderJob(this.props.job.selectedJob): "Empty"}
				<Modal_Share job={this.props.job.selectedJob._id}/>
			 <Row className="show-grid">
			 <Col xs={2} md={2} className="right-border">
				<p>Open Cases </p>
				<Modal_Jobview selectedCase={this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Open')} case={this.props.case.studentName}/>
			 </Col>

            <Col xs={2} md={2} className="right-border">
				<p>Close Cases </p>
				<Modal_Jobview selectedCase={this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Close')} case={this.props.case.studentName}/>
		    </Col>

            <Col xs={2} md={2} className="right-border">
				<p>Interview Cases </p>
				<Modal_Jobview selectedCase={this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Interview')} case={this.props.case.studentName}/>
		    </Col>

            <Col xs={2} md={2} className="right-border">
				<p>Salary Negotation Cases </p>
				<Modal_Jobview selectedCase={this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Salary Negotation')} case={this.props.case.studentName}/>
	   		 </Col>

            <Col xs={2} md={2} className="right-border">
				<p>Place Cases </p>
				<Modal_Jobview selectedCase={this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Place')} case={this.props.case.studentName}/>
			 </Col>

			</Row>

				<FilterSkill />
				{this.props.filteredstudent.map(this.renderStudent)}
			</div>
		)
	}
}


function mapStateToProps(state) {
	return  {
		job: state.job,
		case: state.Case.allCases,
	    skill: state.student.skills,
        filteredstudent: state.student.filteredStudent
	} 
}

export default connect (mapStateToProps)(JobDetail);