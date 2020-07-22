import { HYDRATE } from 'next-redux-wrapper';
export default (state = { tick: 'init' }, action) => {
	switch (action.type) {
		case HYDRATE:
			// Attention! This will overwrite client state! Real apps should use proper reconciliation.
			return { ...state, ...action.payload };
		case 'TICK':
			return { ...state, tick: action.payload };
		default:
			return state;
	}
};
