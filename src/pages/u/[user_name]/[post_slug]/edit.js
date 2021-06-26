import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import EditPostComponent from '@/modules/editPost/components';
import LayoutComponent from '@/modules/layout/components';

const EditPost = ({ editPost }) => {
	return (
		<>
			<MetaWebsite title="Edit Post" isNoneMeta />
			<LayoutComponent>
				<EditPostComponent editPost={editPost} />
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { user_name, post_slug } = query;
		const resEditPost = await httpRequest.get({
			url: `posts/${post_slug}/edit`,
			params: {
				user_name: user_name
			},
			token: getCookie('token', req)
		});
		if (resEditPost.data.success) {
			return {
				props: {
					editPost: resEditPost.data
				}
			};
		}
	} catch (error) {
		console.log(error);
		return {
			notFound: true
		};
	}
}

export default EditPost;
