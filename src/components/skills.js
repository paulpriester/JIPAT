import React, { Component } from 'react';
import { Button, Form, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';                  
import { addSkills } from '../actions';
import ModalButton from './modal';

class Skills extends Component {
	constructor(props) {
		super(props);

		this.state = {skills: ''};

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.addSkills(this.state.skills);
		// this.setState({ term: '' });
	}

	render () {
		return (
			<div>
				<Form onSubmit={this.onFormSubmit}>
					<input
						placeholder='Search for a job'
						name = 'skills'
						className='form-control'
						value={this.state.skills}
						onChange={this.onInputChange}
					/>
					<Button type="submit" className='btn btn-secondary'>Submit</Button>
				</Form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ addSkills }, dispatch);
}

export default connect(null, mapDispatchToProps)(Skills);