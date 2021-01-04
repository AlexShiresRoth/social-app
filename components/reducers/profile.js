const { GET_PROFILE, PROFILE_ERROR, UPLOAD_AVATAR, SEARCH_FRIENDS } = require('../actions/types');

const initialState = {
	myProfile: null,
	profileErrors: null,
	loading: true,
	loadProfile: true,
	matchingFriends: null,
	loadFriends: true,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
			return {
				...state,
				myProfile: payload,
				loadProfile: false,
			};
		case UPLOAD_AVATAR:
			return {
				...state,
				myProfile: payload,
				loading: false,
			};
		case SEARCH_FRIENDS:
			return {
				...state,
				matchingFriends: payload,
				loadingFriends: false,
			};
		case PROFILE_ERROR:
			console.log('PROFILE ERROR');
			return {
				...state,
				profileErrors: payload,
				loading: false,
				loadProfile: false,
			};

		default:
			return state;
	}
};
