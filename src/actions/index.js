 import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER,UNAUTH_USER,AUTH_ERROR,FETCH_MESSAGE,UPDATE_USER, FETCH_JOB, SAVED_JOB } from './types';

const ROOT_URL='http://localhost:3090';

export function signInUser({email,password}){
	return function(dispatch){

		//submit email and password to the server
		axios.post(`${ROOT_URL}/signin`,{email,password})
		//if request good ..
		.then(response=>{
			//-update state to indicate user is authenticated
			dispatch({type:AUTH_USER});
			//-save JWT token
			localStorage.setItem('token',response.data.token);
			//localStorage is available on window scope hence no import
			
			//-redirect to the route '/feature'	
			browserHistory.push('/feature');	
		})
		//if request is bad
		.catch(()=>{
			//-show an error to the user
			dispatch(authError('Bad Email or Password'));
		});		
	};
}


export function saveCase(id) {
	return function(dispatch) {
		// Need to have a empty object because i am not returning anything
		axios.post(`${ROOT_URL}/addcase/${id}`,{}, {
			headers : {authorization: localStorage.getItem('token')}
		})
		.then(response => {
			dispatch({type: 'SAVE_CASE', response})
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
		axios.get(`${ROOT_URL}/fetchCase`)
		.then(response => {
			dispatch({type: 'FETCH_CASE', response})
		})
	}
}

export function addJob({title,company,location,type,jobid,description,how_to_apply, created_at}) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/addjob`,{
			title,
			company,
			location,
			type,
			jobid,
			description,
			how_to_apply,
			created_at
		})
		.then(response => {
			console.log(response)
			dispatch({type: "ADD_JOB",response})
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

export function profile({firstName,lastName,about, portfolio,github,linkedin,resume}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/profile`,{firstName,lastName,about, portfolio,github,linkedin}, {
			headers : {authorization: localStorage.getItem('token')}
		})
		.then(response=>{
			dispatch({type:AUTH_USER});
			browserHistory.push('/feature');
		})
		.catch(errorobj=>{
			dispatch(authError(errorobj.response.data.error))});	
	};
	
}

export function signUpAdmin({email,password}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signup`,{email,password})
		.then(response=>{
			dispatch({type:AUTH_USER});
			localStorage.setItem('token',response.data.token);
			browserHistory.push('/tmdashboard');	
		})
		.catch(errorobj=>{
			dispatch(authError(errorobj.response.data.error))});	
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

export function findJob({title}) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/savedjobs`, {title})
		.then(response => {
			dispatch({type: FETCH_JOB});
		})
	}
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
			headers : {authorization: localStorage.getItem('token')}
		})
		.then(response=>{
			dispatch({
				type: FETCH_MESSAGE,
				payload: response.data.message
			});
		});
	};
}