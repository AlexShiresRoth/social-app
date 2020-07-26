import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import style from './Nav.module.scss';
import { connect } from 'react-redux';
import { logout } from '../components/actions/auth';

const Nav = ({ auth: { isAuthenticated, loading }, logout }) => {
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

			<a onClick={(e) => logout()}>Logout</a>
		</div>
	);
	return (
		<nav className={style.nav}>
			<div className={style.inner}>
				<div className={style.nav_left}>
					<Link href="/" as={`/`}>
						<a>
							<img
								src={`https://res.cloudinary.com/snackmanproductions/image/upload/v1595728394/social-app/syndicate-logo_qfxpd8.png`}
							/>
						</a>
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

export default connect(mapStateToProps, { logout })(Nav);
