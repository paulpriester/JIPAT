import React, {Component} from 'react';
import { connect } from 'react-redux';
import {table} from 'react-bootstrap';
import {Link} from 'react-router';
import {fetchStudents, removeUser, addScore} from '../../actions';
import { Input,InputGroupAddon,Button } from 'reactstrap';
import InviteModal from './invite_modal';


 class Students extends Component {
 	constructor (props) {
 		super(props);
 		this.state = {

 		}
 		this.handleChange = this.handleChange.bind(this)
 		this.addScore = this.addScore.bind(this)
 	}
	componentDidMount() {
		this.props.dispatch(fetchStudents())
	}

	handleChange (e, id) {
		this.setState ({
			[id]: e.target.value
		})
	}

	removeUser(id) {
		var prompt = confirm('Are You sure want to delete?');
		if(prompt == true) {
			this.props.dispatch(removeUser(id))
		}
	}

	addScore(id) {
		this.props.dispatch(addScore(id, this.state[id]))
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
			  	<td>{studentData.score}</td>
			  	<td>
			  	<form onSubmit = {()=> this.addScore(studentData._id)}>
			  	 <Input onChange = {(e) => this.handleChange(e, studentData._id)} placeholder='Score'/>
          		</form>
			  	</td>
			  	<td><button onClick={()=> this.removeUser(studentData._id)}>Remove</button></td>
	      	</tr>
		)
	}

	render () {
		console.log(this.state)
		return (
			<div>
			<InviteModal />
			<table className ='table table-hover'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Score</th>
							<th></th>
							<th></th>
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