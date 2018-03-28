import axios from 'axios';

const ROOT_URL = `https://jobs.github.com/positions.json?search=`
const LOCATION = "&location="
const SERVER_URL = `http://localhost:3090/jobs`
export const FETCH_JOB = 'FETCH_JOB'
export const SAVED_JOB = 'SAVED_JOB'


export function fetchJob(job, location) {	
	const url = `${ROOT_URL}${job}${LOCATION}${location}`;
	const request = axios.get(url);
	console.log(request)
	return{
		type: FETCH_JOB,
		payload: request
	}
}