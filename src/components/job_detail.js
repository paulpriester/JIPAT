import React, {Component} from "react";
import { Jumbotron, Button } from "react-bootstrap";
import {Link} from "react-router";
import JobList from './jobs'
import { connect } from 'react-redux';
import {saveCase} from '../actions';
import Modal_Share from './modal_share';

class JobDetail extends Component {

	handleClick(id) {
		console.log(id)
		this.props.dispatch(saveCase(id))
	}

	renderJob(jobData) {
		function stripHTML(text) {
		 return text.replace(/<.*?>/gm, '');
		}
			return (
				<div className="container">
					<ul key={jobData.id}>
						<h3>Title</h3><p>{jobData.title}</p>
						<br />
						<h3>Post Date</h3><p>{jobData.created_at}</p>
						<br />
					  	<h3>Location</h3><p>{jobData.location}</p>
					  	<br />
					  	<h3>Type</h3><p>{jobData.type}</p>
					  	<br />
					  	<h3>Desciption</h3><p>{stripHTML(jobData.description)}</p>
					  	<br />
					  	<h3>How to apply</h3>
					  	<a onClick={()=> 
						  	this.handleClick(jobData._id)}
						  	href={stripHTML(jobData.how_to_apply)} 
						  	target="_blank"><Button type="submit" className='btn btn-secondary'>Apply</Button>
					  	</a>	  							  
			      	</ul>
			    </div>
		       )
		}
	
	render() {
		console.log(this.props);
		return (
			<div>	
				{this.renderJob(this.props.selectedJob)}
				<Modal_Share />
			</div>
		)
	}
}

function mapStateToProps({ job }) {
	console.log(job)
	return  job ;
}

export default connect (mapStateToProps)(JobDetail);