import { LOAD_USER, AUTHENTICATE_USER, AUTH_ERROR, LOGOUT } from './types';
import api from '../../utils/api';
import { setAlert } from './alert';
import setAuthToken from '../../utils/setAuthToken';
import Router from 'next/router';

export const loadUser = () => async (dispatch) => {
	const token = localStorage.getItem('token');
	try {
		const res = await api.get('/users');
		setAuthToken(token);
		dispatch({
			type: LOAD_USER,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const signIn = (formData) => async (dispatch) => {
	try {
		const res = await api.post('/auth', formData);
		console.log(history);
		dispatch({
			type: AUTHENTICATE_USER,
			payload: res.data,
		});
		Router.push('/Dashboard');
		dispatch(setAlert('Welcome back to Syndicate', 'success'));
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			dispatch({
				type: AUTH_ERROR,
				payload: errors.forEach((err) => err.msg),
			});
			dispatch(errors.forEach((err) => setAlert(err.msg, 'danger')));
		}
		dispatch({
			type: AUTH_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};

export const logout = () => async (dispatch) => {
	try {
		dispatch({
			type: LOGOUT,
		});
		dispatch(setAlert('You have been logged out.', 'success'));
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};
