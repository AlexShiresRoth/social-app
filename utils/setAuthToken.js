import api from './api';

const setAuthToken = (token) => {
	if (token) {
		console.log('this is a token yeaaaa', token);
		api.defaults.headers.common['x-auth-token'] = token;
		localStorage.setItem('token', token);
	} else {
		delete api.defaults.headers.common['x-auth-token'];
		localStorage.removeItem('token');
	}
};

export default setAuthToken;
