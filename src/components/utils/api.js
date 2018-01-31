import axios from 'axios';

module.exports = {
	fetchJobs: function (job) {
		const encodedURI = window.encodeURI('https://jobs.github.com/positions.json?search=' + job);


		return axios.get(encodedURI)
		.then(function (response) {
			return response.data;
		});
	}
}

