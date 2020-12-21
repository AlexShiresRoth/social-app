import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-feather';

const AvatarImport = ({ style, changeIndex, key }) => {
	return (
		<div className={style.slide} key={key}>
			<div className={style.missing_img}>
				<Image size={'3rem'} />
			</div>
			<p>There are a bunch of things you can add to your profile. None of which are required!</p>
			<h3>1. Add an avatar</h3>
			<div className={style.buttons}>
				<button className={style.save_btn}>Save</button>
				<button className={style.next_btn} onPointerDown={(e) => changeIndex((prevIndex) => prevIndex + 1)}>
					Next
				</button>
			</div>
		</div>
	);
};

AvatarImport.propTypes = {};

export default AvatarImport;
