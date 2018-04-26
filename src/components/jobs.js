import React, {Component} from 'react';
import api from './utils/api';
import { connect } from 'react-redux';
import {table} from 'react-bootstrap';
import {Link} from 'react-router';
import Loading from './loading';
import {savedJobs, saveCase} from '../actions';
import jobStyles from '../../public/css/jobs.css'


class JobList extends Component {
	componentDidMount() {
		this.props.dispatch(savedJobs())
	}

	handleClick(id) {
		console.log(id)
		this.props.dispatch(saveCase(id))
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
			  	<td><button onClick={()=> this.handleClick(jobData._id)}> Apply</button></td>
	      	</tr>
		)
	}

	render() {
		return (
			<div>
				{
					! this.props.allJobs.length
					? <Loading />
					: 
					<span>
						<h1 className="error">{this.props.error}</h1>
						<table className="table table-hover">
							<thead>
								<tr>
									<th>Name</th>
									<th>Company</th>
									<th>Location</th>
									<th>Type Job</th>
									<th>Apply for Job</th>
								</tr>
							</thead>
							<tbody>
								{this.props.allJobs.length != 0 && this.props.allJobs.filter(i => i.jobPrivate== false).map(i=>this.renderJob(i,this.props.dispatch))}
							</tbody>
						</table>
					</span>				
				}
			</div>		
		)
	}
}


function mapStateToProps({job} ) {
	return  job ;
}

export default connect (mapStateToProps)(JobList);