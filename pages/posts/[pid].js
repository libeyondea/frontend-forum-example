import Head from 'next/head';
import React from 'react';

import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import Layout from '@/modules/layout/components';
import SinglePostComponent from '@/modules/singlePost/components';

const SinglePost = ({ singlePost, listPostUser }) => {
	return (
		<>
			<Head>
				<title>{singlePost.data?.title} | De4th Zone</title>
				<meta name="description" content={singlePost.data?.excerpt} />
			</Head>
			<Layout>
				<SinglePostComponent singlePost={singlePost} listPostUser={listPostUser} />
			</Layout>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { pid } = query;
		const resSinglePost = await httpRequest.get({
			url: `/posts/${pid}`,
			token: getCookie('token', req)
		});
		if (resSinglePost.data.success) {
			const resListPostUser = await httpRequest.get({
				url: '/posts',
				token: getCookie('token', req),
				params: {
					user: resSinglePost.data.data.user.user_name,
					offset: 0,
					limit: 5
				}
			});
			if (resListPostUser.data.success) {
				return {
					props: {
						singlePost: resSinglePost.data,
						listPostUser: resListPostUser.data
					}
				};
			}
		}
	} catch (error) {
		console.log(error);
		return {
			notFound: true
		};
	}
}

export default SinglePost;
