import React, {Component} from "react";
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
				<ul key={jobData.id}>
					<p>Title <br />{jobData.title}</p>
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