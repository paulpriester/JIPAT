import axios from 'axios';

const ROOT_URL = `https://jobs.github.com/positions.json?search=`
export const FETCH_JOB = 'FETCH_JOB'

export function fetchJob(job) {
	const url = `${ROOT_URL}${job}`;
	const request = axios.get(url);

	return{
		type: FETCH_JOB,
		payload: request
	}
}
