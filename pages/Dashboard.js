import React from 'react';
import Head from 'next/head';
import Layout from '../layout/Layout';
import DashboardComponent from '../components/dashboard/DashboardComponent';

const Dashboard = () => {
	return (
		<>
			<Head>
				<title>Syndicate: User Dashboard</title>
			</Head>
			<Layout>
				<DashboardComponent />
			</Layout>
		</>
	);
};

export default Dashboard;
