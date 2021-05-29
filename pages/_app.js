import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/global.css';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

import fetcher from '@/common/utils/fetcher';
import { removeCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

import Error from './_error';

const TopProgressBar = dynamic(
	() => {
		return import('@/common/utils/topProgressBar');
	},
	{ ssr: false }
);

const App = ({ Component, pageProps }) => {
	if (pageProps.statusCode) {
		return <Error statusCode={pageProps.statusCode} />;
	}
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</Head>
			<TopProgressBar />
			<SWRConfig
				value={{
					fetcher: fetcher,
					onError: (error, key) => {
						console.log(error.response);
						console.log(key);
						if (error.response.status === 401) {
							removeCookie('token');
						}
						showToast.error();
						return error.response;
					},
					onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
						// Never retry on 404.
						if (error.response.status === 404) return;

						// Never retry for a specific key.
						if (key === '/current_user') return;

						// Only retry up to 10 times.
						if (retryCount >= 10) return;

						// Retry after 5 seconds.
						setTimeout(() => revalidate({ retryCount }), 5000);
					}
				}}
			>
				<Component {...pageProps} />
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover={false}
				/>
			</SWRConfig>
		</>
	);
};

export default App;
