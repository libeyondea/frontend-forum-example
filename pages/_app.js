import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/app.css';
import 'nprogress/nprogress.css';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

import { wrapper } from '@/redux/store';

if (typeof window !== 'undefined') {
	require('lazysizes/plugins/attrchange/ls.attrchange.js');
	require('lazysizes/plugins/respimg/ls.respimg.js');
	require('lazysizes');
}

const TopProgressBar = dynamic(
	() => {
		return import('@/components/Common/TopProgressBar');
	},
	{ ssr: false }
);

const App = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</Head>
			<TopProgressBar />
			<Component {...pageProps} />
		</>
	);
};

export default wrapper.withRedux(App);
