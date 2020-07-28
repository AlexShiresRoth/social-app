import React from 'react';
import Head from 'next/head';
import Layout from '../layout/Layout';
import SignupComponent from '../components/signup/SignupComponent';

const Signup = (props) => {
	return (
		<>
			<Head>
				<title>Syndicate: Signup Page</title>
			</Head>
			<Layout>
				<SignupComponent />
			</Layout>
		</>
	);
};

export default Signup;
