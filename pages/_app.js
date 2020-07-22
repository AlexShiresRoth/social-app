import '../src/css/main.css';
import React from 'react';
import App from 'next/app';
import { wrapper } from '../components/store';

class CustomApp extends App {
	static getInitialProps = async ({ Component, ctx }) => {
		// Keep in mind that this will be called twice on server, one for page and second for error page
		ctx.store.dispatch({ type: 'APP', payload: 'was set in _app' });

		return {
			pageProps: {
				// Call page-level getInitialProps
				...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
				// Some custom thing for all pages
				appProp: ctx.pathname,
			},
		};
	};

	render() {
		const { Component, pageProps } = this.props;
		return <Component {...pageProps} />;
	}
}

export default wrapper.withRedux(CustomApp);
