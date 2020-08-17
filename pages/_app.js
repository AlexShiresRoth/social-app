import '../src/css/main.css';
import React, { useEffect } from 'react';
import { useStore } from '../components/store';
import { Provider } from 'react-redux';
import { loadUser } from '../components/actions/auth';

export default function App({ Component, pageProps }) {
	const store = useStore(pageProps.initialReduxState);

	useEffect(() => {
		const token = localStorage.getItem('token') || '';
		if (token !== '' && token) {
			store.dispatch(loadUser());
		}
	}, []);

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
