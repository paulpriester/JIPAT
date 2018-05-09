import React, {Component} from 'react';
import api from '../utils/api';
import { connect } from 'react-redux';
import {table, ButtonToolbar, Button, Col} from 'react-bootstrap';
import {Link} from 'react-router';
import {savedJobs, removeJob} from '../../actions/index';


class JobList_Admin extends Component{
	constructor(props) {
    super(props);

    this.state = { type: false};
  }

	componentDidMount() {
		this.props.dispatch(savedJobs())
	}


	changeType(type) {
    //function used to record the state of the case status.

    this.setState({type: this.state.type ? false : true})
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
			  	<td><Link className='detail' to='/jobdetail' onClick={()=> selectJob(jobData)}>{jobData.title}</Link></td>
			  	<td>{jobData.company}</td>
			  	<td>{jobData.location}</td>
			  	<td>{jobData.type}</td>
			  	<td><button onClick={()=> this.removeJob(jobData._id)}> x</button></td>
	      	  </tr>
		)
	}

	render() {
		        console.log(this.state.type)
		return (
				<div>
				<Col 
				sm={1}>
						<Button 
						className='btn btn-secondary'
						onClick= {() => this.changeType()}>
						Private
						</Button>
					</Col>
			    {/* <ButtonToolbar className='tabs' justified bsSize="large">
			        <Button onClick= {() => this.changeType()}>Private</Button>
			    </ButtonToolbar> */}
				<table className='table table-hover'>
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
					{this.props.allJobs.length != 0 && this.props.allJobs.filter(i => i.jobPrivate==this.state.type).map(i=>this.renderJob(i,this.props.dispatch))}
					</tbody>
				</table>
				</div>
		)
	}
}


function mapStateToProps({job} ) {
	return  job ;
}

export default connect (mapStateToProps)(JobList_Admin);