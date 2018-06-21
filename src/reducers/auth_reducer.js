import {AUTH_USER,UNAUTH_USER,AUTH_ERROR,FETCH_MESSAGE,UPDATE_USER} from '../actions/types';

export default function authReducer (state=[],action){
	switch(action.type){
		case AUTH_USER:
			return {
				...state,
				error:'',
				authenticated:true,
				active: true,
				type: action.payload
			};
		case UNAUTH_USER:
			return {
				...state,
				authenticated:false
			};	
		case AUTH_ERROR:
			return {
				...state, 
				error: action.payload
			};
		case FETCH_MESSAGE:
			return {
				...state,
				message:action.payload
			};
		case UPDATE_USER:
			return [ 
			action.payload.data, 
			...state  
			];	

		case 'PASSWORD_SUCCESS':
			return {
				...state,
				message: action.payload,
				fetchingEmail: false
			}
		case 'PASSWORD_ERR':
			return {
				...state,
				message: action.payload,
				fetchingEmail: false
			}
		case 'FETCHING_EMAIL':
			return {
				...state,
				message: "",
				fetchingEmail: true
			}
	}
	return state;
} 