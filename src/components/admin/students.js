import React, {Component} from 'react';
import { connect } from 'react-redux';
import {table} from 'react-bootstrap';
import {Link} from 'react-router';
import {fetchStudents, removeUser} from '../../actions';
import InviteModal from './invite_modal';


 class Students extends Component {
	componentDidMount() {
		this.props.dispatch(fetchStudents())
	}

	removeUser(id) {
		var prompt = confirm('Are You sure want to delete?');
		if(prompt == true) {
			this.props.dispatch(removeUser(id))
		}
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
			  	<td><Link onClick={() => selectStudent(studentData)} to={{pathname: '/profile' , search: `?id=${studentData._id}`}}>{studentData.firstName} {studentData.lastName}</Link></td>	
			  	<td>{studentData.email}</td>
			  	<td><button onClick={()=> this.removeUser(studentData._id)}>X</button></td>
	      	</tr>
		)
	}

	render () {
		return (
			<div>
			<InviteModal />
			<table className ='table table-hover'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Remove</th>
						</tr>
					</thead>
					<tbody>
						{this.props.allStudents.length != 0 && this.props.allStudents.filter(i => i.admin == false).map(i=>this.renderStudent(i,this.props.dispatch))}
					</tbody>
			</table>
			</div>
		)
	}
}

function mapStateToProps({student} ) {
	console.log(student)
	return student ;
}

export default connect (mapStateToProps)(Students);