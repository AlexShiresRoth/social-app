import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './SearchFriends.module.scss';
import { connect } from 'react-redux';
import { sendFriendRequest } from '../../actions/profile';
import LoadingSpinner from '../../loadingspinner/LoadingSpinner';
import People from './People';

const SearchFriends = ({ changeIndex, profile: { people, loadingPeople }, sendFriendRequest, auth: { user } }) => {
	const [searchTerm, setTerm] = useState('');
	const [matches, setMatches] = useState([...people]);
	const [processing, setProcessing] = useState(false);
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

	const triggerFriendRequest = (id) => {
		setProcessing(true);
		sendFriendRequest(id);
	};

	useEffect(() => {
		if (searchTerm !== '') {
			locateMatches(searchTerm);
		}
		if (searchTerm === '') {
			setMatches(people);
		}
	}, [searchTerm, people]);

	useEffect(() => {
		if (!loadingPeople) {
			setProcessing(false);
		}
	}, [loadingPeople, people]);

	//vary between search matches and none searched
	const peopleMap = (arr) => {
		return arr.map((person, i) => {
			return (
				<People
					person={person}
					key={i}
					style={style}
					triggerFriendRequest={triggerFriendRequest}
					i={i}
					user={user}
				/>
			);
		});
	};

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
					{!loadingPeople && searchTerm !== '' ? (
						matches.length > 0 ? (
							<> {peopleMap(matches)} </>
						) : (
							<p>Could not locate anyone with that name</p>
						)
					) : !loadingPeople ? (
						<>{peopleMap(people)}</>
					) : (
						<p>Loading People!</p>
					)}
				</div>
			</div>
			<div className={style.buttons}>
				<button className={style.save_btn} onPointerDown={(e) => changeIndex((prevIndex) => prevIndex + 1)}>
					Next
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
	auth: state.auth,
});

export default connect(mapStateToProps, { sendFriendRequest })(SearchFriends);
