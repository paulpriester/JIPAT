import axios from 'axios';


const ROOT_URL = `https://jobs.github.com/positions.json?search=`
const LOCATION = "&location="
const SERVER_URL = `http://localhost:3090/jobs`
export const FETCH_JOB = 'FETCH_JOB'
export const FETCHING_JOB= 'FETCHING_JOB'
export const FETCH_JOB_ERROR= 'FETCH_JOB_ERROR'
export const SAVED_JOB = 'SAVED_JOB'


export function fetchJob(job, location) {	
	const url = `${ROOT_URL}${job}${LOCATION}${location}`;
	return dispatch => {
		axios.get(url)
			.then(request => {
					console.log(request)
					if(request.data.length == 0){
						dispatch({
							type: FETCH_JOB_ERROR,
							error: "No Jobs"
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