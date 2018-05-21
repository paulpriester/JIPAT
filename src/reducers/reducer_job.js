import { FETCH_JOB, FETCH_JOB_ERROR, FETCHING_JOB } from '../components/utils/api'

const initialState = {
	selectedJob: '', 
	allJobs:[], 
	error: false,
	fetching: true
}

export default function JobReducer (state = initialState, action) {
	switch (action.type) {
	case FETCH_JOB:
		console.log("ran")
		return {
			...state,
			fetching: false,
			error: false,
			allJobs: action.payload.data.concat(state.allJobs)
		}
	case FETCH_JOB_ERROR:
		console.log("error")
		return {
			...state,
			fetching: false,
			error: action.error
		}
	case 'SELECT_JOB':
		return {
			...state,
			selectedJob: action.payload,
			cases: action.payload.data
		}
	case 'SAVE_JOB':
		return {
			...state,
			allJobs: action.response.data
		}
	case 'ADD_JOB':
		return {
			...state,
			allJobs: [action.response.data, ...state.allJobs]
		}
	}	
	return state;
}