import { GET_FEED, FEED_ERROR, REMOVE_POST, CREATE_POST } from '../actions/types';

const initialState = {
	newsFeed: [],
	loading: true,
	errors: null,
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_FEED:
			return {
				...state,
				newsFeed: payload,
				loading: false,
			};
		case CREATE_POST:
			return {
				...state,
				newsFeed: [payload, ...state.newsFeed],
				loading: false,
			};
		case REMOVE_POST:
			return {
				...state,
				newsFeed: state.newsFeed.filter((post) => post._id !== payload),
				loading: false,
			};
		case FEED_ERROR:
			return {
				...state,
				errors: payload,
				loading: false,
			};
		default:
			return state;
	}
};
