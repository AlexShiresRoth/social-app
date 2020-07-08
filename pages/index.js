import Head from 'next/head';
import Layout from '../layout/Layout';

export default function Home() {
	return (
		<>
			<Head>
				<title>Syndicate App</title>
			</Head>
			<Layout>
				<h1>Syndicate App</h1>
			</Layout>
		</>
	);
}
