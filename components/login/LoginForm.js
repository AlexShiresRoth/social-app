import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './LoginForm.module.scss';
import { signIn } from '../actions/auth';
import Router from 'next/router';
import { withRouter } from 'next/dist/client/router';
import { connect } from 'react-redux';

const LoginForm = ({ signIn, history, auth: { isAuthenticated } }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const formSubmit = (e) => {
		e.preventDefault();
		signIn(formData, history);
	};

	useEffect(() => {
		if (isAuthenticated) {
			Router.push('/Dashboard');
		}
	}, [isAuthenticated]);
	return (
		<section className={style.section}>
			<form className={style.form} onSubmit={(e) => formSubmit(e)}>
				<div className={style.inner}>
					<div className={style.logo_container}>
						<img
							src={`https://res.cloudinary.com/snackmanproductions/image/upload/v1595728394/social-app/syndicate-logo_qfxpd8.png`}
						/>
					</div>
					<div className={style.input_col}>
						<label>Email</label>
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
						<label>Password</label>
						<input
							type="password"
							name="password"
							value={password}
							onChange={(e) => onChange(e)}
							placeholder="Please enter your password"
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

LoginForm.propTypes = {
	signIn: PropTypes.func,
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

export default connect(mapStateToProps, { signIn })(withRouter(LoginForm));
