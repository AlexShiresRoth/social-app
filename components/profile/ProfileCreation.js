import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './ProfileCreation.module.scss';
import AvatarImport from './profilecreation/AvatarImport';
const ProfileCreation = (props) => {
	const [currentIndex, changeIndex] = useState(0);
	//TODO change this into components
	const steps = [
		{
			component: <AvatarImport style={style} changeIndex={changeIndex} key={0} />,
		},
	];

	return (
		<div className={style.profile_onboarding}>
			{/* create a heading showing step progression */}
			<div className={style.onboarding}>
				<div className={style.onboarding__inner}>
					<div className={style.onboarding__inner__heading}>
						<div className={style.progress_bar}></div>
					</div>
					<div className={style.onboarding__inner__slides}>{steps[currentIndex].component}</div>
				</div>
			</div>
		</div>
	);
};

ProfileCreation.propTypes = {};

export default ProfileCreation;
