import { AUTHENTICATE_USER, LOAD_USER, LOGOUT, SIGNUP } from '../actions/types';

const initialState = {
	loading: true,
	isAuthenticated: false,
	user: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case AUTHENTICATE_USER:
			localStorage.setItem('token', payload);
			return {
				...state,
				loading: false,
				isAuthenticated: true,
			};
		case SIGNUP:
			localStorage.setItem('token', payload);
			return {
				...state,
				loading: false,
				isAuthenticated: true,
			};
		case LOAD_USER:
			return {
				...state,
				user: payload,
				isAuthenticated: true,
				loading: false,
			};
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				user: null,
				isAuthenticated: false,
				loading: false,
			};
		default:
			return state;
	}
};
