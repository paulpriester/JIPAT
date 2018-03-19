import React, { Component } from 'react';
import { Button, Form, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';                  
import { fetchJob } from './utils/api';
import ModalButton from './modal';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {term: ''};

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		this.setState({term: event.target.value});
	}

	onFormSubmit(event) {
		event.preventDefault();

		// We need to go and fetch api data.
		this.props.fetchJob(this.state.term);
		this.setState({ term: '' });
	}

	render () {
		return (
			<div>
				<Form onSubmit={this.onFormSubmit}>
					<FormControl
						placeholder='Search for a job'
						className='form-control'
						value={this.state.term}
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