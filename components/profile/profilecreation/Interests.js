import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './Interests.module.scss';
import LoadingSpinner from '../../loadingspinner/LoadingSpinner';

const Interests = ({ changeIndex, handleProfileData, processing }) => {
	const [data, setData] = useState({
		interests: [],
	});
	const [interestText, setInterestText] = useState('');
	const [loading, setLoading] = useState(false);

	const { interests } = data;

	const onChange = (e) => setInterestText(e.target.value);

	const onSubmit = (e) => {
		e.preventDefault();
		//don't allow for same interest addition
		if (interests.includes(interestText)) return;

		setLoading(true);

		setData((prevData) => {
			console.log(prevData);
			return { interests: [...prevData.interests, interestText] };
		});
	};

	useEffect(() => {
		setInterestText('');
		let timeOut = setTimeout(() => {
			setLoading(false);
		}, 1000);

		return () => clearTimeout(timeOut);
	}, [interests.length]);

	useEffect(() => {
		if (window.localStorage.getItem('interests')) {
			setData({ interests: window.localStorage.getItem('interests').split(',') });
		}
	}, []);

	return (
		<div className={style.form_container}>
			<p>Add your interests so we can suggest things to you, or find people with common interests.</p>

			<div className={style.inner}>
				<form onSubmit={(e) => onSubmit(e)}>
					<label>For each interest, hit the enter key.</label>
					<input type="text" value={interestText} name="interestText" onChange={(e) => onChange(e)}></input>
					{!loading ? <button>Add</button> : <LoadingSpinner />}
				</form>
				<div className={style.common_interests}></div>
				<div className={style.saved_interests}>
					{interests.length === 0 && <p>Your saved interests will appear here.</p>}
					{interests.map((interest, i) => {
						return (
							<p className={style.interest_blob} key={i}>
								{interest}
							</p>
						);
					})}
				</div>
			</div>
			<div className={style.buttons}>
				{!processing ? (
					<>
						{' '}
						<button className={style.save_btn} onPointerDown={(e) => handleProfileData({ interests })}>
							Save
						</button>
						<div className={style.buttons__right}>
							<button
								className={style.back_btn}
								onPointerDown={(e) => changeIndex((prevIndex) => prevIndex - 1)}
							>
								Back
							</button>
							<button
								className={style.next_btn}
								onPointerDown={(e) => changeIndex((prevIndex) => prevIndex + 1)}
							>
								{interests.length > 0 ? 'Next' : 'Skip'}
							</button>
						</div>{' '}
					</>
				) : (
					<>
						{' '}
						<LoadingSpinner /> <p>Saving...</p>{' '}
					</>
				)}
			</div>
		</div>
	);
};

Interests.propTypes = {
	changeIndex: PropTypes.func,
};

export default Interests;
