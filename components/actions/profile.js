import api from '../../utils/api';
import { GET_PROFILE, PROFILE_ERROR, SEARCH_FRIENDS, UPLOAD_AVATAR } from './types';

export const getMyProfile = () => async (dispatch) => {
	try {
		const res = await api.get('/profiles/myprofile');
		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: error,
		});
	}
};

export const uploadAvatarToStorage = (url) => async (dispatch) => {
	const body = JSON.stringify({ url });

	try {
		const res = await api.post('/profiles/uploadavatar', body);
		console.log('this is a response' + res.data);
		dispatch({
			type: UPLOAD_AVATAR,
			payload: res.data,
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: PROFILE_ERROR,
			payload: error,
		});
	}
};

export const searchFriends = (text) => async (dispatch) => {
	const body = { searchTerm: text };
	try {
		const res = await api.post('/users/searchusers', body);

		dispatch({
			type: SEARCH_FRIENDS,
			payload: res.data,
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: PROFILE_ERROR,
			payload: error,
		});
	}
};
