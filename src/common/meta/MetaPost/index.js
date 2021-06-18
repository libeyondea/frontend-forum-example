import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const MetaPost = ({
	title = process.env.META.TITLE,
	description = process.env.META.DESCRIPTION,
	twitter = process.env.META.TWITTER,
	image
}) => {
	const { asPath } = useRouter();
	const canonical = process.env.WEBSITE_URL + asPath.split('?')[0];
	return (
		<>
			<Head>
				<title>
					{title} | {process.env.META.TITLE}
				</title>
				<meta name="description" content={description} />
				<link rel="canonical" href={canonical} />
				<meta property="og:site_name" content={process.env.META.TITLE} />
				<meta property="og:type" content="article" />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
				<meta property="og:url" content={canonical} />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:url" content={canonical} />
				{process.env.META.TWITTER && (
					<meta name="twitter:site" content={`https://twitter.com/${process.env.META.TWITTER.replace(/^@/, ``)}/`} />
				)}
				{twitter && <meta name="twitter:creator" content={twitter} />}
				<meta name="twitter:card" content="summary_large_image" />
				{image && <meta property="og:image" content={`${process.env.IMAGES_URL}/${image}`} />}
				{image && <meta name="twitter:image" content={`${process.env.IMAGES_URL}/${image}`} />}
			</Head>
		</>
	);
};

export default MetaPost;
