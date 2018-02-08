import axios from 'axios';

// module.exports = {
// 	fetchJobs: function (job) {
// 		const encodedURI = window.encodeURI('https://jobs.github.com/positions.json?search=' + job);


// 		return axios.get(encodedURI)
// 		.then(function (response) {
// 			return response.data;
// 		});
// 	}
// }

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
