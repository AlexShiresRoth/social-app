import React from 'react';
import PropTypes from 'prop-types';
import style from './SaveAndCreate.module.scss';
import LoadingSpinner from '../../loadingspinner/LoadingSpinner';

const SaveAndCreate = ({ changeIndex, submitProfileData, processing }) => {
	return (
		<div className={style.slide}>
			<div className={style.inner}>
				<h2>If your happy with your choices, hit that submit button below.</h2>
				<p>Remeber, you can always edit your profile at anytime.</p>
			</div>
			<div className={style.buttons}>
				{!processing ? (
					<>
						<div className={style.buttons__left}></div>
						<div className={style.buttons__right}>
							<button
								className={style.back_btn}
								onPointerDown={(e) => changeIndex((prevIndex) => prevIndex - 1)}
							>
								Back
							</button>
							<button className={style.next_btn} onPointerDown={(e) => submitProfileData(e)}>
								Submit
							</button>
						</div>{' '}
					</>
				) : (
					<>
						<LoadingSpinner /> <p>Saving...</p>
					</>
				)}
			</div>
		</div>
	);
};

SaveAndCreate.propTypes = {};

export default SaveAndCreate;
