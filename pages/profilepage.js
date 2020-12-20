import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout/Layout';
import Profile from '../components/profile/Profile';

const ProfilePage = (props) => {
	return (
		<Layout>
			<Profile />
		</Layout>
	);
};

ProfilePage.propTypes = {};

export default ProfilePage;
