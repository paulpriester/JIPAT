import React, { Component } from 'react';
import { Button, Form, FormControl, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';                  
import { fetchJob } from './utils/api';
import ModalButton from './modal_addjob';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: '', 
			location: ''
		};

		this.searchInputChange = this.searchInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}
	searchInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	locationInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	onFormSubmit(event) {
		event.preventDefault();
		// We need to go and fetch api data.
		this.props.fetchJob(this.state.term, this.state.location);
		this.setState({ term: '' });
		this.setState({ location: ''});
		console.log(this.setState.location)
	}

	render () {
		return (
			<div>
				<Form onSubmit={this.onFormSubmit}>
					<Col sm={5}>
						<input
							placeholder='Search for a job'
							className='form-control media-span'
							name="term"
							value={this.state.term}
							onChange={this.searchInputChange}
						/>
					</Col>
					<Col sm={5}>
						<input
							placeholder='Search for a location'
							className='form-control media-span'
							name="location"
							value={this.state.location}
							onChange={this.searchInputChange}
						/>
					</Col>
					<Col sm={1}>
						<Button type="submit" className='btn btn-secondary'>Submit</Button>
					</Col>
					<Col 
					sm={1}>
						<ModalButton />
					</Col>
				</Form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchJob }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);