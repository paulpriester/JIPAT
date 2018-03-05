import axios from 'axios';

const ROOT_URL = `https://jobs.github.com/positions.json?search=`
const SERVER_URL = `http://localhost:3090/jobs`
export const FETCH_JOB = 'FETCH_JOB'
export const SAVED_JOB = 'SAVED_JOB'


export function fetchJob(job) {
	const url = `${ROOT_URL}${job}`;
	const request = axios.get(url);
	
	return{
		type: FETCH_JOB,
		payload: request
	}
}

export function savedJob() {
	const url = `${SERVER_URL}`;
	const request = axios.get(url);

	return{
		type: SAVED_JOB,
		payload: request
	}
}

