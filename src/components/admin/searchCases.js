import React, { Component } from 'react';
import { Button, Form, FormControl} from 'react-bootstrap';
import {  FormGroup, Col} from 'reactstrap';
import { connect } from 'react-redux';
import { filterCases } from '../../actions/index';
import { bindActionCreators } from 'redux';   
import DatePicker from 'react-datepicker';
import moment from 'moment';
moment.locale('en')
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


class SearchCases extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: '',
			startDate: moment(),
			endDate: moment()
		};

		this.searchInputChange = this.searchInputChange.bind(this);
		this.handleChangeStart = this.handleChangeStart.bind(this);
		this.handleChangeEnd = this.handleChangeEnd.bind(this);
	}
	searchInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		},function(){
			this.props.filterCases(this.props.cases, this.state.term, this.state.startDate,this.state.endDate)
		});
	}

	 handleChangeStart(date) {
    this.setState({
      startDate: date
    },function(){
			this.props.filterCases(this.props.cases, this.state.term, this.state.startDate,this.state.endDate)
		});
  }
  	handleChangeEnd(date) {
  		this.setState({
  			endDate: date
  		},function(){
			this.props.filterCases(this.props.cases,this.state.term, this.state.startDate,this.state.endDate)
		})
  	}

	render () {
		console.log(this.state)
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
				<h2>Filter Cases by Date</h2>
				<FormGroup row>
				<Col sm={2}>
				<p>Start Date: </p>
				<DatePicker
				    selected={this.state.startDate}
				    selectsStart
				    startDate={this.state.startDate}
				    endDate={this.state.endDate}
				    onChange={this.handleChangeStart}
				/>
				</Col>
				<Col sm={2}>
				<p>End Date: </p>
				<DatePicker
				    selected={this.state.endDate}
				    selectsEnd
				    startDate={this.state.startDate}
				    endDate={this.state.endDate}
				    onChange={this.handleChangeEnd}
				/>
				</Col>
				</FormGroup>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ filterCases }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchCases);