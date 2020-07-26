import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';

const DashboardComponent = ({ auth: { isAuthenticated } }) => {
	useEffect(() => {
		if (!isAuthenticated) {
			Router.push('/');
		}
	}, [isAuthenticated]);

	return <section>DASHBOARD HOMIE</section>;
};

DashboardComponent.propTypes = {};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, null)(DashboardComponent);
