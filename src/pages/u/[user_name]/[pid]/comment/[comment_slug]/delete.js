import React from 'react';

import MetaDefault from '@/common/meta/MetaDefault';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import DeleteCommentComponent from '@/modules/deleteComment/components';
import Layout from '@/modules/layout/components';

const DeleteComment = ({ deleteComment }) => {
	return (
		<>
			<MetaDefault title="Delete Comment" />
			<Layout>
				<DeleteCommentComponent deleteComment={deleteComment} />
			</Layout>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { user_name, pid, comment_slug } = query;
		const resDeleteComment = await httpRequest.get({
			url: `/comments/${comment_slug}/delete`,
			params: {
				user_name: user_name,
				post_slug: pid
			},
			token: getCookie('token', req)
		});
		if (resDeleteComment.data.success) {
			return {
				props: {
					deleteComment: resDeleteComment.data
				}
			};
		}
	} catch (error) {
		return {
			notFound: true
		};
	}
}

export default DeleteComment;
