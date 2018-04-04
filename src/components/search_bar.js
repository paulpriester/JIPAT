import React, { Component } from 'react';
import { Button, Form, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';                  
import { fetchJob } from './utils/api';
import ModalButton from './modal';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {term: '',
					  location: ''};

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	onFormSubmit(event) {
		event.preventDefault();

		// We need to go and fetch api data.
		this.props.fetchJob(this.state.term,this.state.location);
		this.setState({ term: '' });
		this.setState({ location: ''})
	}

	render () {
		return (
			<div>
				<Form onSubmit={this.onFormSubmit}>
					<input
						placeholder='Search for a job'
						name = 'term'
						className='form-control'
						value={this.state.term}
						onChange={this.onInputChange}
					/>
					<input
						placeholder='Search by location'
						name= 'location'
						className='form-control'
						value={this.state.location}
						onChange={this.onInputChange}
					/>
					<Button type="submit" className='btn btn-secondary'>Submit</Button>
					<ModalButton />
				</Form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchJob }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);