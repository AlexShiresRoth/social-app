import Head from 'next/head';
import Layout from '../layout/Layout';
import Header from '../components/landing/Header';

const Home = () => {
	return (
		<>
			<Head>
				<title>Syndicate App</title>
			</Head>
			<Layout>
				<Header />
			</Layout>
		</>
	);
};

export default Home;
