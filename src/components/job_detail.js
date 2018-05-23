import React, {Component} from "react";
import { connect } from 'react-redux';
import {saveCase, fetchOneJob} from '../actions';
import Modal_Share from './modal_share';

class JobDetail extends Component {

	componentWillMount () {
			if(this.props.location.query.id)
			this.props.dispatch(fetchOneJob(this.props.location.query.id));
	}

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
					<p>Company <br />{jobData.company}</p>
					<p>Post Date <br />{jobData.created_at}</p>
				  	<p>Location <br />{jobData.location}</p>
				  	<p>Type <br />{jobData.type}</p>
				  	<p>Desciption <br /> {stripHTML(jobData.description)}</p>
				  	<p >How to apply <br /><a onClick={()=> this.handleClick(jobData._id)}
				  							  href={stripHTML(jobData.how_to_apply)} 
				  							  target="_blank">apply</a>
				  							  </p>
				  	<p>Email</p>
					<a href={`mailto:${jobData.email}`}>{jobData.email}</a>
		      	</ul>
		    )
		}
	
	render() {
		console.log(this.props);
		return (
			<div>	
				{this.props.selectedJob? this.renderJob(this.props.selectedJob): "Empty"}
				<Modal_Share job={this.props.selectedJob._id}/>
			</div>
		)
	}
}

function mapStateToProps({ job }) {
	console.log(job)
	return  job ;
}

export default connect (mapStateToProps)(JobDetail);