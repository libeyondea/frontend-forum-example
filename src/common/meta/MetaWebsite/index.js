import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const MetaWebsite = ({
	title = process.env.META.TITLE,
	description = process.env.META.DESCRIPTION,
	twitter = process.env.META.TWITTER,
	isHome = false
}) => {
	const { asPath } = useRouter();
	const canonical = process.env.WEBSITE_URL + asPath.split('?')[0];
	return (
		<>
			<Head>
				<title>
					{title}
					{!isHome ? ` | ${process.env.META.TITLE}` : null}
				</title>
				<meta name="description" content={description} />
				<link rel="canonical" href={canonical} />
				<meta property="og:site_name" content={process.env.META.TITLE} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:url" content={canonical} />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:url" content={canonical} />
				{twitter && <meta name="twitter:site" content={`https://twitter.com/${twitter.replace(/^@/, ``)}/`} />}
				{twitter && <meta name="twitter:creator" content={twitter} />}
			</Head>
		</>
	);
};

export default MetaWebsite;
