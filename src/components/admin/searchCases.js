import React, { Component } from 'react';
import { Button, Form, FormControl, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchStudents, filterCases} from '../../actions/index';
import { bindActionCreators } from 'redux';                  

class SearchCases extends Component {
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

		this.props.filterCases(this.props.cases, event.target.value)
	}

	locationInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.fetchStudents(this.state.term);
		this.setState({ term: '' });
		console.log(this.setState.term)
	}

	render () {
		return (
			<div>
				<Form onSubmit={this.onFormSubmit}>
					<Col sm={11}>
						<input
							placeholder='Search for a student'
							className='form-control'
							name="term"
							value={this.state.term}
							onChange={this.searchInputChange}
						/>
					</Col>
					<Col sm={1}>
						<Button type="submit" className='btn btn-secondary'>Submit</Button>
					</Col>
				</Form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchStudents, filterCases }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchCases);