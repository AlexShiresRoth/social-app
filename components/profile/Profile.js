import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createProfile, getMyProfile, loadPeople } from '../actions/profile';
import { connect } from 'react-redux';
import MyProfile from './MyProfile';
import ProfileCreation from './ProfileCreation';
import LoadingSpinner from '../loadingspinner/LoadingSpinner';
import style from './Profile.module.scss';
import ProfileSvg from './svgs/ProfileSvg';
import { useRouter } from 'next/router';

const Profile = ({
	getMyProfile,
	loadPeople,
	createProfile,
	profile: { myProfile, loading, loadingProfile },
	auth: { user, isAuthenticated },
}) => {
	const router = useRouter();

	if (!isAuthenticated) {
		router.push('/');
	}
	const [profileFormVisible, toggleProfileForm] = useState(false);
	const [profileData, setProfileData] = useState({
		url: '',
		interests: [],
	});
	const [processing, setProcessing] = useState(false);

	useEffect(() => {
		getMyProfile();
		loadPeople();
	}, []);

	const { url, interests } = profileData;

	const handleProfileData = ({ file = null, interests = [] }) => {
		setProcessing(true);
		setProfileData((prevData) => ({
			...prevData,
			url: file ? file : prevData.url,
			interests: interests.length > 0 ? interests : prevData.interests,
		}));
	};

	//TODO clean this so if people alter localstorage
	const submitProfileData = (e) => {
		e.preventDefault();
		const fromStorageInterests =
			window.localStorage.getItem('interests').length > 0
				? window.localStorage.getItem('interests').split(',')
				: null;
		const avatarUrl = window.localStorage.getItem('url') ? window.localStorage.getItem('url') : null;
		const profileBody = {
			interests: fromStorageInterests,
			url: avatarUrl,
		};
		setProcessing(true);
		createProfile(profileBody);
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('url', url);
			window.localStorage.setItem('interests', interests);
		}
	}, [url, interests]);

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
								<h1>Hey {user && user.handle},</h1>
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
								submitProfileData={submitProfileData}
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
	auth: state.auth,
});

export default connect(mapStateToProps, { getMyProfile, loadPeople, createProfile })(Profile);
