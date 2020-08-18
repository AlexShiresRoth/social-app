import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {
	alerts: [],
	loading: true,
};

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_ALERT:
			return {
				...state,
				alerts: [...state.alerts, payload],
				loading: false,
			};
		case REMOVE_ALERT:
			return {
				...state,
				alerts: state.alerts.filter((alert) => alert.id !== payload),
				loading: false,
			};
		default:
			return state;
	}
};
