import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import { loadUser } from '../actions/auth';

const DashboardComponent = ({ auth: { isAuthenticated, user }, loadUser }) => {
	useEffect(() => {
		if (!isAuthenticated) {
			Router.push('/');
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (isAuthenticated) loadUser();
	}, [isAuthenticated]);

	return <section>DASHBOARD HOMIE</section>;
};

DashboardComponent.propTypes = {
	isAuthenticated: PropTypes.bool,
	loadUser: PropTypes.func,
};

const mapStateToProps = (state) => {
	console.log(state);
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { loadUser })(DashboardComponent);
