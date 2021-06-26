import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import DeletePostComponent from '@/modules/deletePost/components';
import Layout from '@/modules/layout/components';

const DeletePost = ({ deletePost }) => {
	return (
		<>
			<MetaWebsite title="Delete Post" isNoneMeta />
			<Layout>
				<DeletePostComponent deletePost={deletePost} />
			</Layout>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { user_name, post_slug } = query;
		const resDeletePost = await httpRequest.get({
			url: `/posts/${post_slug}/delete`,
			params: {
				user_name: user_name
			},
			token: getCookie('token', req)
		});
		if (resDeletePost.data.success) {
			return {
				props: {
					deletePost: resDeletePost.data
				}
			};
		}
	} catch (error) {
		return {
			notFound: true
		};
	}
}

export default DeletePost;
