import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Nav = (props) => {
	return (
		<nav>
			<Link href={`/`}>Home</Link>
			<Link href={`/login`}>Login</Link>
		</nav>
	);
};

Nav.propTypes = {};

export default Nav;
