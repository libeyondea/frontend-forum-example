import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/global.css';
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
import Error from '@/pages/_error';

const TopProgressBar = dynamic(
	() => {
		return import('@/common/utils/topProgressBar');
	},
	{ ssr: false }
);

const App = ({ Component, pageProps }) => {
	const router = useRouter();
	if (pageProps.statusCode) {
		return <Error statusCode={pageProps.statusCode} />;
	}
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
					onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
						if (error?.response?.status === 404 || key === '/current_user' || retryCount > 1) return;
						setTimeout(() => revalidate({ retryCount }), 5000);
					}
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
