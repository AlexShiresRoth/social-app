import React from 'react';
import PropTypes from 'prop-types';

const People = ({ style, person, triggerFriendRequest, i, user }) => {
	return (
		<div className={style.person_row} key={i}>
			<div className={style.avatar_container}>
				<img src={`${person.avatar}`} alt={`${person.handle}'s avatar`} />
			</div>
			<p>{person.handle}</p>
			<>
				{!person.friendRequestsReceived.filter((personData) => {
					console.log('PERSON,', personData.fromPersonId === user._id);
					return personData.fromPersonId === user._id;
				}).length > 0 ? (
					processing ? (
						<LoadingSpinner />
					) : (
						<button onPointerDown={(e) => triggerFriendRequest(person._id)}>Send Request</button>
					)
				) : (
					<button disabled={true} className={style.disabled_btn}>
						Request Sent
					</button>
				)}
			</>
		</div>
	);
};

People.propTypes = {};

export default People;
