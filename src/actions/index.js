import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER,UNAUTH_USER,AUTH_ERROR,FETCH_MESSAGE,UPDATE_USER, FETCH_JOB, SAVED_JOB, FILTERED_CASES, FORGOT_PASSWORD, PASSWORD_RESET_MOUNT, PASSWORD_RESET} from './types';
import moment from 'moment'

const ROOT_URL='https://tkhjobboard.herokuapp.com';
const token = function() {
	return {authorization: localStorage.getItem('token')}
}

export function filterCases(cases, name, startdate, enddate){
	return function(dispatch){
		// change company name to student when database gets up and running
		let filteredCases = cases.filter(i => i.studentName.toLowerCase().startsWith(name.toLowerCase()) && (startdate.isSameOrBefore(i.date, 'day') && enddate.isSameOrAfter(i.date, 'day')) )
		dispatch({type:FILTERED_CASES, payload:filteredCases,typing:true})
	}
}


export function filterSkills(student, skill){
	return function(dispatch){
		if(skill.length === 0){
			dispatch({type:'FILTERED_SKILL', payload: student})
		}
		else{
			let filteredStudent = student
			console.log(filteredStudent)
			for(let i =0 ; i<skill.length; i++){
				console.log(skill[i])
				filteredStudent = filteredStudent.filter(currentStudent => currentStudent.skills.includes(skill[i]) )
			}
			console.log(filteredStudent)
			dispatch({type:'FILTERED_SKILL', payload:filteredStudent})
		}
	}
}


export function forgotPassword({email}) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/forgot`, {email})
		.then(response => {
			console.log(response)
			if (response.data != "success") {
				dispatch({type:'PASSWORD_ERR', payload: "There's no account associated with this email."});
			} else {
				dispatch({type: 'PASSWORD_SUCCESS', payload: "We've sent you an email with a link!"})
			}
			browserHistory.push('/forgot')
		})
	}
}

export function passwordResetMount(tokenId) {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/reset/${tokenId}`)
	}
}

export function passwordReset(tokenId, {password, confirmPassword}) {
	console.log(password, confirmPassword)
	return function(dispatch) {
		axios.post(`${ROOT_URL}/reset/${tokenId}`, {password, confirmPassword})
		.then(response => {
			console.log(response.data)
			if (response.data == "success") {
				browserHistory.push('/signin')
			}
		})
	}
}

export function signInUser({email,password},redirect){
	return function(dispatch){
		//submit email and password to the server
		axios.post(`${ROOT_URL}/signin`,{email, password})
		//if request good ..
		.then(response=>{
			//-update state to indicate user is authenticated
			dispatch({type:AUTH_USER, payload: response.data.type});
			//-save JWT token
			localStorage.setItem('token',response.data.token);
			localStorage.setItem('type',response.data.type);
			//localStorage is available on window scope hence no import
			
			if (redirect) {
				browserHistory.goBack()
			}
			 if(response.data.type == 'admin') {
				browserHistory.push('/tmdashboard')
			} else {
				//-redirect to the route '/'	
				browserHistory.push('/dashboard');	
			}
		})
		//if request is bad
		.catch(()=>{
			//-show an error to the user
			dispatch(authError('Bad Email or Password'));
		});		
	};
}

export function signUpUser({email,password}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signup`,{email,password})
		.then(response=>{
			dispatch({type:AUTH_USER});
			localStorage.setItem('token',response.data.token);
			browserHistory.push('/profile');	
		})
		.catch(errorobj=>{
			dispatch(authError(errorobj.response.data.error))});	
	};
}

export function signUpAdmin({email,password}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signupadmin`,{email,password})
		.then(response=>{
			dispatch({type: AUTH_USER});
			localStorage.setItem('token',response.data.token);
			browserHistory.push('/tmdashboard');	
		})
		.catch(errorobj=>{
			dispatch(authError(errorobj.response.data.error))});	
	};
}


export function saveCase(id) {
	return function(dispatch) {
		// Need to have a empty object because i am not returning anything
		axios.post(`${ROOT_URL}/addcase/${id}`,{}, {
			headers : token()
		})
		.then(response => {
			if(response.data == "success"){
				dispatch(fetchCases())
			}
		})
	}
}

export function savedJobs() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/fetchjobs`)
		.then(response => {
			console.log(response)
			dispatch({type: "SAVE_JOB",response})
		})
	}
}

export function fetchStudents () {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/fetchUsers`)
		.then(response => {
			dispatch({type: 'FETCH_STUDENT', response})
		})
	}
}

export function fetchCases () {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/fetchCase`, {
			//with a get request no need to have a object because we are not sending data to the DB.
			headers : token()
		})
		.then(response => {
			dispatch({type: 'FETCH_CASE', response})
		})
	}
}

export function fetchAllCases () {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/fetchallcases`)
		.then(response => {
			console.log(response)
			dispatch({type: 'FETCH_CASE', response})
		})
	}
}

	export function updateCase(id,openCase) {
		return function(dispatch) {
			axios.post(`${ROOT_URL}/update/${id}`,{openCase: openCase})
			.then(response => {
				console.log({openCase})
				console.log(response)
				let type = localStorage.getItem('type')
				if(response.data == "successful" && type == 'student'){
					dispatch(fetchCases())
					dispatch(fetchcaselength())
					//need to make a difference between admin and student
				} else {
					dispatch(fetchAllCases())
				}
			})
		}
	}

