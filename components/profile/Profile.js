import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMyProfile } from '../actions/profile';
import { connect } from 'react-redux';
import MyProfile from './MyProfile';
import ProfileCreation from './ProfileCreation';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';
import style from './Profile.module.scss';
import ProfileSvg from './svgs/ProfileSvg';

const Profile = ({ getMyProfile, profile: { myProfile, loading, loadProfile } }) => {
	const [profileFormVisible, toggleProfileForm] = useState(false);

	useEffect(() => {
		getMyProfile();
	}, []);
	console.log(myProfile);
	return (
		<section className={style.profile_db}>
			<div className={style.inner}>
				{loading || (loadProfile && myProfile === null) ? (
					<LoadingSpinner />
				) : myProfile !== null ? (
					<MyProfile />
				) : (
					<>
						<div className={style.onboarding_container}>
							<div className={style.svg_component}>
								<ProfileSvg />
							</div>
							<div className={style.start}>
								<h2>Looks like you need a profile!</h2>
								<button onPointerDown={(e) => toggleProfileForm(!profileFormVisible)}>
									Click Here to Get Started
								</button>
							</div>
						</div>
						{profileFormVisible ? (
							<ProfileCreation
								profileFormVisible={profileFormVisible}
								toggleProfileForm={toggleProfileForm}
							/>
						) : null}
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
