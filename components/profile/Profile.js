import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getMyProfile, loadPeople } from '../actions/profile';
import { connect } from 'react-redux';
import MyProfile from './MyProfile';
import ProfileCreation from './ProfileCreation';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';
import style from './Profile.module.scss';
import ProfileSvg from './svgs/ProfileSvg';

const Profile = ({ getMyProfile, loadPeople, profile: { myProfile, loading, loadingProfile } }) => {
	const [profileFormVisible, toggleProfileForm] = useState(false);
	const [profileData, setProfileData] = useState({
		url: '',
		requests: [],
		interests: [],
	});
	const [processing, setProcessing] = useState(false);

	useEffect(() => {
		getMyProfile();
		loadPeople();
	}, []);

	const { url, requests, interests } = profileData;

	const handleProfileData = ({ file = null, requests = [], interests = [] }) => {
		console.log(file);
		setProcessing(true);
		setProfileData((prevData) => ({
			...prevData,
			url: file ? file : prevData.url,
			requests: requests.length > 0 ? requests : prevData.requests,
			interests: interests.length > 0 ? interests : prevData.interests,
		}));
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('url', url);
			window.localStorage.setItem('requests', requests);
			window.localStorage.setItem('interests', interests);
		}
	}, [url, requests, interests]);

	useEffect(() => {
		if (processing) {
			setTimeout(() => {
				setProcessing(false);
			}, 3000);
		}
	}, [processing]);

	console.log(loadingProfile, myProfile);
	return (
		<section className={style.profile_db}>
			<div className={style.inner}>
				{loading || (loadingProfile && myProfile === null) ? (
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
								handleProfileData={handleProfileData}
								processing={processing}
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

export default connect(mapStateToProps, { getMyProfile, loadPeople })(Profile);
