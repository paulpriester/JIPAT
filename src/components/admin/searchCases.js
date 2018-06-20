import React, { Component } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Form, FormControl, FormGroup, Label, Row, Col} from 'reactstrap';
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
				<h1>Filter Cases</h1>
				<br/>
				<Row>
					<Col sm="6"><h5>Filter by Date</h5></Col>
					<Col sm="6"><h5>Filter by Status</h5></Col>
				</Row>
				<Row>
					<Col sm="3">
						<Form inline>
						<Label >Start Date: </Label>
						<DatePicker
						    selected={this.state.startDate}
						    selectsStart
						    startDate={this.state.startDate}
						    endDate={this.state.endDate}
						    onChange={this.handleChangeStart}
						/>
						</Form>
					</Col>
					<Col sm="3">
						<Form inline>
						<Label>End Date: </Label>
						<DatePicker
						    selected={this.state.endDate}
						    selectsEnd
						    startDate={this.state.startDate}
						    endDate={this.state.endDate}
						    onChange={this.handleChangeEnd}
						/>
					</Form>
					</Col>
					<Col sm="6">
				        <ButtonToolbar className='tabs' justified bsSize="large">
					        <Button outline size="sm" onClick= {() => this.props.changeType('Open')}>Open</Button>
					        <Button outline size="sm" onClick= {() => this.props.changeType('Close')}>Close</Button>
					        <Button outline size="sm" onClick= {() => this.props.changeType('Place')}>Place</Button>
					        <Button outline size="sm" onClick= {() => this.props.changeType('Interview')}>Interview</Button>
					        <Button outline size="sm" onClick= {() => this.props.changeType('Salary Negotation')}>Salary Negotation</Button>
				        </ButtonToolbar>
					</Col>
				</Row>
				<br/>
				<Row onSubmit={this.onFormSubmit}>
					<Col sm="12">
					<h5>Filter by Student Name</h5>
						<input
							placeholder='Search for a student'
							className='form-control'
							name="term"
							value={this.state.term}
							onChange={this.searchInputChange}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ filterCases }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchCases);