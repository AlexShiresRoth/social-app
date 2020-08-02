import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import { loadUser } from '../actions/auth';
import style from './DashboardComponent.module.scss';
import Link from 'next/link';
import { dbConfigArray } from './dbConfig';
import { AiOutlineArrowRight } from 'react-icons/ai';

const DashboardComponent = ({ auth: { isAuthenticated, user }, loadUser }) => {
	useEffect(() => {
		if (!isAuthenticated) {
			Router.push('/');
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (isAuthenticated) loadUser();
	}, [isAuthenticated]);

	return (
		<section className={style.db_container}>
			<div className={style.db_grid}>
				{dbConfigArray.map((gridItem, i) => {
					return (
						<div className={style.db_col} key={i}>
							<h2
								className={
									i % 2 === 0 ? style.color_one : i % 3 === 0 ? style.color_three : style.color_two
								}
							>
								{gridItem.title}
							</h2>
							<Link href={gridItem.path} as={gridItem.title}>
								<button>
									{gridItem.btn} <AiOutlineArrowRight />
								</button>
							</Link>
						</div>
					);
				})}
			</div>
		</section>
	);
};

DashboardComponent.propTypes = {
	isAuthenticated: PropTypes.bool,
	loadUser: PropTypes.func,
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { loadUser })(DashboardComponent);
