import React, {Component} from "react";
import { connect } from 'react-redux';
import {saveCase, fetchOneJob} from '../actions';
import {Link} from 'react-router';
import Modal_Share from './modal_share';

class JobDetail extends Component {

	componentWillMount () {
			if(this.props.location.query.id)
			this.props.dispatch(fetchOneJob(this.props.location.query.id));
	}

	// componentDidUnmount () {

	// }

	handleClick(id) {
		console.log(id)
		this.props.dispatch(saveCase(id))
	}

	renderCase(caseData) {
      return (
        <div key={caseData.id}
        className="case-container">
          <h1 className="case-title">Job Title</h1>
          <p className="case-description">{caseData.jobTitle}</p>
         </div>
           )
    }

	renderJob(jobData) {
		function stripHTML(text) {
		 return text.replace(/<.*?>/gm, '');
		}
			return (
				<ul key={jobData.id}>
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
				<p>Open Cases </p>
				<p>
				<Link className='detail' to='/admincases'>
				{this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Open').length}
				</Link>
				</p>

				<p>Close Cases </p>
				<p>{this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Close').length}</p>

				<p>Interview Cases </p>
				<p>{this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Interview').length}</p>

				<p>Interview 2 Cases </p>
				<p>{this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Salary Negotation').length}</p>

				<p>Placed Cases </p>
				<p>{this.props.case.filter(i => i.job_id == this.props.job.selectedJob.jobid && i.openCase == 'Place').length}</p>

			</div>
		)
	}


}

function mapStateToProps(state) {
	return  {
		job: state.job,
		case: state.Case.allCases
	} 
}

export default connect (mapStateToProps)(JobDetail);