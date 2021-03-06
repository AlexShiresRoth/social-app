import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './ProfileCreation.module.scss';
import AvatarImport from './profilecreation/AvatarImport';
import SaveAndCreate from './profilecreation/SaveAndCreate';
import { X } from 'react-feather';
import SearchFriends from './profilecreation/SearchFriends';
import Interests from './profilecreation/Interests';
const ProfileCreation = ({
	toggleProfileForm,
	profileFormVisible,
	handleProfileData,
	processing,
	submitProfileData,
}) => {
	const [currentIndex, changeIndex] = useState(0);

	const steps = [
		{
			component: (
				<AvatarImport
					style={style}
					changeIndex={changeIndex}
					key={0}
					handleProfileData={handleProfileData}
					processing={processing}
				/>
			),
			progNum: '1. Add Avatar',
		},
		{
			component: (
				<SearchFriends
					changeIndex={changeIndex}
					key={1}
					handleProfileData={handleProfileData}
					processing={processing}
				/>
			),
			progNum: '2. Find pals',
		},
		{
			component: (
				<Interests
					changeIndex={changeIndex}
					key={2}
					handleProfileData={handleProfileData}
					processing={processing}
				/>
			),
			progNum: '3. Add Interests',
		},
		{
			component: <SaveAndCreate submitProfileData={submitProfileData} processing={processing} />,
			progNum: '4. Save',
		},
	];

	return (
		<div className={style.profile_onboarding}>
			<div className={style.onboarding}>
				<div className={style.onboarding__inner}>
					<div className={style.onboarding__inner__heading}>
						<div className={style.title_level}>
							<h2>Profile Creation</h2>
							<button onPointerDown={(e) => toggleProfileForm(!profileFormVisible)}>
								<X />
							</button>
						</div>

						<div className={style.progress_bar}>
							<div className={style.text_array}>
								{steps.map((step, i) => {
									return (
										<p
											className={
												style.progress_text + ` ${currentIndex >= i ? style.active_index : ' '}`
											}
											key={i}
										>
											{step.progNum}
										</p>
									);
								})}
							</div>
							<div
								className={style.progress_bar__inner}
								style={{ width: `${(currentIndex / steps.length) * 100}%` }}
							></div>
						</div>
					</div>
					<div className={style.onboarding__inner__slides}>{steps[currentIndex].component}</div>
				</div>
			</div>
		</div>
	);
};

ProfileCreation.propTypes = {};

export default ProfileCreation;
