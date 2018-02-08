import React, {Component} from "react";
import { Jumbotron, Button } from "react-bootstrap";
import {Link} from "react-router";
import JobList from './jobs'
import { connect } from 'react-redux';

// import '../style/jobdetail.css';


class JobDetail extends Component {

	renderJob(jobData) {
	 	const name = jobData.map(job => job.title)
		const location = jobData.map(job => job.location)
		const type = jobData.map(job => job.type)
		const company = jobData.map(job => job.company)
		const description = jobData.map(job => stripHTML(job.description))
		const time = jobData.map(job => job.created_at)
		const pic = jobData.map(job => (job.company_logo))
		const apply = jobData.map(job => stripHTML(job.how_to_apply))

	function stripHTML(text) {
 return text.replace(/<.*?>/gm, '');
}
		return (
			<ul key={name}>
				<p><br />{pic}</p>
				<p>Title <br />{name}</p>
				<p>Post Date <br />{time}</p>
			  	<p>Location <br />{location}</p>
			  	<p>Type <br />{type}</p>
			  	<p>Desciption <br />{description}</p>
			  	<p>How to apply <br /><a href={apply}>apply</a></p>
	      	  </ul>
	       )
	}
	
	render() {
		return (
			<div>	
				{this.props.job.map(this.renderJob)}
			</div>
		)
	}
}

function mapStateToProps({ job }) {
	return { job };
}

export default connect (mapStateToProps)(JobDetail);