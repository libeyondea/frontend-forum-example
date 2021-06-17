import React from 'react';

import MetaDefault from '@/common/meta/MetaDefault';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import EditPostComponent from '@/modules/editPost/components';
import LayoutComponent from '@/modules/layout/components';

const EditPost = ({ editPost }) => {
	return (
		<>
			<MetaDefault title="Edit Post" />
			<LayoutComponent>
				<EditPostComponent editPost={editPost} />
			</LayoutComponent>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { user_name, pid } = query;
		const resEditPost = await httpRequest.get({
			url: `posts/${user_name}/${pid}/edit`,
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
