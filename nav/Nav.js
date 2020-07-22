import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import style from './Nav.module.scss';
import { connect } from 'react-redux';

const Nav = ({ auth: { isAuthenticated, loading } }) => {
	console.log(isAuthenticated);
	const unAuthorizedLinks = (
		<div className={style.nav_right}>
			<Link href="/" as={`/`}>
				<a>Home</a>
			</Link>
			<Link href="/login" as={`/login`}>
				<a>Login</a>
			</Link>
			<Link href="/signup">
				<a>Signup</a>
			</Link>
		</div>
	);
	const authorizedLinks = (
		<div className={style.nav_right}>
			<Link href="/" as={`/`}>
				<a>Home</a>
			</Link>
			<Link href="/feed" as={`/main`}>
				<a>Feed</a>
			</Link>
			<Link href="/newpost" as={`/createpost`}>
				<a>+Post</a>
			</Link>
			<Link href="/signup">
				<a>Logout</a>
			</Link>
		</div>
	);
	return (
		<nav className={style.nav}>
			<div className={style.inner}>
				<div className={style.nav_left}>
					<Link href="/" as={`/`}>
						<a>Syndicate</a>
					</Link>
				</div>
				{!isAuthenticated ? unAuthorizedLinks : authorizedLinks}
			</div>
		</nav>
	);
};

Nav.propTypes = {};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, null)(Nav);