export function fetchcaselength () {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/fetchcaselength`, {
			headers : token()
		})
		.then(response => {
			dispatch({type: 'FETCH_CASELENGTH', response})
		})
	}
}


export function fetchOneJob (id) {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/fetchonejob/${id}`)
		.then(response => {
			console.log(response)
			dispatch({type: 'SELECT_JOB',payload: response.data})
		})
	}
}

export function fetchOneCase (id) {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/fetchonecase/${id}`)
		.then(response => {
			console.log(response)
			dispatch({type: 'SELECT_CASE',payload: response.data})
		})
	}
}

export function fetchSkills () {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/fetchskills`)
		.then(response => {
			dispatch({type: 'FETCH_SKILL',response})
		})
	}
}

export function fetchSavedSkills () {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/fetchskills`)
		.then(response => {
			dispatch({type: 'FETCH_SAVED_SKILLS',response})
		})
	}
}

export function addSkills({skill}){
	console.log({skill})
	return function(dispatch){
		axios.post(`${ROOT_URL}/addskills`,{skill})
		.then(response=>{
			dispatch({type: 'ADD_SKILL', response});	
		})
	};
}

export function addUserSkills(Skills){
	console.log(Skills)
	return function(dispatch){
		axios.post(`${ROOT_URL}/adduserskills`,{Skills}, {
			headers : token()
		})
		.then(response=>{
			dispatch(fetchProfile(''));	
		})
	};
}

export function addJob({title,company,location,type,email,jobid,description,how_to_apply, created_at,jobPrivate,date}) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/addjob`,{
			title,
			company,
			location,
			type,
			email,
			jobid,
			description,
			how_to_apply,
			created_at,
			jobPrivate,
			date
		}, {
			headers: token()
		})
		.then(response => {
			dispatch({type: "ADD_JOB",response})
		})
	}
}

export function shareJob({email, name,msg, _id}) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/sharejobs/${_id}`,{
			email,
			name,
			msg
		})
		.then(response => {
			console.log(response)
			dispatch({type: "ADD_JOB",response})
		})
	}
}

export function removeSkill(id) {
	console.log(id)
	return function(dispatch) {
		axios.delete(`${ROOT_URL}/deleteskill/${id}`)
		.then(response => {
			dispatch({type: 'RETURN_SKILL', response})
		})
	}
}

export function removeJob(id) {
	console.log(id)
	return function(dispatch) {
		axios.delete(`${ROOT_URL}/deletejob/${id}`)
		.then(response => {
			dispatch({type: 'SAVE_JOB', response})
		})
	}
}

export function removeUser(id) {
	return function(dispatch) {
		axios.delete(`${ROOT_URL}/deleteuser/${id}`)
		.then(response => {
			dispatch(fetchStudents())
		})
	}
}

export function removeCase(id) {
	console.log(id)
	return function(dispatch) {
		axios.delete(`${ROOT_URL}/deletecase/${id}`,{
			headers : token()
		})
		.then(response => {
			dispatch({type: 'SAVE_CASE', response})
		})
	}
}

export function fetchProfile(id) {
	console.log(id)
	return function(dispatch) {
		axios.get(`${ROOT_URL}/fetchprofile/${id}?`, {
			headers : token()
		})
		.then(response => {
			console.log(response)
			dispatch({type: 'FETCH_PROFILE', response})
		})
	}
}

export function profile({firstName,lastName,about, portfolio,github,linkedin,resume,careergoals}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/profile`,{firstName,lastName,about, portfolio,github,linkedin,resume,careergoals}, {
			headers : token()
		})
		.then(response=>{
			dispatch(fetchProfile(''))
		})	
	};
}

export function addScore(id,score){
	console.log(score)
	return function(dispatch){
		axios.post(`${ROOT_URL}/studentscore/${id}`,{score})
		.then(response=>{
			dispatch(fetchStudents())
		})	
	};
}

export function inviteUser({email,name, admin}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/invite`,{email,name, admin})
		.then(response=>{
			dispatch({type:AUTH_USER});
			browserHistory.push('/');	
		})
		.catch(errorobj=>{
			dispatch(authError(errorobj.response.data.error))});	
	};
}

export function signOutUser(){
	localStorage.removeItem('token');
	return{
		type: UNAUTH_USER
	};	
}

export function authError(error){
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function fetchMessage(dispatch){
	return function(dispatch){
		axios.get(ROOT_URL,{
			headers : token()
		})
		.then(response=>{
			dispatch({
				type: FETCH_MESSAGE,
				payload: response.data.message
			});
		});
	};
}