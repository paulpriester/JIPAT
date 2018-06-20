import React, {Component} from 'react';
import { connect } from 'react-redux';
import {table} from 'react-bootstrap';
import {Link} from 'react-router';
import {fetchStudents, removeUser, addScore, activateUser} from '../../actions';
import { Input,InputGroupAddon,InputGroup,Button } from 'reactstrap';
import InviteModal from './invite_modal';


 class Students extends Component {
 	constructor (props) {
 		super(props);
 		this.state = {
 			type: true
 		}
 		this.handleChange = this.handleChange.bind(this)
 		this.addScore = this.addScore.bind(this)
 	}

	componentDidMount() {
		this.props.dispatch(fetchStudents())
	}

	changeType(id) {
    this.setState({
    	["score" + id]: this.state["score" + id] ? false : true})
  }

  	trueUser (type) {
  		this.setState({
  			type: true
  		})
  	}
  	changeUser (type){
  		this.setState({
  			type: false
  		})
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

	approveUser(id, type) {
		console.log(id)
		this.props.dispatch(activateUser(id, type))
	}

	addScore(id) {
		this.props.dispatch(addScore(id, this.state[id]))
		this.changeType(id)
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
			  	{
			  		!this.state["score" + studentData._id] ? <button onClick= {() => this.changeType(studentData._id)}>Score</button>: 
			  		<form onSubmit = {()=> this.addScore(studentData._id)}>
						<InputGroup>
						  	 <Input onChange = {(e) => this.handleChange(e, studentData._id)} placeholder='Score'/>
			         		 <InputGroupAddon addonType="append"><Button color="secondary" onClick={()=> this.addScore(studentData._id)}>Submit</Button></InputGroupAddon>
			         	</InputGroup>
			          </form>    
			      }
			  	</td>
			  	<td>{studentData.active?<button onClick={()=> this.approveUser(studentData._id, false)}>Deactivate</button>:
			  	<button onClick={()=> this.approveUser(studentData._id, true)}>Approve</button>}</td>
			  	<td><button onClick={()=> this.removeUser(studentData._id)}>Remove</button></td>
	      	</tr>
		)
	}

	render () {
		return (
			<div>
			<InviteModal />
			<Button onClick= {() => this.trueUser()}>Approved Users</Button>
			<Button onClick= {() => this.changeUser()}>Pending Users</Button>


			<table className ='table table-hover'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>W.R. Score</th>
							<th></th>
							<th>Approve/Deactivate</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.props.allStudents.length != 0 && this.props.allStudents.filter(i => i.admin == false && i.active == this.state.type).map(i=>this.renderStudent(i,this.props.dispatch))}
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