import React, {Component} from 'react';
import api from './utils/api';
import {Form, FormGroup, FormControl, FormLabel, Col} from 'react-bootstrap';

function JobList(props) {
	return (
		<ul className='job-list'>
			{props.jobs.map(function(job) {
				return (
					<li key={job.data} className='job-item'>
						<ul className="space-listings">
							<li><a href={job.url}>{job.title}</a></li>
						</ul>
					</li>
				)
			})}
		</ul>
	)
}

class Job extends Component {
	constructor(props) {
		super(props)
		this.state = {
			input: '',
			jobs: null
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		api.fetchJobs("")
		.then(function (jobList) {
			this.setState({
				jobs: jobList
			})
		}.bind(this))
	}

	handleChange(e) {
		this.setState({
			input: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();

		api.fetchJobs(this.state.input)
		.then(function (jobList) {
			this.setState({
				input: "",
				jobs: jobList
			})
		}.bind(this))
	}

	render() {
		return (
			<div>
				<FormGroup>
					<Col sm={2}>Job</Col>
					<Col sm={8}>
						<FormControl placeholder="Search" onChange={this.handleChange} value={this.state.input}/>
					</Col>
					<Col sm={2}><button onClick={this.handleSubmit}>Search</button></Col>
				</FormGroup>

				{
					! this.state.jobs 
					? <p>Loading</p>
					: <JobList jobs={this.state.jobs} />
				}
			</div>
		)
	}
}

export default Job;