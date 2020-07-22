import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../nav/Nav';

const Layout = ({ children }) => {
	return (
		<main>
			<Nav />
			{children}
		</main>
	);
};

Layout.propTypes = {
	children: PropTypes.object,
};

export default Layout;
