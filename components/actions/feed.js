import api from '../../utils/api';
import { GET_FEED, FEED_ERROR, REMOVE_POST } from './types';
import { setAlert } from './alert';
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

export const removePost = (id) => async (dispatch) => {
	try {
		const res = await api.delete(`/post/remove/${id}`);
		dispatch({
			type: REMOVE_POST,
			payload: id,
		});
		dispatch(setAlert(res.data.msg, 'success'));
	} catch (error) {
		dispatch({
			type: FEED_ERROR,
			payload: error.response.data.msg,
		});
		dispatch(setAlert(error.response.data.msg, 'danger'));
	}
};
