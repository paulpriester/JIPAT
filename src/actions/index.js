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

export function savedJobs() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/fetchjobs`)
		.then(response => {
			dispatch({type: "SAVE_JOB",response})
		})
	}
}

export function fetchStudents () {
	return function(dispatch) {
		axios.get(`${ROOT_URL}//fetchUsers`)
		.then(response => {
			dispatch({type: 'FETCH_STUDENT', response})
		})
	}
}

export function addJob() {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/jobs`)
		.then(response => {
			console.log('success')
			dispatch({type: "SAVED_JOB",response})
		})
	}
}

export function removeJob({id}) {
	return function(dispatch) {
		axios.delete(`${ROOT_URL}/deletejob/${id}`)
		.then(response => {
			dispatch({type: 'SAVE_JOB', response})
		})
	}
}

export function signUpUser({email,password,firstName,lastName,about}){
	return function(dispatch){

		//submit email and password to the server
		axios.post(`${ROOT_URL}/signup`,{email,password})
		//if request succeed ..
		.then(response=>{
			//-update state to indicate user is authenticated and created
			dispatch({type:AUTH_USER});
			//-save JWT token
			localStorage.setItem('token',response.data.token);
			//localStorage is available on window scope hence no import
			
			//-redirect to the route '/feature'	
			browserHistory.push('/profile');	
		})
		//if request is bad
		//-show an error to the user
		.catch(errorobj=>{
			// console.log(response);
			dispatch(authError(errorobj.response.data.error))});	
	};
}

export function profile({firstName,lastName,about}){
	return function(dispatch){

		//submit email and name to the server
		axios.post(`${ROOT_URL}/profile`,{firstName,lastName,about})
		//if request succeed ..
		.then(response=>{
			dispatch({type:AUTH_USER});
			//-save JWT token
			localStorage.setItem('token',response.data.token);
				
			browserHistory.push('/');	
		})
		//if request is bad
		//-show an error to the user
		.catch(errorobj=>{
			// console.log(response);
			dispatch(authError(errorobj.response.data.error))});	
	};
	
}

export function signUpAdmin({email,password}){
	return function(dispatch){

		//submit email and password to the server
		axios.post(`${ROOT_URL}/signup`,{email,password})
		//if request succeed ..
		.then(response=>{
			//-update state to indicate user is authenticated and created
			dispatch({type:AUTH_USER});
			//-save JWT token
			localStorage.setItem('token',response.data.token);
			//localStorage is available on window scope hence no import
			
			//-redirect to the route '/feature'	
			browserHistory.push('/tmdashboard');	
		})
		//if request is bad
		//-show an error to the user
		.catch(errorobj=>{
			// console.log(response);
			dispatch(authError(errorobj.response.data.error))});	
	};
}

export function inviteUser({email,name, admin}){
	return function(dispatch){

		//submit email and name to the server
		axios.post(`${ROOT_URL}/invite`,{email,name, admin})
		//if request succeed ..
		.then(response=>{
			dispatch({type:AUTH_USER});
			//-redirect to the route '/feature'	
			browserHistory.push('/');	
		})
		//if request is bad
		//-show an error to the user
		.catch(errorobj=>{
			// console.log(response);
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