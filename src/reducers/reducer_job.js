import { FETCH_JOB} from '../components/utils/api'

export default function (state = {selectedJob: '', allJobs:[]}, action) {
	console.log(action);
	switch (action.type) {
	case FETCH_JOB:
		// return state.concat([ action.payload.data ]);
		// better method of writing the above line
		return {
			...state,
			allJobs: action.payload.data
		}
	case 'SELECT_JOB':	
		return {
			...state,
			selectedJob: action.payload
		}
	}
	
	return state;
}