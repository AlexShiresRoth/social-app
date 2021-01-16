import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './SearchFriends.module.scss';
import { connect } from 'react-redux';

const SearchFriends = ({ changeIndex, profile: { people, loadingPeople } }) => {
	const [searchTerm, setTerm] = useState('');
	const [matches, setMatches] = useState([...people]);
	const onChange = (e) => setTerm(e.target.value);

	const locateMatches = (term) => {
		const regex = new RegExp('^' + term, 'i');
		if (people.length > 0) {
			const foundPeople = people.filter((person, i) => {
				return regex.test(person.handle) || regex.test(person.name);
			});
			console.log(foundPeople);
			setMatches(foundPeople);
			return foundPeople;
		}
	};

	const sendFriendRequest = () => {};

	useEffect(() => {
		if (searchTerm !== '') {
			locateMatches(searchTerm);
		}
		if (searchTerm === '') {
			setMatches(people);
		}
	}, [searchTerm, people]);

	return (
		<div className={style.slide}>
			<div className={style.form_container}>
				<label>Search for your friends if you know their user names</label>
				<input
					type="text"
					autoComplete={true}
					autoFocus={true}
					onChange={(e) => onChange(e)}
					value={searchTerm}
					name="searchTerm"
				/>
			</div>
			<div className={style.people_results}>
				<div class={style.people_results__content}>
					{!loadingPeople ? (
						matches.length > 0 ? (
							matches.map((person, i) => {
								return (
									<div className={style.person_row} key={i}>
										<div className={style.avatar_container}>
											<img src={`${person.avatar}`} alt={`${person.handle}'s avatar`} />
										</div>
										<p>{person.handle}</p>
										<button>Send Request</button>
									</div>
								);
							})
						) : (
							<p>Could not locate anyone with that name</p>
						)
					) : (
						<p>Loading People!</p>
					)}
				</div>
			</div>
			<div className={style.buttons}>
				<button className={style.save_btn} onPointerDown={(e) => handleAvatarSave(e)}>
					Save
				</button>
				<div className={style.buttons__right}>
					<button className={style.back_btn} onPointerDown={(e) => changeIndex((prevIndex) => prevIndex - 1)}>
						Back
					</button>
					<button className={style.next_btn} onPointerDown={(e) => changeIndex((prevIndex) => prevIndex + 1)}>
						Skip
					</button>
				</div>
			</div>
		</div>
	);
};

SearchFriends.propTypes = {};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, null)(SearchFriends);
