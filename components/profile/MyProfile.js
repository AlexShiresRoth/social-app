import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MyProfile = ({ profile: { myProfile } }) => {
	return <div>{myProfile ? <img src={myProfile.avatar} /> : null}</div>;
};

MyProfile.propTypes = {};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, null)(MyProfile);
