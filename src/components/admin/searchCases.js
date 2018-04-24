import React, { Component } from 'react';
import { Button, Form, FormControl, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { filterCases} from '../../actions/index';
import { bindActionCreators } from 'redux';                  

class SearchCases extends Component {
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

		this.props.filterCases(this.props.cases, event.target.value)
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
	return bindActionCreators({ filterCases }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchCases);