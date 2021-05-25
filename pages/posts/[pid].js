import Head from 'next/head';
import React from 'react';

import httpRequest from '@/common/utils/httpRequest';
import Layout from '@/modules/layout/components';
import SinglePostComponent from '@/modules/singlePost/components';

const SinglePost = ({ singlePost }) => {
	return (
		<>
			<Head>
				<title>{singlePost.data?.title} | De4th Zone</title>
				<meta name="description" content={singlePost.data?.excerpt} />
			</Head>
			<Layout>
				<SinglePostComponent singlePost={singlePost} />
			</Layout>
		</>
	);
};

export async function getServerSideProps({ query }) {
	try {
		const { pid } = query;
		const resSinglePost = await httpRequest.get({
			url: `/posts/${pid}`
		});
		if (resSinglePost.data.success) {
			return {
				props: {
					singlePost: resSinglePost.data
				}
			};
		}
		return {
			notFound: true
		};
	} catch (error) {
		console.log(error);
		return {
			notFound: true
		};
	}
}

export default SinglePost;
