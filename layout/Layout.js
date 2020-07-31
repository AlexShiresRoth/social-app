import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../nav/Nav';
import Alert from '../components/alert/Alert';

const Layout = ({ children }) => {
	return (
		<main>
			<Nav />
			<Alert />
			{children}
		</main>
	);
};

Layout.propTypes = {
	children: PropTypes.object,
};

export default Layout;
