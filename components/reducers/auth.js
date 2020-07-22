import { AUTHENTICATE_USER } from '../actions/types';

const initialState = {
	loading: true,
	isAuthenticated: false,
	user: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case AUTHENTICATE_USER:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				loading: false,
				isAuthenticated: true,
			};
		default:
			return state;
	}
};
