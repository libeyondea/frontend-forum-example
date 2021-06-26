import React from 'react';

import MetaWebsite from '@/common/meta/MetaWebsite';
import httpRequest from '@/common/utils/httpRequest';
import markdownToText from '@/common/utils/markdownToText';
import { getCookie } from '@/common/utils/session';
import Layout from '@/modules/layout/components';
import SingleCommentComponent from '@/modules/singleComment/components';

const SingleComment = ({ singleComment }) => {
	return (
		<>
			<MetaWebsite
				title={markdownToText(singleComment.data.content, 66)}
				description={singleComment.data?.post.excerpt}
				ogType="article"
			/>
			<Layout>
				<SingleCommentComponent singleComment={singleComment} />
			</Layout>
		</>
	);
};

export async function getServerSideProps({ req, query }) {
	try {
		const { user_name, post_slug, comment_slug } = query;
		const resSingleComment = await httpRequest.get({
			url: `/comments/${comment_slug}`,
			params: {
				user_name: user_name,
				post_slug: post_slug
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
