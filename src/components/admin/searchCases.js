import React, { Component } from 'react';
import { Button, Form, FormControl, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { filterCases } from '../../actions/index';
import { bindActionCreators } from 'redux';                  

class SearchCases extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: '',
			date: ''
		};

		this.searchInputChange = this.searchInputChange.bind(this);
	}
	searchInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		},function(){
			this.props.filterCases(this.props.cases, this.state.term, this.state.date)
		});
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
				<Form onSubmit={this.onFormSubmit}>
					<Col sm={12}>
						<input
							placeholder='Search by Date'
							className='form-control'
							name="date"
							value={this.state.date}
							onChange={this.searchInputChange}
						/>
					</Col>
					<p>Example 5-21-2018</p>
				</Form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ filterCases }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchCases);