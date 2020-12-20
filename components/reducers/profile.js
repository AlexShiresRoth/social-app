const { GET_PROFILE, PROFILE_ERROR } = require('../actions/types');

const initialState = {
	myProfile: null,
	profileErrors: null,
	loading: true,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
			return {
				...state,
				myProfile: payload,
				loading: false,
			};
		case PROFILE_ERROR:
			console.log('PROFILE ERROR');
			return {
				...state,
				profileErrors: payload,
				loading: false,
			};
		default:
			return state;
	}
};
