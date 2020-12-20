import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMyProfile } from '../actions/profile';
import { connect } from 'react-redux';
import MyProfile from './MyProfile';
import ProfileCreation from './ProfileCreation';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';
import style from './Profile.module.scss';

const Profile = ({ getMyProfile, profile: { myProfile, loading } }) => {
	const [profileFormVisible, toggleProfileForm] = useState(false);

	useEffect(() => {
		getMyProfile();
	}, []);
	console.log(myProfile);
	return (
		<section className={style.profile_db}>
			<div className={style.inner}>
				{loading ? (
					<LoadingSpinner />
				) : myProfile !== null ? (
					<MyProfile />
				) : (
					<>
						<div className={style.onboarding_container}>
							<h2>Looks like you need a profile!</h2>
							<button onPointerDown={(e) => toggleProfileForm(!profileFormVisible)}>
								Click Here to Get Started
							</button>
						</div>
						{profileFormVisible ? <ProfileCreation /> : null}
					</>
				)}
			</div>
		</section>
	);
};

Profile.propTypes = {
	getMyProfile: PropTypes.func,
	profile: {
		myProfile: PropTypes.object,
		loading: PropTypes.bool.isRequired,
	},
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getMyProfile })(Profile);
