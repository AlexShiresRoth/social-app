import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './ProfileCreation.module.scss';
import { Image } from 'react-feather';
const ProfileCreation = (props) => {
	const [currentIndex, changeIndex] = useState(0);
	//TODO change this into components
	const steps = [
		{
			caption: 'There are a bunch of things you can add to your profile. None of which are required!',
			btnText: 'Next',
			step: '1.  Add an avatar',
			iconContainer: (
				<div className={style.missing_img}>
					<Image size={'3rem'} />
				</div>
			),
			goBack: false,
			key: 0,
		},
		{
			caption: 'In this step, feel free to write a short bio about yourself',
			btnText: 'Save',
			step: '2. Write a short bio',
			iconContainer: (
				<div className={style.missing_img}>
					<Image size={'3rem'} />
				</div>
			),
			goBack: true,
			key: 1,
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
					<div className={style.onboarding__inner__slides}>
						{steps
							.map(({ step, caption, btnText, key, iconContainer = null, goBack }) => {
								console.log(key, steps.length - 1);
								return (
									<div className={style.slide} key={key}>
										{iconContainer ? iconContainer : null}
										<p>{caption}</p>
										<h3>{step}</h3>
										<div className={style.buttons}>
											<button
												className={style.next_btn}
												onPointerDown={(e) => changeIndex((prevIndex) => prevIndex + 1)}
											>
												{btnText}
											</button>
											{goBack ? (
												<button
													className={style.back_btn}
													onPointerDown={(e) => changeIndex((prevIndex) => prevIndex - 1)}
												>
													Back
												</button>
											) : null}
											{key !== steps.length - 1 ? (
												<button className={style.skip_btn}>Skip</button>
											) : null}
										</div>
									</div>
								);
							})
							.slice(currentIndex, currentIndex + 1)}
					</div>
				</div>
			</div>
		</div>
	);
};

ProfileCreation.propTypes = {};

export default ProfileCreation;
