const {
	GET_PROFILE,
	PROFILE_ERROR,
	UPLOAD_AVATAR,
	LOAD_PEOPLE,
	CREATE_PROFILE_ERROR,
	CREATE_PROFILE,
	SEND_FRIEND_REQUEST,
} = require('../actions/types');

const initialState = {
	myProfile: null,
	profileErrors: null,
	loading: true,
	loadingProfile: true,
	people: null,
	loadingPeople: true,
	createProfileError: null,
	newProfileData: null,
	friendRequestErrors: null,
	userData: null,
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
		case CREATE_PROFILE:
			return {
				...state,
				myProfile: payload,
				loadingProfile: false,
				loading: false,
			};
		case SEND_FRIEND_REQUEST:
			return {
				...state,
				people: payload,
				friendRequestErrors: null,
				loading: false,
			};
		case LOAD_PEOPLE:
			return {
				...state,
				people: payload,
				loadingPeople: false,
			};
		case PROFILE_ERROR:
			return {
				...state,
				profileErrors: payload,
				loading: false,
				loadingProfile: false,
			};
		case CREATE_PROFILE_ERROR:
			return {
				...state,
				createProfileError: payload,
				loading: false,
				loadingProfile: false,
			};

		default:
			return state;
	}
};
