import '../src/css/main.css';
import React from 'react';
import App, { Container } from 'next/app';
import { wrapper } from '../components/store';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../components/actions/auth';

class CustomApp extends App {
	constructor() {
		super();
		this.state = {
			token: '',
		};
	}
	static getStaticProps = async ({ Component, ctx }) => {
		// Keep in mind that this will be called twice on server, one for page and second for error page

		ctx.store.dispatch({ type: 'APP', payload: 'was set in _app' });

		return {
			pageProps: {
				// Call page-level getInitialProps
				...(Component.getStaticProps ? await Component.getInitialProps(ctx) : {}),
				// Some custom thing for all pages
				appProp: ctx.pathname,
			},
		};
	};

	componentDidMount() {
		this.setState({
			token: localStorage.getItem('token') || '',
		});
	}
	componentDidUpdate() {
		const token = this.state.token;
		if (token !== '' || token) {
			setAuthToken(token);
		}
	}

	render() {
		const { Component, pageProps } = this.props;
		console.log(this.props);
		return (
			<Container>
				<Component {...pageProps} />
			</Container>
		);
	}
}

export default wrapper.withRedux(CustomApp);
