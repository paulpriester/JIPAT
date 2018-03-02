import React, {Component} from 'react';
import api from './utils/api';
import { connect } from 'react-redux';
import {table} from 'react-bootstrap';
import {Link} from 'react-router';


class JobList extends Component{
	 renderJob(jobData) {

	 	const name = jobData.map(job => job.title)
		const location = jobData.map(job => job.location)
		const type = jobData.map(job => job.type)
		const company = jobData.map(job => job.company)

		return (
			<tr key={name}>
			  	<td><Link className='detail' to='/jobdetail'>{name}</Link></td>
			  	<td>{company}</td>
			  	<td>{location}</td>
			  	<td>{type}</td>
	      	  </tr>
		)
	}

	render() {
		return (
				<table className='table table-hover'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Company</th>
							<th>Location</th>
							<th>Type Job</th>
						</tr>
					</thead>
					<tbody>
						{this.props.job.map(this.renderJob)}
					</tbody>
				</table>
		)
	}
}


function mapStateToProps({ job }) {
	return { job };
}

export default connect (mapStateToProps)(JobList);