import api from '../../utils/api';
import { GET_FEED, FEED_ERROR } from './types';

export const getNewsFeed = () => async (dispatch) => {
	try {
		const res = await api.get('/post');
		dispatch({
			type: GET_FEED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: FEED_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};
