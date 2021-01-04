import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './MyProfile.module.scss';

const MyProfile = ({ profile: { myProfile } }) => {
	return (
		<div className={style}>
			{myProfile ? <img src={myProfile.avatar} /> : null}
			<h2>{myProfile.handle}</h2>
		</div>
	);
};

MyProfile.propTypes = {};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, null)(MyProfile);
