import Head from 'next/head';
import React from 'react';

import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import Layout from '@/modules/layout/components';
import SinglePostComponent from '@/modules/singlePost/components';

const SinglePost = ({ singlePost, listPostUser, listComment }) => {
	return (
		<>
			<Head>
				<title>{singlePost.data?.title} | De4th Zone</title>
				<meta name="description" content={singlePost.data?.excerpt} />
			</Head>
			<Layout>
				<SinglePostComponent singlePost={singlePost} listPostUser={listPostUser} listComment={listComment} />
			</Layout>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { user_name, pid } = query;
		const [resSinglePost, resListComment] = await Promise.all([
			httpRequest.get({
				url: `/posts/${user_name}/${pid}`,
				token: getCookie('token', req)
			}),
			httpRequest.get({
				url: `/comments`,
				token: getCookie('token', req),
				params: {
					post_slug: pid,
					offset: (1 - 1) * process.env.LIMIT_PAGE.LIST_COMMENT,
					limit: process.env.LIMIT_PAGE.LIST_COMMENT
				}
			})
		]);
		if (resSinglePost.data.success && resListComment.data.success) {
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
						listPostUser: resListPostUser.data,
						listComment: resListComment.data
					}
				};
			}
		}
	} catch (error) {
		return {
			notFound: true
		};
	}
}

export default SinglePost;
