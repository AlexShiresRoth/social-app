import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './SearchFriends.module.scss';
import { searchFriends } from '../../actions/profile';
import { connect } from 'react-redux';

const SearchFriends = ({ changeIndex, searchFriends, profile: { matchingFriends, loadFriends } }) => {
	const [searchTerm, setTerm] = useState('');

	const onChange = (e) => setTerm(e.target.value);

	useEffect(() => {
		if (searchTerm !== '') {
			searchFriends(searchTerm);
		}
	}, [searchTerm]);

	console.log(matchingFriends);
	return (
		<div className={style.slide}>
			<p>Search for your friends if you know their user names</p>
			<input
				type="text"
				autoComplete={true}
				autoFocus={true}
				onChange={(e) => onChange(e)}
				value={searchTerm}
				name="searchTerm"
			/>
			<div className={style.buttons}>
				<button className={style.save_btn} onPointerDown={(e) => handleAvatarSave(e)}>
					Save
				</button>
				<button className={style.back_btn} onPointerDown={(e) => changeIndex((prevIndex) => prevIndex - 1)}>
					Back
				</button>
				<button className={style.next_btn} onPointerDown={(e) => changeIndex((prevIndex) => prevIndex + 1)}>
					Next
				</button>
			</div>
		</div>
	);
};

SearchFriends.propTypes = {};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { searchFriends })(SearchFriends);
