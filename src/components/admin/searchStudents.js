import React, { Component } from 'react';
import { Button, Form, FormControl, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { filterStudents } from '../../actions/index';
import { bindActionCreators } from 'redux';                  

class SearchStudents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: ''
		};

		this.searchInputChange = this.searchInputChange.bind(this);
	}
	searchInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});

		this.props.filterStudents(this.props.students, event.target.value)
	}

	render () {
		return (
			<div>
				<Form onSubmit={this.onFormSubmit}>
					<Col sm={12}>
						<input
							placeholder='Search for a student'
							className='form-control'
							name="term"
							value={this.state.term}
							onChange={this.searchInputChange}
						/>
					</Col>
				</Form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ filterStudents }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchStudents);