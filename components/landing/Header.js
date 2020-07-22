import React from 'react';
import PropTypes from 'prop-types';
import style from './Header.module.scss';

const Header = (props) => {
	return (
		<header className={style.header}>
			<div className={style.container}>
				<h1>SYNDICATE APP</h1>
			</div>
		</header>
	);
};

Header.propTypes = {};

export default Header;
