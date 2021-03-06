import '@/styles/globals.scss';
import '@/styles/github-markdown.css';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

import fetcher from '@/common/utils/fetcher';
import { removeCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';

const TopProgressBar = dynamic(
	() => {
		return import('@/common/utils/topProgressBar');
	},
	{ ssr: false }
);

console.log('%cThis is a demo site', 'font-size: 4rem; color: red; font-weight: 600;');

const App = ({ Component, pageProps }) => {
	const router = useRouter();

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
			</Head>
			<TopProgressBar />
			<SWRConfig
				value={{
					fetcher: fetcher,
					onError: (error, key) => {
						showToast.error(undefined, key);
						if (key === '/current_user') {
							removeCookie('token');
						}
						return error.response;
					},
					shouldRetryOnError: false
				}}
			>
				<Component {...pageProps} key={router.asPath} />
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
