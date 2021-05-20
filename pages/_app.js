import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/app.css';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

import fetcher from '@/lib/utils/fetcher';
import { removeCookie } from '@/lib/utils/session';
import showToast from '@/lib/utils/showToast';

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
