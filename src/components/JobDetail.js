import React, {Component} from "react";
import { Jumbotron, Button } from "react-bootstrap";
import {Link} from "react-router";
import JobList from './jobs'
import { connect } from 'react-redux';

class JobDetail extends Component {

	renderJob(jobData) {
		function stripHTML(text) {
		 return text.replace(/<.*?>/gm, '');
		}
			return (
				<ul key={jobData.id}>
					<p>Title <br />{jobData.title}</p>
					<p>Post Date <br />{jobData.created_at}</p>
				  	<p>Location <br />{jobData.location}</p>
				  	<p>Type <br />{jobData.type}</p>
				  	<p>Desciption <br /> {stripHTML(jobData.description)}</p>
				  	<p>How to apply <br /><a href={jobData.how_to_apply}>apply</a></p>
		      	  </ul>
		       )
		}
	
	render() {
		console.log(this.props);
		return (
			<div>	
				{this.renderJob(this.props.selectedJob)}
			</div>
		)
	}
}

function mapStateToProps({ job }) {
	console.log(job)
	return  job ;
}

export default connect (mapStateToProps)(JobDetail);