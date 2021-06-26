import React, { useState } from 'react';

import httpRequest from '@/common/utils/httpRequest';
import { isEmpty } from 'lodash';
import { getCookie } from '@/common/utils/session';
import showToast from '@/common/utils/showToast';
import CommentLoopComponent from '@/modules/singlePost/components/comment/components/commentLoop';
const CommentList = ({ listCommentClient, setListCommentClient, meta, setMeta, postUserName, postSlug }) => {
	const [isLoading, setLoading] = useState(false);
	const [page, setPage] = useState(2);

	const onLoadMoreCommentClicked = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await httpRequest.get({
				url: `/comments`,
				token: getCookie('token'),
				params: {
					post_slug: postSlug,
					offset: (page - 1) * process.env.LIMIT_PAGE.LIST_COMMENT,
					limit: process.env.LIMIT_PAGE.LIST_COMMENT
				}
			});
			if (response.data.success) {
				setPage(page + 1);
				setListCommentClient(listCommentClient.concat(response.data.data));
				showToast.success(`Load more comment success`);
			}
		} catch (error) {
			showToast.error();
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{isEmpty(listCommentClient) ? (
				<div className="text-center font-weight-bold mt-4">
					<span>Empty comments</span>
				</div>
			) : (
				<>
					<CommentLoopComponent
						comments={listCommentClient}
						listCommentClient={listCommentClient}
						setListCommentClient={setListCommentClient}
						meta={meta}
						setMeta={setMeta}
						postUserName={postUserName}
						postSlug={postSlug}
					/>
					{meta.total_parent > listCommentClient.length && (
						<div className="mt-4">
							{isLoading ? (
								<button type="submit" className="btn btn-info btn-block btn-sm" disabled>
									<span className="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true" />
									Load more
								</button>
							) : (
								<button type="submit" className="btn btn-info btn-block btn-sm" onClick={onLoadMoreCommentClicked}>
									Load more
								</button>
							)}
						</div>
					)}
				</>
			)}
		</>
	);
};

export default CommentList;
