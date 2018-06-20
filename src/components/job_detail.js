import React, {Component} from "react";
import { connect } from 'react-redux';
import {saveCase, fetchOneJob, fetchSavedSkills,fetchStudents,fetchAllCases} from '../actions';
import {Link} from 'react-router';
import { Grid, Row, Col, Table,Button } from 'reactstrap';
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
					<h3>From:</h3> <p>{jobData.author}</p>
					<h3>Title:</h3> <p>{jobData.title}</p>
					<h3>Company:</h3> <p>{jobData.company}</p>
					<h3>Post Date:</h3> <p>{jobData.created_at}</p>
				  	<h3>Location:</h3> <p>{jobData.location}</p>
				  	<h3>Type:</h3> <p>{jobData.type}</p>
				  	<h3>Desciption:</h3> <p>{stripHTML(jobData.description)}</p>
				  	<h3>How to apply:</h3>
				  		<a onClick={()=> this.handleClick(jobData._id)} 
				  		   href={stripHTML(jobData.how_to_apply)} 
				  		   target="_blank">Apply
				  		</a>
				  	<h3>Email:</h3> <a href={`mailto:${jobData.email}`}>{jobData.email}</a>
				  	<h3>Share Job:</h3><Modal_Share job={this.props.job.selectedJob._id}/>
		      	</ul>
		    )
		}

	renderJobdetail () {
		if (this.props.type == 'admin') {
			return (
			<div>	
				{this.props.job.selectedJob? this.renderJob(this.props.job.selectedJob): "Empty"}
				<h2> Cases </h2>
			 <Row className="detail-case">
				 <Col>
					<h4>Open  </h4>
					<Modal_Jobview selectedCase={this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Open')} case={this.props.case.studentName}/>
				 </Col>

	            <Col>
					<h4>Close  </h4>
					<Modal_Jobview selectedCase={this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Close')} case={this.props.case.studentName}/>
			    </Col>

	            <Col>
					<h4>Interview  </h4>
					<Modal_Jobview selectedCase={this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Interview')} case={this.props.case.studentName}/>
			    </Col>

	            <Col>
					<h4>Salary Negotation  </h4>
					<Modal_Jobview selectedCase={this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Salary Negotation')} case={this.props.case.studentName}/>
		   		</Col>

	             <Col>
					<h4>Place  </h4>
					<Modal_Jobview selectedCase={this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Place')} case={this.props.case.studentName}/>
				 </Col>
			</Row>
				<br></br>
				<Modal_Share job={this.props.job.selectedJob._id}/>
			</div>
		)
		} else {
			return (
			<div>	
				{this.props.job.selectedJob? this.renderJob(this.props.job.selectedJob): "Empty"}
			</div>
			)
		}
	}
	
	render() {
		console.log(this.props);
		return (
			<div>{this.renderJobdetail()}</div>
		)
	}
}


function mapStateToProps(state) {
	return  {
		job: state.job,
		case: state.Case.allCases,
	    skill: state.student.skills,
	    type: state.auth.type,
        filteredstudent: state.student.filteredStudent,
        ready: state.student.ready
	} 
}

export default connect (mapStateToProps)(JobDetail);