import axios from 'axios';

const SERVER_URL = `http://localhost:3090/searchJobs`
export const FETCH_JOB = 'FETCH_JOB'


export function fetchJob(job,location) {
	if(job==""){
		job="empty"
	}
	const url = `${SERVER_URL}/${job}/${location}`;
	const request = axios.get(url);
	
	return{
		type: FETCH_JOB,
		payload: request
	}
}


