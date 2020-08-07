import api from '../../utils/api';
import { GET_FEED, FEED_ERROR, REMOVE_POST, CREATE_POST } from './types';
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

export const createPost = (postData) => async (dispatch) => {
	try {
		const res = await api.post('/post', postData);

		dispatch({
			type: CREATE_POST,
			payload: res.data,
		});

		dispatch(setAlert('Post created', 'success'));
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			dispatch({
				type: FEED_ERROR,
				payload: errors,
			});
			errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
		}
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
