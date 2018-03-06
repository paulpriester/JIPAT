import React, {Component} from 'react';
import api from './utils/api';
import { connect } from 'react-redux';
import {table} from 'react-bootstrap';
import {Link} from 'react-router';
import {savedJobs, removeJob, addJob} from '../actions';


class JobList extends Component{

	componentDidMount() {
		this.props.dispatch(savedJobs())
	}

	removeJob() {
		console.log(removeJob())
		this.props.dispatch(removeJob())
	}

	addJob() {
		console.log(addJob())
		this.props.dispatch(addJob())
	}
	
	 renderJob(jobData,dispatch) {
	 	var selectJob = function(job) {
			dispatch({
				type: 'SELECT_JOB',
				payload: job
			})
		}

		return (
			<tr key={jobData.name}>
			  	<td><Link className='detail' to='/jobdetail' onClick={()=> selectJob(jobData)}>{jobData.title}</Link></td>
			  	<td>{jobData.company}</td>
			  	<td>{jobData.location}</td>
			  	<td>{jobData.type}</td>
			  	<td><button onClick={()=> this.addJob()}> save job</button></td>
			  	<td><button onClick={()=> this.removeJob()}> remove job</button></td>
	      	  </tr>
		)
	}

	render() {
		console.log(this.props)
		return (
				<table className='table table-hover'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Company</th>
							<th>Location</th>
							<th>Type Job</th>
							<th>Save Job</th>
							<th>Remove Job</th>
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
	//console.log(job)
	return  job ;
}

export default connect (mapStateToProps)(JobList);