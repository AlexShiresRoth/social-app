import { GET_FEED, FEED_ERROR } from '../actions/types';

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
		case FEED_ERROR:
			return {
				...state,
				newsFeed: [],
				errors: payload,
				loading: false,
			};
		default:
			return state;
	}
};
