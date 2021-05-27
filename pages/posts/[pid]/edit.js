import React from 'react';

import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import EditPostComponent from '@/modules/editPost/components';
import LayoutComponent from '@/modules/layout/components';

const EditPost = ({ editPost }) => {
	return (
		<LayoutComponent>
			<EditPostComponent editPost={editPost} />
		</LayoutComponent>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { pid } = query;
		const resEditPost = await httpRequest.get({
			url: `posts/${pid}/edit`,
			token: getCookie('token', req)
		});
		if (resEditPost.data.success) {
			return {
				props: {
					editPost: resEditPost.data
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

export default EditPost;
