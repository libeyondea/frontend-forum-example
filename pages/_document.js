import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta name="robots" content="index, follow" />
					<meta key="googlebot" name="googlebot" content="index, follow" />
					<meta name="google" content="notranslate" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="keywords" content="nextjs, react, redux-saga" />
					<meta name="theme-color" content="#000" />
					<link rel="shortcut icon" href="/favicon.ico" />
					<link rel="manifest" href="/manifest.json" />
					<link
						rel="stylesheet"
						href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
