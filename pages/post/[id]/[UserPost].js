import React from 'react';
import Head from 'next/head';
import Layout from '../../../layout/Layout';
import DynamicPost from '../../../components/feed/post/DynamicPost';

const UserPost = () => {
	return (
		<>
			<Head>
				<title>User Post</title>
			</Head>
			<Layout>
				<DynamicPost />
			</Layout>
		</>
	);
};

export default UserPost;
