import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './SignupComponent.module.scss';
import { signup } from '../actions/auth';
import { connect } from 'react-redux';
import Router from 'next/router';

const SignupComponent = ({ auth: { isAuthenticated }, signup }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		passwordTwo: '',
		handle: '',
	});

	const { email, password, passwordTwo, handle } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const formSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	if (isAuthenticated) {
		Router.push('Dashboard');
	}

	return (
		<section className={style.section}>
			<form className={style.form} onSubmit={(e) => formSubmit(e)}>
				<div className={style.inner}>
					<div className={style.header}>
						<h3>Create an account</h3>
						<div className={style.logo_container}>
							<img
								src={`https://res.cloudinary.com/snackmanproductions/image/upload/v1595728394/social-app/syndicate-logo_qfxpd8.png`}
							/>
						</div>
					</div>

					<div className={style.input_col}>
						<label>Add Your Email</label>
						<input
							type="email"
							name="email"
							value={email}
							onChange={(e) => onChange(e)}
							placeholder="Please enter your email"
							required={true}
						/>
					</div>
					<div className={style.input_col}>
						<label>Create Password</label>
						<input
							type="password"
							name="password"
							value={password}
							onChange={(e) => onChange(e)}
							placeholder="Please enter your password"
							required={true}
						/>
					</div>
					<div className={style.input_col}>
						<label>Confirm Password</label>
						<input
							type="password"
							name="passwordTwo"
							value={passwordTwo}
							onChange={(e) => onChange(e)}
							placeholder="Please confirm your password"
							required={true}
						/>
					</div>
					<div className={style.input_col}>
						<label>Create a user alias</label>
						<input
							type="text"
							name="handle"
							value={handle}
							onChange={(e) => onChange(e)}
							placeholder="Please create a user alias"
							required={true}
						/>
					</div>
					<div className={style.button_col}>
						<button className={style.login_btn} onSubmit={(e) => formSubmit(e)}>
							Login
						</button>
					</div>
				</div>
			</form>
		</section>
	);
};

SignupComponent.propTypes = {
	signup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { signup })(SignupComponent);
