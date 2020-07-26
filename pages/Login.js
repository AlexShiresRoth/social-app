import React from 'react';
import Head from 'next/head';
import Layout from '../layout/Layout';
import LoginForm from '../components/login/LoginForm';

const Login = () => {
	return (
		<>
			<Head>
				<title>Syndicate App:Login</title>
			</Head>

			<Layout>
				<LoginForm />
			</Layout>
		</>
	);
};

export default Login;
