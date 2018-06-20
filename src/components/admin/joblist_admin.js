import React, {Component} from 'react';
import api from '../utils/api';
import { connect } from 'react-redux';
import {Table, ButtonToolbar, Button, Col} from 'reactstrap';
import {Link} from 'react-router';
import {savedJobs, removeJob, fetchAllCases} from '../../actions/index';


class JobList_Admin extends Component{
	constructor(props) {
	    super(props);

	    this.state = {
	    	type: false,
	    	text: "Private"
	 	};

  	}

	componentDidMount() {
		this.props.dispatch(savedJobs())
		this.props.dispatch(fetchAllCases())

	}

	changeType(type) {
    this.setState({
    	type: this.state.type ? false : true,
    	text: this.state.type ? "Private" : "Non-Private"
    })
  }

	removeJob(id) {
		console.log(id)
		this.props.dispatch(removeJob(id))
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
			  	<td><Link className='detail' to={{pathname: '/jobdetail' , search: `?id=${jobData._id}`}} onClick={()=> selectJob(jobData)}>{jobData.title}</Link></td>
			  	<td>{jobData.company}</td>
			  	<td>{jobData.location}</td>
			  	<td>{jobData.type}</td>
			  	<td><button onClick={()=> this.removeJob(jobData._id)}> x</button></td>
	      	  </tr>
		)
	}

	render() {
		        console.log(this.props)
		return (
				<div>
				<Button onClick= {() => this.changeType()}>{this.state.text}</Button>
				<Table responsive>
					<thead>
						<tr>
							<th>Name</th>
							<th>Company</th>
							<th>Location</th>
							<th>Type Job</th>
							<th>Remove Job</th>
						</tr>
					</thead>
					<tbody>
					{this.props.job.allJobs.length != 0 && this.props.job.allJobs.filter(i => i.jobPrivate==this.state.type).map(i=>this.renderJob(i,this.props.dispatch))}
					</tbody>
				</Table>
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

export default connect (mapStateToProps)(JobList_Admin);