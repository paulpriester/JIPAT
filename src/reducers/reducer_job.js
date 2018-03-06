import { FETCH_JOB } from '../components/utils/api'

export default function (state = {selectedJob: '', allJobs:[]}, action) {
	console.log(action);
	switch (action.type) {
	case FETCH_JOB:
		// return state.concat([ action.payload.data ]);
		// better method of writing the above line
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
			allJobs: action.response.data.concat(state.allJobs)
		}
	}
	
	return state;
}