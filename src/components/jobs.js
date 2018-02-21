import React, {Component} from 'react';
import api from './utils/api';
import { connect } from 'react-redux';
import {table} from 'react-bootstrap';
import {Link} from 'react-router';


class JobList extends Component{
	
	 renderJob(jobData,dispatch) {
	 	var selectJob = function(job) {
			dispatch({
				type: 'SELECT_JOB',
				payload: job
			})
		}

	 // 	const name = jobData.map(job => job.title)

		// const location = jobData.map(job => job.location)
		// const type = jobData.map(job => job.type)
		// const company = jobData.map(job => job.company)
		// <Link className='detail' to='/jobdetail'>
		return (
			<tr key={jobData.name}>
			  	<td><Link className='detail' to='/jobdetail' onClick={()=> selectJob(jobData)}>{jobData.title}</Link></td>
			  	<td>{jobData.company}</td>
			  	<td>{jobData.location}</td>
			  	<td>{jobData.type}</td>
	      	  </tr>
		)
	}

	render() {
		console.log(this.props)
		return (
				<table className ='table table-hover'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Company</th>
							<th>Location</th>
							<th>Type Job</th>
						</tr>
					</thead>
					<tbody>
						{this.props.allJobs.length != 0 && this.props.allJobs.map(i=>this.renderJob(i,this.props.dispatch))}
					</tbody>
				</table>
		)
	}
}


function mapStateToProps({job} ) {
	console.log(job)
	return  job ;
}

export default connect (mapStateToProps)(JobList);