import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Table} from 'reactstrap';
import {Link} from 'react-router';
import {fetchStudents} from '../../actions';
import SearchStudents from './searchStudents';


 class Students extends Component {
	componentDidMount() {
		this.props.dispatch(fetchStudents())
	}

	renderStudent(studentData,dispatch) {
	 	var selectStudent = function(student) {
			dispatch({
				type: 'SELECT_STUDENT',
				payload: student
			})
		}

		return (
			<tr key={studentData.email}>
			  	<td><Link onClick={() => selectStudent(studentData)} to="/profile">{studentData.firstName} {studentData.lastName}</Link></td>	
			  	<td>{studentData.email}</td>
	      	</tr>
		)
	}

	render () {
		return (
			!this.props.isTyping ?
			<div className="container">
				<SearchStudents students={this.props.allStudents}/>
				<Table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{this.props.allStudents.length != 0 && this.props.allStudents.map(i=>this.renderStudent(i,this.props.dispatch))}
						</tbody>
				</Table>
			</div>
			:
			<div className="container">
				<SearchStudents students={this.props.allStudents}/>
				<Table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{}
						</tbody>
				</Table>
			</div>
		)
	}
}

function mapStateToProps({student} ) {
	console.log(student)
	return student ;
}

export default connect (mapStateToProps)(Students);