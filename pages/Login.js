import React from 'react';
import Head from 'next/head';
import Layout from '../layout/Layout';

const Login = () => {
	return (
		<div>
			<Head>
				<title>Syndicate App:Login</title>
			</Head>

			<Layout>
				<h1>Login to your account</h1>
			</Layout>
		</div>
	);
};

export default Login;
