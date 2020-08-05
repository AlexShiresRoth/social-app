import React from 'react';
import PropTypes from 'prop-types';
import style from './Footer.module.scss';

const Footer = (props) => {
	return (
		<footer className={style.footer}>
			<h1>syndicate app</h1>
		</footer>
	);
};

Footer.propTypes = {};

export default Footer;
