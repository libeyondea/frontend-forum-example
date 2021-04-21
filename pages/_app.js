import React from 'react';
import Head from 'next/head';
import { END } from 'redux-saga';
import { wrapper } from '../redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/app.css';
import Layout from 'components/Common/Layout';

if (typeof window !== 'undefined') {
	require('lazysizes/plugins/attrchange/ls.attrchange.js');
	require('lazysizes/plugins/respimg/ls.respimg.js');
	require('lazysizes');
}

const App = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</Head>
			<Component {...pageProps} />
		</>
	);
};

App.getInitialProps = async ({ Component, ctx }) => {
	// 1. Wait for all page actions to dispatch
	const pageProps = {
		...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
	};
	// 2. Stop the saga if on server
	if (ctx.req) {
		ctx.store.dispatch(END);
		await ctx.store.sagaTask.toPromise();
	}
	// 3. Return props
	return {
		pageProps
	};
};

export default wrapper.withRedux(App);
