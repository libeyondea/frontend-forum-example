import Head from 'next/head';
import React from 'react';

const MetaDefault = ({ title = process.env.META.TITLE }) => {
	return (
		<>
			<Head>
				<title>
					{title} | {process.env.META.TITLE}
				</title>
			</Head>
		</>
	);
};

export default MetaDefault;
