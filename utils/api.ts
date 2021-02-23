import axios from 'axios';

//dev env
const url = 'http://localhost:5000/api';
//production
const api = axios.create({
	baseURL: url,
	headers: {
		'Content-Type': 'application/json',
	},
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/

api.interceptors.response.use(
	(res) => res,
	(err) => {
		console.error(err.response);
		return Promise.reject(err);
	}
);

export default api;
