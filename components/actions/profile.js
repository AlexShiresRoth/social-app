import api from '../../utils/api';
import {
	GET_PROFILE,
	PROFILE_ERROR,
	LOAD_PEOPLE,
	UPLOAD_AVATAR,
	CREATE_PROFILE,
	CREATE_PROFILE_ERROR,
	SEND_FRIEND_REQUEST,
	FRIEND_REQUEST_ERROR,
} from './types';

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

export const createProfile = (profile) => async (dispatch) => {
	const body = JSON.stringify({ ...profile });
	try {
		console.log(body);
		const res = await api.post('/profiles/createprofile', body);

		dispatch({
			type: CREATE_PROFILE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CREATE_PROFILE_ERROR,
			payload: error,
		});
	}
};

export const loadPeople = () => async (dispatch) => {
	try {
		const res = await api.get('/users/getpeople');

		dispatch({
			type: LOAD_PEOPLE,
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

export const sendFriendRequest = (requestId) => async (dispatch) => {
	const body = JSON.stringify({ requestId });
	try {
		const res = await api.post('/profiles/sendrequest', body);

		dispatch({
			type: SEND_FRIEND_REQUEST,
			payload: res.data,
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: FRIEND_REQUEST_ERROR,
			payload: error,
		});
	}
};
