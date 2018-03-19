import { FETCH_JOB } from '../components/utils/api'

export default function JobReducer (state = {selectedJob: '', allJobs:[]}, action) {
	switch (action.type) {
	case FETCH_JOB:
		return {
			...state,
			allJobs: action.payload.data.concat(state.allJobs)
		}
	case 'SELECT_JOB':
		return {
			...state,
			selectedJob: action.payload
		}
	case 'SAVE_JOB':
		return {
			...state,
			// allJobs: action.payload.data.concat(state.allJobs)
			allJobs: action.response.data
		}
	}
	
	return state;
}