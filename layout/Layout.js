import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../nav/Nav';
import Alert from '../components/alert/Alert';
import style from './Layout.module.scss';
import Footer from '../components/footer/Footer';

const Layout = ({ children }) => {
	return (
		<main className={style.main}>
			<Nav />
			<Alert />
			{children}
			<Footer />
		</main>
	);
};

Layout.propTypes = {
	children: PropTypes.object,
};

export default Layout;
