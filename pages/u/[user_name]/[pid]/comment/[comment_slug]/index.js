import React from 'react';

import MetaPost from '@/common/meta/MetaPost';
import httpRequest from '@/common/utils/httpRequest';
import { getCookie } from '@/common/utils/session';
import Layout from '@/modules/layout/components';
import SingleCommentComponent from '@/modules/singleComment/components';

const SingleComment = ({ singleComment }) => {
	return (
		<>
			<MetaPost title={singleComment.data.content.slice(0, 20)} description={singleComment.data?.post.excerpt} />
			<Layout>
				<SingleCommentComponent singleComment={singleComment} />
			</Layout>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { user_name, pid, comment_slug } = query;
		const resSingleComment = await httpRequest.get({
			url: `/comments/${comment_slug}`,
			params: {
				user_name: user_name,
				post_slug: pid
			},
			token: getCookie('token', req)
		});
		if (resSingleComment.data.success) {
			return {
				props: {
					singleComment: resSingleComment.data
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

export default SingleComment;
