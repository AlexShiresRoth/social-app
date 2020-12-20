import api from '../../utils/api';
import { GET_PROFILE, PROFILE_ERROR } from './types';

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
