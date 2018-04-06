import axios from 'axios';

const SERVER_URL = `http://localhost:3090/searchJobs`
export const FETCH_JOB = 'FETCH_JOB'
export const FETCHING_JOB= 'FETCHING_JOB'
export const FETCH_JOB_ERROR= 'FETCH_JOB_ERROR'

export function fetchJob(job, location) {
	if(job==""){
		job="empty"
	}
	const url = `${SERVER_URL}/${job}/${location}`;
	return dispatch => {
		axios.get(url)
			.then(request => {
				console.log(request)
				if(request.data.length == 0) {
					dispatch({
						type: FETCH_JOB_ERROR,
						error: "There's no jobs within this location."
					})
				} else {
					dispatch({
						type: FETCH_JOB,
						payload: request
					})
				}
			})
		}
}